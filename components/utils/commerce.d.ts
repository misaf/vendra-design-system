export interface LatLng {
  lat: number;
  lng: number;
}
/** A delivery zone as the storefront uses it (see zoneFromApi). */
export interface Zone {
  /** The storefront's key, e.g. 'central'. */
  id: string;
  apiId?: number;
  /** Delivery fee in Toman. */
  fee: number;
  /** Same-day cut-off, "18:00". */
  cutoff: string;
  /** Reach in km from `center`, or from the studio. */
  km: number;
  center?: LatLng;
  en: string;
  fa: string;
}
export interface DeliveryDay {
  iso: string;
  date: Date;
  offset: number;
  soldOut: boolean;
  pastCutoff: boolean;
}
/** A delivery slot's start and end hour, e.g. {start: '08', end: '12'}. */
export interface SlotHours {
  start: string;
  end: string;
}
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
export interface DeliverySlotState {
  start: string;
  end: string;
  closed: boolean;
}
export interface Promo {
  code: string;
  percent: number;
  /** Smallest subtotal the code accepts. */
  min: number;
}
export type PromoResult = {promo: Promo} | {error: 'unknown'} | {error: 'min'; min: number};
export interface BalanceRules {
  discountFrom: number;
  discountPercent: number;
}
export interface FreeDeliveryRules {
  threshold: number;
  /** Zone keys that deliver free above the threshold. */
  zones: string[];
}
export interface TotalsRules {
  freeDelivery?: FreeDeliveryRules;
  promos?: Promo[];
  wallet?: BalanceRules;
}
export interface Totals {
  sub: number;
  fee: number;
  discount: number;
  balanceDiscount?: number;
  balancePercent?: number;
  total: number;
}
export interface SummaryRow {
  label: string;
  value: string;
  strong?: boolean;
}
export interface SummaryLabels {
  sub: string;
  discount: string;
  /** e.g. 'Balance discount · {percent}%'. */
  balanceDiscount?: string;
  fee: string;
  free: string;
  total: string;
}
/** Records as the Vendra API returns them (uploads/openapi-*.json). */
/** A product's availability: in stock, few left, back soon (on `date`, ISO, when known) or sold out. */
export type Stock =
  | {status: 'in'}
  | {status: 'low'; count: number}
  | {status: 'soon'; date: string | null}
  | {status: 'out'};
export interface ApiRecord {
  id: number;
  [field: string]: any;
}
export interface DeliverySlot {
  id: number;
  name: Record<string, string>;
  /** "08:00" */
  startsAt: string;
  endsAt: string;
}
/** The Checkout request body (POST /api/sales/checkout). */
/** A way to pay; also the Checkout `gateway`. */
/** An optional part of the storefront a store turns on (commerce.STORE_FEATURES). */
export type StoreFeature =
  'promoCodes' | 'sameDay' | 'weddings' | 'journal' | 'reminders' | 'newsletter';
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
export interface CheckoutRequest {
  cartToken: string;
  currencyCode: string | null;
  gateway: string | null;
  paymentReference: string | null;
  cardMessage: string | null;
  recipientName: string | null;
  addressId: number | null;
  latitude: number | null;
  longitude: number | null;
  deliveryDate: string | null;
  deliverySlotId: number | null;
}
export interface Commerce {
  /** Every payment method the package knows, in its default order. */
  STORE_FEATURES: StoreFeature[];
  /** The store's feature list as one boolean per STORE_FEATURES id; unknown ids are dropped. */
  storeFeatures(list: readonly string[] | null | undefined): Record<StoreFeature, boolean>;
  PAYMENT_METHODS: PaymentMethodId[];
  /** The store's methods (in its order, unknown ids dropped), each marked available or not for this
   * order: pay on delivery outside its zones, or a balance that is missing or short of `total`. */
  paymentOptions(
    methods: PaymentMethod[],
    order?: {zone?: string; balance?: number | null; total?: number}
  ): PaymentOption[];
  /** `chosen` while usable, else the balance when it covers the order, else the first usable; null when none is. */
  defaultPaymentMethod(options: PaymentOption[], chosen?: string | null): PaymentMethodId | null;
  /** Persian and Arabic digits → Latin. */
  latin(value: unknown): string;
  /** A product code typed any way → "VF7K2M4Q". */
  normalizeCode(text: string): string;
  /** A promo code typed any way → "WELCOME10". */
  promoCode(value: string): string;
  /** A phone number without spaces, brackets or dashes, in Latin digits. */
  phone(value: string): string;
  /** An Iranian mobile number as 09xxxxxxxxx, however it was typed (09…, 9…, +98…, 98…, 0098…,
   * any digits and separators); '' when it isn't one. Store and compare numbers in this form. */
  mobile(value: string): string;
  /** mobile(value) !== ''. */
  isMobile(value: string): boolean;
  validLocation(location: unknown): location is LatLng;
  /** A point rounded to six decimals (about 10 cm). */
  pinLocation(point: LatLng): LatLng;
  distanceKm(a: LatLng, b: LatLng): number;
  /** The smallest zone reaching the pin, from its center or `origin`; null outside every zone. */
  zoneAt(
    location: LatLng | null,
    zones: Pick<Zone, 'id' | 'km' | 'center'>[],
    origin: LatLng
  ): string | null;
  /** "YYYY-MM-DD" in local time. */
  isoDate(date: Date): string;
  /** "18:00", or Persian digits isolated for a Persian sentence. */
  cutoffText(cutoff: string, persian: boolean): string;
  deliveryDays(
    cutoff: string,
    /** sameDay: false starts the days tomorrow */
    options: {days: number; soldOutDates?: string[]; sameDay?: boolean},
    now?: Date
  ): DeliveryDay[];
  /** The chosen day when open, otherwise the first open day. */
  openDay(days: DeliveryDay[], chosen?: string): string | undefined;
  deliverySlots(
    iso: string,
    slots: SlotHours[],
    leadMinutes: number,
    now?: Date
  ): DeliverySlotState[];
  /** The chosen slot's start when open, otherwise the first open slot's. */
  openSlot(slots: DeliverySlotState[], chosen: string): string;
  freeDelivery(zoneId: string, subtotal: number, rules?: FreeDeliveryRules): boolean;
  promoCheck(value: string, subtotal: number, promos: Promo[]): PromoResult;
  discount(code: string, subtotal: number, promos: Promo[]): number;
  balanceDiscountOn(balance: number | null, rules?: BalanceRules): boolean;
  balanceDiscount(balance: number | null, products: number, rules?: BalanceRules): number;
  totals(
    lines: {unit: number; qty: number}[],
    order: {zone: Pick<Zone, 'id' | 'fee'>; promo?: string; balance?: number | null},
    rules: TotalsRules
  ): Totals;
  summaryRows(
    totals: Totals,
    code: string,
    labels: SummaryLabels,
    money: (amount: number) => string,
    num?: (value: number) => string
  ): SummaryRow[];
  /** "Show more" paging: the first `page` pages of `size` items. `total` defaults to the list's
   * length; pass the API's total when the list holds only the pages loaded so far. */
  page<T>(
    list: T[],
    page: number,
    size: number,
    total?: number
  ): {items: T[]; page: number; shown: number; total: number; hasMore: boolean};
  /** Fills {fee:<zone>}, {cutoff:<zone>} and {freeDeliveryFrom}. */
  fillText(
    text: string,
    values: {
      fee(zoneId: string): string;
      cutoff(zoneId: string): string;
      freeDeliveryFrom(): string;
    }
  ): string;
  /** A record by its IRI from a list. */
  apiRecord<T extends ApiRecord>(list: T[], iri: string | null | undefined): T | null;
  /** How available an API Product is, from inStock, quantity, stockThreshold, availableSoon and availabilityDate. */
  stockStatus(product: ApiRecord): Stock;
  /** A photo for Picture from an API Multimedia record (null without a URL). responsiveImages:
   * "<width>" → URL in the photo's format, "<format> <width>" ("avif 480", "webp 960") → smaller
   * formats; customProperties: width, height, placeholder (data: URI), alt_en, alt_fa. */
  imageFromApi(record: ApiRecord | null | undefined, lang?: 'en' | 'fa'): ApiPhoto | null;
  /** A storefront product from an API Product, with storefront-only `extras` by token. `image` and
   * `images` are photos for Picture; `en.alts` / `fa.alts` hold their alt text. */
  productFromApi(
    product: ApiRecord,
    sources: {
      prices: ApiRecord[];
      media: ApiRecord[];
      categories: ApiRecord[];
      extras?: Record<string, Record<string, any>>;
      placeholder: string;
    }
  ): Record<string, any>;
  /** A storefront zone from an API DeliveryZone, with `extras` by zone id. */
  zoneFromApi(
    zone: ApiRecord,
    extras?: Record<number, {key?: string; cutoff?: string; center?: LatLng}>
  ): Zone;
  /** A bag line from an API OrderLine (metadata: token, size, addons, cardMessage). */
  lineFromApi(
    line: ApiRecord,
    options: {
      products: Record<string, any>[];
      sizes: Size[];
      addons: Addon[];
      placeholder: string;
      describe(product: any, size: Size | null, addons: Addon[], lang: 'en' | 'fa'): string;
    }
  ): Record<string, any>;
  /** API order status → storefront step. */
  ORDER_STATUS: Record<string, string>;
  orderFromApi(
    order: ApiRecord,
    options: {
      line(line: ApiRecord): Record<string, any>;
      delivery: Record<string, any>;
      method: string;
      preferredLocale: 'en' | 'fa';
    }
  ): Record<string, any>;
  checkoutRequest(
    lines: Record<string, any>[],
    delivery: Record<string, any>,
    options: {
      slots: DeliverySlot[];
      currencyCode?: string;
      deliveryDate?: string;
      lineToken?(line: Record<string, any>): string;
      method?: string;
      last4?: string;
      ref?: string;
      cartToken?: string;
    }
  ): CheckoutRequest;
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
/** Storefront commerce rules (delivery, totals, promo and balance discounts, API adapters) as pure functions. */
export declare const commerce: Commerce;
