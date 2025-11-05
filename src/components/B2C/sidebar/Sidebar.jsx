import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import SidebarHeader from "./SidebarHeader";
import { FilterSection, ColorFilter, PriceRange } from "../filters";

const Sidebar = ({ products = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Extract filter data
  const categories = extractUniqueValues(products, ['category', 'productType', 'dressType']);
  const sizes = extractUniqueValues(products, ['selectedSizes']);
  const colors = extractColors(products);
  const priceRange = getPriceRange(products);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2.5 rounded-lg shadow-md"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/40 z-30" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`fixed lg:static top-0 left-0 h-full w-80 bg-white border-r border-gray-200 shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 space-y-6 overflow-y-auto h-full">
          <SidebarHeader />

          {/* Filters */}
          <FilterSection title="Category" items={categories} searchable />
          <FilterSection title="Size" items={sizes} />
          <ColorFilter title="Colors" colors={colors} />
          <PriceRange min={priceRange.min} max={priceRange.max} />
        </div>
      </aside>
    </>
  );
};

// Helper: Extract unique values with count
function extractUniqueValues(products, fields) {
  const map = new Map();
  products.forEach(p => {
    fields.forEach(field => {
      const values = Array.isArray(p[field]) ? p[field] : [p[field]];
      values.forEach(val => {
        if (val) {
          const key = val.toString().trim();
          if (key) map.set(key, (map.get(key) || 0) + 1);
        }
      });
    });
  });
  return Array.from(map.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
}

// Helper: Extract colors
function extractColors(products) {
  const map = new Map();
  products.forEach(p => {
    if (Array.isArray(p.selectedColors)) {
      p.selectedColors.forEach(c => {
        const [name, hex] = c.split('_');
        if (name && hex) {
          const key = name;
          map.set(key, { name, color: hexToClass(hex), count: (map.get(key)?.count || 0) + 1 });
        }
      });
    }
  });
  return Array.from(map.values());
}

function hexToClass(hex) {
  const map = {
    '#FFFFFF': 'bg-white',
    '#000000': 'bg-black',
    '#FF0000': 'bg-red-500',
    '#00FF00': 'bg-green-500',
    '#0000FF': 'bg-blue-500',
    '#FFC0CB': 'bg-pink-300',
    '#FFFF00': 'bg-yellow-400',
    '#9370DB': 'bg-purple-500',
    '#8B0000': 'bg-red-900',
    '#B22222': 'bg-red-700',
  };
  return map[hex] || 'bg-gray-400';
}

// Helper: Price range
function getPriceRange(products) {
  const prices = products.map(p => p.price).filter(p => typeof p === 'number');
  return prices.length ? { min: Math.min(...prices), max: Math.max(...prices) } : { min: 0, max: 10000 };
}

export default Sidebar;











/**
 * THis code works with static data
 * I have implemented the dynamic version above
 * So I commented this code out
 */

// import { useState } from 'react';
// import { Menu, X } from 'lucide-react';
// import SidebarHeader from "./SidebarHeader";
// import SidebarCategories from "./SidebarCategories";
// import SidebarProducts from "./SidebarProducts";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* Mobile Menu Toggle */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="lg:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2.5 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
//       >
//         {isOpen ? <X size={22} /> : <Menu size={22} />}
//       </button>

//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar Container */}
//       <aside
//         className={`fixed lg:static top-0 left-0 h-full lg:h-auto z-40
//           w-72 sm:w-80 bg-white rounded-r-2xl lg:rounded-none
//           border-r border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]
//           transform transition-transform duration-300 ease-in-out
//           ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//         `}
//       >
//         <div className="flex flex-col h-full p-5 space-y-6">
//           <SidebarHeader />
//           <SidebarCategories />
//           <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//             <SidebarProducts />
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;
