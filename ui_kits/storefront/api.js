// Vendra API client (from uploads/openapi docs.json, v1.0.0). No auth on these endpoints.
// base = '' → demo mode: nothing is sent, calls resolve as if they succeeded.
(()=>{
const KEY='vendra-saved-map';
const A={base:'',setBase(b){A.base=(b||'').replace(/\/$/,'');},get live(){return !!A.base;}};
const req=async(method,path,body)=>{
  const r=await fetch(A.base+path,{method,headers:{'Accept':'application/ld+json',...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined,credentials:'include'});
  if(!r.ok){const e=new Error('HTTP '+r.status);e.status=r.status;try{e.body=await r.json();}catch(_){}throw e;}
  return r.status===204?null:r.json().catch(()=>null);
};
const map=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}');}catch(e){return {};}};
const setMap=m=>{try{localStorage.setItem(KEY,JSON.stringify(m));}catch(e){}};
// Product slug -> numeric catalog id. Fill p.apiId when the catalog comes from GET /api/catalog/products.
const pid=slug=>{const p=(window.AG_DATA&&AG_DATA.products||[]).find(x=>x.id===slug);return p&&p.apiId;};
// POST /api/customers/saved-items  {sellableType, sellableId, metadata}
A.saveItem=async slug=>{const id=pid(slug);if(!A.live||id==null)return null;const r=await req('POST','/api/customers/saved-items',{sellableType:'product',sellableId:id,metadata:{slug}});const m=map();if(r&&r.id!=null){m[slug]=r.id;setMap(m);}return r;};
// DELETE /api/customers/saved-items/{id}
A.unsaveItem=async slug=>{const m=map();const sid=m[slug];if(!A.live||sid==null)return null;await req('DELETE','/api/customers/saved-items/'+sid);delete m[slug];setMap(m);return true;};
// GET /api/customers/wishlists -> default list's items -> product slugs
A.loadSaved=async()=>{if(!A.live)return null;const r=await req('GET','/api/customers/wishlists');const lists=(r&&(r['hydra:member']||r.member||r.data))||[];const w=lists.find(l=>l.isDefault)||lists[0];if(!w)return [];const m=map();const byApi={};(AG_DATA.products||[]).forEach(p=>{if(p.apiId!=null)byApi[p.apiId]=p.id;});const slugs=[];(w.items||[]).forEach(it=>{const s=(it.metadata&&it.metadata.slug)||byApi[it.sellableId];if(s){slugs.push(s);m[s]=it.id;}});setMap(m);return slugs;};
// POST /api/support/inquiries {name,email,message,phone,occasion,preferredLocale} -> 204 (throttled)
A.inquiry=async body=>{if(!A.live){await new Promise(r=>setTimeout(r,600));return null;}return req('POST','/api/support/inquiries',body);};
// Language for all processing (orders, reminders, SMS, WhatsApp, email, receipts) = the account setting, never the page language.
// PATCH /api/customers/me {preferredLocale} when the customer changes it in Profile. Guests: the page language at checkout.
A.preferredLocale=()=>{let signed=false;try{signed=!!JSON.parse(localStorage.getItem('ag-kit')||'{}').signedIn;}catch(e){}return (signed&&window.AG_ACCOUNT&&AG_ACCOUNT.locale())||(document.documentElement.getAttribute('lang')==='en'?'en':'fa');};
window.AG_API=A;
})();
