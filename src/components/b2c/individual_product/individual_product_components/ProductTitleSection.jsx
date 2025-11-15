import { React, useState } from "react";
import { Heart, Share2 } from "lucide-react";

const ProductTitleSection = ({ product }) => {
    const { title, name, description } = product || {};
    const [isExpanded, setIsExpanded] = useState(false);

    const displayTitle = title || name;

    const maxLength = 120;
    const isLongDescription =
        description && description.length > maxLength;

    const displayText = isExpanded
        ? description
        : description?.slice(0, maxLength) + (isLongDescription ? "..." : "");

    return (
        <div className="flex flex-col" style={{ gap: "3px" }}>

            {/* Title + Icons */}
            <div className="flex items-start justify-between">

                {/* Product Title */}
                {displayTitle && (
                    <h1
                        style={{
                            width: "384.12px",
                            height: "22px",
                            fontFamily: "Outfit, sans-serif",
                            fontWeight: 500,
                            fontSize: "24px",
                            lineHeight: "21.33px",
                            letterSpacing: "0.72px",
                            color: "#000000",
                            margin: 0,
                            padding: 0,

                            /* ⭐ FIX: Keep the title in one line */
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {displayTitle}
                    </h1>

                )}

                {/* Icons */}
                <div className="flex items-center" style={{ gap: "12px" }}>
                    <button
                        title="Share Product"
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <Share2 size={20} className="text-gray-700" />
                    </button>

                    <button
                        title="Add to Wishlist"
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <Heart size={20} className="text-gray-700 hover:text-red-500" />
                    </button>
                </div>
            </div>

            {/* Description */}
            {description && (
                <div
                    style={{
                        width: "384.12px",
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "21.33px",
                        letterSpacing: "0.42px", // 3% of 14px
                        color: "#808080",
                    }}
                >
                    {displayText}

                    {isLongDescription && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="ml-1 hover:underline font-medium"
                            style={{
                                fontFamily: "Outfit, sans-serif",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "21.33px",
                                letterSpacing: "0.42px",
                                color: "#808080",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                            }}
                        >
                            {isExpanded ? "See less" : "See more"}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductTitleSection;