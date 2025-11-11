import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductCard from "../products/ProductCard";
import { luxIcon } from "@/assets";
import { useProducts } from "../../../hooks/useProducts";

export default function LuxuryPicks() {
  const { products, loading, error } = useProducts();
  const [luxuryProducts, setLuxuryProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; // 👈 how many products visible at a time

  // Filter luxury items when loaded
  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = products.filter(
        (p) =>
          p.category?.toLowerCase().includes("luxury") ||
          p.dressType?.toLowerCase().includes("luxury")
      );
      setLuxuryProducts(filtered.length ? filtered : products);
    }
  }, [products]);

  // Navigation handlers
  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= luxuryProducts.length ? 0 : prev + itemsPerPage
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerPage < 0
        ? Math.max(luxuryProducts.length - itemsPerPage, 0)
        : prev - itemsPerPage
    );
  };

  // Slice current view
  const visibleProducts = luxuryProducts.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500 text-lg">
        Loading luxurious picks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center text-red-500">
        Failed to load luxury picks.
      </div>
    );
  }

  return (
    <section className="bg-lighted-bg mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* LEFT SIDE INFO */}
        <div className="w-full lg:w-1/4 text-center lg:text-left">
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

        {/* RIGHT SIDE PRODUCTS */}
        <div className="w-full lg:w-3/4 relative">
          {/* LEFT ARROW */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 lg:-left-6 top-1/2 transform -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-xl"
          >
            <IoIosArrowBack size={20} className="text-gray-700" />
          </button>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {visibleProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={handleNext}
            className="absolute -right-4 lg:-right-6 top-1/2 transform -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-xl"
          >
            <IoIosArrowForward size={20} className="text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
















// import { useEffect, useRef, useState } from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import ProductCard from "../products/ProductCard";
// import { scrollLeft, scrollRight } from "../../utils/scroll";
// import { luxIcon } from "@/assets";

// export default function LuxuryPicks({ products = [] }) {
//   const scrollRef = useRef(null);
//   const [visibleCount, setVisibleCount] = useState(5); 
//   const [hasMore, setHasMore] = useState(true);

//   // handle lazy loading as scrolls
//   const handleScroll = () => {
//     const el = scrollRef.current;
//     if (!el) return;

//     // if near the end, load more
//     if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 200) {
//       setVisibleCount((prev) => {
//         const newCount = Math.min(prev + 5, products.length);
//         if (newCount >= products.length) setHasMore(false);
//         return newCount;
//       });
//     }
//   };

//   // attach scroll listener
//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;
//     el.addEventListener("scroll", handleScroll);
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, [products]);

//   return (
//     <section className="bg-lighted-bg mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
//       <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        
//         {/* LEFT CONTENT */}
//         <div className="w-full lg:w-1/4 text-center lg:text-left order-1 lg:order-1">
//           <div className="flex flex-col items-center max-w-sm mx-auto lg:mx-0">
//             <img src={luxIcon} alt="Luxury Icon" className="w-20 md:w-24 mb-4" />
//             <h2 className="text-sm tracking-wide text-gray-600 uppercase mb-2">
//               Luxurious Pick of the
//             </h2>
//             <h2 className="text-sm tracking-wide text-gray-600 uppercase mb-2">
//               DVYB Essence
//             </h2>
//             <button
//               className="bg-[#400000] text-xs lg:text-sm mt-2 text-white px-8 py-4 transition-colors duration-300 w-full sm:w-auto"
//               onClick={() => console.log("Explore All")}
//             >
//               Explore All
//             </button>
//           </div>
//         </div>

//         {/* RIGHT CONTENT — SCROLLABLE PRODUCT ROW */}
//         <div className="w-full lg:w-3/4 relative order-2 lg:order-2">
//           {/* LEFT ARROW */}
//           <button
//             onClick={() => scrollLeft("luxuryScroll")}
//             className="absolute -left-4 lg:-left-6 top-1/2 transform -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-xl"
//             aria-label="Scroll left"
//           >
//             <IoIosArrowBack size={20} className="text-gray-700" />
//           </button>

//           {/* SCROLLABLE GRID */}
//           <div
//             id="luxuryScroll"
//             ref={scrollRef}
//             className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none hide-scrollbar scroll-smooth py-2 px-2"
//           >
//             {products.slice(0, visibleCount).map((product, index) => (
//               <div
//                 key={index}
//                 className="min-w-[200px] xs:min-w-[220px] sm:min-w-[240px] md:min-w-[260px] lg:min-w-[280px] flex-shrink-0"
//               >
//                 <ProductCard product={product} />
//               </div>
//             ))}
//           </div>

//           {/* RIGHT ARROW */}
//           <button
//             onClick={() => scrollRight("luxuryScroll")}
//             className="absolute -right-4 lg:-right-6 top-1/2 transform -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-xl"
//             aria-label="Scroll right"
//           >
//             <IoIosArrowForward size={20} className="text-gray-700" />
//           </button>

//           {/* Loading indicator */}
//           {hasMore && (
//             <div className="text-center text-gray-500 text-sm py-2">
//               Scrolling to load more...
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
