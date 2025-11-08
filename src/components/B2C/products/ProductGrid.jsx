// src/components/b2c/products/ProductGrid.jsx
import { useState } from 'react';
import { useProductFilter } from '../../../hooks/useProductFilter';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  const filteredProducts = useProductFilter(products);

  // ✅ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  // ✅ Safety check
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Loading or no products found.</p>
      </div>
    );
  }

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // ✅ Handlers
  const goToPage = (page) => setCurrentPage(page);
  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your filters.</p>
          <button
            onClick={() => setCurrentPage(1)}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* ✅ Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-2">
          <button
            onClick={goPrev}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-full text-sm font-medium ${
              currentPage === 1
                ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                : 'text-gray-800 border-gray-400 hover:bg-gray-100'
            }`}
          >
            Prev
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-8 h-8 rounded-full text-sm font-medium ${
                  currentPage === page
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={goNext}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded-full text-sm font-medium ${
              currentPage === totalPages
                ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                : 'text-gray-800 border-gray-400 hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;








// import { useProducts } from "../../../hooks/useProducts";
// import ProductCard from "./ProductCard";

// /**
//  * ProductGrid displays a grid of ProductCard components with proper spacing.
//  */
// const ProductGrid = () => {
//   const { products, loading, error } = useProducts();

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
//           <div className="text-base text-gray-600">Loading products...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <div className="text-center">
//           <div className="text-red-500 text-lg font-medium">{error}</div>
//           <p className="text-gray-500 text-sm mt-2">Please try again later</p>
//         </div>
//       </div>
//     );
//   }

//   if (!products || products.length === 0) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <div className="text-center">
//           <div className="text-lg text-gray-700 font-medium">No products found</div>
//           <p className="text-gray-500 text-sm mt-2">Check back soon for new arrivals</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-x-8 gap-y-12 p-6 place-items-center">
//       {products.map((product) => (
//         <div key={product.id} className="flex justify-center">
//           <ProductCard product={product} />
//         </div>
//       ))}
//     </div>
//  );
// };

// export default ProductGrid;