// Shared formatting helpers: import { format } (guidelines/card-runtime.js also exposes it as window.AG_FORMAT for the cards).
// Prices are stored in Toman; rate = units per 1 Toman. CURRENCIES holds only the fixed ones (Toman and
// Rial, 1 Toman = 10 Rial). Any other currency changes in value, so its rate is the tenant's data: pass the
// tenant's table as money(n, {currency, currencies}).
const CURRENCIES = {
  IRT: {rate: 1, decimals: 0, symbol: '', en: 'Toman', fa: 'تومان'},
  IRR: {rate: 10, decimals: 0, symbol: '', en: 'Rial', fa: 'ریال'}
};
// en and fa keep their fixed regions; any other language (a tenant's `locales`) formats by its own code.
const loc = l => (l === 'fa' ? 'fa-IR' : !l || l === 'en' ? 'en-US' : l);
// Normalize separators explicitly so Persian output is stable across browser locale data.
const formatNumber = (n, lang, options = {}) => {
  const formatter = new Intl.NumberFormat(loc(lang), {
    ...options,
    ...(lang === 'fa' ? {numberingSystem: 'arabext'} : {})
  });
  return formatter
    .formatToParts(Number(n))
    .map(p =>
      lang === 'fa' ? (p.type === 'group' ? '٬' : p.type === 'decimal' ? '٫' : p.value) : p.value
    )
    .join('');
};
const number = (n, lang = 'en') => formatNumber(n, lang);
// fa (and any language the currency names): number then label (۴٬۲۰۰٬۰۰۰ تومان) · en: symbol first
// ($42.00), words after (4,200,000 Toman)
const money = (n, {currency = 'IRT', lang = 'en', currencies = CURRENCIES} = {}) => {
  const c = currencies[currency];
  // A price in the wrong currency is worse than none: refuse instead of falling back to Toman.
  if (!c || !(c.rate > 0))
    throw new Error(
      'money: no rate for currency ' +
        JSON.stringify(currency) +
        " — pass the tenant's currencies table"
    );
  const s = formatNumber(Number(n) * c.rate, lang, {
    minimumFractionDigits: c.decimals,
    maximumFractionDigits: c.decimals
  });
  if (lang !== 'en' && c[lang]) return s + ' ' + c[lang];
  return c.symbol ? c.symbol + s : s + ' ' + c.en;
};
export const format = {CURRENCIES, money, number};
