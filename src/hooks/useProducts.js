// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { productService } from '../services/firebaseServices';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await productService.fetchAllProducts();
        console.log('******************** All products fetched:', data);
        // const published = data.filter(p => p.isPublished === true);
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { products, loading, error };
};