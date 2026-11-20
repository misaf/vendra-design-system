import type {LatLng} from '../../design-system/utils/coordinates.js';
import type {Stock} from '../../design-system/utils/stock.js';
import type {
  normalizeCode,
  normalizeSearchText,
  searchIndex,
  matchesSearch
} from '../catalog/search-index.js';
import type {directionsLinks, distanceKm, zoneAt, zoneFromApi} from '../delivery/delivery-zones.js';
import type {page} from '../catalog/pagination.js';
import type {fillText} from '../delivery/delivery-copy.js';
import type {apiRecord, stockStatus, imageFromApi, productFromApi} from '../catalog/product-api.js';
import type {lineFromApi} from '../cart/order-line-api.js';
import type {ORDER_STATUS, orderFromApi} from '../orders/order-api.js';
import type {STORE_FEATURES, storeFeatures} from '../store/store-features.js';
import type {
  PAYMENT_METHODS,
  paymentOptions,
  defaultPaymentMethod
} from '../checkout/payment-options.js';
import type {checkoutRequest} from '../checkout/checkout-request.js';

import type {
  isoDate,
  cutoffText,
  deliveryDays,
  openDay,
  deliverySlots,
  openSlot
} from '../delivery/delivery-window.js';
import type {openingStatus, hoursSummary, hoursExceptions} from '../store/opening-hours.js';
import type {
  promoCode,
  freeDelivery,
  promoCheck,
  discount,
  balanceDiscountOn,
  balanceDiscount,
  totals,
  summaryRows
} from '../pricing/order-totals.js';

export type {LatLng, Stock};
export type {DeliveryDay, SlotHours, DeliverySlotState} from '../delivery/delivery-window.js';
export type {
  OpeningRange,
  OpeningException,
  OpeningHours,
  OpeningStatus,
  OpeningGroup
} from '../store/opening-hours.js';
export type {
  Promo,
  PromoResult,
  BalanceRules,
  FreeDeliveryRules,
  TotalsRules,
  Totals,
  SummaryRow,
  SummaryLabels
} from '../pricing/order-totals.js';
export type {DirectionsApp, Zone} from '../delivery/delivery-zones.js';
export type {ApiRecord, ApiPhoto} from '../catalog/product-api.js';
export type {Size, Addon} from '../cart/order-line-api.js';
export type {StoreFeature} from '../store/store-features.js';
export type {PaymentMethodId, PaymentMethod, PaymentOption} from '../checkout/payment-options.js';
export type {CheckoutRequest, DeliverySlot} from '../checkout/checkout-request.js';

export interface Commerce {
  STORE_FEATURES: typeof STORE_FEATURES;
  storeFeatures: typeof storeFeatures;
  PAYMENT_METHODS: typeof PAYMENT_METHODS;
  paymentOptions: typeof paymentOptions;
  defaultPaymentMethod: typeof defaultPaymentMethod;
  /** Persian and Arabic digits → Latin. */
  latin(value: unknown): string;
  normalizeCode: typeof normalizeCode;
  normalizeSearchText: typeof normalizeSearchText;
  searchIndex: typeof searchIndex;
  matchesSearch: typeof matchesSearch;
  promoCode: typeof promoCode;
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
  directionsLinks: typeof directionsLinks;
  distanceKm: typeof distanceKm;
  zoneAt: typeof zoneAt;
  isoDate: typeof isoDate;
  cutoffText: typeof cutoffText;
  deliveryDays: typeof deliveryDays;
  openDay: typeof openDay;
  deliverySlots: typeof deliverySlots;
  openSlot: typeof openSlot;
  openingStatus: typeof openingStatus;
  hoursSummary: typeof hoursSummary;
  hoursExceptions: typeof hoursExceptions;
  freeDelivery: typeof freeDelivery;
  promoCheck: typeof promoCheck;
  discount: typeof discount;
  balanceDiscountOn: typeof balanceDiscountOn;
  balanceDiscount: typeof balanceDiscount;
  totals: typeof totals;
  summaryRows: typeof summaryRows;
  page: typeof page;
  fillText: typeof fillText;
  apiRecord: typeof apiRecord;
  stockStatus: typeof stockStatus;
  imageFromApi: typeof imageFromApi;
  productFromApi: typeof productFromApi;
  zoneFromApi: typeof zoneFromApi;
  lineFromApi: typeof lineFromApi;
  ORDER_STATUS: typeof ORDER_STATUS;
  orderFromApi: typeof orderFromApi;
  checkoutRequest: typeof checkoutRequest;
}
/** Storefront commerce rules (delivery, totals, promo and balance discounts, API adapters) as pure functions. */
export declare const commerce: Commerce;
