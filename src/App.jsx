// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import WomenwearPage from './pages/WomenwearPage';
import ProductDetail from './pages/ProductDetail';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WomenwearPage />} />
      <Route path="/womenwear" element={<WomenwearPage />} />
      <Route path="/products/:id" element={<ProductDetail />} />
    </Routes>
  );
}