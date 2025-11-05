// src/components/b2c/Sidebar.jsx
import { useProducts } from '../../../hooks/useProducts';

const Sidebar = () => {
  const { products } = useProducts();

  const categories = Array.from(
    new Set(products.flatMap(p => [p.category, p.productType, p.dressType].filter(Boolean)))
  );

  return (
    <div className="p-4">
      <h3 className="font-semibold mb-3">Filters</h3>
      <p className="text-sm text-gray-600">
        {products.length} products • {categories.length} categories
      </p>
      {/* Add your FilterSection, ColorFilter later */}
    </div>
  );
};

export default Sidebar;







// import { useState, useEffect } from 'react';
// import { Menu, X } from 'lucide-react';
// import { FilterSection, ColorFilter, PriceRange, DiscountFilter } from "../filters";

// const Sidebar = ({ products = [] }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Dynamic data extraction
//   const categories = extractUniqueValues(products, ['category', 'productType', 'dressType']);
//   const sizes = extractUniqueValues(products, ['selectedSizes']);
//   const colors = extractColors(products);
//   const priceRange = getPriceRange(products);

//   return (
//     <>
//       {/* Mobile Toggle */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
//       >
//         {isOpen ? <X size={20} /> : <Menu size={20} />}
//       </button>

//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black/50 z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:sticky lg:top-0 inset-y-0 left-0 z-30 w-64 bg-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
//           } lg:translate-x-0 transition-transform duration-300 ease-in-out h-screen overflow-hidden`}
//       >
//         <div className="h-full flex flex-col">
//           {/* Header Section - Fixed */}
//           <div className="flex-shrink-0 p-4 border-b border-gray-100">
//             {/* Breadcrumb */}
//             <div className="text-xs text-gray-500 mb-3">
//               Home &gt; Womenswear &gt; Bottoms
//             </div>

//             {/* Main Title */}
//             <h4 className="text-gray-900 text-base font-medium">CATEGORY</h4>
//           </div>

//           {/* Filters Section - Scrollable */}
//           <div className="flex-1 overflow-y-auto p-4">
//             <div className="space-y-6">
//               <FilterSection 
//                 title="CATEGORY" 
//                 items={categories} 
//                 searchable 
//                 defaultOpen={true}
//               />
//               <FilterSection 
//                 title="SIZE" 
//                 items={sizes}
//                 defaultOpen={true}
//               />
//               <ColorFilter 
//                 title="COLORS" 
//                 colors={colors}
//                 defaultOpen={true}
//               />
//               <DiscountFilter 
//                 title="DISCOUNT"
//                 defaultOpen={true}
//               />
//               <PriceRange 
//                 min={priceRange.min} 
//                 max={priceRange.max}
//                 defaultOpen={true}
//               />
//             </div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// // Helpers (keep the same as before)
// function extractUniqueValues(products, fields) {
//   const map = new Map();
//   products.forEach((p) => {
//     fields.forEach((field) => {
//       const values = Array.isArray(p[field]) ? p[field] : [p[field]];
//       values.forEach((val) => {
//         if (val) {
//           const key = val.toString().trim();
//           if (key) map.set(key, (map.get(key) || 0) + 1);
//         }
//       });
//     });
//   });
//   return Array.from(map.entries())
//     .map(([name, count]) => ({ name, count }))
//     .sort((a, b) => b.count - a.count);
// }

// function extractColors(products) {
//   const map = new Map();
//   products.forEach((p) => {
//     if (Array.isArray(p.selectedColors)) {
//       p.selectedColors.forEach((c) => {
//         const [name, hex] = c.split('_');
//         if (name && hex) {
//           const key = name;
//           const existing = map.get(key);
//           map.set(key, {
//             name,
//             bgClass: hexToClass(hex),
//             count: (existing?.count || 0) + 1,
//           });
//         }
//       });
//     }
//   });
//   return Array.from(map.values());
// }

// function hexToClass(hex) {
//   const map = {
//     '#B22222': 'bg-red-600',
//     '#9370DB': 'bg-purple-500',
//     '#FF0000': 'bg-red-500',
//     '#8B0000': 'bg-red-900',
//     '#FFFFFF': 'bg-white border border-gray-300',
//     '#008000': 'bg-green-600',
//     '#FFC0CB': 'bg-pink-300',
//     '#FFFF00': 'bg-yellow-400',
//     '#800080': 'bg-purple-600',
//     '#000000': 'bg-black',
//     '#0000FF': 'bg-blue-500',
//   };
//   return map[hex] || 'bg-gray-400';
// }

// function getPriceRange(products) {
//   const prices = products.map((p) => Number(p.price)).filter((p) => !isNaN(p));
//   return prices.length
//     ? { min: Math.min(...prices), max: Math.max(...prices) }
//     : { min: 0, max: 50000 };
// }

// export default Sidebar;