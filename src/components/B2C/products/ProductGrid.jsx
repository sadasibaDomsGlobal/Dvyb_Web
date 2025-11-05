// src/components/b2c/products/ProductGrid.jsx
import ProductCard from './ProductCard';
import { useProducts } from '../../../hooks/useProducts';  // ← FIXED PATH

const ProductGrid = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;
  if (!products.length) return <div className="text-center py-12">No products</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;










// import ProductCard from './ProductCard';
// import img1 from '../../../assets/B2C/images/product_details/aranya.png';
// import img2 from '../../../assets/B2C/images/product_details/kanchiva.png';
// import img3 from '../../../assets/B2C/images/product_details/Product_Image_2.png';
// import img4 from '../../../assets/B2C/images/product_details/Product_Image_3.png';
// import img5 from '../../../assets/B2C/images/product_details/Product_Image_4.png';
// import img6 from '../../../assets/B2C/images/product_details/Product_Image.png';
// import img7 from '../../../assets/B2C/images/product_details/rangrag.png';
// import img8 from '../../../assets/B2C/images/product_details/suhino.png';

// const ProductGrid = () => {
//     const products = [
//         { id: 1, images: img1, brand: 'SUNNO', name: 'Ivory Tissue Mirror & Zart Embroidened Lehenge Set', price: '1,94,900' },
//         { id: 2, images: img2, brand: 'FABINDA', name: 'Chandadi Silk Cotton Kurta with Pelazzo', price: '18,999' },
//         { id: 3, images: img3, brand: 'ZARA', name: 'Soinie Effect Mall Dress', price: '13,999' },
//         { id: 4, images: img4, brand: 'KANCHIVARAM', name: 'Silk Some with Gold Zart Work', price: '1,35,000' },
//         { id: 5, images: img5, brand: 'W', name: 'Printed Geogertje Dress with Belt', price: '13,499' },
//         { id: 6, images: img6, brand: 'HEM', name: 'Dimitri Jocket with Four Fur Lines', price: '13,999' },
//         { id: 7, images: img7, brand: 'ARANYA', name: 'Handcrafted Black Printed Kurta Set', price: '1,12,500' },
//         { id: 8, images: img8, brand: 'BIBA', name: 'Embroidened Sinogiri Cat Kurta', price: '12,199' },
//         { id: 9, images: img1, brand: 'AND', name: 'Flood Mead Dress with Buffled Sievers', price: '14,499' },
//         { id: 10, images: img2, brand: 'LEVIS', name: 'Classic Fit Jeans', price: '12,299' }
//     ];

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products.map(product => (
//                 <ProductCard key={product.id} product={product} />
//             ))}
//         </div>
//     );
// };

// export default ProductGrid;