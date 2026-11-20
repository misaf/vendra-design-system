import type {ApiRecord} from '../catalog/product-api.js';

/** A product size; `price` is added to the product's price. */
export interface Size {
  id: string;
  price: number;
  name: Record<'en' | 'fa', string>;
  detail: Record<'en' | 'fa', string>;
}

/** An extra a product can take, such as a handwritten card. */
export interface Addon {
  id: string;
  price: number;
  name: Record<'en' | 'fa', string>;
}

/** A bag line from an API OrderLine (metadata: token, size, addons, cardMessage). */
export declare function lineFromApi(
  line: ApiRecord,
  options: {
    products: Record<string, any>[];
    sizes: Size[];
    addons: Addon[];
    placeholder: string;
    describe(product: any, size: Size | null, addons: Addon[], lang: 'en' | 'fa'): string;
  }
): Record<string, any>;
