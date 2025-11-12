import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { FilterSection, ColorFilter, PriceRange, DiscountFilter } from "../filters";
import { useFilter } from "../../../context/FilterContext";

const Sidebar = ({ products = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterData, setFilterData] = useState({
    categories: [],
    sizes: [],
    colors: [],
    priceRange: { min: 0, max: 0 }
  });

  // Use filter context
  const { selectedFilters, navbarCategory } = useFilter();

  // Determine selected category - prioritize navbar selection, then sidebar selection
  const selectedCategory = navbarCategory || selectedFilters.categories[0] || null;

  // Custom category data from image (for fallback if no categories in API)
  const customCategories = [
    { name: "LEHANGA", count: 1183 },
    { name: "SAREE", count: 23246 },
    { name: "KURTA SETS", count: 13550 },
    { name: "ANARKALIS", count: 4956 },
    { name: "SHARARAS", count: 3438 },
    { name: "PRET", count: 3138 },
    { name: "FUSION", count: 2279 },
    { name: "WEDDING", count: 2279 },
    { name: "SALE", count: 2279 },
    { name: "VIRTUAL TRYON", count: 2279 },
  ];

  // Custom discount data from image
  const customDiscounts = [
    { range: "0% - 20%", count: 4641 },
    { range: "21% - 30%", count: 654 },
    { range: "31% - 40%", count: 11 }
  ];

  // Default sizes from image
  const defaultSizes = [
    { name: "XS", count: 29656 },
    { name: "S", count: 32512 },
    { name: "M", count: 33106 },
    { name: "L", count: 32735 },
    { name: "XL", count: 31191 },
    { name: "XXL", count: 27246 },
    { name: "3XL", count: 23266 }
  ];

  useEffect(() => {
    if (products.length > 0) {
      const dynamicData = extractDynamicFilterData(products);
      setFilterData(dynamicData);
    }
  }, [products]);

  // Check if current category is saree (case insensitive)
  const isSareeCategory = selectedCategory &&
    selectedCategory.toUpperCase().includes('SAREE');

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
        className={`h-full fixed lg:sticky lg:top-0 inset-y-0 left-0 z-30 w-64 bg-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out h-screen overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Header Section - Fixed */}
          <div className="flex-shrink-0 p-4 border-b border-gray-100">
            <div className="text-xs text-gray-500 mb-3">
              Home &gt; Womenswear &gt; Bottoms
            </div>
            <h4 className="text-gray-900 text-base font-medium">FILTERS</h4>
          </div>

          {/* Filters Section - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
            <div className="space-y-6">
              {/* CATEGORY FILTER */}
              <FilterSection
                title="CATEGORY"
                items={customCategories}
                searchable
                defaultOpen={true}
                filterType="categories"
              />

              {/* SIZE FILTER - Hide for saree category */}
              {!isSareeCategory && (
                <FilterSection
                  title="SIZE"
                  items={filterData.sizes.length > 0 ? filterData.sizes : defaultSizes}
                  defaultOpen={true}
                  filterType="sizes"
                />
              )}

              {/* COLORS FILTER */}
              {filterData.colors.length > 0 && (
                <ColorFilter
                  title="COLORS"
                  colors={filterData.colors}
                  defaultOpen={true}
                />
              )}

              {/* DISCOUNT FILTER (Custom - always show) */}
              <DiscountFilter
                title="DISCOUNT"
                discounts={customDiscounts}
                defaultOpen={true}
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
    categories: extractCategories(products),
    sizes: extractSizes(products),
    colors: extractColors(products),
    priceRange: getPriceRange(products)
  };
}

function extractCategories(products) {
  const map = new Map();

  products.forEach((product) => {
    // Use category field from your data
    if (product.category && product.category.trim()) {
      const category = product.category.trim();
      map.set(category, (map.get(category) || 0) + 1);
    }

    // Also include dressType as sub-categories
    if (product.dressType && product.dressType.trim()) {
      const dressType = product.dressType.trim();
      map.set(dressType, (map.get(dressType) || 0) + 1);
    }
  });

  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
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
      // Sort sizes logically: XS, S, M, L, XL, XXL, 3XL
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
          const [name, hex] = color.split('_');
          if (name && hex) {
            const colorName = name.trim();
            const existing = map.get(colorName);
            map.set(colorName, {
              name: colorName,
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

function hexToClass(hex) {
  const colorMap = {
    '#B22222': 'bg-red-600',
    '#9370DB': 'bg-purple-500',
    '#FF0000': 'bg-red-500',
    '#8B0000': 'bg-red-900',
    '#FFFFFF': 'bg-white border border-gray-300',
    '#008000': 'bg-green-600',
    '#FFB6C1': 'bg-pink-300',
    '#FFC0CB': 'bg-pink-300',
    '#FFFF00': 'bg-yellow-400',
    '#800080': 'bg-purple-600',
    '#000000': 'bg-black',
    '#0000FF': 'bg-blue-500',
    '#32CD32': 'bg-green-400',
  };

  return colorMap[hex] || `bg-[${hex}]`;
}

function getPriceRange(products) {
  const prices = products
    .map((p) => Number(p.price))
    .filter((p) => !isNaN(p) && p > 0);

  if (prices.length === 0) {
    return { min: 55, max: 37967 }; // Default from image
  }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

export default Sidebar;