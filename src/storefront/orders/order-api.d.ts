import type {ApiRecord} from '../catalog/product-api.js';

/** API order status → storefront step. */
export declare const ORDER_STATUS: Record<string, string>;

export declare function orderFromApi(
  order: ApiRecord,
  options: {
    line(line: ApiRecord): Record<string, any>;
    delivery: Record<string, any>;
    method: string;
    preferredLocale: 'en' | 'fa';
  }
): Record<string, any>;
