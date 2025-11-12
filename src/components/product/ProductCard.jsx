// ProductCard.jsx
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, className }) {
  const title = product.title || "Unnamed Product";
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/products/${product.id}`)}
      className={cn(
        "group w-85 h-130 relative bg-white overflow-hidden shadow-sm cursor-pointer transition-all duration-300 flex flex-col",
        className
      )}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative flex items-center justify-center overflow-hidden">
        <img
          src={product.imageUrls?.[0] || product.images?.[0]}
          alt={title}
          className="w-full h-100 object-fit transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-base line-clamp-2 leading-snug">
            {title}
          </h3>

          {product.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        <div className="mt-2">
          <span className="text-lg font-semibold text-primary">
            ₹{Math.round(product.price).toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </article>
  );
}