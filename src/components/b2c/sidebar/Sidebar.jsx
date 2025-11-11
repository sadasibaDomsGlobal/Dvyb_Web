import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { FilterSection, ColorFilter, PriceRange, DiscountFilter } from "../filters";
import { useFilter } from '../../../context/FilterContext';

const Sidebar = ({ products = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterData, setFilterData] = useState({
    sizes: [],
    colors: [],
    priceRange: { min: 0, max: 0 }
  });

  // Get filter context
  const { selectedFilters, navbarCategory } = useFilter();

  // Check if current category is Saree
  const isSareeCategory = selectedFilters.categories.includes('SAREE') ||
    navbarCategory === 'SAREE' ||
    selectedFilters.categories.some(cat => cat.toLowerCase().includes('saree'));

  // Get the current selected category for display
  const currentCategory = navbarCategory ||
    (selectedFilters.categories.length > 0 ? selectedFilters.categories[0] : 'All Products');

  // Navbar items as categories
  const navbarCategories = [
    { name: "LEHANGA", count: 23246 },
    { name: "SAREE", count: 18500 },
    { name: "KURTA SETS", count: 12500 },
    { name: "ANARKALIS", count: 9800 },
    { name: "SHARARAS", count: 7500 },
    { name: "PRET", count: 6200 },
    { name: "FUSION", count: 4800 },
    { name: "WEDDING", count: 13550 },
    { name: "SALE", count: 5300 },
    { name: "VIRTUAL TRYON", count: 0 }
  ];

  // Custom discount data
  const customDiscounts = [
    { range: "0% - 20%", count: 4641 },
    { range: "21% - 30%", count: 654 },
    { range: "31% - 40%", count: 11 }
  ];

  // Default sizes
  const defaultSizes = [
    { name: "XS", count: 29656 },
    { name: "S", count: 32512 },
    { name: "M", count: 33106 },
    { name: "L", count: 32735 },
    { name: "XL", count: 31191 },
    { name: "XXL", count: 27246 },
    { name: "3XL", count: 23266 }
  ];

  // Default colors (fallback if no colors from API)
  const defaultColors = [
    { name: "Red", hex: "#FF0000", bgClass: "bg-red-500", count: 12500 },
    { name: "Blue", hex: "#0000FF", bgClass: "bg-blue-500", count: 9800 },
    { name: "Green", hex: "#008000", bgClass: "bg-green-600", count: 7500 },
    { name: "Black", hex: "#000000", bgClass: "bg-black", count: 11200 },
    { name: "White", hex: "#FFFFFF", bgClass: "bg-white border border-gray-300", count: 8900 },
    { name: "Pink", hex: "#FFC0CB", bgClass: "bg-pink-300", count: 6700 },
    { name: "Purple", hex: "#800080", bgClass: "bg-purple-600", count: 4500 },
    { name: "Yellow", hex: "#FFFF00", bgClass: "bg-yellow-400", count: 3200 }
  ];

  useEffect(() => {
    if (products.length > 0) {
      const dynamicData = extractDynamicFilterData(products);
      setFilterData(dynamicData);
    }
  }, [products]);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
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
        className={`fixed lg:sticky lg:top-0 inset-y-0 left-0 z-30 w-64 bg-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out h-screen overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Header Section - Fixed */}
          <div className="flex-shrink-0 p-4 border-b border-gray-100">
            <div className="text-xs text-gray-500 mb-3">
              Home &gt; Womenswear &gt; {currentCategory}
            </div>
            <h4 className="text-gray-900 text-base font-medium">FILTERS</h4>
          </div>

          {/* Filters Section - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
            <div className="space-y-6">
              {/* CATEGORY FILTER - Using Navbar Items */}
              <FilterSection
                title="CATEGORY"
                items={navbarCategories}
                searchable
                defaultOpen={true}
                filterType="categories"
              />

              {/* SIZE FILTER - Hide for Saree category */}
              {!isSareeCategory && (
                <FilterSection
                  title="SIZE"
                  items={filterData.sizes.length > 0 ? filterData.sizes : defaultSizes}
                  defaultOpen={true}
                  filterType="sizes"
                />
              )}

              {/* COLORS FILTER - Use default colors if no colors from API */}
              <ColorFilter
                title="COLORS"
                colors={filterData.colors.length > 0 ? filterData.colors : defaultColors}
                defaultOpen={true}
                filterType="colors"
              />

              {/* DISCOUNT FILTER */}
              <DiscountFilter
                title="DISCOUNT"
                discounts={customDiscounts}
                defaultOpen={true}
                filterType="discounts"
              />

              {/* PRICE FILTER */}
              {filterData.priceRange.max > 0 && (
                <PriceRange
                  min={filterData.priceRange.min}
                  max={filterData.priceRange.max}
                  defaultOpen={true}
                />
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// Helper functions to extract dynamic data from products
function extractDynamicFilterData(products) {
  return {
    sizes: extractSizes(products),
    colors: extractColors(products),
    priceRange: getPriceRange(products)
  };
}

function extractSizes(products) {
  const map = new Map();

  products.forEach((product) => {
    if (Array.isArray(product.selectedSizes)) {
      product.selectedSizes.forEach((size) => {
        if (size && size.trim()) {
          const sizeKey = size.trim().toUpperCase();
          map.set(sizeKey, (map.get(sizeKey) || 0) + 1);
        }
      });
    }
  });

  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      const sizeOrder = { XS: 1, S: 2, M: 3, L: 4, XL: 5, XXL: 6, '3XL': 7 };
      return (sizeOrder[a.name] || 99) - (sizeOrder[b.name] || 99);
    });
}

function extractColors(products) {
  const map = new Map();

  products.forEach((product) => {
    if (Array.isArray(product.selectedColors)) {
      product.selectedColors.forEach((color) => {
        if (color && typeof color === 'string') {
          // Handle different color formats
          let colorName, hex;

          if (color.includes('_')) {
            // Format: "Red_#FF0000"
            [colorName, hex] = color.split('_');
          } else if (color.startsWith('#')) {
            // Format: "#FF0000"
            hex = color;
            colorName = getColorNameFromHex(color);
          } else {
            // Format: "Red"
            colorName = color;
            hex = getHexFromColorName(color);
          }

          if (colorName && hex) {
            const trimmedName = colorName.trim();
            const existing = map.get(trimmedName);
            map.set(trimmedName, {
              name: trimmedName,
              hex: hex,
              bgClass: hexToClass(hex),
              count: (existing?.count || 0) + 1,
            });
          }
        }
      });
    }
  });

  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

// Helper function to get color name from hex
function getColorNameFromHex(hex) {
  const colorMap = {
    '#FF0000': 'Red',
    '#0000FF': 'Blue',
    '#008000': 'Green',
    '#000000': 'Black',
    '#FFFFFF': 'White',
    '#FFC0CB': 'Pink',
    '#800080': 'Purple',
    '#FFFF00': 'Yellow',
    '#B22222': 'Firebrick',
    '#9370DB': 'Medium Purple',
    '#8B0000': 'Dark Red',
    '#FFB6C1': 'Light Pink',
    '#32CD32': 'Lime Green'
  };
  return colorMap[hex] || 'Unknown';
}

// Helper function to get hex from color name
function getHexFromColorName(colorName) {
  const colorMap = {
    'red': '#FF0000',
    'blue': '#0000FF',
    'green': '#008000',
    'black': '#000000',
    'white': '#FFFFFF',
    'pink': '#FFC0CB',
    'purple': '#800080',
    'yellow': '#FFFF00'
  };
  return colorMap[colorName.toLowerCase()] || '#CCCCCC';
}

function hexToClass(hex) {
  const colorMap = {
    '#FF0000': 'bg-red-500',
    '#0000FF': 'bg-blue-500',
    '#008000': 'bg-green-600',
    '#000000': 'bg-black',
    '#FFFFFF': 'bg-white border border-gray-300',
    '#FFC0CB': 'bg-pink-300',
    '#800080': 'bg-purple-600',
    '#FFFF00': 'bg-yellow-400',
    '#B22222': 'bg-red-600',
    '#9370DB': 'bg-purple-500',
    '#8B0000': 'bg-red-900',
    '#FFB6C1': 'bg-pink-300',
    '#32CD32': 'bg-green-400',
  };

  return colorMap[hex] || `bg-[${hex}]`;
}

function getPriceRange(products) {
  const prices = products
    .map((p) => Number(p.price))
    .filter((p) => !isNaN(p) && p > 0);

  if (prices.length === 0) {
    return { min: 55, max: 37967 };
  }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

export default Sidebar;
















// import { useState, useEffect } from 'react';
// import { Menu, X } from 'lucide-react';
// import { FilterSection, ColorFilter, PriceRange, DiscountFilter } from "../filters";
// import { useFilter } from '../../../context/FilterContext';

// const Sidebar = ({ products = [] }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [filterData, setFilterData] = useState({
//     categories: [],
//     sizes: [],
//     colors: [],
//     priceRange: { min: 0, max: 0 }
//   });

//   // Get filter context
//   const { selectedFilters, navbarCategory } = useFilter();

//   // Check if current category is Saree
//   const isSareeCategory = selectedFilters.categories.includes('Saree') ||
//     navbarCategory === 'Saree' ||
//     selectedFilters.categories.some(cat =>
//       cat.toLowerCase().includes('saree'));

//   // Custom category data from image (for fallback if no categories in API)
//   const customCategories = [
//     { name: "Kalighota", count: 1183 },
//     { name: "Embroidered Lehenga", count: 23246 },
//     { name: "Bridal Lehenga", count: 13550 },
//     { name: "Printed Lehenga", count: 4956 },
//     { name: "Bridesmaid Lehenga", count: 3438 },
//     { name: "Cocktail Lehenga", count: 3138 },
//     { name: "Traditional Lehenga", count: 2279 }
//   ];

//   // Custom discount data from image
//   const customDiscounts = [
//     { range: "0% - 20%", count: 4641 },
//     { range: "21% - 30%", count: 654 },
//     { range: "31% - 40%", count: 11 }
//   ];

//   // Default sizes from image
//   const defaultSizes = [
//     { name: "XS", count: 29656 },
//     { name: "S", count: 32512 },
//     { name: "M", count: 33106 },
//     { name: "L", count: 32735 },
//     { name: "XL", count: 31191 },
//     { name: "XXL", count: 27246 },
//     { name: "3XL", count: 23266 }
//   ];

//   useEffect(() => {
//     if (products.length > 0) {
//       const dynamicData = extractDynamicFilterData(products);
//       setFilterData(dynamicData);
//     }
//   }, [products]);

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
//             <div className="text-xs text-gray-500 mb-3">
//               Home &gt; Womenswear &gt; Bottoms
//             </div>
//             <h4 className="text-gray-900 text-base font-medium">FILTERS</h4>
//           </div>

//           {/* Filters Section - Scrollable */}
//           {/* <div className="flex-1 overflow-y-auto p-4"> */}
//           <div className="flex-1 overflow-y-auto p-4 no-scrollbar">

//             <div className="space-y-6">
//               {/* CATEGORY FILTER */}
//               <FilterSection
//                 title="CATEGORY"
//                 items={filterData.categories.length > 0 ? filterData.categories : customCategories}
//                 searchable
//                 defaultOpen={true}
//                 filterType="categories"
//               />

//               {/* SIZE FILTER */}
//               <FilterSection
//                 title="SIZE"
//                 items={filterData.sizes.length > 0 ? filterData.sizes : defaultSizes}
//                 defaultOpen={true}
//                 filterType="categories"
//               />

//               {/* SIZE FILTER - Hide for Saree category */}
//               {!isSareeCategory && (
//                 <FilterSection
//                   title="SIZE"
//                   items={filterData.sizes.length > 0 ? filterData.sizes : defaultSizes}
//                   defaultOpen={true}
//                   filterType="sizes"
//                 />
//               )}

//               {/* COLORS FILTER */}
//               {filterData.colors.length > 0 && (
//                 <ColorFilter
//                   title="COLORS"
//                   colors={filterData.colors}
//                   defaultOpen={true}
//                 // filterType="categories"
//                 />
//               )}

//               {/* DISCOUNT FILTER (Custom - always show) */}
//               <DiscountFilter
//                 title="DISCOUNT"
//                 discounts={customDiscounts}
//                 defaultOpen={true}
//               // filterType="categories"
//               />

//               {/* PRICE FILTER */}
//               {filterData.priceRange.max > 0 && (
//                 <PriceRange
//                   min={filterData.priceRange.min}
//                   max={filterData.priceRange.max}
//                   defaultOpen={true}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// // Helper functions to extract dynamic data from products
// function extractDynamicFilterData(products) {
//   return {
//     categories: extractCategories(products),
//     sizes: extractSizes(products),
//     colors: extractColors(products),
//     priceRange: getPriceRange(products)
//   };
// }

// function extractCategories(products) {
//   const map = new Map();

//   products.forEach((product) => {
//     // Use category field from your data
//     if (product.category && product.category.trim()) {
//       const category = product.category.trim();
//       map.set(category, (map.get(category) || 0) + 1);
//     }

//     // Also include dressType as sub-categories
//     if (product.dressType && product.dressType.trim()) {
//       const dressType = product.dressType.trim();
//       map.set(dressType, (map.get(dressType) || 0) + 1);
//     }
//   });

//   return Array.from(map.entries())
//     .map(([name, count]) => ({ name, count }))
//     .sort((a, b) => b.count - a.count);
// }

// function extractSizes(products) {
//   const map = new Map();

//   products.forEach((product) => {
//     if (Array.isArray(product.selectedSizes)) {
//       product.selectedSizes.forEach((size) => {
//         if (size && size.trim()) {
//           const sizeKey = size.trim().toUpperCase();
//           map.set(sizeKey, (map.get(sizeKey) || 0) + 1);
//         }
//       });
//     }
//   });

//   return Array.from(map.entries())
//     .map(([name, count]) => ({ name, count }))
//     .sort((a, b) => {
//       // Sort sizes logically: XS, S, M, L, XL, XXL, 3XL
//       const sizeOrder = { XS: 1, S: 2, M: 3, L: 4, XL: 5, XXL: 6, '3XL': 7 };
//       return (sizeOrder[a.name] || 99) - (sizeOrder[b.name] || 99);
//     });
// }

// function extractColors(products) {
//   const map = new Map();

//   products.forEach((product) => {
//     if (Array.isArray(product.selectedColors)) {
//       product.selectedColors.forEach((color) => {
//         if (color && typeof color === 'string') {
//           const [name, hex] = color.split('_');
//           if (name && hex) {
//             const colorName = name.trim();
//             const existing = map.get(colorName);
//             map.set(colorName, {
//               name: colorName,
//               hex: hex,
//               bgClass: hexToClass(hex),
//               count: (existing?.count || 0) + 1,
//             });
//           }
//         }
//       });
//     }
//   });

//   return Array.from(map.values()).sort((a, b) => b.count - a.count);
// }

// function hexToClass(hex) {
//   const colorMap = {
//     '#B22222': 'bg-red-600',
//     '#9370DB': 'bg-purple-500',
//     '#FF0000': 'bg-red-500',
//     '#8B0000': 'bg-red-900',
//     '#FFFFFF': 'bg-white border border-gray-300',
//     '#008000': 'bg-green-600',
//     '#FFB6C1': 'bg-pink-300',
//     '#FFC0CB': 'bg-pink-300',
//     '#FFFF00': 'bg-yellow-400',
//     '#800080': 'bg-purple-600',
//     '#000000': 'bg-black',
//     '#0000FF': 'bg-blue-500',
//     '#32CD32': 'bg-green-400',
//   };

//   return colorMap[hex] || `bg-[${hex}]`;
// }

// function getPriceRange(products) {
//   const prices = products
//     .map((p) => Number(p.price))
//     .filter((p) => !isNaN(p) && p > 0);

//   if (prices.length === 0) {
//     return { min: 55, max: 37967 }; // Default from image
//   }

//   return {
//     min: Math.min(...prices),
//     max: Math.max(...prices)
//   };
// }

// export default Sidebar;