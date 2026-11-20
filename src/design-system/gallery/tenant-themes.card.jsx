import './card-runtime.js';
const { Button, Badge, Chip, ProductCard } = window.VendraDesignSystem;
const T={en:{h:['Wild things,','gathered.'],add:'Add to bag',shop:'Shop',tags:['Roses','Orchids'],nw:'New',pn:'Ivory ribbon box',pr:'4,100,000 Toman',ph:'Photo',note:'Palette, heading font and case, accent style, control radius and image frame all come from tokens.'},
fa:{h:['گل‌های وحشی،','دسته‌ شده.'],add:'افزودن به سبد',shop:'فروشگاه',tags:['رز','ارکیده'],nw:'جدید',pn:'باکس روبان عاجی',pr:'۴٬۱۰۰٬۰۰۰ تومان',ph:'عکس',note:'پالت، فونت و حالت تیتر، سبک تأکید، گردی کنترل‌ها و قاب تصویر همه از توکن‌ها می‌آیند.'}};
function Panel({tenant,label,l}){const t=T[l];const fa=l==='fa';
  return <div className="p" data-tenant={tenant} lang={l} dir={fa?'rtl':'ltr'} data-lang={fa?'fa':undefined}>
    <div className="k" dir="ltr" style={{textAlign:fa?'right':'left'}}>{label} · {fa?'FA':'EN'}</div>
    <h2 className="h" style={fa?{lineHeight:1.4}:undefined}>{t.h[0]} <em>{t.h[1]}</em></h2>
    <div className="r"><Button variant="primary" size="sm">{t.add}</Button><Button variant="secondary" size="sm">{t.shop}</Button></div>
    <div className="r"><Chip selected>{t.tags[0]}</Chip><Chip>{t.tags[1]}</Chip><Badge tone="accent">{t.nw}</Badge></div>
    <div className="g"><ProductCard name={t.pn} price={t.pr} placeholder={t.ph} frame="arch"/><div style={{fontSize:13,color:'var(--text-muted)',lineHeight:1.6}}>{t.note}</div></div>
  </div>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<>{[[undefined,'Default · Vendra Florist'],['clay','data-tenant="clay"'],['fern','data-tenant="fern"']].map(([tn,lb])=>['en','fa'].map(l=><Panel key={lb+l} tenant={tn} label={lb} l={l}/>))}</>);
