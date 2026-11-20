import '../card-runtime.js';
const { Dialog, Toast, Tooltip, Button, IconButton, Skeleton, Alert, EmptyState, AnnouncementBar, LiveRegion } = window.VendraDesignSystem;
const T={
en:{h:'English',dt:'Remove from bag?',keep:'Keep',rm:'Remove',close:'Close',db:'Wild Meadow will be removed.',tip:'Save to favourites',save:'Save',t1:['Added to your bag','Wild Meadow · Generous','View bag'],t2:['Card declined','Try another payment method.'],
 ka:'AnnouncementBar',ann:'Announcement',annT:'Order by 18:00 for same-day delivery in Karaj',kal:'Alert',
 al:[['danger',"We couldn't load the shop",'Check your connection.',1],['warning',null,'Evening slots are almost full today.',0,1],['success','Card copied','Paste it in your banking app.'],['danger',"Your order didn't go through",'Nothing was taken. Your bag is saved.',1],['info',null,'Peonies are in season until early June.'],['neutral',null,'Free delivery on orders over 5,000,000 Toman']],retry:'Try again',
 ks:'Skeleton',ke:'EmptyState',e1:['Payment',"Your payment didn't go through",'Nothing has been taken from your account.'],e2:['Page not found','This stem','wandered off.','404'],e3:['Your bag is','empty.','You haven’t picked any flowers yet.','Browse the shop']},
fa:{h:'فارسی',dt:'از سبد حذف شود؟',keep:'نگه دار',rm:'حذف',close:'بستن',db:'دسته‌گل وحشی از سبد حذف می‌شود.',tip:'افزودن به علاقه‌مندی‌ها',save:'ذخیره',t1:['به سبد اضافه شد','دسته‌گل وحشی · پرپشت','دیدن سبد'],t2:['کارت پذیرفته نشد','روش پرداخت دیگری را امتحان کنید.'],
 ka:'نوار اطلاعیه',ann:'اطلاعیه',annT:'سفارش تا ساعت ۱۸، ارسال همان روز در کرج',kal:'هشدار',
 al:[['danger','فروشگاه بارگذاری نشد','اتصال اینترنت را بررسی کنید.',1],['warning',null,'نوبت‌های عصر امروز تقریباً پر است.',0,1],['success','شماره کارت کپی شد','در برنامهٔ بانکی خود جای‌گذاری کنید.'],['danger','سفارش ثبت نشد','مبلغی کسر نشده و سبد شما ذخیره است.',1],['info',null,'گل صدتومانی تا اوایل خرداد در فصل است.'],['neutral',null,'ارسال رایگان برای سفارش‌های بالای ۵٬۰۰۰٬۰۰۰ تومان']],retry:'تلاش دوباره',
 ks:'اسکلت بارگذاری',ke:'حالت خالی',e1:['پرداخت','پرداخت انجام نشد','مبلغی از حساب شما کسر نشده است.'],e2:['صفحه پیدا نشد','این شاخه','گم شده است.','۴۰۴'],e3:['سبد خرید','خالی است.','هنوز گلی انتخاب نکرده‌اید.','دیدن فروشگاه']}};
function Side({l}){const t=T[l];const isFa=l==='fa';
return <div lang={l} dir={isFa?'rtl':'ltr'} data-lang={isFa?'fa':undefined}><div className="lh">{t.h}</div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,height:330}}>
<div style={{position:'relative',borderRadius:12,overflow:'hidden',background:'var(--petal-200)'}}><Dialog open inline title={t.dt} closeLabel={t.close} onClose={()=>{}} footer={<><Button variant="ghost" size="sm">{t.keep}</Button><Button size="sm">{t.rm}</Button></>}>{t.db}</Dialog></div>
<div style={{display:'flex',flexDirection:'column',gap:12,paddingTop:50}}>
<div style={{display:'flex',justifyContent:'center',marginBottom:12}}><Tooltip open content={t.tip}><IconButton icon="heart" label={t.save} variant="secondary"/></Tooltip></div>
<Toast title={t.t1[0]} message={t.t1[1]} action={{label:t.t1[2],href:'?view=bag',onClick:e=>e.preventDefault()}} onClose={()=>{}} style={{width:'100%'}}/>
<Toast tone="danger" title={t.t2[0]} message={t.t2[1]} style={{width:'100%'}}/>
</div></div>
<div><div className="k">{t.ka}</div><AnnouncementBar label={t.ann} onClose={()=>{}}>{t.annT}</AnnouncementBar></div>
<div><div className="k">{t.kal}</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
{t.al.map(([tone,title,body,act,cl],i)=><div key={i} style={tone==='neutral'||tone==='info'?{gridColumn:'1/-1'}:undefined}><Alert tone={tone} title={title||undefined} onClose={cl?()=>{}:undefined} action={act?<Button size="sm" variant="secondary">{t.retry}</Button>:undefined}>{body}</Alert></div>)}
</div></div>
<div><div className="k">{t.ks}</div><div aria-busy="true" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,alignItems:'start'}}><Skeleton shape="card"/><Skeleton shape="card"/><div style={{display:'flex',flexDirection:'column',gap:12}}><Skeleton shape="circle" width={48}/><Skeleton shape="text" lines={3}/></div><Skeleton shape="block" height={140}/></div></div>
<div><div className="k">{t.ke}</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16}}>
<EmptyState tone="danger" icon="circle-x" eyebrow={t.e1[0]} title={t.e1[1]} body={t.e1[2]} actions={<Button size="sm">{t.retry}</Button>} style={{padding:'16px 0'}}/>
<EmptyState tone="accent" icon={<span className="ag-display" style={{fontSize:24}}>{t.e2[3]}</span>} eyebrow={t.e2[0]} title={t.e2[1]} titleAccent={t.e2[2]} style={{padding:'16px 0'}}/>
<EmptyState icon="shopping-bag" title={t.e3[0]} titleAccent={t.e3[1]} body={t.e3[2]} actions={<Button size="sm">{t.e3[3]}</Button>} style={{padding:'16px 0'}}/>
</div></div></div>;}
ReactDOM.createRoot(document.getElementById('root')).render(<><div className="split"><Side l="en"/><Side l="fa"/></div>
<div className="note"><div><b>Dialog behaviour.</b> role="dialog", aria-modal="true", aria-labelledby → the title. On open, focus moves to the first control (or <code>initialFocus</code>). Tab and Shift+Tab stay inside. Esc and the backdrop close it. Focus returns to the button that opened it. The page behind can't scroll (inline previews excepted).</div>
<div><b>Toast.</b> role="status". The toast itself is never the click target: the follow-up goes in <code>action</code>, a small ghost button or link. <b>LiveRegion</b> is a visually hidden status region, mounted once at load, for page changes and "Added to bag".<LiveRegion>Feedback card loaded</LiveRegion></div></div></>);
