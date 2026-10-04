// Analytics — one wrapper for every tracked event. Names and params follow GA4 ecommerce, so GA4 / GTM / Matomo map them without changes.
// AG_TRACK.event(name, params). Sends to window.dataLayer (GTM) if present; otherwise keeps the last 50 in AG_TRACK.log for QA.
// No personal data: never send names, phones, addresses or card messages. Every event carries language + currency.
(()=>{
const EVENTS={
 view_item:'Product page opened',add_to_cart:'Added to bag',remove_from_cart:'Removed from bag',view_cart:'Bag opened',
 begin_checkout:'Bag → payment step',add_payment_info:'Pay / Place order pressed',purchase:'Order placed',
 add_to_wishlist:'Product saved',search:'Search submitted',
 reminder_created:'Occasion reminder saved',sign_up:'First sign-in',login:'Sign-in',language_switch:'Header language changed',
 order_again:'“Order again” pressed',contact_whatsapp:'WhatsApp link opened'};
const log=[];
const ctx=()=>({language:document.documentElement.lang||'fa',currency:(window.AG_DATA&&AG_DATA.getCurrency&&AG_DATA.getCurrency())||'toman'});
const item=(p,qty=1,unit)=>p?{item_id:p.id,item_name:p.en,item_category:p.cat,price:unit??p.price,quantity:qty}:null;
const event=(name,params={})=>{if(!EVENTS[name])console.warn('AG_TRACK: unknown event',name);
  const e={event:name,...ctx(),...params};log.push(e);if(log.length>50)log.shift();
  if(Array.isArray(window.dataLayer))window.dataLayer.push(e);else if(typeof window.gtag==='function')window.gtag('event',name,params);};
window.AG_TRACK={event,item,EVENTS,log};
})();
