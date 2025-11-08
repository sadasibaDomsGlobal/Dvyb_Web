import { useParams } from "react-router-dom";
import { useProducts } from "../../../hooks/useProducts";
import { useState } from "react";
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

import UploadSelfieModal from "../TryOn/UploadSelfieModal";
import TryOnPreviewModal from "../TryOn/TryOnPreviewModal";

// Main product details page
const IndividualProductDetailsPage = () => {

  /**
   * Fetch product ID from URL params and get product data
   */
  const { id } = useParams();
  const { products, loading, error } = useProducts();


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
            onAddToBag={() => console.log("Add to bag")}
            onBuyNow={() => console.log("Buy now")}
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

      {/* {showTryYourOutfitModal && (
  <TryYourOutfitModal
    isOpen={showTryYourOutfitModal}
    onClose={handleModalClose}
    onNext={handleTryYourOutfitNext}
    garmentImage={tryOnData.garmentImage}
  />
)} */}


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


    </div>
  );
}

export default IndividualProductDetailsPage;
