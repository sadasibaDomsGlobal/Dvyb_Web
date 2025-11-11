// src/context/FilterContext.jsx
import { createContext, useContext, useState } from 'react';

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

    // Function to update filters
    const updateFilter = (filterType, value) => {
        setSelectedFilters(prev => {
            const newFilters = { ...prev };

            switch (filterType) {
                case 'categories':
                case 'sizes':
                case 'colors':
                case 'discounts':
                    if (newFilters[filterType].includes(value)) {
                        // Remove if already selected
                        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
                    } else {
                        // Add if not selected
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

    // Function to clear all filters
    const clearAllFilters = () => {
        setSelectedFilters({
            categories: [],
            sizes: [],
            colors: [],
            priceMin: null,
            priceMax: null,
            discounts: []
        });
    };

    const value = {
        filters,
        setFilters,
        selectedFilters,
        updateFilter,
        clearAllFilters
    };

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
};