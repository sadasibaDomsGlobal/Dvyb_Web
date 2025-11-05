import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import SidebarHeader from "./SidebarHeader";
import { FilterSection, ColorFilter, PriceRange } from "../filters";


const Sidebar = ({ products = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('SAREES');

  // Dynamic data extraction
  const categories = extractUniqueValues(products, ['category', 'productType', 'dressType']);
  const sizes = extractUniqueValues(products, ['selectedSizes']);
  const colors = extractColors(products);
  const priceRange = getPriceRange(products);

  // Set initial active category
  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0].name);
    }
  }, [categories]);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-3 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none lg:border-r`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          <SidebarHeader />

          {/* Category Tabs */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex space-x-1 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-2 text-sm rounded-full transition-colors ${activeCategory === cat.name
                      ? 'bg-teal-100 text-teal-700'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 space-y-4 flex-1">
            <FilterSection title="Category" items={categories} searchable />
            <FilterSection title="Size" items={sizes} />
            <ColorFilter title="Colors" colors={colors} />
            <PriceRange min={priceRange.min} max={priceRange.max} />
          </div>
        </div>
      </aside>
    </>
  );
};

// Helpers (same as before)
function extractUniqueValues(products, fields) {
  const map = new Map();
  products.forEach((p) => {
    fields.forEach((field) => {
      const values = Array.isArray(p[field]) ? p[field] : [p[field]];
      values.forEach((val) => {
        if (val) {
          const key = val.toString().trim();
          if (key) map.set(key, (map.get(key) || 0) + 1);
        }
      });
    });
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function extractColors(products) {
  const map = new Map();
  products.forEach((p) => {
    if (Array.isArray(p.selectedColors)) {
      p.selectedColors.forEach((c) => {
        const [name, hex] = c.split('_');
        if (name && hex) {
          const key = name;
          const existing = map.get(key);
          map.set(key, {
            name,
            bgClass: hexToClass(hex),
            count: (existing?.count || 0) + 1,
          });
        }
      });
    }
  });
  return Array.from(map.values());
}

function hexToClass(hex) {
  const map = {
    '#B22222': 'bg-red-600',
    '#9370DB': 'bg-purple-500',
    '#FF0000': 'bg-red-500',
    '#8B0000': 'bg-red-900',
    // Add more as needed
  };
  return map[hex] || 'bg-gray-400';
}

function getPriceRange(products) {
  const prices = products.map((p) => Number(p.price)).filter((p) => !isNaN(p));
  return prices.length
    ? { min: Math.min(...prices), max: Math.max(...prices) }
    : { min: 0, max: 50000 };
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
