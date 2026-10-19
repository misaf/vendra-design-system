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
export const VF_MONEY = (n, fa) =>
  format.money(n, {
    lang: fa ? 'fa' : 'en',
    currency: VF_STORE.currency,
    currencies: VF_STORE.currencies
  });
