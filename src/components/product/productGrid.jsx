// ProductGrid.jsx
import DisplayCard from "./DisplayCard";

export default function ProductGrid({ products, columns = 4 }) {
  const colMap = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4", 5: "md:grid-cols-5" };

  return (
    <div className={`grid grid-cols-1 ${colMap[columns]} gap-4 md:gap-6 py-4 sm:px-2 md:px-12 lg:px-22`}>
      {products.map((p) => (
        <DisplayCard key={p.id} product={p} />
      ))}
    </div>
  );
}