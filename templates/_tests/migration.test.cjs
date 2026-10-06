// Regression coverage for features consolidated into the maintained templates.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
function environment(){
 const storage=new Map(),timers=[];
 const c={URL,URLSearchParams,console,document:{getElementById:()=>null,documentElement:{lang:'en',getAttribute:()=> 'en'}},location:{pathname:'/site',search:'',href:'http://localhost/site'},history:{pushState(){},replaceState(){}},setTimeout:f=>{timers.push(f);return timers.length;},clearTimeout(){},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},sessionStorage:{getItem:()=>null,setItem(){}},fetch:()=>{throw Error('Unexpected network request');},DCLogic:class{constructor(props){this.props=props;this.state={};}setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p);}}};
 c.window=c;c.React={forwardRef:f=>f};c.innerWidth=390;c.scrollTo=()=>{};vm.createContext(c);vm.runInContext(read('_ds_bundle.js'),c);vm.runInContext(require('../_build/generate.cjs').sharedLogic,c);vm.runInContext(require('../_build/generate.cjs').sharedLogicInline,c);
 return {c,storage,timers};
}
function page(name,c,props={}){const s=read(`templates/storefront-${name}/Storefront${name[0].toUpperCase()+name.slice(1)}.dc.html`);const script=s.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];const a=script.indexOf('// BEGIN GENERATED PAGE COPY');const logic=script.slice(a>=0?a:script.indexOf('// BEGIN GENERATED PAGE LOGIC'));return vm.runInContext(`(()=>{${logic}\nreturn new Component(${JSON.stringify({lang:'en',...props})});})()`,c);}
(async()=>{
 const {c,timers}=environment();
 vm.runInContext("vfAccountLogin('۰۹۱۲۳۴۵۶۷۸۹','fa')",c);
 assert.equal(c.vfAccountPhone(),'09123456789');assert.equal(c.vfAccountLocale(),'fa');
 const a=c.vfAccountLoad('09123456789');a.profile.name='Demo A';c.vfAccountSave('09123456789',a);c.vfAccountSignOut();
 c.vfAccountLogin('09999999999','en');assert.equal(c.vfAccountLoad('09999999999').profile.name,'');assert.equal(c.vfAccountLocale(),'en');
 c.vfAccountLogin('09123456789','en');assert.equal(c.vfAccountLocale(),'fa');assert.equal(c.vfAccountLoad('09123456789').profile.name,'Demo A');
 const account=page('account',c);let v=account.renderVals();v.addAddress();account.renderVals().saveForm();assert.ok(account.state.errors.line);assert.ok(account.state.errors.phone);assert.ok(account.state.errors.location);
 for(const [key,value] of Object.entries({label:'Test',line:'Example address',phone:'۰۹۱۲۳۴۵۶۷۸۹',recipient:'Demo'}))account.renderVals().set[key]({target:{value}});
 account._setLocation({lat:35.83,lng:50.96});assert.equal(account.state.errors.location,undefined); account.renderVals().saveForm();v=account.renderVals();assert.equal(v.addresses.length,3);assert.equal(JSON.stringify(c.vfAccountLoad('09123456789').addresses[2].location),'{"lat":35.83,"lng":50.96}');v.addresses[2].makeDefault();assert.equal(account.renderVals().addresses.filter(a=>a.isDefault).length,1);
 account.renderVals().addresses[2].remove();assert.equal(account.renderVals().addresses[0].isDefault,true);
 v=account.renderVals();v.addReminder();v=account.renderVals();v.setOccasion({target:{value:'nowruz'}});v=account.renderVals();assert.equal(v.dateLocked,true);assert.equal(v.dateValue.m,1);assert.equal(v.dateValue.d,1);
 v.set.name({target:{value:'Test occasion'}});account.renderVals().saveForm();assert.equal(c.vfAccountLoad('09123456789').reminders.length,4);
 const normalized=c.vfNormalizeReminder({date:'2026-02-14',occ:'birthday'});assert.equal(normalized.cal,'g');assert.equal(normalized.m,2);assert.equal(normalized.d,14);
 const next=c.vfReminderNext({occ:'valentine',cal:'j',m:1,d:1},new Date(2026,1,13));assert.equal(next.days,1);
 const route=c.vfReadRoute('?lang=fa&view=shop&min=NaN&max=-5&stock=1');assert.equal(route.min,0);assert.equal(route.max,0);assert.equal(route.stock,true);
 const shop=page('shop',c,{routeInfo:{view:'shop',min:2000000,max:4000000,stock:true}}).renderVals();assert.equal(shop.items.length,3);assert.equal(shop.price[0],2000000);assert.ok(shop.formatPrice(2000000).includes('2,000,000'));
 const reorder=c.vfReorderLines([{id:'ivory-classic-card',unit:1,qty:1},{id:'bridal',unit:1,qty:1}]);assert.equal(reorder.length,1);assert.equal(reorder[0].unit,5050000);
 const checkout=page('checkout',c,{routeInfo:{view:'checkout',demo:'error'}});checkout.renderVals().setMethod({target:{value:'online'}});checkout.renderVals().place();assert.equal(checkout.state.busy,true);timers.pop()();assert.equal(checkout.state.failed,true);assert.equal(checkout.state.order,null);
 checkout.renderVals().otherMethod();checkout.renderVals().setLast4({target:{value:'۱۲۳۴'}});checkout.renderVals().place();assert.equal(checkout.state.order.method,'card');assert.equal(checkout.state.order.preferredLocale,'fa');
 assert.equal(c.VF_PAYMENT.bankOf('۶۰۳۷۹۹۰۰۰۰۰۰۰۰۰۰').en,'Bank Melli');assert.equal(c.VF_PAYMENT.luhn('1111111111111111'),false);
 await c.VF_API.saveItem('ivory');await c.VF_API.unsaveItem('ivory');assert.equal(await c.VF_API.loadSaved(),null);assert.equal(c.VF_API.live,false);
 c.VF_API.setBase('https://example.test');const contact=page('contact',c);contact.renderVals().setMsg({target:{value:'Keep this draft'}});contact.renderVals().setPhone({target:{value:'09121234567'}});await contact.renderVals().send();assert.equal(contact.state.sent,false);assert.equal(contact.state.msg,'Keep this draft');assert.ok(contact.state.apiError);c.VF_API.setBase('');
 const cod=page('checkout',c);cod.props.store={bag:c.vfSampleBag(),delivery:{zone:'tehran',name:'Demo',address:'Example address',phone:'09123456789',slot:12},order:null};cod.renderVals().setMethod({target:{value:'cod'}});cod.renderVals().place();assert.equal(cod.state.order,null);const codOption=cod.renderVals().methodOptions.find(o=>o.value==='cod');assert.equal(codOption.disabled,true);assert.ok(codOption.description);
 const post=page('post',c,{routeInfo:{view:'post',post:'morning-at-the-studio'}}).renderVals();assert.equal(post.hasBlocks,true);assert.ok(post.blocks.some(b=>b.tips));assert.ok(post.blocks.some(b=>b.image));
 assert.equal(page('post',c,{routeInfo:{view:'post',post:'missing'}}).renderVals().missing,true);
 for(const id of vm.runInContext('(()=>{'+read('templates/_shared/translations/journal-content.js')+';return VF_POSTS.map(p=>p.id);})()',c))for(const lang of ['en','fa'])assert.equal(page('post',c,{lang,routeInfo:{view:'post',post:id}}).renderVals().hasPost,true);
 const comm={window:null,console};comm.window=comm;vm.createContext(comm);vm.runInContext(read('templates/communications/notifications.js')+'\n'+read('templates/communications/email-templates.js'),comm);
 for(const lang of ['en','fa']){
  const customer={preferredLocale:lang},vars={first:'Demo',id:'VN-123',date:'24 October',slot:'10:00',amount:'2000000',items:[{code:'VF-7K2M4Q',qty:2},{code:'VF-3HX9TP'}],recipient:'Demo',link:'https://example.test/order',remLink:'https://example.test/reminder',wa:'https://example.test/contact',time:'12:00',name:'Demo',occasion:'Birthday',assetBase:'https://example.test/assets',unsubLink:'https://example.test/unsubscribe'};
  for(const event of comm.AG_NOTIFY.events){const rendered=comm.AG_NOTIFY.render(typeof event==='string'?event:event.id,customer,vars);assert.equal(rendered.lang,lang);assert.ok(rendered.sms.parts>=1);assert.ok(!rendered.text.includes('{'));}
  for(const event of ['received','ready','onway'])for(const channel of ['sms','wa']){const rendered=comm.AG_NOTIFY.render(event,customer,vars,channel);assert.ok(rendered.text.includes('VF-7K2M4Q'),event+' names the product codes');if(channel==='sms')assert.ok(rendered.sms.parts<=2,event+' fits 2 SMS parts');}
  assert.equal(comm.AG_NOTIFY.itemsText([{code:'VF-7K2M4Q',qty:2},'VF-3HX9TP'],lang),lang==='fa'?'VF-7K2M4Q ×۲، VF-3HX9TP':'VF-7K2M4Q x2, VF-3HX9TP');
  assert.equal(comm.AG_NOTIFY.itemsText(['A','B','C','D'],lang),lang==='fa'?'A، B و ۲ مورد دیگر':'A, B +2 more');
  for(const event of comm.AG_EMAIL.events)for(const theme of ['default','clay']){const rendered=comm.AG_EMAIL.render(event,customer,{...vars,theme});assert.equal(rendered.lang,lang);assert.ok(rendered.html.includes('<table'));assert.ok(rendered.html.includes(comm.AG_EMAIL.themes[theme].gold));}
 }
 assert.equal(fs.existsSync(path.join(root,'ui_kits')),false);
 const manifest=JSON.parse(read('_ds_manifest.json'));for(const card of manifest.cards)assert.ok(fs.existsSync(path.join(root,card.path)),card.path);
 assert.ok(!read('_ds_bundle.js').includes('ui_kits/'));assert.equal(c.VendraDesignSystem_4ae5a2.__errors.length,0);
 console.log('Passed migrated account persistence/editors, reminders, filters, reordering, payment recovery, optional API mode, article blocks, bilingual communications and relocated card paths.');
})().catch(e=>{console.error(e);process.exitCode=1;});
