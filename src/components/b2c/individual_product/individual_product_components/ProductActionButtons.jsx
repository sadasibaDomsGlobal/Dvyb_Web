import React from "react";
import { ShoppingBag, Zap, Eye } from "lucide-react";

const ProductActionButtons = ({ onAddToBag, onBuyNow, onVirtualTryOn }) => {
  return (
    <div className="flex flex-col gap-3 mt-4 w-full">
      {/* Row for Buy Now and Add to Bag */}
      <div className="flex gap-3">
        {/* Buy Now */}
        <button
          onClick={onBuyNow}
          className="flex-1 flex items-center justify-center gap-2 bg-[#7a0000] text-white py-3 font-semibold text-sm uppercase tracking-wide 
                     hover:bg-[#5a0000] transition"
        >
          <Zap size={16} />
          Buy Now
        </button>

        {/* Add to Bag */}
        <button
          onClick={onAddToBag}
          className="flex-1 flex items-center justify-center gap-2 border border-[#7a0000] text-[#7a0000] py-3 font-semibold text-sm uppercase tracking-wide 
                     hover:bg-[#7a0000] hover:text-white transition"
        >
          <ShoppingBag size={16} />
          Add to Bag
        </button>
      </div>

      {/* Virtual Try On (Full Width) */}
      <button
        onClick={onVirtualTryOn}
        className="w-full flex items-center justify-center gap-2 bg-[#FFC400] text-white py-3 font-semibold text-sm uppercase tracking-wide 
                   hover:bg-[#e6b200] transition"
      >
        <Eye size={16} />
        Virtual Try On
      </button>
    </div>
  );
};

export default ProductActionButtons;
