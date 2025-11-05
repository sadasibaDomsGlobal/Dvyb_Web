import { useProducts } from '../hooks';
import PremiumSection05 from '../components/b2c';
import MainLayout from '../layout';

const WomenwearRoute = () => {
    const { products, loading, error } = useProducts();

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

    return (
        <MainLayout products={products}>
            <PremiumSection05 />
        </MainLayout>
    );
};

export default WomenwearRoute;