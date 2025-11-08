// components/navbar/SearchDropdown.jsx
import { FaSearch } from "react-icons/fa";
import CategoryCard from "./CategoryCard";
import ProductCard from "../../product/productCard";

const browseCategories = [ /* your data */ ];
const trendingProducts = [ /* your data */ ];

export default function SearchDropdown({ searchQuery, onClose }) {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="border-b py-5 px-6 sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <FaSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search for Products and Categories"
            value={searchQuery}
            className="flex-1 text-lg outline-none"
            autoFocus
          />
          <button className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-900 transition">
            Search
          </button>
          <button onClick={onClose} className="text-3xl text-gray-600 hover:text-black">
            ×
          </button>
        </div>
      </div>

      {/* Browse Categories */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-8">BROWSE CATEGORIES</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {browseCategories.map((cat) => (
            <CategoryCard key={cat.name} {...cat} />
          ))}
        </div>
      </div>

      {/* Trending Products */}
      <div className="max-w-7xl mx-auto px-6 py-10 border-t">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">TRENDING PRODUCTS</h2>
          <button className="text-sm font-semibold hover:underline">VIEW ALL →</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}