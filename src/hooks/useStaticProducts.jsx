// src/hooks/useProducts.js
import { useEffect, useState, useCallback } from "react";
import { productService } from "../services/firebaseServices";
import { Product } from "../models/B2CProductModel"; 
import staticProducts from "../static/landing/wedding"

export function usestaticProducts() {
  const [state, setState] = useState({
    staticProducts: [],
    loading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    try {
      setState((s) => ({ ...s, loading: true, error: null }));
      const data = await productService;
      setState({ staticProducts: data, loading: false, error: null });
    } catch (err) {
      console.error(err);
      setState({ staticProducts: [], loading: false, error: err.message });
    }
  }, []);

  useEffect(() => {
    fetch();
    // optional: real-time listener with onSnapshot
  }, [fetch]);

  return { ...state, refetch: fetch };
}