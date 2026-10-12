// Sample promo codes. Amounts are in Toman.
// Edit this file, then run: npm --prefix templates run build
// percent comes off the subtotal; min is the smallest subtotal the code accepts.
// The rules are in components/utils/commerce.js; these functions pass VF_PROMOS to them.
import {commerce} from '../../components/utils/commerce.js';
export const VF_PROMOS = [
  {code: 'WELCOME10', percent: 10, min: 0},
  {code: 'ROSES15', percent: 15, min: 4_000_000}
];

// {promo} when the code applies to this subtotal, otherwise {error: 'unknown' | 'min', min}.
export function vfPromoCheck(value, sub) {
  return commerce.promoCheck(value, sub, VF_PROMOS);
}

// The discount for the bag's applied code; 0 once the subtotal drops below its minimum.
export function vfDiscount(code, sub) {
  return commerce.discount(code, sub, VF_PROMOS);
}

// Order summary rows; discounts, when there are any, sit under the subtotal. labels.balanceDiscount
// reads like 'Balance discount · {percent}%'; num formats its percent.
/** @param {(value: number) => string} [num] */
export function vfSummaryRows(totals, code, labels, money, num = String) {
  return commerce.summaryRows(totals, code, labels, money, num);
}
