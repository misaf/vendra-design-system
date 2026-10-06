// Shared formatting helpers. Prices are stored in Toman; rate = units per 1 Toman (DEMO rates).
(()=>{
const CURRENCIES={
IRT:{rate:1,dec:0,sym:'',en:'Toman',fa:'تومان'},
IRR:{rate:10,dec:0,sym:'',en:'Rial',fa:'ریال'},
USD:{rate:1/100000,dec:2,sym:'$',en:'USD',fa:'دلار'},
EUR:{rate:1/110000,dec:2,sym:'€',en:'EUR',fa:'یورو'},
AED:{rate:1/27000,dec:0,sym:'',en:'AED',fa:'درهم'}};
const loc=l=>l==='fa'?'fa-IR':'en-US';
// Normalize separators explicitly so Persian output is stable across browser locale data.
const formatNumber=(n,lang,options={})=>{
const formatter=new Intl.NumberFormat(loc(lang),{...options,...(lang==='fa'?{numberingSystem:'arabext'}:{})});
return formatter.formatToParts(Number(n)).map(p=>lang==='fa'?(p.type==='group'?'٬':p.type==='decimal'?'٫':p.value):p.value).join('');
};
const num=(n,lang='en')=>formatNumber(n,lang);
// fa: number then label (۴٬۲۰۰٬۰۰۰ تومان) · en: symbol first ($42.00), words after (4,200,000 Toman)
const money=(n,{currency='IRT',lang='en'}={})=>{const c=CURRENCIES[currency]||CURRENCIES.IRT;const s=formatNumber(Number(n)*c.rate,lang,{minimumFractionDigits:c.dec,maximumFractionDigits:c.dec});
if(lang==='fa')return s+' '+c.fa;return c.sym?c.sym+s:s+' '+c.en;};
const F={CURRENCIES,money,num};
window.AG_FORMAT=F;
(window.VendraDesignSystem_4ae5a2=window.VendraDesignSystem_4ae5a2||{}).format=F;
if(typeof module!=='undefined'&&module.exports)module.exports=F;
})();
