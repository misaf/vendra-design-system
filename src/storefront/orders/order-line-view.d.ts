import type {PurchasedOrderLine} from './purchase.js';

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

/** View data for an accepted order line. */
export declare function purchasedLineView(
  line: PurchasedOrderLine,
  options: {
    products: Record<string, any>[];
    sizes: Size[];
    addons: Addon[];
    placeholder: string;
    describe(product: any, size: Size | null, addons: Addon[], lang: 'en' | 'fa'): string;
  }
): Record<string, any>;

export declare function orderLineDisplay(
  line: Record<string, any>,
  locale: 'en' | 'fa'
): {name: string; detail: string; quantity: number; amount: number};

export declare function snapshotDemoOrderLine<T>(
  line: T
): T & {acceptedName: string; acceptedAmount: number};
