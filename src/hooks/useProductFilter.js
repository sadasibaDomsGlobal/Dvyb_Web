import { useMemo } from 'react';
import { useFilter } from '../context/FilterContext';

export const useProductFilter = (products = []) => {
  const { selectedFilters } = useFilter();

  const filteredProducts = useMemo(() => {
    // ✅ Safety check: handle undefined or invalid products array
    if (!Array.isArray(products) || products.length === 0) return [];

    return products.filter(product => {
      // ✅ Category filter
      if (selectedFilters.categories?.length > 0) {
        const productCategory = product.category?.trim() || '';
        const productDressType = product.dressType?.trim() || '';

        const hasCategoryMatch = selectedFilters.categories.some(selectedCategory =>
          productCategory.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          productDressType.toLowerCase().includes(selectedCategory.toLowerCase())
        );

        if (!hasCategoryMatch) return false;
      }

      // ✅ Size filter
      if (selectedFilters.sizes?.length > 0) {
        const productSizes = product.selectedSizes || [];
        const hasSizeMatch = selectedFilters.sizes.some(selectedSize =>
          productSizes.some(size =>
            size.trim().toUpperCase() === selectedSize.toUpperCase()
          )
        );
        if (!hasSizeMatch) return false;
      }

      // ✅ Color filter
      if (selectedFilters.colors?.length > 0) {
        const productColors = product.selectedColors || [];
        const hasColorMatch = selectedFilters.colors.some(selectedColor => {
          return productColors.some(color => {
            const [colorName] = color.split('_');
            return colorName?.trim().toLowerCase() === selectedColor.toLowerCase();
          });
        });
        if (!hasColorMatch) return false;
      }

      // ✅ Price filter
      const productPrice = Number(product.price) || 0;
      if (selectedFilters.priceMin != null && productPrice < selectedFilters.priceMin) {
        return false;
      }
      if (selectedFilters.priceMax != null && productPrice > selectedFilters.priceMax) {
        return false;
      }

      return true;
    });
  }, [products, selectedFilters]);

  return filteredProducts;
};




















// // src/hooks/useProductFilter.js
// import { useMemo } from 'react';
// import { useFilter } from '../context/FilterContext';

// export const useProductFilter = (products) => {
//   const { selectedFilters } = useFilter();

//   const filteredProducts = useMemo(() => {
//     if (!products.length) return [];

//     return products.filter(product => {
//       // Category filter
//       if (selectedFilters.categories.length > 0) {
//         const productCategory = product.category?.trim() || '';
//         const productDressType = product.dressType?.trim() || '';
        
//         const hasCategoryMatch = selectedFilters.categories.some(selectedCategory => 
//           productCategory.toLowerCase().includes(selectedCategory.toLowerCase()) ||
//           productDressType.toLowerCase().includes(selectedCategory.toLowerCase())
//         );
        
//         if (!hasCategoryMatch) return false;
//       }

//       // Size filter
//       if (selectedFilters.sizes.length > 0) {
//         const productSizes = product.selectedSizes || [];
//         const hasSizeMatch = selectedFilters.sizes.some(selectedSize =>
//           productSizes.some(size => 
//             size.trim().toUpperCase() === selectedSize.toUpperCase()
//           )
//         );
//         if (!hasSizeMatch) return false;
//       }

//       // Color filter
//       if (selectedFilters.colors.length > 0) {
//         const productColors = product.selectedColors || [];
//         const hasColorMatch = selectedFilters.colors.some(selectedColor => {
//           return productColors.some(color => {
//             const [colorName] = color.split('_');
//             return colorName?.trim().toLowerCase() === selectedColor.toLowerCase();
//           });
//         });
//         if (!hasColorMatch) return false;
//       }

//       // Price filter
//       const productPrice = Number(product.price) || 0;
//       if (selectedFilters.priceMin !== null && productPrice < selectedFilters.priceMin) {
//         return false;
//       }
//       if (selectedFilters.priceMax !== null && productPrice > selectedFilters.priceMax) {
//         return false;
//       }

//       return true;
//     });
//   }, [products, selectedFilters]);

//   return filteredProducts;
// };