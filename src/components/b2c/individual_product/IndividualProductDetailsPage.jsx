import React, { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../../hooks/useProducts";

/**
 * Import child components here
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
import { useState } from "react";
import { cartService } from '../../../services/cartService';
import { auth } from '../../../config';

const UploadSelfieModal = React.lazy(() => import("../TryOn/UploadSelfieModal"));
const TryOnPreviewModal = React.lazy(() => import("../TryOn/TryOnPreviewModal"));



// Main product details page
const IndividualProductDetailsPage = () => {

  /**
   * Fetch product ID from URL params and get product data
   */
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const [addingToCart, setAddingToCart] = useState(false);
  const navigate = useNavigate();
  //  const user = true

  const [showUploadSelfieModal, setShowUploadSelfieModal] = useState(false);
  const [showTryOnPreviewModal, setShowTryOnPreviewModal] = useState(false);
  const [tryOnData, setTryOnData] = useState({});



  /**
   * Handle loading and error states
   */
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  /**
   * Find the product based on the ID from params
   */
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return <div className="text-center py-10 text-gray-500">Product not found.</div>;
  }

  /**
   * Get the main image URL or a placeholder if none exists
   */
  const imageUrls = product.imageUrls?.length ? product.imageUrls : ["/placeholder.jpg"];

  const handleTryOnClick = () => {
    const garmentImage = product.imageUrls?.[0];
    if (!garmentImage) {
      toast.error("No image available for try-on");
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

    setShowUploadSelfieModal(true); // ✅ This opens first step modal
  };



  const handleUploadSelfieNext = (data) => {
    setShowUploadSelfieModal(false);
    setTryOnData(prev => ({ ...prev, ...data }));
    setShowTryOnPreviewModal(true);
  };


  const handleModalClose = () => {
    setShowUploadSelfieModal(false);
    setShowTryOnPreviewModal(false);
    setTryOnData({});
  };

  // ✅ BUY NOW - With Static Guest Data if no Auth
  const handleBuyNow = async (event) => {
    event.stopPropagation();
    setAddingToCart(true);

    try {
      const user = auth.currentUser;

      // If user not logged in → proceed as guest
      if (!user) {
        console.warn("Guest checkout initiated.");

        navigate("/checkout", {
          state: {
            user: {
              name: "Guest User",
              email: "guestuser@example.com",
            },
            cartItems: [
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: imageUrls[0],
                color: product.selectedColors?.[0] || "Default",
                size: product.selectedSizes?.[0] || "M",
                quantity: 1,
              },
            ],
          },
        });

        return;
      }

      // Logged-in user → go to checkout with real user data
      navigate("/checkout", {
        state: {
          user: {
            uid: user.uid,
            email: user.email,
          },
          cartItems: [
            {
              id: product.id,
              name: product.name,
              price: product.price,
              image: imageUrls[0],
              color: product.selectedColors?.[0] || "Default",
              size: product.selectedSizes?.[0] || "M",
              quantity: 1,
            },
          ],
        },
      });
    } catch (error) {
      console.error("Error during Buy Now:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  // ✅ ADD TO BAG - With Static Guest Data if no Auth
  const handleAddToBag = async (event) => {
    event.stopPropagation();
    setAddingToCart(true);

    try {
      const user = auth.currentUser;

      // 🧩 If no user (guest)
      if (!user) {
        console.warn("Guest user — adding static cart data.");

        // Simulate cart addition locally using sessionStorage
        const guestCart = JSON.parse(sessionStorage.getItem("guest_cart")) || [];
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

        // Avoid duplicates
        const exists = guestCart.some((item) => item.id === product.id);
        if (!exists) {
          guestCart.push(newItem);
          sessionStorage.setItem("guest_cart", JSON.stringify(guestCart));
        }

        alert("Added to bag (Guest Cart)");
        navigate("/cart");
        return;
      }

      // 🔐 Logged-in user (Firestore-based cart)
      await cartService.addToCart(product.id, {
        name: product.name,
        price: product.price,
        image: imageUrls[0],
        color: product.selectedColors?.[0] || "Default",
        size: product.selectedSizes?.[0] || "M",
      });

      console.log("Added to bag:", product.name);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
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

        {/* Right: Product Info (scrollable section) */}
        <div
          className="lg:w-1/2 space-y-6 overflow-y-scroll scrollbar-hide"
          style={{
            maxHeight: "calc(100vh - 4rem)", // Prevents overflowing page
          }}
        >
          <ProductTitleSection product={product} />
          <ProductPriceSection product={product} />
          <ProductColorSelector colors={product?.selectedColors} />
          <ProductSizeSelector
            selectedSizes={product?.selectedSizes}
            units={product?.units}
          />
          <ProductStockAndShipping />
          <ProductActionButtons
            onAddToBag={(e) => handleBuyNow(e)}
            onBuyNow={(e) => handleAddToBag(e)}
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
}

export default IndividualProductDetailsPage;
