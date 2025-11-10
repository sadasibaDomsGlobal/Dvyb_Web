import { Routes, Route } from "react-router-dom";
import WomenwearRoute from "./WomenwearRoute";
import IndividualProductDetailsPage from "../components/b2c/individual_product/IndividualProductDetailsPage";
import ProductLayout from "../layout/ProductLayout";
import MainLayout from "../layout/mainLayout";
import { useProducts } from "../hooks/useProducts";
import ProductDetailsPageIndividual from "../pages/B2C/ProductDetailsPageIndividual";
import Home from "../pages/b2c/homePage/homePage";
import BlogPage from "../components/common/BlogPage/BlogPage";
import MainBlog from "../components/common/BlogPage/MainBlog";
import SingleMainBlog from "../components/common/BlogPage/singleBlogMain";
import FaqPage from "../components/common/FAQ/FAQ";
import PrivacyPolicy from "../components/common/PrivacyPolicy/PrivacyPolicy";
import ReturnExchangePolicy from "../components/common/Returnpolicy/ReturnPolicy";
import SingleBlog from "../components/common/SingleBlog/SingleBlog";
import TermsAndConditions from "../components/common/TermsAndCondtions/TermsAndConditions";
import CartPage from "../pages/B2C/cartPage/cartPage";
import CheckoutPage from "../pages/B2C/cartPage/CheckoutPage";
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
        path="/cart"
        element={
          <MainLayout>
            <CartPage />
          </MainLayout>
        }
      />

      <Route
        path="/mainblog"
        element={
          <MainLayout>
            <MainBlog />
          </MainLayout>
        }
      />
      <Route
        path="/blog"
        element={
          <MainLayout>
            <BlogPage />
          </MainLayout>
        }
      />
      <Route
        path="/singleBlogMain"
        element={
          <MainLayout>
            <SingleMainBlog />
          </MainLayout>
        }
      />

      <Route
        path="/faq"
        element={
          <MainLayout>
            <FaqPage />
          </MainLayout>
        }
      />
      <Route
        path="/checkout"
        element={
          <MainLayout>
            <CheckoutPage />
          </MainLayout>
        }
      />

      {/* <Route
        path="/ourStory"
        element={
          <MainLayout>
          < ourStory />
          </MainLayout>
        }
      /> */}

      <Route
        path="/privacy"
        element={
          <MainLayout>
            <PrivacyPolicy />
          </MainLayout>
        }
      />
      <Route
        path="/Returns"
        element={
          <MainLayout>
            <ReturnExchangePolicy />
          </MainLayout>
        }
      />
      <Route
        path="/SingleBlog"
        element={
          <MainLayout>
            <SingleBlog />
          </MainLayout>
        }
      />
      <Route
        path="/terms"
        element={
          <MainLayout>
            <TermsAndConditions />
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
