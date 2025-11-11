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

  /** ✅ ADD TO BAG (Fully dynamic — no static data) */
  // const handleAddToBag = async (event) => {
  //   if (!user) {
  //     alert("login karoo");
  //   }
  //   event.stopPropagation();
  //   setAddingToCart(true);

  //   try {
  //     const user = auth.currentUser;
  //     const newItem = {
  //       id: product.id,
  //       name: product.name,
  //       price: product.price,
  //       image: imageUrls[0],
  //       color: product.selectedColors?.[0] || "Default",
  //       size: product.selectedSizes?.[0] || "M",
  //       quantity: 1,
  //       addedAt: new Date().toISOString(),
  //     };

  //     // 🔐 Logged-in user → Firestore cart
  //     if (user) {
  //       await cartService.addToCart(product.id, newItem);
  //       navigate("/cart");
  //       return;
  //     }

  //     // 👤 Guest user → sessionStorage cart
  //     const guestCart = JSON.parse(sessionStorage.getItem("guest_cart")) || [];
  //     const exists = guestCart.some((item) => item.id === product.id);
  //     if (!exists) {
  //       guestCart.push(newItem);
  //       sessionStorage.setItem("guest_cart", JSON.stringify(guestCart));
  //     }

  //     navigate("/cart");
  //   } catch (error) {
  //     console.error("Error adding to bag:", error);
  //   } finally {
  //     setAddingToCart(false);
  //   }
  // };
  const handleAddToBag = async (event) => {
    event.stopPropagation();
    setAddingToCart(true);

    try {
      const user = auth.currentUser; // ✅ Define user before checking

      // 🔒 Check if user is logged in
      if (!user) {
        alert("Please log in to add items to your bag.");
        setAddingToCart(false);
        navigate("/login"); // optional: redirect to login
        return;
      }

      // ✅ Item structure
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

      // 🔐 Logged-in user → Firestore cart
      await cartService.addToCart(product.id, newItem);
      alert("Item added to your bag!");
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to bag:", error);
      alert("Something went wrong while adding the item to your bag.");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-22">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: Product Image Gallery */}
        <div className="lg:w-1/2 sticky top-0 self-start">
          <ProductImageGallery images={imageUrls} />
        </div>

        {/* Right: Product Info Section */}
        <div
          className="lg:w-1/2 space-y-6 overflow-y-scroll scrollbar-hide"
          style={{ maxHeight: "calc(100vh - 4rem)" }}
        >
          <ProductTitleSection product={product} />
          <ProductPriceSection product={product} />
          <ProductColorSelector colors={product?.selectedColors} />
          <ProductSizeSelector selectedSizes={product?.selectedSizes} units={product?.units} />
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
