// Shared formatting helpers. Prices are stored in Toman; rate = units per 1 Toman (DEMO rates).
(()=>{
const CURRENCIES={
IRT:{rate:1,dec:0,sym:'',en:'Toman',fa:'تومان'},
IRR:{rate:10,dec:0,sym:'',en:'Rial',fa:'ریال'},
USD:{rate:1/100000,dec:2,sym:'$',en:'USD',fa:'دلار'},
EUR:{rate:1/110000,dec:2,sym:'€',en:'EUR',fa:'یورو'},
AED:{rate:1/27000,dec:0,sym:'',en:'AED',fa:'درهم'}};
const loc=l=>l==='fa'?'fa-IR':'en-US';
const num=(n,lang='en')=>Number(n).toLocaleString(loc(lang));
// fa: number then label (۴٬۲۰۰٬۰۰۰ تومان) · en: symbol first ($42.00), words after (4,200,000 Toman)
const money=(n,{currency='IRT',lang='en'}={})=>{const c=CURRENCIES[currency]||CURRENCIES.IRT;const s=(Number(n)*c.rate).toLocaleString(loc(lang),{minimumFractionDigits:c.dec,maximumFractionDigits:c.dec});
if(lang==='fa')return s+' '+c.fa;return c.sym?c.sym+s:s+' '+c.en;};
const F={CURRENCIES,money,num};
window.AG_FORMAT=F;
(window.VendraDesignSystem_f4f210=window.VendraDesignSystem_f4f210||{}).format=F;
if(typeof module!=='undefined'&&module.exports)module.exports=F;
})();
