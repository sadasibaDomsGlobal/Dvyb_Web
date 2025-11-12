import React, { useState } from "react";

const ProductColorSelector = ({ colors = [] }) => {
  console.log("🎨 ProductColorSelector colors:", colors);

  // Static fallback colors
  const staticColors = ["#000000", "#C62828", "#1565C0", "#F9A825", "#6A1B9A"];

  // Extract hex codes from backend format: "pink_#DB7093" → "#DB7093"
  const backendColors = colors
    .map((c) => {
      if (typeof c === "string" && c.includes("_")) {
        const parts = c.split("_");
        return parts[1]; // return hex
      }
      return c; // already hex
    })
    .filter(Boolean);

  // Final colors to display — backend if available, else static
  const displayColors = backendColors.length > 0 ? backendColors : staticColors;

  // Default selected color
  const [selectedColor, setSelectedColor] = useState(displayColors[0]);

  const handleColorSelect = (hex) => {
    setSelectedColor(hex);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Title */}
      <p className="text-md font-medium text-gray-800">Available Colors</p>

      {/* Color buttons */}
      <div className="flex flex-wrap gap-3">
        {displayColors.map((hex, index) => (
          <button
            key={index}
            onClick={() => handleColorSelect(hex)}
            className={`relative w-8 h-8 rounded-md border-2 transition-transform duration-200
              ${selectedColor === hex ? "border-gray-900 scale-110" : "border-gray-300"}
            `}
            style={{ backgroundColor: hex }}
            title={hex}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductColorSelector;
