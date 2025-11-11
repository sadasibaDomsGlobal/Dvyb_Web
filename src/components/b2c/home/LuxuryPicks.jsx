import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductCard from "../products/ProductCard";
import { scrollLeft, scrollRight } from "../../utils/scroll";
import { luxIcon } from "@/assets";

export default function LuxuryPicks({ products }) {
  return (
    <section className="bg-lighted-bg mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        
        {/* LEFT CONTENT - Always on top in mobile, left in desktop */}
        <div className="w-full lg:w-1/4 text-center lg:text-left order-1 lg:order-1">
          <div className="flex flex-col items-center max-w-sm mx-auto lg:mx-0">
            <img
              src={luxIcon}
              alt="Luxury Icon"
              className="w-20 md:w-24 lg:w-25 mb-4"
            />
            <h2 className="text-sm tracking-wide text-gray-600 uppercase mb-2">
              Luxurious Pick of the
            </h2>
            <h2 className="text-sm tracking-wide text-gray-600 uppercase mb-2">
              DVYB Essence
            </h2>
            <button className="bg-[#400000] text-xs lg:text-sm mt-2 text-white px-8 py-4 transition-colors duration-300 w-full sm:w-auto">
              Explore All
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT — SCROLLABLE PRODUCT ROW - Below in mobile, right in desktop */}
        <div className="w-full lg:w-3/4 relative order-2 lg:order-2">
          {/* LEFT ARROW */}
          <button
            onClick={() => scrollLeft("luxuryScroll")}
            className="absolute -left-4 lg:-left-6 top-1/2 transform -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-xl"
            aria-label="Scroll left"
          >
            <IoIosArrowBack size={20} className="text-gray-700" />
          </button>

          {/* SCROLLABLE GRID */}
          <div
            id="luxuryScroll"
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none hide-scrollbar scroll-smooth scrollbar-hide py-2 px-2"
          >
            {products.map((product, index) => (
              <div 
                key={index} 
                className="min-w-[200px] xs:min-w-[220px] sm:min-w-[240px] md:min-w-[260px] lg:min-w-[280px] flex-shrink-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scrollRight("luxuryScroll")}
            className="absolute -right-4 lg:-right-6 top-1/2 transform -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-xl"
            aria-label="Scroll right"
          >
            <IoIosArrowForward size={20} className="text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}