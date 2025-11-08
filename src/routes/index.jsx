import { Routes, Route } from "react-router-dom";
import WomenwearRoute from "./WomenwearRoute";
import IndividualProductDetailsPage from "../components/b2c/individual_product/IndividualProductDetailsPage";
import ProductLayout from "../layout/ProductLayout";
import MainLayout from "../layout/mainLayout";
import { useProducts } from "../hooks/useProducts";
import ProductDetailsPageIndividual from "../pages/B2C/ProductDetailsPageIndividual";
import Home from "../pages/b2c/homePage/homePage";

export default function AppRoutes() {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Routes>
      {/* 🧷 Product listing page (with sidebar + ads inside main layout) */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/womenwear"
        element={
          <MainLayout>
            <ProductLayout products={products}>
              <WomenwearRoute products={products} />
            </ProductLayout>
          </MainLayout>
        }
      />

      {/* 🧷 Product details page (no sidebar, only header/footer) */}
      <Route
        path="/products/:id"
        element={
          <MainLayout>
            <ProductDetailsPageIndividual />
          </MainLayout>
        }
      />

      {/* 🧷 Root → redirect to womenwear */}
      <Route
        path="/womenwear"
        element={
          <MainLayout>
            <ProductLayout products={products}>
              <WomenwearRoute products={products} />
            </ProductLayout>
          </MainLayout>
        }
      />

      

    </Routes>
  );
}








// import { Routes, Route } from "react-router-dom";
// import WomenwearRoute from "./WomenwearRoute";
// import IndividualProductDetailsPage from "../components/b2c/individual_product/IndividualProductDetailsPage";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<WomenwearRoute />} />
//       <Route path="/womenwear" element={<WomenwearRoute />} />
//       <Route path="/products/:id" element={<IndividualProductDetailsPage />} />
//       {/* Add more routes here */}
//     </Routes>
//   );
// }