// ProductGrid.jsx
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, columns = 4 }) {
  const colMap = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4", 5: "grid-cols-5" };

  return (
    <div className={`grid ${colMap[columns]} gap-4 md:gap-6`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}