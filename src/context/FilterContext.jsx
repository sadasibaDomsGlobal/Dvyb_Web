// src/context/FilterContext.jsx
import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) throw new Error('useFilter must be used within a FilterProvider');
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

    const updateFilter = (filterType, value) => {
        setSelectedFilters(prev => {
            const newFilters = { ...prev };

            switch (filterType) {
                case 'categories':
                    if (newFilters.categories.includes(value)) {
                        newFilters.categories = [];
                        // Do NOT clear navbarCategory
                    } else {
                        newFilters.categories = [value];
                        setNavbarCategory(value); // Keep UI in sync
                    }
                    break;

                case 'sizes':
                case 'colors':
                case 'discounts':
                    newFilters[filterType] = newFilters[filterType].includes(value)
                        ? newFilters[filterType].filter(item => item !== value)
                        : [...newFilters[filterType], value];
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
        navbarCategory, // Optional: for active nav highlight
    };

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
};