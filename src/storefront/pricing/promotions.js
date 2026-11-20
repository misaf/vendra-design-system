import {promoCheck, discount, summaryRows, VF_PROMOS} from './order-totals.js';

// {promo} when the code applies to this subtotal, otherwise {error: 'unknown' | 'min', min}.
export function vfPromoCheck(value, sub) {
  return promoCheck(value, sub, VF_PROMOS);
}

// The discount for the bag's applied code; 0 once the subtotal drops below its minimum.
export function vfDiscount(code, sub) {
  return discount(code, sub, VF_PROMOS);
}

// Order summary rows; discounts, when there are any, sit under the subtotal. labels.balanceDiscount
// reads like 'Balance discount · {percent}%'; num formats its percent.
/** @param {(value: number) => string} [num] */
export function vfSummaryRows(totals, code, labels, money, num = String) {
  return summaryRows(totals, code, labels, money, num);
}
