import type { ApiProduct } from '@/types/api';
import type { Product } from '@/types/product';


export function mapApiProductToProduct(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    name: apiProduct.title.trim(),
    imageUrl: apiProduct.image,
    price: apiProduct.price,
    category: apiProduct.category,
    description: apiProduct.description,
  };
}

/** Aplica el mapper a toda la colección. */
export function mapApiProducts(apiProducts: ApiProduct[]): Product[] {
  return apiProducts.map(mapApiProductToProduct);
}
