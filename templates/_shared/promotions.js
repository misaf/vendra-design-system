// Sample promo codes. Amounts are in Toman.
// Edit this file, then run: npm --prefix templates run build
// percent comes off the subtotal; min is the smallest subtotal the code accepts.
const VF_PROMOS = [
  {code: 'WELCOME10', percent: 10, min: 0},
  {code: 'ROSES15', percent: 15, min: 4_000_000}
];

// Codes are matched without case, spaces or Persian digits.
function vfPromoCode(value) {
  return vfLatin(value || '')
    .replace(/\s/g, '')
    .toUpperCase();
}

// {promo} when the code applies to this subtotal, otherwise {error: 'unknown' | 'min', min}.
function vfPromoCheck(value, sub) {
  const promo = VF_PROMOS.find(p => p.code === vfPromoCode(value));
  if (!promo) return {error: 'unknown'};
  if (sub < promo.min) return {error: 'min', min: promo.min};
  return {promo};
}

// The discount for the bag's applied code; 0 once the subtotal drops below its minimum.
function vfDiscount(code, sub) {
  const {promo} = code ? vfPromoCheck(code, sub) : {};
  return promo ? Math.round((sub * promo.percent) / 100) : 0;
}

// Order summary rows; discounts, when there are any, sit under the subtotal. labels.balanceDiscount
// reads like 'Balance discount · {percent}%'; num formats its percent.
function vfSummaryRows(totals, code, labels, money, num = String) {
  return [
    {label: labels.sub, value: money(totals.sub)},
    ...(totals.discount
      ? [
          {
            label: labels.discount + ' · ' + vfPromoCode(code),
            value: '−⁨' + money(totals.discount) + '⁩'
          }
        ]
      : []),
    ...(totals.balanceDiscount
      ? [
          {
            label: (labels.balanceDiscount || 'Balance discount · {percent}%').replace(
              '{percent}',
              num(totals.balancePercent)
            ),
            value: '−⁨' + money(totals.balanceDiscount) + '⁩'
          }
        ]
      : []),
    {label: labels.fee, value: totals.fee ? money(totals.fee) : labels.free},
    {label: labels.total, value: money(totals.total), strong: true}
  ];
}
