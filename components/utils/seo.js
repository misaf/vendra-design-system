// Routing, <head> and Schema.org helpers for the storefront. Exposed as window.AG_SEO and window.VendraDesignSystem_f4f210.seo.
// URL scheme: ?lang=en|fa&view=<screen>&id=<productId>&cat=<category>&post=<postId>&m=<momentId>
(()=>{
const SCREENS=new Set(['home','shop','product','bag','checkout','contact','search','gifts','moment','saved','track','custom','account','journal','post','care','faq']);
const NOINDEX=new Set(['bag','checkout','confirm','account','track','saved','search','notfound']);
const PARAMS=['id','cat','post','m'];
const NUMERIC=new Set(['m']);            // params whose ids are numeric → digits only
const REQUIRED={product:'id',post:'post',moment:'m'}; // screen → param it can't render without
const OPTIONAL={track:'id'}; // track: optional order number (?view=track&id=VB-10491), SAFE pattern; no id → order lookup / not-found state. Stays noindex.
const SAFE=/^[\w:-]{1,40}$/,DIGITS=/^\d{1,40}$/;
const register=(...names)=>names.forEach(n=>SAFE.test(n)&&SCREENS.add(n));
const setNumeric=keys=>{NUMERIC.clear();keys.forEach(k=>NUMERIC.add(k));};
const valid=(k,v)=>SAFE.test(v)&&(!NUMERIC.has(k)||DIGITS.test(v));

// Parse location.search. Invalid values are dropped; an unknown view — or a view missing its required id — becomes "notfound".
const readRoute=(search=location.search)=>{
  const q=new URLSearchParams(search);const r={};
  const l=q.get('lang');if(l==='en'||l==='fa')r.lang=l;
  const v=q.get('view');r.view=v==null||v===''?'home':(SAFE.test(v)&&SCREENS.has(v)?v:'notfound');
  for(const k of PARAMS){const x=q.get(k);if(x!=null&&x!==''&&valid(k,x))r[k]=x;}
  if(REQUIRED[r.view]&&!r[REQUIRED[r.view]])r.view='notfound';
  return r;
};
// State → "?lang=…&view=…". Home omits view; unknown keys and invalid values are ignored.
const routeParams=(state={})=>{
  const q=new URLSearchParams();
  if(state.lang==='en'||state.lang==='fa')q.set('lang',state.lang);
  if(state.view&&state.view!=='home'&&SAFE.test(state.view))q.set('view',state.view);
  for(const k of PARAMS){const x=state[k];if(x!=null&&x!==''&&valid(k,String(x)))q.set(k,String(x));}
  const s=q.toString();return s?'?'+s:'?';
};
const hrefFor=(state={},screen='home',extra={})=>routeParams({lang:state.lang,view:screen,...extra});
// One click handler for every internal <a href>. Modified / middle clicks and target=_blank fall through to the browser.
const linkHandler=go=>e=>{
  if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  const a=e.currentTarget;if(!a||!a.href||(a.target&&a.target!=='_self')||a.hasAttribute('download'))return;
  const u=new URL(a.href,location.href);if(u.origin!==location.origin||u.pathname!==location.pathname)return;
  e.preventDefault();go(readRoute(u.search),e);
};
const isNoindex=view=>NOINDEX.has(view);

const abs=u=>{try{return u?new URL(u,location.href).href:undefined;}catch(e){return undefined;}};
const upsert=(sel,tag,attrs)=>{let el=document.head.querySelector(sel);if(!el){el=document.createElement(tag);el.setAttribute('data-ag-seo','');document.head.appendChild(el);}for(const k in attrs)el.setAttribute(k,attrs[k]);return el;};
const drop=sel=>document.head.querySelectorAll(sel).forEach(el=>el.remove());
const meta=(key,name,content)=>content==null||content===''?drop('meta['+key+'="'+name+'"]'):upsert('meta['+key+'="'+name+'"]','meta',{[key]:name,content});
const LOCALE={en:'en_US',fa:'fa_IR'};
// Sets <title>, description, og:*, twitter:*, canonical, hreflang en/fa/x-default and robots.
const syncHead=({title,description,image,url,locale='en',type='website',alternates={},noindex=false}={})=>{
  if(title)document.title=title;
  const img=abs(image),href=abs(url);
  meta('name','description',description);
  meta('property','og:title',title);meta('property','og:description',description);meta('property','og:image',img);
  meta('property','og:url',href);meta('property','og:type',type);meta('property','og:locale',LOCALE[locale]||locale);
  meta('property','og:locale:alternate',LOCALE[locale==='fa'?'en':'fa']);
  meta('name','twitter:card',img?'summary_large_image':'summary');meta('name','twitter:title',title);meta('name','twitter:description',description);meta('name','twitter:image',img);
  if(href)upsert('link[rel="canonical"]','link',{rel:'canonical',href});else drop('link[rel="canonical"]');
  for(const h of ['en','fa','x-default']){const u=abs(h==='x-default'?(alternates['x-default']||alternates.en):alternates[h]);const sel='link[rel="alternate"][hreflang="'+h+'"]';if(u&&!noindex)upsert(sel,'link',{rel:'alternate',hreflang:h,href:u});else drop(sel);}
  meta('name','robots',noindex?'noindex, follow':null);
};
const setJsonLd=(id,data)=>{const sel='script[type="application/ld+json"][data-ag-ld="'+id+'"]';if(!data){drop(sel);return;}const el=upsert(sel,'script',{type:'application/ld+json','data-ag-ld':id});el.textContent=JSON.stringify(data);};

const D=()=>window.AG_DATA||{};
const STORE_NAME='Vendra Florist';
const ISO={toman:'IRT',rial:'IRR',usd:'USD',eur:'EUR',aed:'AED'};
// Prices are stored in Toman. Toman isn't ISO 4217, so IRT is published as IRR (× 10).
const offerPrice=(toman,code)=>{
  const F=window.AG_FORMAT||{CURRENCIES:{}};let c=code||ISO[D().getCurrency&&D().getCurrency()]||'IRT';
  if(c==='IRT')return {price:String(Math.round(Number(toman)*10)),priceCurrency:'IRR'};
  const cur=F.CURRENCIES[c];if(!cur)return {price:String(Math.round(Number(toman)*10)),priceCurrency:'IRR'};
  return {price:(Number(toman)*cur.rate).toFixed(cur.dec),priceCurrency:c};
};
const seller=url=>({'@type':'Florist',name:STORE_NAME,url:abs(url||location.pathname)});
const shippingDetails=(currency)=>{
  const z=(D().delivery&&D().delivery.IR&&D().delivery.IR.zones)||[];
  return z.map(x=>{const p=offerPrice(x.fee,currency);return {'@type':'OfferShippingDetails',
    shippingRate:{'@type':'MonetaryAmount',value:p.price,currency:p.priceCurrency},
    shippingDestination:{'@type':'DefinedRegion',addressCountry:'IR',addressRegion:x.en},
    deliveryTime:{'@type':'ShippingDeliveryTime',handlingTime:{'@type':'QuantitativeValue',minValue:0,maxValue:0,unitCode:'DAY'},transitTime:{'@type':'QuantitativeValue',minValue:x.sameDay?0:3,maxValue:x.sameDay?0:5,unitCode:'DAY'}}};});
};
// admin.returnPolicy: {default:{…}, byCat:{<categoryId>:{…}}} (or a single policy). Each: {category, days, method, fees, country, url}.
// MerchantReturnNotPermitted (perishables) publishes no days/method/fees, as Google expects.
const returnPolicy=p=>{const R=D().admin&&D().admin.returnPolicy;if(!R)return undefined;
  const r=Object.assign({},R.default||(R.byCat?{}:R),(R.byCat&&p&&R.byCat[p.cat])||{});if(!r.category&&!r.days)return undefined;
  const cat=r.category||'MerchantReturnFiniteReturnWindow';const base={'@type':'MerchantReturnPolicy',applicableCountry:r.country||'IR',returnPolicyCategory:'https://schema.org/'+cat,...(r.url?{merchantReturnLink:abs(r.url)}:{})};
  if(cat==='MerchantReturnNotPermitted')return base;
  return {...base,...(r.days!=null&&cat==='MerchantReturnFiniteReturnWindow'?{merchantReturnDays:r.days}:{}),...(r.method?{returnMethod:'https://schema.org/'+r.method}:{}),...(r.fees?{returnFees:'https://schema.org/'+r.fees}:{})};};
// Schema.org Product. Items priced "on request" (price == null or onRequest) carry no Offer.
const productJsonLd=(p,{url,lang='en',currency,shipping=true,returns=true}={})=>{
  if(!p)return null;
  const imgs=(D().imagesOf?D().imagesOf(p):[{src:p.image}]).filter(x=>x&&x.src&&!x.crop).map(x=>abs(x.src));
  const ld={'@context':'https://schema.org','@type':'Product',name:p[lang]||p.name||p.en,description:(lang==='fa'?p.subFa:p.subEn)||p.description,
    image:[...new Set(imgs)],sku:p.sku||p.id,brand:{'@type':'Brand',name:STORE_NAME},url:abs(url)};
  const onRequest=p.onRequest||p.price==null;
  if(!onRequest){
    const sold=p.badge==='soldout'||p.soldOut||p.inStock===false;
    const offer={'@type':'Offer',...offerPrice(p.price,currency),availability:'https://schema.org/'+(sold?'OutOfStock':'InStock'),itemCondition:'https://schema.org/NewCondition',url:abs(url),seller:seller()};
    if(shipping){const s=shippingDetails(currency);if(s.length)offer.shippingDetails=s;}
    if(returns){const r=returnPolicy(p);if(r)offer.hasMerchantReturnPolicy=r;}
    ld.offers=offer;
  }
  return ld;
};
// Schema.org Florist for the studio (home + contact).
const storeJsonLd=({url,logo='../../assets/logo-mark.png',image}={})=>{
  const C=D().contact||{};const g=C.geo||{lat:35.8390,lng:50.9770};
  return {'@context':'https://schema.org','@type':'Florist',name:STORE_NAME,url:abs(url||location.pathname),logo:abs(logo),...(image?{image:abs(image)}:{}),
    address:{'@type':'PostalAddress',streetAddress:'Azimiyeh',addressLocality:'Karaj',addressRegion:'Alborz',addressCountry:'IR'},
    telephone:'+989129333034',openingHours:'Mo-Su 08:00-22:00',
    geo:{'@type':'GeoCoordinates',latitude:g.lat,longitude:g.lng},
    sameAs:['https://instagram.com/misaf1990']};
};
const S={returnPolicy,SCREENS,NOINDEX,OPTIONAL,REQUIRED,register,setNumeric,readRoute,routeParams,hrefFor,linkHandler,isNoindex,syncHead,setJsonLd,productJsonLd,storeJsonLd,offerPrice};
window.AG_SEO=S;
(window.VendraDesignSystem_f4f210=window.VendraDesignSystem_f4f210||{}).seo=S;
if(typeof module!=='undefined'&&module.exports)module.exports=S;
})();
