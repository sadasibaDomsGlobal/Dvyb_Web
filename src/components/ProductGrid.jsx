// src/components/ProductGrid.jsx
import ProductCard from "./ProductCard";

/**
 * ProductGrid displays a grid of ProductCard components.
 * Uses mock data for now (Phase 1).
 */
const ProductGrid = () => {
  // Mock product data (will be replaced with Firebase later)
  const mockProducts = [
    {
      id: 1,
      name: "Swatantra",
      price: 3000,
      imageUrls: ["https://via.placeholder.com/300x400/FFB6C1/000000?text=Swatantra"],
      brand: "DVYB",
    },
    {
      id: 2,
      name: "Libas Art",
      price: 3999,
      imageUrls: ["https://via.placeholder.com/300x400/FFD700/000000?text=Libas+Art"],
      brand: "DVYB",
    },
    {
      id: 3,
      name: "Ritu Kumar",
      price: 3000,
      imageUrls: ["https://via.placeholder.com/300x400/90EE90/000000?text=Ritu+Kumar"],
      brand: "DVYB",
    },
    {
      id: 4,
      name: "Pink Elegance",
      price: 3000,
      imageUrls: ["https://via.placeholder.com/300x400/FFC0CB/000000?text=Pink"],
      brand: "DVYB",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;