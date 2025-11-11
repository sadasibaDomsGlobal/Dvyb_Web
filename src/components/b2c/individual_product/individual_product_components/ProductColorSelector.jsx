import React, { useState } from "react";

const ProductColorSelector = ({ colors = [] }) => {
  // Default static fallback colors
  const staticColors = ["#000000", "#C62828", "#1565C0", "#F9A825", "#6A1B9A"];

  // Extract or normalize available colors (from backend)
  const availableColors =
    colors.length > 0
      ? colors.map((c) => (c.includes("_") ? c.split("_")[1] : c))
      : [];

  // Merge both but keep all static visible
  const allColors = staticColors.map((color) => ({
    value: color,
    available: availableColors.includes(color),
  }));

  const [selectedColor, setSelectedColor] = useState(
    allColors.find((c) => c.available)?.value || staticColors[0]
  );

  const handleColorSelect = (colorObj) => {
    if (colorObj.available) setSelectedColor(colorObj.value);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Title */}
      <p className="text-md font-medium text-gray-800">Available Colors</p>

      {/* Color buttons */}
      <div className="flex flex-wrap gap-3">
        {allColors.map((colorObj, index) => (
          <button
            key={index}
            onClick={() => handleColorSelect(colorObj)}
            className={`relative w-8 h-8 rounded-md border-2 transition-transform duration-200 ${
              selectedColor === colorObj.value
                ? "border-gray-900 scale-110"
                : "border-gray-300"
            } ${!colorObj.available ? "opacity-40 cursor-not-allowed" : ""}`}
            style={{ backgroundColor: colorObj.value }}
            title={colorObj.available ? colorObj.value : "Not Available"}
            disabled={!colorObj.available}
          >
            {!colorObj.available && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-6 h-[2px] bg-gray-500 rotate-45 rounded"></span>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductColorSelector;
