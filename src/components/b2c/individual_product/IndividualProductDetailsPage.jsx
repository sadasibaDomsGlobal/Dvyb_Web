import React, { Suspense, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../../hooks/useProducts";
import { cartService } from "../../../services/cartService";
import { auth } from "../../../config";

/**
 * Import child components
 */
import ProductImageGallery from "./individual_product_components/ProductImageGallery";
import ProductTitleSection from "./individual_product_components/ProductTitleSection";
import ProductColorSelector from "./individual_product_components/ProductColorSelector";
import ProductPriceSection from "./individual_product_components/ProductPriceSection";
import ProductSizeSelector from "./individual_product_components/ProductSizeSelector";
import ProductActionButtons from "./individual_product_components/ProductActionButtons";
import OfferAndShippingInfo from "./individual_product_components/OfferAndShippingInfo";
import ProductDescriptionSection from "./individual_product_components/ProductDescriptionSection";
import ProductDetailsSection from "./individual_product_components/ProductDetailsSection";
import DisclaimerSection from "./individual_product_components/DisclaimerSection";
import HelpAndTryonSection from "./individual_product_components/HelpAndTryonSection";
import ProductReviewsSection from "./individual_product_components/ProductReviewsSection";
import ProductStockAndShipping from "./individual_product_components/ProductStockAndShipping";
import ProductStarRatingSection from "./individual_product_components/ProductStarRatingSection";

const UploadSelfieModal = React.lazy(() => import("../TryOn/UploadSelfieModal"));
const TryOnPreviewModal = React.lazy(() => import("../TryOn/TryOnPreviewModal"));

const IndividualProductDetailsPage = () => {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();

  const [addingToCart, setAddingToCart] = useState(false);
  const [showUploadSelfieModal, setShowUploadSelfieModal] = useState(false);
  const [showTryOnPreviewModal, setShowTryOnPreviewModal] = useState(false);
  const [tryOnData, setTryOnData] = useState({});

  // ✅ Handle loading and errors
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  const product = products.find((p) => String(p.id) === String(id));
  if (!product) return <div className="text-center py-10 text-gray-500">Product not found.</div>;

  const imageUrls = product.imageUrls?.length ? product.imageUrls : ["/placeholder.jpg"];

  /** 🧩 Try-On Feature */
  const handleTryOnClick = () => {
    const garmentImage = product.imageUrls?.[0];
    if (!garmentImage) {
      alert("No image available for try-on");
      return;
    }

    setTryOnData({
      garmentImage,
      garmentName: product.title || product.name,
      productId: product.id,
      selectedColors: product.selectedColors || [],
      selectedSizes: product.selectedSizes || [],
      fabric: product.fabric || "",
      price: parseFloat(product.price) || 0,
      discount: product.discount || 0,
      imageUrls: product.imageUrls || [garmentImage],
    });

    setShowUploadSelfieModal(true);
  };

  const handleUploadSelfieNext = (data) => {
    setShowUploadSelfieModal(false);
    setTryOnData((prev) => ({ ...prev, ...data }));
    setShowTryOnPreviewModal(true);
  };

  const handleModalClose = () => {
    setShowUploadSelfieModal(false);
    setShowTryOnPreviewModal(false);
    setTryOnData({});
  };

  /** ✅ BUY NOW (No static data — dynamic from user or guest cart) */
  const handleBuyNow = async (event) => {
    event.stopPropagation();
    setAddingToCart(true);

    try {
      const user = auth.currentUser;

      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: imageUrls[0],
        color: product.selectedColors?.[0] || "Default",
        size: product.selectedSizes?.[0] || "M",
        quantity: 1,
      };

      // 🔐 If user logged in → proceed with real user data
      if (user) {
        navigate("/checkout", {
          state: {
            user: {
              uid: user.uid,
              email: user.email,
            },
            cartItems: [cartItem],
          },
        });
        return;
      }

      // 👤 Guest user → use guest_cart from sessionStorage
      const guestCart = JSON.parse(sessionStorage.getItem("guest_cart")) || [];
      const updatedCart = [...guestCart, cartItem];
      sessionStorage.setItem("guest_cart", JSON.stringify(updatedCart));

      navigate("/checkout", {
        state: {
          user: null,
          cartItems: [cartItem],
        },
      });
    } catch (error) {
      console.error("Error during Buy Now:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  /** ✅ ADD TO BAG (Works for both logged-in and guest users) */
  const handleAddToBag = async (event) => {
    event.stopPropagation();
    setAddingToCart(true);

    try {
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: imageUrls[0],
        color: product.selectedColors?.[0] || "Default",
        size: product.selectedSizes?.[0] || "M",
        quantity: 1,
        addedAt: new Date().toISOString(),
      };

      const user = auth.currentUser;

      // 🔐 Logged-in user → Try Firestore, fallback to sessionStorage
      if (user) {
        try {
          // Try to add to Firestore cart
          await cartService.addToCart(product.id, newItem);
          alert("Item added to your bag!");
          navigate("/cart");
          return;
        } catch (error) {
          // If user not found in Firestore collections, use sessionStorage (expected behavior)

          const guestCart = JSON.parse(sessionStorage.getItem("guest_cart")) || [];
          const existingItemIndex = guestCart.findIndex((item) => item.id === product.id);

          if (existingItemIndex !== -1) {
            guestCart[existingItemIndex].quantity += 1;
            alert("Item quantity updated in your bag!");
          } else {
            guestCart.push(newItem);
            alert("Item added to your bag!");
          }

          sessionStorage.setItem("guest_cart", JSON.stringify(guestCart));
          navigate("/cart");
          return;
        }
      }

      // 👤 Guest user (not logged in) → sessionStorage cart
      const guestCart = JSON.parse(sessionStorage.getItem("guest_cart")) || [];
      const existingItemIndex = guestCart.findIndex((item) => item.id === product.id);

      if (existingItemIndex !== -1) {
        guestCart[existingItemIndex].quantity += 1;
        alert("Item quantity updated in your bag!");
      } else {
        guestCart.push(newItem);
        alert("Item added to your bag!");
      }

      sessionStorage.setItem("guest_cart", JSON.stringify(guestCart));
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to bag:", error);
      alert("Something went wrong while adding the item to your bag.");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div
      className="mx-auto flex flex-col mt-30"
      style={{
        width: "1166px",
        gap: "16px",
        height: "auto",
      }}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: Product Image Gallery */}
        <div className="lg:w-1/2 sticky top-0 self-start">
          <ProductImageGallery images={imageUrls} />
        </div>

        {/* Right: Product Info Section */}
        <div
          className="space-y-6 overflow-y-scroll"
          style={{
            width: "663px",          // FIXED WIDTH
            height: "auto",          // HUG HEIGHT
            maxHeight: "calc(100vh - 4rem)",  // keep sticky scrolling
            gap: "24px",             // GAP BETWEEN SECTIONS
            paddingRight: "8px",     // prevent content shifting when scroll hidden
            scrollbarWidth: "none",  // Firefox hide
            msOverflowStyle: "none", // IE/Edge hide
          }}
        >
          <style>
            {`
      /* Hide scrollbar for Chrome, Safari, Edge */
      div::-webkit-scrollbar {
        display: none;
      }
    `}
          </style>

          <ProductTitleSection product={product} />
          <ProductStarRatingSection rating={product?.rating} />
          <ProductPriceSection product={product} />
          <ProductColorSelector colors={product?.selectedColors} />

          {/* Hide Size Selector for Saree */}
          {/* <ProductSizeSelector selectedSizes={product?.selectedSizes} units={product?.units} /> */}

          {product?.dressType?.toLowerCase() !== "saree" && (
            <ProductSizeSelector
              selectedSizes={product?.selectedSizes}
              units={product?.units}
            />
          )}


          <ProductStockAndShipping />
          <ProductActionButtons
            onAddToBag={handleAddToBag}
            onBuyNow={handleBuyNow}
            onVirtualTryOn={handleTryOnClick}
          />
          <OfferAndShippingInfo />
          <ProductDescriptionSection product={product} />
          <ProductDetailsSection product={product} />
          <DisclaimerSection />
          <HelpAndTryonSection />
          <ProductReviewsSection reviews={product?.reviews} />
        </div>
      </div>

      {/* Lazy Loaded Try-On Modals */}
      <Suspense fallback={<div className="p-10 text-center">Loading Try-On...</div>}>
        {showUploadSelfieModal && (
          <UploadSelfieModal
            isOpen={showUploadSelfieModal}
            onClose={handleModalClose}
            onNext={handleUploadSelfieNext}
            garmentImage={tryOnData.garmentImage}
            garmentName={tryOnData.garmentName}
            tryOnData={tryOnData}
          />
        )}
        {showTryOnPreviewModal && (
          <TryOnPreviewModal
            isOpen={showTryOnPreviewModal}
            onClose={handleModalClose}
            tryOnData={tryOnData}
          />
        )}
      </Suspense>
    </div>
  );
};

export default IndividualProductDetailsPage;
