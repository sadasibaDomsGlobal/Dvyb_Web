import { useLocation } from "react-router-dom";
import ProductGrid from "../components/b2c/products/ProductGrid";

export default function WomenwearRoute({ products }) {
  console.log(products)
   const location = useLocation();
     const queryParams = new URLSearchParams(location.search);
     const category = queryParams.get("category");

     const filteredProducts = products.filter((p) => {
  const match = p.dressType?.toLowerCase() == category?.toLowerCase();
  console.log(match);
  console.log(p.dressType?.toLowerCase());
  console.log(category?.toLowerCase());
  return match; // ✅ must return the condition
});


  console.log(filteredProducts)


  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4 capitalize">
        {category ? category : "All Products"}
      </h1>
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
 