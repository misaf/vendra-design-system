import type {CatalogPrice, ProductCode} from '../catalog/product';

export interface CartSelection {
  id: number;
  sellableType: string;
  sellableId: number;
  productCode: ProductCode | null;
  quantity: number;
  size: string | null;
  selectedAddOns: string[];
  cardMessage: string | null;
}

export interface CartOffer {
  name: Record<string, string>;
  price: CatalogPrice | null;
  inStock: boolean;
}

/** A cart selection together with its current base offer, before Laravel prices checkout. */
export interface CartReviewLine {
  selection: CartSelection;
  offer: CartOffer | null;
}

/** The browser's selected configuration and the offer last shown in the bag. */
export interface BagLine {
  id: string;
  productId: ProductCode;
  token: ProductCode;
  size: string | null;
  addons: string[];
  qty: number;
  unit: number;
  card?: string;
  image: import('../catalog/product-api.js').ApiPhoto;
  en: [string, string];
  fa: [string, string];
}
