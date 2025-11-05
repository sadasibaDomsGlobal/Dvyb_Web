// src/pages/WomenwearPage.jsx
import MainLayout from '../layout/mainLayout';
import ProductGrid from '../components/b2c/products/ProductGrid';

const WomenwearPage = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Womenwear</h2>
        <ProductGrid />
      </div>
    </MainLayout>
  );
};

export default WomenwearPage;