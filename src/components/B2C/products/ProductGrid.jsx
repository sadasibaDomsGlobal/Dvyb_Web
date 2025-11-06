// src/components/b2c/products/ProductGrid.jsx
import { useProductFilter } from '../../../hooks/useProductFilter';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  const filteredProducts = useProductFilter(products);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your filters.</p>
          <button 
            onClick={() => {/* Clear filters logic */}}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Clear all filters
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