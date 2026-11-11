import { create, isAxiosError } from 'axios';

import type { ApiProduct } from '@/types/api';

const api = create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 15000,
});


export async function fetchProducts(): Promise<ApiProduct[]> {
  const { data } = await api.get<ApiProduct[]>('/products');
  return data;
}


export async function fetchProductById(id: number): Promise<ApiProduct> {
  const { data } = await api.get<ApiProduct>(`/products/${id}`);
  return data;
}


export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return 'La solicitud tardó demasiado. Revisa tu conexión e inténtalo de nuevo.';
    }
    if (!error.response) {
      return 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
    }
    return `El servidor respondió con un error (${error.response.status}). Inténtalo más tarde.`;
  }
  return 'Ocurrió un error inesperado al cargar los productos.';
}
