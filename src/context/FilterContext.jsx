// src/context/FilterContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const FilterContext = createContext();

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        categories: [],
        sizes: [],
        colors: [],
        priceRange: { min: 0, max: 50000 },
        discounts: []
    });

    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        sizes: [],
        colors: [],
        priceMin: null,
        priceMax: null,
        discounts: []
    });

    const [navbarCategory, setNavbarCategory] = useState('');

    useEffect(() => {
        if (navbarCategory) {
            setSelectedFilters(prev => ({
                ...prev,
                categories: [navbarCategory]
            }));
        }
    }, [navbarCategory]);

    const updateFilter = (filterType, value) => {
        setSelectedFilters(prev => {
            const newFilters = { ...prev };

            switch (filterType) {
                case 'categories':
                    if (newFilters.categories.includes(value)) {
                        newFilters.categories = [];
                        setNavbarCategory('');
                    } else {
                        newFilters.categories = [value];
                        if (navbarCategory && navbarCategory !== value) {
                            setNavbarCategory(value);
                        }
                    }
                    break;

                case 'sizes':
                case 'colors':
                case 'discounts':
                    if (newFilters[filterType].includes(value)) {
                        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
                    } else {
                        newFilters[filterType] = [...newFilters[filterType], value];
                    }
                    break;

                case 'priceMin':
                    newFilters.priceMin = value;
                    break;

                case 'priceMax':
                    newFilters.priceMax = value;
                    break;

                default:
                    break;
            }

            return newFilters;
        });
    };

    const setCategoryFromNavbar = (category) => {
        setNavbarCategory(category);
    };

    const clearAllFilters = () => {
        setSelectedFilters({
            categories: [],
            sizes: [],
            colors: [],
            priceMin: null,
            priceMax: null,
            discounts: []
        });
        setNavbarCategory('');
    };

    const value = {
        filters,
        setFilters,
        selectedFilters,
        updateFilter,
        clearAllFilters,
        navbarCategory,
        setCategoryFromNavbar
    };

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
};
