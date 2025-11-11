// ClosetIconsSection.jsx
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductCard from "../products/ProductCard";
// import ProductGrid from "../../product/productGrid";
import { scrollLeft, scrollRight } from "../../utils/scroll";
// import SectionTitle from "../../utils/SectionTitle";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ClosetIconsSection({ products }) {
  return (
    <section className="container mx-auto sm:px-2 md:px-9 lg:px-20">
  
      <div className="flex items-center gap-4">
        {/* LEFT ARROW */}
        <button
          onClick={() => scrollLeft("closetScroll")}
          className="hidden md:flex items-center justify-center w-15 h-10 rounded-full bg-yellowprimary shadow-lg transition-all duration-300"
          aria-label="Scroll left"
        >
          {/* <IoIosArrowBack size={22} /> */}
          <FaArrowLeft size={18}  />
        </button>

        {/* SCROLLABLE CONTAINER */}
        <div
          id="closetScroll"
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-none hide-scrollbar scroll-smooth py-4 whitespace-nowrap"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="inline-block w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] flex-shrink-0 align-top"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={() => scrollRight("closetScroll")}
          className="hidden md:flex items-center justify-center w-15 h-10 rounded-full bg-yellowprimary shadow-lg transition-all duration-300"
          aria-label="Scroll right"
        >
          <FaArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
