// // inside IndividualProductDetailsPage.jsx
// import { useNavigate, useParams } from "react-router-dom";
// import { useProducts } from "../../../hooks/useProducts";
// import { useState } from "react";

// import ProductImageGallery from "./individual_product_components/ProductImageGallery";
// import ProductTitleSection from "./individual_product_components/ProductTitleSection";
// import ProductColorSelector from "./individual_product_components/ProductColorSelector";
// import ProductPriceSection from "./individual_product_components/ProductPriceSection";
// import ProductSizeSelector from "./individual_product_components/ProductSizeSelector";
// import ProductActionButtons from "./individual_product_components/ProductActionButtons";
// import OfferAndShippingInfo from "./individual_product_components/OfferAndShippingInfo";
// import ProductDescriptionSection from "./individual_product_components/ProductDescriptionSection";
// import ProductDetailsSection from "./individual_product_components/ProductDetailsSection";
// import DisclaimerSection from "./individual_product_components/DisclaimerSection";
// import HelpAndTryonSection from "./individual_product_components/HelpAndTryonSection";
// import ProductReviewsSection from "./individual_product_components/ProductReviewsSection";
// import ProductStockAndShipping from "./individual_product_components/ProductStockAndShipping";

// const IndividualProductDetailsPage = () => {
//   const { id } = useParams();
//   const { products, loading, error } = useProducts();
//   const [addingToCart, setAddingToCart] = useState(false);
//   const navigate = useNavigate();

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

//   const product = products.find((p) => String(p.id) === String(id));
//   if (!product) return <div className="text-center py-10 text-gray-500">Product not found.</div>;

//   const imageUrls = product.imageUrls?.length ? product.imageUrls : ["/placeholder.jpg"];

//   const handleonBuyNow = (event) => {
//     event.stopPropagation();
//     setAddingToCart(true);

//     // ✅ Pass product data dynamically to Cart page
//     navigate("/cart", {
//       state: {
//         product: {
//           id: product.id,
//           name: product.name,
//           price: product.price,
//           image: imageUrls[0],
//           color: product.selectedColors?.[0] || "Default",
//           size: product.selectedSizes?.[0] || "M",
//           quantity: 1,
//         },
//       },
//     });

//     setAddingToCart(false);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 mt-22">
//       <div className="flex flex-col lg:flex-row gap-4">
//         <div className="lg:w-1/2 sticky top-0 self-start">
//           <ProductImageGallery images={imageUrls} />
//         </div>

//         <div
//           className="lg:w-1/2 space-y-6 overflow-y-scroll scrollbar-hide"
//           style={{ maxHeight: "calc(100vh - 4rem)" }}
//         >
//           <ProductTitleSection product={product} />
//           <ProductPriceSection product={product} />
//           <ProductColorSelector colors={product?.selectedColors} />
//           <ProductSizeSelector selectedSizes={product?.selectedSizes} units={product?.units} />
//           <ProductStockAndShipping />

//           <ProductActionButtons
//             onBuyNow={(e) => handleonBuyNow(e)}
//             onAddToBag={(e) => handleonBuyNow(e)}
//             // onAddToBag={() => console.log("Add to bag")}
//             onVirtualTryOn={() => console.log("Try on")}
//           />

//           <OfferAndShippingInfo />
//           <ProductDescriptionSection product={product} />
//           <ProductDetailsSection product={product} />
//           <DisclaimerSection />
//           <HelpAndTryonSection />
//           <ProductReviewsSection reviews={product?.reviews} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IndividualProductDetailsPage;
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../../hooks/useProducts";
import { useState } from "react";

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

const IndividualProductDetailsPage = () => {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const [addingToCart, setAddingToCart] = useState(false);
  const navigate = useNavigate();

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  const product = products.find((p) => String(p.id) === String(id));
  if (!product) return <div className="text-center py-10 text-gray-500">Product not found.</div>;

  const imageUrls = product.imageUrls?.length ? product.imageUrls : ["/placeholder.jpg"];

  // ✅ Go to checkout directly with single product
  const handleBuyNow = (event) => {
    event.stopPropagation();
    setAddingToCart(true);

    navigate("/checkout", {
      state: {
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

    setAddingToCart(false);
  };

  // ✅ Go to cart page with product data
  const handleAddToBag = (event) => {
    event.stopPropagation();
    setAddingToCart(true);

    navigate("/cart", {
      state: {
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

    setAddingToCart(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-22">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* LEFT - Product Images */}
        <div className="lg:w-1/2 sticky top-0 self-start">
          <ProductImageGallery images={imageUrls} />
        </div>

        {/* RIGHT - Product Details */}
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
            onBuyNow={(e) => handleBuyNow(e)} // 💳 Buy Now → Checkout
            onAddToBag={(e) => handleAddToBag(e)} // 🛒 Add to Bag → Cart
            onVirtualTryOn={() => console.log("Try on")}
          />

          <OfferAndShippingInfo />
          <ProductDescriptionSection product={product} />
          <ProductDetailsSection product={product} />
          <DisclaimerSection />
          <HelpAndTryonSection />
          <ProductReviewsSection reviews={product?.reviews} />
        </div>
      </div>
    </div>
  );
};

export default IndividualProductDetailsPage;
