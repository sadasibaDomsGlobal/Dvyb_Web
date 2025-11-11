// src/components/b2c/sections/ClosetIconsSection.jsx
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductCard from "../products/ProductCard";
import { useProducts } from "../../../hooks/useProducts";

export default function ClosetIconsSection() {
  const { products, loading, error } = useProducts();
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  // Filter closet icon category (custom logic)
  useEffect(() => {
    if (products && products.length > 0) {
      const closet = products.filter(
        (p) =>
          p.category?.toLowerCase().includes("closet") ||
          p.dressType?.toLowerCase().includes("closet")
      );
      setVisibleProducts(closet.length ? closet : products);
    }
  }, [products]);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= visibleProducts.length ? 0 : prev + itemsPerPage
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerPage < 0
        ? Math.max(visibleProducts.length - itemsPerPage, 0)
        : prev - itemsPerPage
    );
  };

  const currentSlice = visibleProducts.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500 text-lg">
        Loading closet icons...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center text-red-500">
        Failed to load closet icons.
      </div>
    );
  }

  return (
    <section className="container mx-auto py-8 sm:px-2 md:px-9 lg:px-20 relative">
      {/* LEFT ARROW */}
      <button
        onClick={handlePrev}
        className="absolute -left-4 lg:-left-6 top-1/2 transform -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50"
      >
        <IoIosArrowBack size={20} className="text-gray-700" />
      </button>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
        {currentSlice.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={handleNext}
        className="absolute -right-4 lg:-right-6 top-1/2 transform -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50"
      >
        <IoIosArrowForward size={20} className="text-gray-700" />
      </button>
    </section>
  );
}















// // ClosetIconsSection.jsx
// // import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import ProductCard from "../products/ProductCard";
// // import ProductGrid from "../../product/productGrid";
// import { scrollLeft, scrollRight } from "../../utils/scroll";
// // import SectionTitle from "../../utils/SectionTitle";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// export default function ClosetIconsSection({ products }) {
//   return (
//     <section className="container mx-auto sm:px-2 md:px-9 lg:px-20">
  
//       <div className="flex items-center gap-4">
//         {/* LEFT ARROW */}
//         <button
//           onClick={() => scrollLeft("closetScroll")}
//           className="hidden md:flex items-center justify-center w-15 h-10 rounded-full bg-yellowprimary shadow-lg transition-all duration-300"
//           aria-label="Scroll left"
//         >
//           {/* <IoIosArrowBack size={22} /> */}
//           <FaArrowLeft size={18}  />
//         </button>

//         {/* SCROLLABLE CONTAINER */}
//         <div
//           id="closetScroll"
//           className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-none hide-scrollbar scroll-smooth py-4 whitespace-nowrap"
//         >
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="inline-block w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] flex-shrink-0 align-top"
//             >
//               <ProductCard product={product} />
//             </div>
//           ))}
//         </div>

//         {/* RIGHT ARROW */}
//         <button
//           onClick={() => scrollRight("closetScroll")}
//           className="hidden md:flex items-center justify-center w-15 h-10 rounded-full bg-yellowprimary shadow-lg transition-all duration-300"
//           aria-label="Scroll right"
//         >
//           <FaArrowRight size={18} />
//         </button>
//       </div>
//     </section>
//   );
// }
