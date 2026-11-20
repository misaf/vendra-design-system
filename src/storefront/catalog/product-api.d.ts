import type {Stock} from '../../design-system/utils/stock.js';

/** Records as the Vendra API returns them (tests/fixtures/vendra-openapi.json). */
export interface ApiRecord {
  id: number;
  [field: string]: any;
}

export interface ApiPhoto {
  src: string;
  srcSet?: string;
  sources?: Array<{type: string; srcSet: string}>;
  width?: number;
  height?: number;
  placeholder?: string;
  alt?: string;
}

/** A record by its IRI from a list. */
export declare function apiRecord<T extends ApiRecord>(
  list: T[],
  iri: string | null | undefined
): T | null;

/** How available an API Product is, from inStock, quantity, stockThreshold, availableSoon and availabilityDate. */
export declare function stockStatus(product: ApiRecord): Stock;

/** A photo for Picture from an API Multimedia record (null without a URL). responsiveImages:
 * "<width>" → URL in the photo's format, "<format> <width>" ("avif 480", "webp 960") → smaller
 * formats; customProperties: width, height, placeholder (data: URI), alt_en, alt_fa. */
export declare function imageFromApi(
  record: ApiRecord | null | undefined,
  lang?: 'en' | 'fa'
): ApiPhoto | null;

/** A storefront product from an API Product, with storefront-only `extras` by token. `image` and
 * `images` are photos for Picture; `en.alts` / `fa.alts` hold their alt text. */
export declare function productFromApi(
  product: ApiRecord,
  sources: {
    prices: ApiRecord[];
    media: ApiRecord[];
    categories: ApiRecord[];
    extras?: Record<string, Record<string, any>>;
    placeholder: string;
  }
): Record<string, any>;
