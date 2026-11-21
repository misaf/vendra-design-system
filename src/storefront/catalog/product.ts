/** Laravel's stable product token, shared across the storefront features. */
export type ProductCode = string;

export interface CatalogPrice {
  amount: number;
  currency: string;
}

/** The current catalog offer. A missing price requires a fresh quote before purchase. */
export interface CatalogProduct {
  id: number;
  code: ProductCode;
  name: Record<string, string>;
  slug: Record<string, string>;
  inStock: boolean;
  price: CatalogPrice | null;
}

export interface LiveCatalogProduct {
  token: ProductCode;
  name?: Record<string, unknown>;
  description?: Record<string, unknown>;
  inStock?: boolean;
  latestProductPrice?: unknown;
}
