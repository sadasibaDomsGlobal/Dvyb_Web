import { React, useState } from "react";
import { Star, Heart, Share2 } from "lucide-react";

const ProductTitleSection = ({ product }) => {
    // Use title if present, fallback to name
    const { title, name, description, rating } = product || {};
    const [isExpanded, setIsExpanded] = useState(false);
    const displayTitle = title || name;

    /**
     * Fallback rating 
     * use 4.2if not provided
     */
    const displayRating = rating ?? 4.2;

    /**
     * Description handling with "See more" / "See less" functionality
     */
    const maxLength = 120;
    const isLongDescription = description && description.length > maxLength;
    const displayText = isExpanded
        ? description
        : description?.slice(0, maxLength) + (isLongDescription ? "..." : "");

    return (
        <div className="space-y-2">

            {/* Product Title + Icons Row */}
            <div className="flex items-start justify-between">

                {/* Title */}
                {displayTitle && (
                    <h1 className="text-2xl font-semibold text-gray-900">
                        {displayTitle}
                    </h1>
                )}

                {/* Icons */}
                <div className="flex items-center gap-3">
                    {/* Share Icon */}
                    <button
                        title="Share Product"
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                        onClick={() => console.log("Share product")}
                    >
                        <Share2 size={20} className="text-gray-700" />
                    </button>

                    {/* Wishlist (Heart) Icon */}
                    <button
                        title="Add to Wishlist"
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                        onClick={() => console.log("Added to wishlist")}
                    >
                        <Heart size={20} className="text-gray-700 hover:text-red-500" />
                    </button>
                </div>
            </div>

            {/* Description with See More / See Less */}
            {description && (
                <p className="text-gray-700 text-sm md:text-base space-y-1">
                    {displayText}
                    {isLongDescription && (
                        <button
                            className="ml-1 text-blue-600 hover:underline font-medium space-y-2"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? "See less" : "See more"}
                        </button>
                    )}
                </p>
            )}

            

            {/* Rating (always visible — defaults to 4.2) */}
            <div className="flex items-center gap-1 mt-2 space-y-4">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={18}
                        className={`${i < Math.round(displayRating)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                    />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                    {displayRating.toFixed(1)}
                </span>
            </div>
        </div>
    );
};

export default ProductTitleSection;
