// Shared Persian digits and currency formatting. Uses the core AG_FORMAT API.
const VF_FA_DIGITS = s => String(s).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
// Persian or Arabic digits typed into a field, as Latin digits; null and undefined become ''.
function vfLatin(value) {
  return window.AG_COMMERCE.latin(value);
}
const VF_MONEY = (n, fa) =>
  window.AG_FORMAT.money(n, {
    lang: fa ? 'fa' : 'en',
    currency: VF_STORE.currency
  });
