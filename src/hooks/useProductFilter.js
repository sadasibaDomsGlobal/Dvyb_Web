// src/hooks/useProductFilter.js
import { useMemo } from 'react';
import { useFilter } from '../context/FilterContext';

export const useProductFilter = (products = []) => {
  const { selectedFilters } = useFilter();

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) return [];

    return products.filter(product => {
      // === CATEGORY FILTER: EXACT MATCH ===
      if (selectedFilters.categories?.length > 0) {
        const selectedCat = selectedFilters.categories[0];
        const productCat = product.category?.trim();
        const productDress = product.dressType?.trim();

        const matchesCategory =
          (productCat && productCat.toUpperCase() === selectedCat.toUpperCase()) ||
          (productDress && productDress.toUpperCase() === selectedCat.toUpperCase());

        if (!matchesCategory) return false;
      }

      // === SIZE FILTER ===
      if (selectedFilters.sizes?.length > 0) {
        const productSizes = product.selectedSizes || [];
        const hasSizeMatch = selectedFilters.sizes.some(selectedSize =>
          productSizes.some(size => size.trim().toUpperCase() === selectedSize.toUpperCase())
        );
        if (!hasSizeMatch) return false;
      }

      // === COLOR FILTER ===
      if (selectedFilters.colors?.length > 0) {
        const productColors = product.selectedColors || [];
        const hasColorMatch = selectedFilters.colors.some(selectedColor => {
          const [colorName] = selectedColor.split('_');
          return productColors.some(color => {
            const [pcName] = color.split('_');
            return pcName?.trim().toUpperCase() === colorName.toUpperCase();
          });
        });
        if (!hasColorMatch) return false;
      }

      // === PRICE FILTER ===
      const productPrice = Number(product.price) || 0;
      if (selectedFilters.priceMin != null && productPrice < selectedFilters.priceMin) return false;
      if (selectedFilters.priceMax != null && productPrice > selectedFilters.priceMax) return false;

      return true;
    });
  }, [products, selectedFilters]);

  return filteredProducts;
};