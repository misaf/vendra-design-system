// Compatibility entry for the design-system gallery. Each capability owns its rules.
import {latin, phone, mobile, isMobile} from '../../design-system/utils/input.js';
import {validLocation, pinLocation} from '../../design-system/utils/coordinates.js';
import {
  isoDate,
  cutoffText,
  deliveryDays,
  openDay,
  deliverySlots,
  openSlot
} from '../delivery/delivery-window.js';
import {openingStatus, hoursSummary, hoursExceptions} from '../store/opening-hours.js';
import {
  promoCode,
  freeDelivery,
  promoCheck,
  discount,
  balanceDiscountOn,
  balanceDiscount,
  totals,
  summaryRows
} from '../pricing/order-totals.js';
import {
  normalizeCode,
  normalizeSearchText,
  searchIndex,
  matchesSearch
} from '../catalog/search-index.js';
import {directionsLinks, distanceKm, zoneAt, zoneFromApi} from '../delivery/delivery-zones.js';
import {page} from '../catalog/pagination.js';
import {fillText} from '../delivery/delivery-copy.js';
import {apiRecord, stockStatus, imageFromApi, productFromApi} from '../catalog/product-api.js';
import {lineFromApi} from '../cart/order-line-api.js';
import {ORDER_STATUS, orderFromApi} from '../orders/order-api.js';
import {STORE_FEATURES, storeFeatures} from '../store/store-features.js';
import {
  PAYMENT_METHODS,
  paymentOptions,
  defaultPaymentMethod
} from '../checkout/payment-options.js';
import {checkoutRequest} from '../checkout/checkout-request.js';

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
