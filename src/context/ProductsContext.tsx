import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import { fetchProducts, getErrorMessage } from '@/api/products';
import { mapApiProducts } from '@/mappers/productMapper';
import type { Product } from '@/types/product';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  reload: () => void;
  getProductById: (id: number) => Product | undefined;
}

const ProductsContext = createContext<ProductsState | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(() => {
    fetchProducts()
      .then((apiProducts) => {
        
        setProducts(mapApiProducts(apiProducts));
        setError(null);
      })
      .catch((e: unknown) => setError(getErrorMessage(e)))
      .finally(() => setLoading(false));
  }, []);

  
  useEffect(() => {
    request();
  }, [request]);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    request();
  }, [request]);

  const getProductById = useCallback(
    (id: number) => products.find((p) => p.id === id),
    [products],
  );

  return (
    <ProductsContext.Provider value={{ products, loading, error, reload: load, getProductById }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsState {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error('useProducts debe usarse dentro de ProductsProvider');
  }
  return ctx;
}
