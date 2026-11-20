export type PaymentMethodId = 'online' | 'card' | 'cod' | 'wallet' | 'whatsapp';

/** One of the store's payment methods, with its settings. A store offers the methods it lists. */
export type PaymentMethod =
  | {id: 'online'}
  | {
      id: 'card';
      /** The store's card, 16 digits */
      cardNumber: string;
      /** Localized: {en, fa} */
      holder: Record<string, string>;
      bank: Record<string, string>;
      /** The account's IBAN (IR…), shown with a copy button */
      sheba?: string;
    }
  | {
      id: 'cod';
      /** Delivery zone ids where the courier takes payment. Default: every zone */
      zones?: string[];
    }
  | {id: 'wallet'}
  | {id: 'whatsapp'};

export type PaymentOption = PaymentMethod & {
  available: boolean;
  /** Why it can't be used for this order */
  reason?: 'zone' | 'signIn' | 'balance';
};

/** Every payment method the storefront supports, in its default order. */
export declare const PAYMENT_METHODS: PaymentMethodId[];

/** The store's methods (in its order, unknown ids dropped), each marked available or not for this
 * order: pay on delivery outside its zones, or a balance that is missing or short of `total`. */
export declare function paymentOptions(
  methods: PaymentMethod[],
  order?: {zone?: string; balance?: number | null; total?: number}
): PaymentOption[];

/** `chosen` while usable, else the balance when it covers the order, else the first usable; null when none is. */
export declare function defaultPaymentMethod(
  options: PaymentOption[],
  chosen?: string | null
): PaymentMethodId | null;
