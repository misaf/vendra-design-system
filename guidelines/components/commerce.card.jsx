import '../card-runtime.js';
const { ProductCard, Price, StockStatus, CategoryCard, BlogCard, Gallery, PaymentCard, LineItem } = window.VendraDesignSystem;
const STOCK=[{status:'in'},{status:'low',count:2},{status:'soon',date:'2026-10-12'},{status:'soon',date:null},{status:'out'}];
const P='../../assets/placeholder-studio.svg',PH='../../assets/placeholder.svg';const pd=e=>e.preventDefault();
const fa=n=>window.AG_FORMAT.num(n,'fa');
const T={
en:{h:'English',dig:n=>n.toLocaleString('en-US'),cur:'Toman',
 p:[['Lavender Whisper','Peach, pink & violet roses',2400000,null,'New','accent'],['Pampas & Rust','Dried · lasts a year',490000,560000,'Dried','warning'],['Garden Rose','Fresh · 12 stems',3100000,null,'Seasonal','success']],
 kb:'BlogCard · CategoryCard',b:[['24 Sep 2026','A morning at the Vendra workbench','Buckets arrive at seven, the first bouquets leave by ten.'],['Flower care','18 Sep 2026','4 min read','Five small habits that make a bouquet last','Fresh water, a sharp cut and a cool corner.']],
 cat:['Orchids','12 designs'],kg:'Gallery',gl:'Photos',kp:'PaymentCard',pay:{holder:'Vendra Florist',bank:'Melli',card:'6037991234567890'},labels:undefined,
 kl:'LineItem · lg / sm',li:['Lavender Whisper','Classic','Card: “Happy birthday, Sara”'],sm:[['Ivory Rib Box',4100000,2],['Strelitzia',1800000,1]]},
fa:{h:'فارسی',dig:fa,cur:'تومان',
 p:[['زمزمهٔ اسطوخودوس','رز هلویی، صورتی و بنفش',2400000,null,'جدید','accent'],['پامپاس و زنگار','خشک · ماندگاری یک‌ساله',490000,560000,'خشک','warning'],['رز باغی','تازه · ۱۲ شاخه',3100000,null,'فصلی','success']],
 kb:'کارت مقاله · کارت دسته',b:[['۲ مهر ۱۴۰۵','صبحی پشت میز کار وندرا','سطل‌ها ساعت هفت می‌رسند و اولین دسته‌گل‌ها تا ده راهی می‌شوند.'],['نگهداری گل','۲۷ شهریور ۱۴۰۵','۴ دقیقه مطالعه','پنج عادت کوچک برای ماندگاری دسته‌گل','آب تازه، برش تیز و گوشه‌ای خنک.']],
 cat:['ارکیده','۱۲ طرح'],kg:'گالری',gl:'عکس‌ها',kp:'کارت پرداخت',pay:{holder:'گل‌فروشی وندرا',bank:'ملی',card:'۶۰۳۷۹۹۱۲۳۴۵۶۷۸۹۰'},labels:{card:'شماره کارت',holder:'به نام',bank:'بانک',amount:'مبلغ',copy:'کپی',copied:'کپی شد'},
 kl:'ردیف سبد · بزرگ / کوچک',li:['زمزمهٔ اسطوخودوس','کلاسیک','کارت: «تولدت مبارک، سارا»'],sm:[['باکس عاج',4100000,2],['استرلیتزیا',1800000,1]]}};
function Side({l}){const t=T[l];const m=n=>t.dig(n)+' '+t.cur;const [fav,setFav]=React.useState(true);const [q,setQ]=React.useState(1);const [b1,b2]=t.b;
return <div lang={l} dir={l==='fa'?'rtl':'ltr'} data-lang={l==='fa'?'fa':undefined}><div className="lh">{t.h}</div>
<div className="g3">{t.p.map(([n,s,pr,cmp,bd,tone],i)=><ProductCard key={n} href={'?lang='+l+'&view=product'} onClick={pd} frame={i===2?'soft':undefined} name={n} subtitle={s} price={m(pr)} compareAt={cmp?m(cmp):undefined} badge={bd} badgeTone={tone} images={i===0?[P,{src:P,crop:'50% 30%'}]:undefined} image={i?P:undefined} favorite={i===0?fav:undefined} onFavorite={i===0?()=>setFav(!fav):()=>{}} stock={i===1?STOCK[1]:i===2?STOCK[2]:undefined}/>)}</div>
<div><div className="k">{l==='fa'?'قیمت · کوچک، متوسط، بزرگ و تخفیف‌خورده':'Price · sm, md, lg and reduced'}</div><div style={{display:'flex',gap:24,flexWrap:'wrap',alignItems:'baseline'}}><Price size="sm" value={m(490000)}/><Price size="md" value={m(2400000)}/><Price size="lg" value={m(3100000)}/><Price size="md" value={m(490000)} compareAt={m(560000)}/></div></div>
<div><div className="k">{l==='fa'?'وضعیت موجودی':'StockStatus'}</div><div style={{display:'flex',gap:20,flexWrap:'wrap'}}>{STOCK.map((x,i)=><StockStatus key={i} stock={x}/>)}</div></div>
<div><div className="k">{t.kb}</div><div className="g3">
<BlogCard image={PH} date={b1[0]} title={b1[1]} excerpt={b1[2]} onClick={()=>{}}/>
<BlogCard frame="soft" aspect="4/3" image={PH} meta={<><span style={{color:'var(--text-accent)',fontWeight:500}}>{b2[0]}</span><span aria-hidden="true">·</span><span>{b2[1]}</span><span aria-hidden="true">·</span><span>{b2[2]}</span></>} title={b2[3]} excerpt={b2[4]} onClick={()=>{}}/>
<CategoryCard label={t.cat[0]} count={t.cat[1]} image={PH} href={'?lang='+l+'&view=shop&cat=orchids'} onClick={pd}/>
</div></div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1.2fr',gap:20,alignItems:'start'}}>
<div><div className="k">{t.kg}</div><Gallery label={t.gl} images={[1,2,3].map(n=>({src:P,alt:t.gl+' '+t.dig(n)}))}/></div>
<div><div className="k">{t.kp}</div><PaymentCard cardNumber={t.pay.card} holder={t.pay.holder} bank={t.pay.bank} amount={m(4600000)} labels={t.labels}/></div></div>
<div><div className="k">{t.kl}</div>
<LineItem image={P} name={t.li[0]} meta={t.li[1]+' · '+m(2400000)} note={t.li[2]} price={m(2400000*q)} quantity={q} onQuantityChange={setQ} onRemove={()=>{}} formatQuantity={l==='fa'?fa:undefined}/>
<div style={{borderTop:'1px solid var(--border-subtle)',paddingTop:8}}>{t.sm.map(([n,p,qq])=><LineItem key={n} size="sm" image={P} name={n} price={m(p*qq)} quantity={qq} formatQuantity={l==='fa'?fa:undefined}/>)}</div></div>
</div>;}
ReactDOM.createRoot(document.getElementById('root')).render(<div className="split"><Side l="en"/><Side l="fa"/></div>);
