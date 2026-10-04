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
 const ctx = {URL, URLSearchParams, console, setTimeout, clearTimeout, location:{pathname:'/templates/storefront-site/StorefrontSite.dc.html',search:'',href:'http://localhost/templates/storefront-site/StorefrontSite.dc.html'},
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
assert.equal(Object.values(ctx.errors({name:'',phone:'0912',address:'short'})).filter(Boolean).length,3);
assert.equal(Object.values(ctx.errors({name:'Sample',phone:'۰۹۱۲۳۴۵۶۷۸۹',address:'Sample address'})).some(Boolean),false);
let parsed=0;
for (const folder of fs.readdirSync(path.join(root,'templates')).filter(x=>x.startsWith('storefront-'))) {
 const filename=fs.readdirSync(path.join(root,'templates',folder)).find(x=>x.endsWith('.dc.html'));
 const html=read('templates/'+folder+'/'+filename),script=html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
 assert.ok(html.includes(sharedLogic),folder+' must use the shared generator logic');
 if(folder!=='storefront-site')assert.ok(html.includes('<main id="main"'),folder+' must expose the skip-link destination');
 const {ctx:c,history}=context();vm.runInContext(script+'\nthis.Logic=Component;',c);const logic=new c.Logic({lang:'en',tenant:'default',mobile:false});
 const values=logic.renderVals();assert.ok(values);parsed++;
 if(folder==='storefront-site') {
  logic.navigate('faq');assert.equal(logic.state.route,'faq');assert.ok(history.at(-1)[1].includes('view=faq'));history.length=0;
  logic.navigate('shop');assert.equal(logic.state.route,'shop');assert.deepEqual(history[0],['push','?lang=en&view=shop']);
  logic.navigate({view:'product',id:'ivory-classic',lang:'fa'});assert.equal(logic.state.route,'product');assert.equal(logic.state.lang,'fa');
  logic.navigate({view:'shop',lang:'en'},true);assert.equal(history.at(-1)[0],'replace');
  logic.navigate('checkout');assert.equal(logic.state.route,'bag');
  let store=logic.renderVals().store;store.setDelivery({name:'Sample',phone:'09123456789',address:'Sample address',zone:'central'});logic.navigate('checkout');assert.equal(logic.state.route,'checkout');
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
