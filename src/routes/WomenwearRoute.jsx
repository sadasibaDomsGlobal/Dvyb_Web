import { useLocation } from "react-router-dom";
import ProductGrid from "../components/b2c/products/ProductGrid";

export default function WomenwearRoute({ products }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  // ✅ Filter safely
  const filteredProducts = category
    ? products.filter(
        (p) => p.dressType?.trim().toLowerCase() === category?.trim().toLowerCase()
      )
    : products;

  console.log("**************** The products we get", products);
  console.log("**************** Filtered products", filteredProducts);

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4 capitalize">
        {category ? category : "All Products"}
      </h1>
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
