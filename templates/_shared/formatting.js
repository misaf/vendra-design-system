// Shared Persian digits and currency formatting. Uses the core AG_FORMAT API.
import {VF_STORE} from './store-config.js';
import {commerce} from '../../components/utils/commerce.js';
import {format} from '../../components/utils/format.js';
// Separates the parts of a line of details. Persian uses its comma: a raised dot beside Persian
// digits reads as zero (۰), so «جمع · ۱» looks like ten. Takes the language or `fa` as a boolean.
export const vfSeparator = lang => (lang === true || lang === 'fa' ? '، ' : ' · ');
export const VF_FA_DIGITS = s => String(s).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
// Persian or Arabic digits typed into a field, as Latin digits; null and undefined become ''.
export function vfLatin(value) {
  return commerce.latin(value);
}
// The active currency's entry in the store's table ({rate, decimals, symbol, en, fa}).
const vfCurrency = () => VF_STORE.currencies[VF_STORE.currency];
// The active currency's name, for text that names the unit without an amount ("Amount (Toman)").
export const VF_CURRENCY_NAME = fa => vfCurrency()[fa ? 'fa' : 'en'];
// An amount typed in the active currency (any digits; a decimal point only when it has decimals), as
// whole Toman for storage; '' when nothing is typed.
export function vfAmountFromInput(text) {
  const currency = vfCurrency();
  const typed = vfLatin(text || '').replace(/٫/g, '.');
  const value = currency.decimals
    ? typed.replace(/[^\d.]/g, '').replace(/\.(?=.*\.)/g, '')
    : typed.replace(/\D/g, '');
  return value && value !== '.' ? Math.round(+value / currency.rate) : '';
}
// The keyboard for an amount field: one with a decimal point when the active currency has decimals.
export const vfAmountInputMode = () => (vfCurrency().decimals ? 'decimal' : 'numeric');
// A Toman amount written for an input in the active currency (the reverse of vfAmountFromInput).
export const vfAmountToInput = toman => {
  const currency = vfCurrency();
  return String(+(toman * currency.rate).toFixed(currency.decimals));
};
export const VF_MONEY = (n, fa) =>
  format.money(n, {
    lang: fa ? 'fa' : 'en',
    currency: VF_STORE.currency,
    currencies: VF_STORE.currencies
  });
