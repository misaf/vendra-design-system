// Run with: node templates/_tests/storefront.test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const {sharedLogic, sharedLogicInline, generate} = require('../_build/generate.cjs');
generate(true);
function context() {
 const history = [];
 const ctx = {URL, URLSearchParams, console, document:{getElementById:()=>null}, setTimeout, clearTimeout, location:{pathname:'/templates/storefront-site/StorefrontSite.dc.html',search:'',href:'http://localhost/templates/storefront-site/StorefrontSite.dc.html'},
  history:{pushState:(_,__,url)=>history.push(['push',url]),replaceState:(_,__,url)=>history.push(['replace',url])},sessionStorage:{getItem:()=>null,setItem:()=>{}},
  DCLogic:class {constructor(props){this.props=props;this.state={};}setState(update,cb){Object.assign(this.state,typeof update==='function'?update(this.state):update);if(cb)cb();}}};
 ctx.window={React:{},innerWidth:390,scrollTo:()=>{}};vm.createContext(ctx);vm.runInContext(read('_ds_bundle.js'),ctx);
 return {ctx,history};
}
const {ctx}=context();vm.runInContext(sharedLogic+'\nthis.totals=vfTotals;this.errors=vfErrors;this.phone=vfPhone;',ctx);
for (const [zone,fee] of [['central',80000],['outer',120000],['alborz',180000],['tehran',250000]]) {
 assert.equal(ctx.totals([{unit:1000000,qty:2}],{zone}).fee,fee);
 assert.equal(ctx.totals([{unit:2500000,qty:2}],{zone}).fee,['central','outer'].includes(zone)?0:fee);
}
assert.equal(ctx.totals([{unit:4900000,qty:1},{unit:3400000,qty:1}],{zone:'central'}).total,8300000);
assert.equal(ctx.phone('۰۹۱۲ ۳۴۵ ۶۷۸۹'),'09123456789');assert.equal(ctx.phone('٠٩١٢٣٤٥٦٧٨٩'),'09123456789');
const sender={sender:'Buyer',senderPhone:'09121112233'};
assert.equal(Object.values(ctx.errors({name:'',phone:'0912',address:'',location:null})).filter(Boolean).length,6,'recipient, pin, address and the sender\'s own name and mobile');
assert.equal(Object.values(ctx.errors({name:'Sample',phone:'۰۹۱۲۳۴۵۶۷۸۹',address:'Unit 3',location:{lat:35.83,lng:50.96},...sender})).some(Boolean),false);
// Without a map the pin isn't required, but the typed address must be a full one.
assert.deepEqual({...ctx.errors({name:'Sample',phone:'09123456789',address:'Unit',location:null,noMap:true,...sender})},{name:false,phone:false,location:false,outside:false,address:true,cards:false,sender:false,senderPhone:false});
assert.equal(Object.values(ctx.errors({name:'Sample',phone:'09123456789',address:'12 Golestan St, Karaj',location:null,noMap:true,...sender})).some(Boolean),false);
assert.equal(ctx.errors({name:'S',phone:'09123456789',address:'U',location:{lat:'x',lng:50}}).location,true,'a broken pin is not a pin');
assert.equal(ctx.errors({...sender,name:'S',phone:'09123456789',address:'U',location:{lat:32.65,lng:51.67}}).outside,true,'a pin beyond every zone is outside the delivery area');
// A bought handwritten card needs its message; a line without one does not.
vm.runInContext('this.withCard=vfLineWithCard;this.hasCard=vfLineHasCard;this.zoneAt=vfZoneAt;this.slots=vfDeliverySlots;this.slot=vfDeliverySlot;this.cardText=vfCardMessages;this.sample=vfSampleBag;',ctx);
const plain={id:'VF-9FA2KE',productId:'VF-9FA2KE',size:null,addons:[],unit:2200000,qty:1,en:['VF-9FA2KE','Bouquet · Garden roses · eucalyptus'],fa:['VF-9FA2KE','دسته‌گل · رز باغی · اکالیپتوس']};
const carded=ctx.withCard(plain);
assert.equal(carded.id,'VF-9FA2KE-card');assert.equal(carded.unit,2350000);assert.equal(carded.en[1],'Bouquet · Garden roses · eucalyptus · Handwritten card');assert.ok(ctx.hasCard(carded));assert.equal(ctx.hasCard(plain),false);
// A line saved before products had codes (named, with a slug id) comes back titled by its code.
const legacy=ctx.withCard({id:'ivory-classic-vase',unit:5550000,qty:1,en:['Ivory ribbon box','Classic · 20 stems · Glass vase'],fa:['باکس','کلاسیک · ۲۰ شاخه · گلدان شیشه‌ای']});
assert.equal(legacy.id,'VF-7K2M4Q-classic-card+vase','addons keep the product page order');assert.equal(legacy.en[0],'VF-7K2M4Q');assert.equal(legacy.size,'classic');
const base={name:'S',phone:'09123456789',address:'U',location:{lat:35.83,lng:50.96},...sender};
assert.equal(ctx.errors(base,[plain]).cards,false);assert.equal(ctx.errors(base,[carded]).cards,true);assert.equal(ctx.errors(base,[{...carded,card:'Love'}]).cards,false);
assert.ok(ctx.hasCard(ctx.sample()[0])&&ctx.sample()[0].card,'the sample bag pays for the card it writes');
assert.equal(ctx.cardText([{...carded,card:'Love'}],{},'en'),'“\u2068Love\u2069”');assert.equal(ctx.cardText([],{card:'Old'},'en'),'Old','older orders keep their order-wide message');
// The pin picks the smallest zone that reaches it.
assert.equal(ctx.zoneAt({lat:35.8327,lng:50.9654}),'central');assert.equal(ctx.zoneAt({lat:35.80,lng:50.86}),'outer');assert.equal(ctx.zoneAt({lat:35.70,lng:51.40}),'tehran');assert.equal(ctx.zoneAt({lat:36.05,lng:50.60}),'alborz');assert.equal(ctx.zoneAt(null),null);
// Today's slots close two hours before they end; the chosen slot falls forward to the next open one.
const afternoon=new Date(2026,9,6,14,30),iso='2026-10-06';
assert.equal(ctx.slots(iso,afternoon).map(x=>x.closed).join(),'true,true,false,false');
assert.equal(ctx.slots('2026-10-07',afternoon).map(x=>x.closed).join(),'false,false,false,false','other days keep every slot');
assert.equal(ctx.slot({zone:'central',date:iso,slot:'08'},afternoon),'16');
// The shop's delivery-day filter: same-day designs from today, the rest from tomorrow, never sold out or out of stock.
vm.runInContext('this.deliverable=vfDeliverableOn;this.product=vfProduct;',ctx);
const morning=new Date(2026,9,6,9,0),evening=new Date(2026,9,6,19,0);
assert.equal(ctx.deliverable(ctx.product('ivory'),'2026-10-06',morning),true);assert.equal(ctx.deliverable(ctx.product('orchid'),'2026-10-06',morning),false);assert.equal(ctx.deliverable(ctx.product('orchid'),'2026-10-07',morning),true);
assert.equal(ctx.deliverable(ctx.product('ivory'),'2026-10-06',evening),false,'today closes at the cut-off');assert.equal(ctx.deliverable(ctx.product('ivory'),'2026-10-08',morning),false,'sold-out day');assert.equal(ctx.deliverable(ctx.product('bridal'),'2026-10-09',morning),false,'out of stock');assert.equal(ctx.slot({zone:'central',date:'2026-10-07',slot:'08'},afternoon),'08');
let parsed=0;
for (const folder of fs.readdirSync(path.join(root,'templates')).filter(x=>x.startsWith('storefront-'))) {
 const filename=fs.readdirSync(path.join(root,'templates',folder)).find(x=>x.endsWith('.dc.html'));
 const html=read('templates/'+folder+'/'+filename),script=html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
 assert.ok(html.includes('<script src="../_runtime/shared-logic.js"></script>\n<script src="../_runtime/support.js"></script>'),folder+' must load the shared logic before the runtime');
 assert.ok(html.includes(sharedLogicInline)&&!html.includes('// Source: templates/_shared/page-lifecycle.js'),folder+' must not carry its own copy of the shared logic');
 assert.equal(read('templates/_runtime/shared-logic.js').endsWith(sharedLogic),true,'_runtime/shared-logic.js must match _shared/');
 if(folder!=='storefront-site')assert.ok(html.includes('<main id="main"'),folder+' must expose the skip-link destination');
 const {ctx:c,history}=context();vm.runInContext(sharedLogic,c);vm.runInContext(script+'\nthis.Logic=Component;',c);const logic=new c.Logic({lang:'en',tenant:'default',mobile:false});
 const values=logic.renderVals();assert.ok(values);parsed++;
 if(['storefront-bag','storefront-checkout'].includes(folder)) assert.equal(values.totalLabel, values.sums.at(-1).value, 'Sticky action total must match the order summary');
 if(folder==='storefront-site') {
  logic.navigate('faq');assert.equal(logic.state.route,'faq');assert.ok(history.at(-1)[1].includes('view=faq'));history.length=0;
  logic.navigate('shop');assert.equal(logic.state.route,'shop');assert.deepEqual(history[0],['push','?lang=en&view=shop']);
  logic.navigate({view:'product',id:'ivory-classic',lang:'fa'});assert.equal(logic.state.route,'product');assert.equal(logic.state.routeInfo.id,'VF-7K2M4Q','an old slug opens the product by its code');assert.equal(logic.state.routeInfo.cat,'boxes');assert.equal(logic.state.lang,'fa');
  logic.navigate({view:'shop',lang:'en'},true);assert.equal(history.at(-1)[0],'replace');
  logic.navigate({view:'shop',date:'2026-10-09'});assert.ok(history.at(-1)[1].includes('date=2026-10-09'));logic.navigate({view:'signin',next:'delivery'});assert.equal(logic.state.routeInfo.next,'delivery');assert.ok(history.at(-1)[1].includes('next=delivery'));
  logic.renderVals().go({view:'shop'},true);assert.equal(history.at(-1)[0],'replace','go can refine without a new history entry');
  logic.navigate('checkout');assert.equal(logic.state.route,'bag');assert.equal(logic.state.routeInfo.step,'delivery','incomplete details return to the delivery step');assert.ok(history.at(-1)[1].includes('step=delivery'));
  let store=logic.renderVals().store;store.setDelivery({name:'Sample',phone:'09123456789',address:'Sample address',location:{lat:35.83,lng:50.96},zone:'central',sender:'Buyer',senderPhone:'09121112233'});logic.navigate('checkout');assert.equal(logic.state.route,'checkout');
  const originalBag=logic.state.bag;logic.setState({bag:[]});logic.navigate('checkout');assert.equal(logic.state.route,'bag');assert.equal(logic.state.routeInfo.step,'bag','an empty bag returns to the bag');logic.setState({bag:originalBag});logic.navigate('checkout');
  // A card added from the delivery step joins the line's price and needs a message before checkout.
  store=logic.renderVals().store;store.addCard('VF-8RD5WN');const orchid=logic.state.bag.find(l=>l.id==='VF-8RD5WN-card');assert.equal(orchid.unit,3550000);logic.navigate('checkout');assert.equal(logic.state.route,'bag');
  logic.renderVals().store.setCard('VF-8RD5WN-card','With love');logic.navigate('checkout');assert.equal(logic.state.route,'checkout');
  logic.renderVals().store.remove('VF-8RD5WN-card');logic.renderVals().store.add({...originalBag[1]});
  const totals=c.window.AG_FORMAT.num(8300000,'en');assert.equal(totals,'8,300,000');
  const order={lines:logic.state.bag,delivery:logic.state.delivery,totals:{sub:8300000,fee:0,total:8300000},last4:'1234'};
  logic.renderVals().store.complete(order);assert.equal(logic.state.bag.length,0);assert.equal(logic.state.order.totals.total,8300000);assert.equal(logic.state.order.delivery.name,'Sample');
 } else {assert.equal(values.mob,true);assert.ok(values.href.shop.includes('view=shop'));}
 if(folder==='storefront-faq'){
  const fa=new c.Logic({lang:'fa',tenant:'clay',mobile:false}).renderVals();assert.equal(fa.dir,'rtl');assert.equal(fa.tenant,'clay');assert.equal(fa.groups.length,3);assert.equal(fa.groups.reduce((n,g)=>n+g.items.length,0),9);assert.ok(fa.groups[0].items[0].content.includes('۸۰٬۰۰۰'));
 }
}
console.log('Passed delivery fees, validation, Persian digits, history, checkout state, and all '+parsed+' template logic checks.');
// Exercise catalog navigation, URL restoration and the completed-order tracking snapshot.
function loadPage(name, props = {}, search = '') {
 const {ctx:c,history}=context();c.location.search=search;
 const html=read('templates/storefront-'+name+'/Storefront'+name[0].toUpperCase()+name.slice(1)+'.dc.html');
 vm.runInContext(sharedLogic,c); vm.runInContext(html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1]+'\nthis.Logic=Component;',c);
 return {logic:new c.Logic({lang:'en',...props}),ctx:c,history};
}
for(const lang of ['en','fa']) {
 for(const id of ['VF-7K2M4Q','VF-3HX9TP','VF-8RD5WN','VF-4CJ6ZB','VF-9FA2KE','VF-6MT3VY']) {
  let added;const {logic}=loadPage('product',{lang,routeInfo:{view:'product',id},store:{saved:[],add:line=>added=line}});
  const v=logic.renderVals();v.add();if(id==='VF-6MT3VY'){assert.equal(added,undefined);assert.equal(v.available,false);continue;}assert.equal(added.productId,id);assert.equal(added[lang][0],v.t.name);assert.equal(v.t.name,id,'a product is titled by its code');
  assert.equal(added.unit,({'VF-7K2M4Q':4100000,'VF-3HX9TP':2800000,'VF-8RD5WN':3400000,'VF-4CJ6ZB':5200000,'VF-9FA2KE':2200000})[id]);
  assert.equal(v.hasSizes,id==='VF-7K2M4Q');
  const listing=loadPage('shop',{lang}).logic.renderVals().items.find(item=>item.name===v.t.name);
  assert.equal(v.unitPrice,listing.price,'Default product price must match the listing');
  if(id==='VF-7K2M4Q'){
   v.sizes[1].pick();logic.renderVals().add();assert.equal(added.unit,4900000,'Classic surcharge remains selectable');
   logic.renderVals().sizes[2].pick();logic.renderVals().add();assert.equal(added.unit,6000000,'Generous surcharge remains selectable');
   logic._vfAnnounce=()=>{};logic._productId='VF-8RD5WN';logic.componentDidUpdate();
   assert.equal(logic.renderVals().unitPrice,listing.price,'Changing products resets to the starting price');
  }
 }
 let next;const {logic:shop}=loadPage('shop',{lang,go:r=>next=r},'?view=shop&cat=bouquets&sort=low&filters=under3,same');
 let v=shop.renderVals();assert.equal(v.items.length,2);assert.ok(v.items[0].href.includes('id=VF-9FA2KE&cat=bouquets'));assert.equal(v.items[0].name,'VF-9FA2KE');v.chips[1].toggle();assert.ok(!next.filters.includes('same'));
 v.categories[2].pick();assert.equal(next.cat,'boxes');
 const {logic:site,ctx:c}=loadPage('site',{lang});site.navigate({view:'shop',cat:'bouquets',sort:'high',filters:['roses','same'],lang});
 assert.equal(site.state.routeInfo.sort,'high');assert.equal(site.state.routeInfo.filters.join(','),'roses,same');site.renderVals().setLang(lang==='en'?'fa':'en');assert.equal(site.state.routeInfo.cat,'bouquets');
 site.navigate({view:'product',id:'unknown'});assert.equal(site.state.route,'notfound');
 const lines=[{id:'VF-9FA2KE',productId:'VF-9FA2KE',unit:2200000,qty:2,image:'assets/placeholders/product.svg',en:['VF-9FA2KE','Bouquet · Garden roses'],fa:['VF-9FA2KE','دسته‌گل · رز باغی']}];
 const delivery={name:'Demo recipient',phone:'09120000000',address:'Demo street 12',zone:'tehran',slot:'16',sender:'Demo sender',senderPhone:'09121112233'};
 let order;const {logic:checkout}=loadPage('checkout',{lang,store:{bag:lines,delivery,complete:o=>order=o}});checkout.setState({last4:'1234'});checkout.renderVals().place();assert.ok(order.id.startsWith('VN-'));assert.equal(order.status,'received');
 site.renderVals().store.complete(order);site.renderVals().store.add({...lines[0],qty:1});assert.equal(site.state.order,null);assert.equal(site.state.lastOrder.id,order.id);
 site.renderVals().store.reorder(order);assert.equal(site.state.bag[0].qty,2);assert.equal(site.state.delivery.name,'Demo recipient');
 const {logic:track}=loadPage('track',{lang,store:site.renderVals().store});v=track.renderVals();assert.ok(v.t.orderNo.includes(order.id));assert.equal(v.current,0);assert.equal(v.lines.length,1);assert.equal(v.lines[0].name,lines[0][lang][0]);assert.ok(v.rows.some(r=>r.value.includes('Demo recipient')));assert.equal(v.sums.at(-1).value,c.window.AG_FORMAT.money(4650000,{lang}));
}
console.log('Passed all product links/prices, URL filter restoration, language switching and completed-order tracking in English and Persian.');
// Recovery states are real navigation, and form errors retain a usable draft.
for (const lang of ['en','fa']) {
 const {logic:track}=loadPage('track',{lang,store:{saved:[],lastOrder:null}});
 assert.equal(track.renderVals().noOrder,true);
 const {logic:unknown}=loadPage('track',{lang,routeInfo:{view:'track',id:'wrong'},store:{saved:[],lastOrder:{id:'VN-demo',status:'received',lines:[],delivery:{zone:'central',slot:'12',name:'Demo',phone:'09120000000',address:'Demo road'},totals:{sub:0,fee:0,total:0},last4:'1234'}}});
 assert.equal(unknown.renderVals().noOrder,true);
 const {logic:saved}=loadPage('saved',{lang,store:{saved:[]}});assert.equal(saved.renderVals().noItems,true);assert.ok(saved.renderVals().href.shop.includes('view=shop'));assert.equal(saved.renderVals().restore,undefined);
 const {logic:search}=loadPage('search',{lang});search.state.q='no-such-flower';assert.equal(search.renderVals().noResults,true);search.renderVals().clearSearch();assert.equal(search.renderVals().empty,true);
 const {logic:contact}=loadPage('contact',{lang});contact.state.msg='Demo message';contact.renderVals().send();assert.equal(contact.state.sent,false,'a reply needs a mobile or an email');assert.ok(contact.renderVals().phoneErr);contact.state.email='bad';contact.renderVals().send();assert.ok(contact.renderVals().emailErr);assert.equal(contact.renderVals().phoneErr,undefined);contact.state.email='';contact.state.phone='0912 123 4567';contact.renderVals().send();assert.equal(contact.state.sent,true);contact.renderVals().editMessage();assert.equal(contact.state.sent,false);assert.equal(contact.state.msg,'Demo message');
 const {logic:wedding}=loadPage('weddings',{lang});wedding.setState({name:'Demo',phone:'1234567890'});wedding.renderVals().send();assert.equal(wedding.state.e2,true);assert.equal(wedding.state.sent,false);wedding.state.phone='۰۹۱۲۰۰۰۰۰۰۰';wedding.renderVals().send();assert.equal(wedding.state.sent,true);
}
console.log('Passed missing-order recovery, saved/search recovery, editable success states and mobile validation in both languages.');

// Compare nested labels and every list item; localized values may differ.
function copyShape(value, path = 'copy') {
 const kind = Array.isArray(value) ? 'array' : value !== null && typeof value === 'object' ? 'object' : 'value';
 const shape = [path + ':' + kind];
 if (kind === 'object' || kind === 'array') {
  for (const key of Object.keys(value).sort()) shape.push(...copyShape(value[key], path + '.' + key));
 }
 return shape;
}
assert.notDeepEqual(copyShape({labels:{validation:{required:'Required'}}}), copyShape({labels:{validation:{}}}), 'Missing nested validation copy must be detected');
assert.notDeepEqual(copyShape({items:[{title:'Title',body:'Body'}]}), copyShape({items:[{title:'Title'}]}), 'Missing labels inside lists must be detected');
assert.notDeepEqual(copyShape({label:'Text'}), copyShape({label:{text:'Text'}}), 'Object versus leaf mismatches must be detected');
for (const name of ['account','bag','checkout','contact','faq','home','journal','notfound','policy','post','product','saved','search','shop','signin','track','weddings']) {
 const {ctx:c}=loadPage(name);
 const copies=vm.runInContext("['en','fa'].map(lang=>vfCopy({lang,fa:lang==='fa',m:value=>String(value),n:value=>String(value),t:{brand:'Demo',address:'Demo'}}))",c);
 assert.deepEqual(copyShape(copies[0]),copyShape(copies[1]),name+' copy must have matching English and Persian structure');
}
console.log('Passed recursive English/Persian copy parity, including nested labels and lists.');
// The template runtime reads values but cannot call functions: {{ handler('x') }} renders as nothing.
for (const name of ['account','bag','checkout','contact','faq','home','journal','notfound','policy','post','product','saved','search','shop','signin','site','track','weddings']) {
 const folder=path.join(__dirname,'..','storefront-'+name);
 const html=fs.readFileSync(path.join(folder,fs.readdirSync(folder).find(f=>f.endsWith('.dc.html'))),'utf8');
 const calls=html.match(/\{\{\s*[\w.]+\(/g);
 assert.equal(calls,null,name+' template calls a function in a binding: '+calls);
}
console.log('Passed: no template binding calls a function.');
