// ProductCard.jsx
import { cn } from "../../lib/utils";

export default function ProductCard({ product, className }) {
  const hasDiscount = product.discountPercent > 0;
  const finalPrice = hasDiscount
    ? product.originalPrice * (1 - product.discountPercent / 100)
    : product.price;


  const title = product.title || "Unnamed Product";

  return (
    <article
      className={cn(
        "group relative bg-white overflow-hidden transition-all duration-300",
        className
      )}
    >
      {/* FIXED IMAGE CONTAINER - THIS IS THE KEY */}
      <div className="relative w-full pt-[133.33%] bg-gray-100">
        {/* pt-[133.33%] = 3:4 aspect ratio (perfect for fashion/products) */}
        <img
          src= {product.images?.[0] }
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 "
          loading="lazy"
        />

        {/* Discount Badge */}
        {/* {hasDiscount && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
            -{product.discountPercent}%
          </div>
        )} */}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="text-left">
          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
            {title}
          </h3>
          {product.description && (
            <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {/* <div className="flex items-left justify-center gap-2"> */}
          <span className="text-xl text-primary">
            ₹{Math.round(finalPrice).toLocaleString("en-IN")}
          </span>
          {/* {hasDiscount && (
            <span className="text-sm line-through text-left text-gray-400">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )} */}
        {/* </div> */}
{/* 
        <button className="w-full py-2.5 text-primary font-medium text-sm transition">
          ADD TO CART
        </button> */}
      </div>
    </article>
  );
}