import { Routes, Route } from "react-router-dom";

// Route wrappers
import MainOnlyRoute from "./routes/MainOnlyRoute";
import MainWithSidebarRoute from "./routes/MainWithSidebarRoute";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WomenwearPage from "./pages/WomenwearPage";
import ProductDetailPage from "./pages/ProductDetailPage";

/**
 * App defines 2 groups of routes:
 * 1. MainOnlyRoute → Only header/footer
 * 2. MainWithSidebarRoute → Header + Sidebar + Footer
 */
export default function App() {
  return (
    <Routes>
      {/* Group 1: Only MainLayout */}
      <Route path="/" element={<MainOnlyRoute element={<HomePage />} />} />
      <Route path="/about" element={<MainOnlyRoute element={<AboutPage />} />} />

      {/* Group 2: MainLayout + SecondaryLayout */}
      <Route
        path="/womenwear"
        element={<MainWithSidebarRoute element={<WomenwearPage />} />}
      />
      <Route
        path="/products/:id"
        element={<MainWithSidebarRoute element={<ProductDetailPage />} />}
      />
    </Routes>
  );
}