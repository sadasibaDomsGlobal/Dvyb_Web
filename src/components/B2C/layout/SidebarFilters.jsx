import FilterSection from '../filters/FilterSection';
import ColorFilter from '../filters/ColorFilter';
import PriceRange from '../filters/PriceRange';

const SidebarFilters = () => {
    const categories = [
        { name: 'Katajharia', count: 1183 },
        { name: 'Embroidened Leih...', count: '23244a' },
        { name: 'Bristol Lehenge', count: 15550 },
        { name: 'Printed Lehenge', count: 1956 },
        { name: 'Bridemand Lehen...', count: 5438 },
        { name: 'Cocktail Lehenge', count: 1318 },
        { name: 'Traditional Lehenge', count: 2279 }
    ];

    const blouses = [
        { name: 'Katajharia', count: 1183 },
        { name: 'Embroidened Leih...', count: '23244a' },
        { name: 'Bristol Lehenge', count: 15550 },
        { name: 'Printed Lehenge', count: 1956 },
        { name: 'Bridemand Lehen...', count: 5438 },
        { name: 'Cocktail Lehenge', count: 1318 },
        { name: 'Traditional Lehenge', count: 2279 }
    ];

    const sizes = [
        { name: 'XS', count: 29565 },
        { name: 'S', count: 32512 },
        { name: 'M', count: '3300a' },
        { name: 'L', count: 32735 },
        { name: 'XL', count: 3119 },
        { name: 'XXL', count: 27246 },
        { name: 'ZKL', count: 32246 }
    ];

    const colors = [
        { name: 'White', count: 2914, color: 'bg-white border' },
        { name: 'Red', count: 2649, color: 'bg-red-500' },
        { name: 'Green', count: 2316, color: 'bg-green-500' },
        { name: 'Pink', count: 2179, color: 'bg-pink-500' },
        { name: 'Yellow', count: 1924, color: 'bg-yellow-500' },
        { name: 'Purple', count: 1815, color: 'bg-purple-500' },
        { name: 'Black', count: 1013, color: 'bg-black' },
        { name: 'Blue', count: 977, color: 'bg-blue-500' }
    ];

    const discounts = [
        { name: '0% - 20%', count: 4641 },
        { name: '21% - 30%', count: 4641 },
        { name: '33% - 40%', count: 11 }
    ];

    return (
        <div className="w-80 bg-white p-6 border-r border-gray-200">
            <FilterSection title="CATEGORY" items={categories} searchable />
            <FilterSection title="BLOUSES" items={blouses} searchable />
            <FilterSection title="SIZE" items={sizes} />
            <ColorFilter title="COLORS" colors={colors} />
            <FilterSection title="DISCOUNT" items={discounts} />
            <PriceRange />
        </div>
    );
};

export default SidebarFilters;