import React, { useState, useEffect } from "react";

const ProductSizeSelector = ({ selectedSizes = [], units = {} }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  // Debug logs
  useEffect(() => {
    console.group("🧩 ProductSizeSelector Data");
    console.log("Selected Sizes:", selectedSizes);
    console.log("Units:", units);
    console.groupEnd();
  }, [selectedSizes, units]);

  // Extract valid size keys (ignore colors like "pink_#DB7093")
  const unitSizeKeys = Object.keys(units).filter(
    (key) => !key.includes("#") && !key.includes("_")
  );

  // Combine unique display sizes
  const displaySizes = Array.from(new Set([...selectedSizes, ...unitSizeKeys]));

  // Get stock for a size
  const getStockForSize = (size) => {
    const stock = units[size];
    return typeof stock === "number"
      ? stock
      : typeof stock === "string"
      ? parseInt(stock, 10) || 0
      : 0;
  };

  // Determine if size is available
  const isAvailable = (size) => getStockForSize(size) > 0;

  const handleSizeSelect = (size) => {
    if (!isAvailable(size)) return;
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
        {displaySizes.map((size, index) => {
          const available = isAvailable(size);
          const stock = getStockForSize(size);

          return (
            <div key={index} className="relative">
              <button
                onClick={() => handleSizeSelect(size)}
                disabled={!available}
                className={`relative w-12 h-12 flex items-center justify-center rounded-md border text-sm font-medium transition 
                  ${
                    !available
                      ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                      : selectedSize === size
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 hover:border-gray-900"
                  }`}
              >
                {size === "FREE SIZE" ? "FREE" : size}

                {/* ✅ Stock Badge — same design as your old version */}
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

      {/* Stock Info */}
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
