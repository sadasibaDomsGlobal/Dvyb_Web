import React from "react";

const ProductDetailsSection = ({ product }) => {
  // Fallback values (static defaults)
  const {
    note = "The saree worn by the model is for styling purposes only",
    components = "1 (Blouse)",
    fit = "Fitted at bust",
    composition = "Moss crepe",
    care = "Dry clean only",
  } = product || {};

  return (
    <div className="w-full border-t border-gray-200 pt-6 mt-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 text-sm">
        {/* NOTE */}
        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1">
            NOTE
          </h4>
          <p className="text-gray-700">{note}</p>
        </div>

        {/* COMPONENTS */}
        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1">
            Components
          </h4>
          <p className="text-gray-700">{components}</p>
        </div>

        {/* FIT */}
        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1">
            FIT
          </h4>
          <p className="text-gray-700">{fit}</p>
        </div>

        {/* COMPOSITION */}
        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1">
            COMPOSITION
          </h4>
          <p className="text-gray-700">{composition}</p>
        </div>

        {/* CARE */}
        <div>
          <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1">
            CARE
          </h4>
          <p className="text-gray-700">{care}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
