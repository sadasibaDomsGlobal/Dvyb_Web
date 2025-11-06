import { useNavigate } from "react-router-dom";
import { useState } from "react";

/**
 * ProductCard displays a single product with clean UI and enhanced visual hierarchy.
 */
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const imageUrl = product.imageUrls?.[0];
  const displayImage =
    imageError || !imageUrl
      ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23f8fafc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%2394a3b8'%3ENo Image%3C/text%3E%3C/svg%3E"
      : imageUrl;

  return (
    <div
      className="mb-4 flex flex-wrap w-full max-w-[220px] bg-white shadow-sm cursor-pointer hover:shadow-lg transition-all duration-300 group overflow-hidden"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      {/* Product Image */}
      <div className="aspect-[3/4] bg-gray-50 overflow-hidden relative">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          onError={handleImageError}
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2 px-1 pt-2">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide line-clamp-1">
          {product.name || product.title}
        </h3>

        {/* Product Description */}
        <p className="text-gray-500 text-[13px] font-light line-clamp-2 leading-relaxed">
          {product.description || `${product.dressType} • ${product.craft}`}
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-2">
          <span className="text-red-600 font-semibold text-base">
            ₹{product.price?.toLocaleString()}
          </span>
          <span className="text-gray-400 text-sm line-through">
            ₹{(product.price * 1.25)?.toLocaleString()}
          </span>
        </div>

        {/* Category + Rating */}
        <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
          <span className="capitalize font-bold">{product.dressType}</span>

          {/* Rating design */}
          <div className="flex items-center gap-1">
            {/* Gold Star SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fbbf24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#fbbf24"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 17.25l-5.469 3.108 1.047-6.11L2.25 9.642l6.125-.89L12 3.75l3.625 5.002 6.125.89-5.328 4.606 1.047 6.11z"
              />
            </svg>
            <span className="text-gray-700 font-medium">{product.rating || "4.2"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
