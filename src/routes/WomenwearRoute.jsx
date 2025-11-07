import ProductGrid from "../components/b2c/products/ProductGrid";

export default function WomenwearRoute({ products }) {
  return <ProductGrid products={products} />;
}
    







// import { useProducts } from '../hooks';
// // import { PremiumSection05 } from '../components/b2c';
// import MainLayout from '../layout';
// import {ProductGrid} from '../components/b2c/products';

// const WomenwearRoute = () => {
//     const { products, loading, error } = useProducts();

//     if (loading) return <div className="p-8 text-center">Loading...</div>;
//     if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

//     return (
//         <MainLayout products={products}>
//             <div className="p-6">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-6">All Products</h1>
//                 <ProductGrid />
//             </div>
//         </MainLayout>
//     );
// };

// export default WomenwearRoute;