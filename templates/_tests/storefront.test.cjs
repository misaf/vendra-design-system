// Run with: node templates/_tests/storefront.test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const {sharedLogic, generate} = require('../_build/generate.cjs');
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
assert.equal(Object.values(ctx.errors({name:'',phone:'0912',address:'',location:null})).filter(Boolean).length,4);
assert.equal(Object.values(ctx.errors({name:'Sample',phone:'۰۹۱۲۳۴۵۶۷۸۹',address:'Unit 3',location:{lat:35.83,lng:50.96}})).some(Boolean),false);
// Without a map the pin isn't required, but the typed address must be a full one.
assert.deepEqual({...ctx.errors({name:'Sample',phone:'09123456789',address:'Unit',location:null,noMap:true})},{name:false,phone:false,location:false,address:true});
assert.equal(Object.values(ctx.errors({name:'Sample',phone:'09123456789',address:'12 Golestan St, Karaj',location:null,noMap:true})).some(Boolean),false);
assert.equal(ctx.errors({name:'S',phone:'09123456789',address:'U',location:{lat:'x',lng:50}}).location,true,'a broken pin is not a pin');
let parsed=0;
for (const folder of fs.readdirSync(path.join(root,'templates')).filter(x=>x.startsWith('storefront-'))) {
 const filename=fs.readdirSync(path.join(root,'templates',folder)).find(x=>x.endsWith('.dc.html'));
 const html=read('templates/'+folder+'/'+filename),script=html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
 assert.ok(html.includes(sharedLogic),folder+' must use the shared generator logic');
 if(folder!=='storefront-site')assert.ok(html.includes('<main id="main"'),folder+' must expose the skip-link destination');
 const {ctx:c,history}=context();vm.runInContext(script+'\nthis.Logic=Component;',c);const logic=new c.Logic({lang:'en',tenant:'default',mobile:false});
 const values=logic.renderVals();assert.ok(values);parsed++;
 if(['storefront-bag','storefront-checkout'].includes(folder)) assert.equal(values.totalLabel, values.sums.at(-1).value, 'Sticky action total must match the order summary');
 if(folder==='storefront-site') {
  logic.navigate('faq');assert.equal(logic.state.route,'faq');assert.ok(history.at(-1)[1].includes('view=faq'));history.length=0;
  logic.navigate('shop');assert.equal(logic.state.route,'shop');assert.deepEqual(history[0],['push','?lang=en&view=shop']);
  logic.navigate({view:'product',id:'ivory-classic',lang:'fa'});assert.equal(logic.state.route,'product');assert.equal(logic.state.lang,'fa');
  logic.navigate({view:'shop',lang:'en'},true);assert.equal(history.at(-1)[0],'replace');
  logic.navigate('checkout');assert.equal(logic.state.route,'bag');
  let store=logic.renderVals().store;store.setDelivery({name:'Sample',phone:'09123456789',address:'Sample address',location:{lat:35.83,lng:50.96},zone:'central'});logic.navigate('checkout');assert.equal(logic.state.route,'checkout');
  const originalBag=logic.state.bag;logic.setState({bag:[]});logic.navigate('checkout');assert.equal(logic.state.route,'bag');logic.setState({bag:originalBag});logic.navigate('checkout');
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
 vm.runInContext(html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1]+'\nthis.Logic=Component;',c);
 return {logic:new c.Logic({lang:'en',...props}),ctx:c,history};
}
for(const lang of ['en','fa']) {
 for(const id of ['ivory','lavender','orchid','crimson','blush','bridal']) {
  let added;const {logic}=loadPage('product',{lang,routeInfo:{view:'product',id},store:{saved:[],add:line=>added=line}});
  const v=logic.renderVals();v.add();if(id==='bridal'){assert.equal(added,undefined);assert.equal(v.available,false);continue;}assert.equal(added.productId,id);assert.equal(added[lang][0],v.t.name);
  assert.equal(added.unit,id==='ivory'?4100000:({lavender:2800000,orchid:3400000,crimson:5200000,blush:2200000,bridal:6500000})[id]);
  assert.equal(v.hasSizes,id==='ivory');
  const listing=loadPage('shop',{lang}).logic.renderVals().items.find(item=>item.name===v.t.name);
  assert.equal(v.unitPrice,listing.price,'Default product price must match the listing');
  if(id==='ivory'){
   v.sizes[1].pick();logic.renderVals().add();assert.equal(added.unit,4900000,'Classic surcharge remains selectable');
   logic.renderVals().sizes[2].pick();logic.renderVals().add();assert.equal(added.unit,6000000,'Generous surcharge remains selectable');
   logic._vfAnnounce=()=>{};logic._productId='orchid';logic.componentDidUpdate();
   assert.equal(logic.renderVals().unitPrice,listing.price,'Changing products resets to the starting price');
  }
 }
 let next;const {logic:shop}=loadPage('shop',{lang,go:r=>next=r},'?view=shop&cat=bouquets&sort=low&filters=under3,same');
 let v=shop.renderVals();assert.equal(v.items.length,2);assert.ok(v.items[0].href.includes('id=blush'));v.chips[1].toggle();assert.ok(!next.filters.includes('same'));
 v.categories[2].pick();assert.equal(next.cat,'boxes');
 const {logic:site,ctx:c}=loadPage('site',{lang});site.navigate({view:'shop',cat:'bouquets',sort:'high',filters:['roses','same'],lang});
 assert.equal(site.state.routeInfo.sort,'high');assert.equal(site.state.routeInfo.filters.join(','),'roses,same');site.renderVals().setLang(lang==='en'?'fa':'en');assert.equal(site.state.routeInfo.cat,'bouquets');
 site.navigate({view:'product',id:'unknown'});assert.equal(site.state.route,'notfound');
 const lines=[{id:'blush',unit:2200000,qty:2,image:'assets/placeholders/product.svg',en:['Blush morning','Garden roses'],fa:['صبح صورتی','رز باغی']}];
 const delivery={name:'Demo recipient',phone:'09120000000',address:'Demo street 12',zone:'tehran',slot:'16',card:'Demo greeting'};
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
 const {logic:contact}=loadPage('contact',{lang});contact.state.msg='Demo message';contact.renderVals().send();assert.equal(contact.state.sent,true);contact.renderVals().editMessage();assert.equal(contact.state.sent,false);assert.equal(contact.state.msg,'Demo message');
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
