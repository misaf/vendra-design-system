// Compatibility entry for the design-system gallery. Each capability owns its rules.
import {latin, phone, mobile, isMobile} from '../utils/input.js';
import {validLocation, pinLocation} from '../utils/coordinates.js';
import {
  isoDate,
  cutoffText,
  deliveryDays,
  openDay,
  deliverySlots,
  openSlot
} from '../../storefront/delivery/delivery-window.js';
import {openingStatus, hoursSummary, hoursExceptions} from '../../storefront/store/opening-hours.js';
import {
  promoCode,
  freeDelivery,
  promoCheck,
  discount,
  balanceDiscountOn,
  balanceDiscount,
  totals,
  summaryRows
} from '../../storefront/pricing/order-totals.js';
import {
  normalizeCode,
  normalizeSearchText,
  searchIndex,
  matchesSearch
} from '../../storefront/catalog/search-index.js';
import {directionsLinks, distanceKm, zoneAt, zoneFromApi} from '../../storefront/delivery/delivery-zones.js';
import {page} from '../../storefront/catalog/pagination.js';
import {fillText} from '../../storefront/delivery/delivery-copy.js';
import {apiRecord, stockStatus, imageFromApi, productFromApi} from '../../storefront/catalog/product-api.js';
import {lineFromApi} from '../../storefront/cart/order-line-api.js';
import {ORDER_STATUS, orderFromApi} from '../../storefront/orders/order-api.js';
import {STORE_FEATURES, storeFeatures} from '../../storefront/store/store-features.js';
import {
  PAYMENT_METHODS,
  paymentOptions,
  defaultPaymentMethod
} from '../../storefront/checkout/payment-options.js';
import {checkoutRequest} from '../../storefront/checkout/checkout-request.js';

export const commerce = {
  latin,
  normalizeCode,
  normalizeSearchText,
  searchIndex,
  matchesSearch,
  promoCode,
  phone,
  mobile,
  isMobile,
  validLocation,
  pinLocation,
  directionsLinks,
  distanceKm,
  zoneAt,
  isoDate,
  cutoffText,
  deliveryDays,
  openDay,
  deliverySlots,
  openSlot,
  openingStatus,
  hoursSummary,
  hoursExceptions,
  freeDelivery,
  promoCheck,
  discount,
  balanceDiscountOn,
  balanceDiscount,
  totals,
  summaryRows,
  page,
  fillText,
  apiRecord,
  imageFromApi,
  productFromApi,
  stockStatus,
  zoneFromApi,
  lineFromApi,
  ORDER_STATUS,
  orderFromApi,
  STORE_FEATURES,
  storeFeatures,
  PAYMENT_METHODS,
  paymentOptions,
  defaultPaymentMethod,
  checkoutRequest
};
