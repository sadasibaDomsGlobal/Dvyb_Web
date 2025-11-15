import { useState, useEffect } from 'react';
import { useProductFilter } from '../../../hooks/useProductFilter';
import { useFilter } from '../../../context/FilterContext';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  const filteredProducts = useProductFilter(products);
  const { selectedFilters, clearAllFilters } = useFilter();

  // ✅ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; 

  // ✅ Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters]);

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

  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State (only shows when filters applied but nothing matches) */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your filters.</p>
          <button
            onClick={clearAllFilters}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-full text-sm font-medium ${
              currentPage === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-800 border-gray-400 hover:bg-gray-100'
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full text-sm font-medium ${
                  currentPage === page ? 'bg-gray-900 text-white' : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded-full text-sm font-medium ${
              currentPage === totalPages ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-800 border-gray-400 hover:bg-gray-100'
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
