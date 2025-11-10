// src/routes/AppRoutes.jsx (or wherever you define <Routes />)
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layout/mainLayout";
import Home from "../pages/b2c/homePage/homePage";
import CartPage from "../pages/b2c/cartPage/cartPage";
// import WishlistPage from "../pages/b2c/wishlist/WishlistPage"; 
// import ProfilePage from "../pages/b2c/profile/ProfilePage";   
import ProductLayout from "../layout/ProductLayout";
import WomenwearRoute from "./WomenwearRoute";
import { useProducts } from "../hooks/useProducts";
import ProductDetailsPageIndividual from "../pages/B2C/ProductDetailsPageIndividual";
import BlogPage from "../components/common/BlogPage/BlogPage";
import MainBlog from "../components/common/BlogPage/MainBlog";
import SingleMainBlog from "../components/common/BlogPage/singleBlogMain";
import FaqPage from "../components/common/FAQ/FAQ";
import PrivacyPolicy from "../components/common/PrivacyPolicy/PrivacyPolicy";
import ReturnExchangePolicy from "../components/common/Returnpolicy/ReturnPolicy";
import SingleBlog from "../components/common/SingleBlog/SingleBlog";
import TermsAndConditions from "../components/common/TermsAndCondtions/TermsAndConditions";

export default function AppRoutes() {
  const { products, loading, error } = useProducts();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      {/* PUBLIC */}
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
      <Route
        path="/products/:id"
        element={
          <MainLayout>
            <ProductDetailsPageIndividual />
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
        path="/mainblog"
        element={
          <MainLayout>
            <MainBlog />
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

      {/* 🔒 PROTECTED */}
      {/* <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <MainLayout>
              <CartPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <MainLayout>
              <WishlistPage />
            </MainLayout>
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
}
