import React, { useState, useEffect } from "react";

const ProductSizeSelector = ({ selectedSizes = [], units = {} }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  // Debug
  useEffect(() => {
    console.group("🧩 ProductSizeSelector Data");
    console.log("Selected Sizes:", selectedSizes);
    console.log("Units:", units);
    console.groupEnd();
  }, [selectedSizes, units]);

  // Extract valid size keys (ignore colors)
  const unitSizeKeys = Object.keys(units).filter(
    (key) => !key.includes("#") && !key.includes("_")
  );

  // Final size list
  const displaySizes = Array.from(new Set([...selectedSizes, ...unitSizeKeys]));

  // Get stock
  const getStockForSize = (size) => {
    const stock = units[size];
    return typeof stock === "number"
      ? stock
      : typeof stock === "string"
        ? parseInt(stock, 10) || 0
        : 0;
  };

  // Check availability
  const isAvailable = (size) => getStockForSize(size) > 0;

  const handleSizeSelect = (size) => {
    if (!isAvailable(size)) return;
    setSelectedSize(size);
  };

  return (
    <div
      className="flex flex-col"
      style={{
        width: "539.22px",
        gap: "16px", // Figma GAP
      }}
    >
      {/* ---------------------------------- */}
      {/* HEADER SECTION (ONE LINE ALWAYS) */}
      {/* ---------------------------------- */}
      <div
        className="flex items-center"
        style={{
          gap: "10px",
          whiteSpace: "nowrap", // Prevent 2nd line
        }}
      >
        {/* Title */}
        <p
          style={{
            width: "auto",
            height: "22px",
            fontFamily: "Outfit, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "21.33px",
            letterSpacing: "0.18px",
            color: "#000000",
            margin: 1,
          }}
        >
          Select your size
        </p>

        {/* Size Guide */}
        <button
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "13px",
            lineHeight: "21.33px",
            letterSpacing: "0.18px",
            color: "#E53935",
            cursor: "pointer",
            margin: 0,
            padding: 0,
            border: "none",
            background: "transparent",
            transition: "0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.target.style.textDecoration = "underline";
            e.target.style.color = "#B71C1C";
          }}
          onMouseLeave={(e) => {
            e.target.style.textDecoration = "none";
            e.target.style.color = "#E53935";
          }}
        >
          Size Guide
        </button>
      </div>

      {/* ------------------------------- */}
      {/* SIZE BOX ROW */}
      {/* ------------------------------- */}
      <div
        className="flex flex-wrap"
        style={{
          width: "539.22px",
          height: "51.56px",
          gap: "16px",
        }}
      >
        {displaySizes.map((size, index) => {
          const available = isAvailable(size);
          const stock = getStockForSize(size);

          return (
            <div key={index} className="relative">
              <button
                onClick={() => handleSizeSelect(size)}
                disabled={!available}
                style={{
                  width: "46.22px",
                  height: "42.67px",
                  borderRadius: "2px",
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "14px",
                  color: available
                    ? selectedSize === size
                      ? "#FFFFFF" // ensure contrast on dark background
                      : "#000000"
                    : "#808080",
                  background: available
                    ? selectedSize === size
                      ? "#573131ff" // ← changed from "#000000"
                      : "#FFFFFF"
                    : "#F4F4F4",
                  border: available
                    ? selectedSize === size
                      ? "1px solid #573131ff" // match the new selected background
                      : "0.89px solid #D8D8D8"
                    : "0.89px solid #D8D8D8",
                  cursor: available ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "0.2s",
                }}
              >
                {size === "FREE SIZE" ? "FREE" : size}

                {/* Stock Badge */}
                {stock > 0 && (
                  <span
                    className="absolute"
                    style={{
                      top: "-10px",
                      right: "-10px",
                      background: "#B76E79", // Your sample badge color
                      color: "#fff",
                      fontSize: "9px",
                      padding: "2px 4px",
                      borderRadius: "3px",
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {stock} LEFT
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSizeSelector;
