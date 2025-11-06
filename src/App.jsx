// src/App.jsx
// import Footer from "./components/"
import ProductGrid from "./components/b2c/products/ProductGrid";
import Sidebar from "./components/b2c/sidebar/Sidebar";
import { FilterProvider } from "./context/FilterContext";
import { useProducts } from "./hooks/useProducts";

function AppContent() {
  const { products, loading, error } = useProducts();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app">
      <main className="main-content">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Discover Our Collection
          </h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4">
              <Sidebar products={products} />
            </aside>
            
            <section className="lg:w-3/4">
              <ProductGrid products={products} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <FilterProvider>
      <AppContent />
    </FilterProvider>
  );
}