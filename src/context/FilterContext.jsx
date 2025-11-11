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

    // New state for navbar category
    const [navbarCategory, setNavbarCategory] = useState('');

    // Update selected filters when navbar category changes
    useEffect(() => {
        if (navbarCategory) {
            setSelectedFilters(prev => ({
                ...prev,
                categories: [navbarCategory]
            }));
        }
    }, [navbarCategory]);

    // Function to update filters
    const updateFilter = (filterType, value) => {
        setSelectedFilters(prev => {
            const newFilters = { ...prev };

            switch (filterType) {
                case 'categories':
                    // If clicking the same category, deselect it
                    if (newFilters.categories.includes(value)) {
                        newFilters.categories = [];
                        setNavbarCategory('');
                    } else {
                        // Select new category and clear navbar category if it's different
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

    // Function to set navbar category
    const setCategoryFromNavbar = (category) => {
        setNavbarCategory(category);
    };

    // Function to clear all filters including navbar category
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
















// // src/context/FilterContext.jsx
// import { createContext, useContext, useState } from 'react';

// const FilterContext = createContext();

// export const useFilter = () => {
//     const context = useContext(FilterContext);
//     if (!context) {
//         throw new Error('useFilter must be used within a FilterProvider');
//     }
//     return context;
// };

// export const FilterProvider = ({ children }) => {
//     const [filters, setFilters] = useState({
//         categories: [],
//         sizes: [],
//         colors: [],
//         priceRange: { min: 0, max: 50000 },
//         discounts: []
//     });

//     const [selectedFilters, setSelectedFilters] = useState({
//         categories: [],
//         sizes: [],
//         colors: [],
//         priceMin: null,
//         priceMax: null,
//         discounts: []
//     });

//     // NEW: Function to update category from navbar
//     const updateCategoryFromNavbar = (category) => {
//         setSelectedFilters(prev => ({
//             ...prev,
//             categories: [category] // Set only the selected category
//         }));
//     };

//     // NEW: Function to clear category filter
//     const clearCategoryFilter = () => {
//         setSelectedFilters(prev => ({
//             ...prev,
//             categories: []
//         }));
//     };

//     // Function to update filters
//     const updateFilter = (filterType, value) => {
//         setSelectedFilters(prev => {
//             const newFilters = { ...prev };

//             switch (filterType) {
//                 case 'categories':
//                 case 'sizes':
//                 case 'colors':
//                 case 'discounts':
//                     if (newFilters[filterType].includes(value)) {
//                         // Remove if already selected
//                         newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
//                     } else {
//                         // Add if not selected
//                         newFilters[filterType] = [...newFilters[filterType], value];
//                     }
//                     break;

//                 case 'priceMin':
//                     newFilters.priceMin = value;
//                     break;

//                 case 'priceMax':
//                     newFilters.priceMax = value;
//                     break;

//                 default:
//                     break;
//             }

//             return newFilters;
//         });
//     };

//     // Function to clear all filters
//     const clearAllFilters = () => {
//         setSelectedFilters({
//             categories: [],
//             sizes: [],
//             colors: [],
//             priceMin: null,
//             priceMax: null,
//             discounts: []
//         });
//     };

//     const value = {
//         filters,
//         setFilters,
//         selectedFilters,
//         updateFilter,
//         clearAllFilters,
//         updateCategoryFromNavbar, // NEW
//         clearCategoryFilter // NEW
//     };

//     return (
//         <FilterContext.Provider value={value}>
//             {children}
//         </FilterContext.Provider>
//     );
// };