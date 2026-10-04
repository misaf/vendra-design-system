// Shared Persian digits and currency formatting. Uses the core AG_FORMAT API.
const VF_FA_DIGITS = s => String(s).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const VF_MONEY = (n, fa) => window.AG_FORMAT.money(n, {
  lang: fa ? 'fa' : 'en'
});
