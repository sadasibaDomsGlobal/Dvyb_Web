import React, { useState, useEffect } from "react";

const ProductSizeSelector = ({ selectedSizes = [], units = {} }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  // ✅ Debug logs to verify backend data
  useEffect(() => {
    console.group("🧩 ProductSizeSelector Backend Data");
    console.log("👉 Selected Sizes (from backend):", selectedSizes);
    console.log("👉 Units Object (from backend):", units);
    console.log("👉 Total sizes received:", selectedSizes.length);
    console.log("👉 Total units received:", Object.keys(units).length);
    console.groupEnd();
  }, [selectedSizes, units]);

  // Static fallback list
  const staticSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"];

  // Merge all possible sizes (static + selectedSizes + backend units)
  const allSizes = Array.from(
    new Set([
      ...staticSizes,
      ...selectedSizes,
      ...Object.keys(units || {}),
    ])
  );

  // Determine if a size is available
  const isAvailable = (size) => {
    // If units has stock for this size
    if (units[size] !== undefined && units[size] > 0) return true;
    // If in selectedSizes but no units → show disabled (not available)
    if (selectedSizes.includes(size)) return false;
    // Else default to not available
    return false;
  };

  const getStockForSize = (size) => {
    if (units && units[size] !== undefined) return units[size];
    return 0;
  };

  const handleSizeSelect = (size) => {
    if (!isAvailable(size)) return; // Disabled sizes can’t be selected
    setSelectedSize(size);
  };

  return (
    <div className="flex flex-col gap-3 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-md font-medium text-gray-800">Select Size</p>
        <button className="text-sm text-gray-600 underline hover:text-gray-900 transition">
          Size Guide
        </button>
      </div>

      {/* Size Buttons */}
      <div className="flex flex-wrap gap-3 relative">
        {allSizes.map((size, index) => {
          const available = isAvailable(size);
          const stock = getStockForSize(size);

          return (
            <div key={index} className="relative">
              <button
                onClick={() => handleSizeSelect(size)}
                disabled={!available}
                className={`relative w-12 h-12 flex items-center justify-center rounded-md border text-sm font-medium transition 
                  ${!available
                    ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    : selectedSize === size
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 hover:border-gray-900"
                  }`}
              >
                {size}

                {/* Stock badge (show only if stock > 0) */}
                {stock > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-[1px] rounded-full border-2 border-white"
                    style={{
                      lineHeight: "1",
                      minWidth: "18px",
                      textAlign: "center",
                    }}
                  >
                    {stock}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Stock info message */}
      {selectedSize && (
        <p className="text-sm text-gray-600">
          {getStockForSize(selectedSize) <= 1
            ? "Only 1 left in stock!"
            : `${getStockForSize(selectedSize)} items available`}
        </p>
      )}
    </div>
  );
};

export default ProductSizeSelector;
