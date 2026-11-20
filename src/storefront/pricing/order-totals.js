import {latin} from '../../../ui/utils/input.js';

// A promo code as entered: case, spaces and digit scripts don't matter.
export const promoCode = value =>
  latin(value || '')
    .replace(/\s/g, '')
    .toUpperCase();
// Free delivery: the subtotal reaches `threshold` in one of `zones`.
export const freeDelivery = (zoneId, subtotal, rules) =>
  !!rules && subtotal >= rules.threshold && rules.zones.includes(zoneId);

// Promo codes are {code, percent, min}. {promo} when the code applies, otherwise {error, min?}.
export const promoCheck = (value, subtotal, promos) => {
  const promo = promos.find(item => item.code === promoCode(value));
  if (!promo) return {error: 'unknown'};
  if (subtotal < promo.min) return {error: 'min', min: promo.min};
  return {promo};
};
// The discount a code gives; 0 when it doesn't apply.
export const discount = (code, subtotal, promos) => {
  const {promo} = code ? promoCheck(code, subtotal, promos) : {};
  return promo ? Math.round((subtotal * promo.percent) / 100) : 0;
};

// Balance rules are {discountFrom, discountPercent}: paying from a balance of at least discountFrom
// takes discountPercent off the products.
export const balanceDiscountOn = (balance, rules) =>
  !!rules && balance != null && balance >= rules.discountFrom;
export const balanceDiscount = (balance, products, rules) =>
  balanceDiscountOn(balance, rules) ? Math.round((products * rules.discountPercent) / 100) : 0;

// An order's totals. Lines are {unit, qty}; `zone` is {id, fee}; `promo` is the applied code and
// `balance` the balance paid from (null otherwise). Rules: {freeDelivery, promos, wallet}.
export const totals = (lines, {zone, promo, balance = null}, rules) => {
  const sub = lines.reduce((sum, line) => sum + line.unit * line.qty, 0);
  const fee = freeDelivery(zone.id, sub, rules.freeDelivery) ? 0 : zone.fee;
  const promoDiscount = discount(promo, sub, rules.promos || []);
  const fromBalance = balanceDiscount(balance, sub - promoDiscount, rules.wallet);
  return {
    sub,
    fee,
    discount: promoDiscount,
    ...(fromBalance
      ? {balanceDiscount: fromBalance, balancePercent: rules.wallet.discountPercent}
      : {}),
    total: sub - promoDiscount - fromBalance + fee
  };
};

// Order summary rows; discounts sit under the subtotal. The caller localizes the labels.
export const summaryRows = (result, code, labels, money, num = String) => [
  {label: labels.sub, value: money(result.sub)},
  ...(result.discount
    ? [
        {
          label: labels.discount + ' · ' + promoCode(code),
          value: '−⁨' + money(result.discount) + '⁩'
        }
      ]
    : []),
  ...(result.balanceDiscount
    ? [
        {
          label: labels.balanceDiscount.replace('{percent}', num(result.balancePercent)),
          value: '−⁨' + money(result.balanceDiscount) + '⁩'
        }
      ]
    : []),
  {label: labels.fee, value: result.fee ? money(result.fee) : labels.free},
  {label: labels.total, value: money(result.total), strong: true}
];
