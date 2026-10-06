// Transactional + reminder emails, EN and FA. window.AG_EMAIL.render(event, customer, vars, order) → {lang, dir, subject, preheader, html, text}
// Language: same rule as SMS — customer's account language (AG_NOTIFY.localeFor). Send-ready HTML: tables, inline styles, 600px, hex colours, web-safe fonts.
// Theme: vars.theme = 'default' or a tenant slug from tokens/tenants/, a palette object (keys below), or omit for default. Tenant palettes are generated from tokens/tenants/<slug>.json by npm --prefix templates run build. AG_EMAIL.themeFromCSS(el) reads a tenant's live tokens into a palette (call it in the browser on an element under data-tenant).
// vars.assetBase must be an absolute URL to where logo-horizontal.png / logo-horizontal-fa.png are hosted (emails can't load relative files).
// vars.items: [{code, name, qty, price}]; code is the product's unique code and its title, shown as given (Latin, left to right);
// name describes it (kind, size, extras). Items without a code show the name alone.
(()=>{
const THEMES={
 default:{bg:'#FBF8F6',card:'#FFFFFF',ink:'#17211C',ink2:'#33403A',muted:'#59655E',line:'#ECE4E0',sunk:'#F5F0ED',gold:'#C8405F',goldInk:'#FFFFFF',accent:'#A8304D',btnRadius:'999px',btnCase:'none',btnTrack:'.02em',cardRadius:'20px',disp:null,dispCase:'none'},
// BEGIN GENERATED TENANT EMAIL THEMES
 clay:{bg:'#F6F2EA',card:'#FFFFFF',ink:'#1F1D18',ink2:'#3C3931',muted:'#615D54',line:'#E6DCCB',sunk:'#F0E9DD',gold:'#A9532E',goldInk:'#FFFFFF',accent:'#8C4221',btnRadius:'2px',btnCase:'uppercase',btnTrack:'.12em',cardRadius:'4px',disp:"'Jost','Helvetica Neue',Helvetica,Arial,sans-serif",dispCase:'uppercase'},
// END GENERATED TENANT EMAIL THEMES
};
const resolveTheme=t=>t&&typeof t==='object'?{...THEMES.default,...t}:(THEMES[t]||THEMES.default);
const toHex=c=>{const m=String(c).match(/rgba?\(([^)]+)\)/);if(!m)return String(c).trim();return '#'+m[1].split(',').slice(0,3).map(v=>Math.round(parseFloat(v)).toString(16).padStart(2,'0')).join('').toUpperCase();};
const themeFromCSS=(el=document.documentElement)=>{
  const probe=document.createElement('span');probe.style.display='none';el.appendChild(probe);
  const col=v=>{probe.style.color='var('+v+')';return toHex(getComputedStyle(probe).color);};
  const cs=getComputedStyle(el);const raw=v=>cs.getPropertyValue(v).trim();
  const rc=raw('--radius-control');const rm=raw('--radius-md');
  const t={bg:col('--surface-page'),card:col('--surface-card'),ink:col('--text-body'),ink2:col('--text-secondary'),muted:col('--text-muted'),line:col('--border-subtle'),sunk:col('--surface-sunken'),gold:col('--accent'),goldInk:col('--text-on-accent'),accent:col('--text-accent'),
    btnRadius:/999|pill/.test(rc)||!rc?'999px':rc,btnCase:raw('--button-case')||'none',btnTrack:raw('--tracking-button')||'.02em',cardRadius:parseFloat(rm)<=4?'4px':'20px',disp:/Instrument Serif/.test(raw('--font-display'))?null:raw('--font-display')+",'Helvetica Neue',Helvetica,Arial,sans-serif",dispCase:raw('--display-case')||'none'};
  probe.remove();return t;};
const FONT={en:{body:"'Jost','Helvetica Neue',Helvetica,Arial,sans-serif",disp:"'Instrument Serif',Georgia,'Times New Roman',serif"},fa:{body:"Vazirmatn,Tahoma,'Segoe UI',Arial,sans-serif",disp:"Vazirmatn,Vazirmatn,Tahoma,serif"}};
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const fd=(s,l)=>l==='fa'?String(s).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]):String(s);
const T={
en:{brand:'Vendra Florist',addr:'Azimiyeh, Karaj · 0912 933 3034',why:'You’re getting this because you have an account with Vendra.',unsub:'Turn off reminder emails',orderNo:'Order',
 received:{subject:v=>`Order ${v.id} is confirmed`,pre:v=>`Delivery ${v.date}, ${v.slot}. We’ll text you when it’s on its way.`,h:v=>`Thank you, ${v.first}.`,p:v=>`Your order is confirmed. We’ll arrange it on the morning of delivery and send you a photo before it leaves the studio.`,cta:'Track your order',rows:v=>[['Deliver to',v.recipient+' · '+v.address],['Delivery',v.date+', '+v.slot],['Card message',v.msg||'—'],['Payment',v.payment]],items:true},
 delivered:{subject:v=>`Delivered to ${v.recipient}`,pre:v=>`Your flowers arrived at ${v.time}. Save the date for next year?`,h:v=>`Delivered.`,p:v=>`Your flowers reached ${v.recipient} at ${v.time}. Thank you for choosing Vendra — we hope they were loved.`,cta:'Remind me next year',rows:v=>[['Order',v.id],['Delivered',v.date+', '+v.time]],second:'Flowers last longer if the stems are cut and the water changed every two days.'},
 reminder:{subject:v=>`${v.name}’s ${v.occasion} is on ${v.date}`,pre:v=>`Order by 18:00 the day before for same-day delivery.`,h:v=>`${v.name}’s ${v.occasion} is coming up.`,p:v=>`It’s on ${v.date}. Order by 18:00 the day before and we’ll deliver on the day, with a handwritten card.`,cta:'Send flowers',rows:v=>[['Occasion',v.occasion],['Date',v.date]],promo:true}},
fa:{brand:'گل‌فروشی وندرا',addr:'کرج، عظیمیه · ۰۹۱۲ ۹۳۳ ۳۰۳۴',why:'این ایمیل را دریافت می‌کنید چون در وندرا حساب کاربری دارید.',unsub:'خاموش کردن ایمیل‌های یادآوری',orderNo:'سفارش',
 received:{subject:v=>`سفارش ${v.id} ثبت شد`,pre:v=>`ارسال ${v.date}، ${v.slot}. وقتی سفارش راه افتاد پیامک می‌دهیم.`,h:v=>`${v.first} عزیز، ممنونیم.`,p:v=>`سفارش شما ثبت شد. صبح روز ارسال آن را می‌چینیم و پیش از ارسال عکسش را برایتان می‌فرستیم.`,cta:'پیگیری سفارش',rows:v=>[['تحویل به',v.recipient+' · '+v.address],['زمان ارسال',v.date+'، '+v.slot],['متن کارت',v.msg||'—'],['پرداخت',v.payment]],items:true},
 delivered:{subject:v=>`به ${v.recipient} تحویل شد`,pre:v=>`گل‌ها ساعت ${v.time} رسید. برای سال بعد یادآور بگذاریم؟`,h:v=>`تحویل شد.`,p:v=>`گل‌ها ساعت ${v.time} به ${v.recipient} رسید. ممنون که وندرا را انتخاب کردید؛ امیدواریم دوستشان داشته باشد.`,cta:'یادآوری برای سال بعد',rows:v=>[['سفارش',v.id],['زمان تحویل',v.date+'، '+v.time]],second:'اگر هر دو روز ساقه‌ها را کمی ببرید و آب را عوض کنید، گل‌ها بیشتر می‌مانند.'},
 reminder:{subject:v=>`${v.occasion} ${v.name}، ${v.date}`,pre:v=>`تا ساعت ۱۸ روز قبل سفارش دهید تا همان روز برسد.`,h:v=>`${v.occasion} ${v.name} نزدیک است.`,p:v=>`${v.date} است. اگر تا ساعت ۱۸ روز قبل سفارش دهید، همان روز همراه با کارت دست‌نویس می‌رسانیم.`,cta:'ارسال گل',rows:v=>[['مناسبت',v.occasion],['تاریخ',v.date]],promo:true}}};
const LATIN=['id','link','phone','assetBase','unsubLink'];
const vfa=(v,l)=>{if(l!=='fa')return v;const o={};for(const k in v)o[k]=LATIN.includes(k)||typeof v[k]!=='string'?v[k]:fd(v[k],l);return o;};
const render=(event,customer,vars={},order)=>{
  const lang=window.AG_NOTIFY?AG_NOTIFY.localeFor(customer,order):((customer&&customer.preferredLocale)||'fa');
  const L=T[lang],E=L[event];if(!E)throw new Error('Unknown email: '+event);const C=resolveTheme(vars.theme);
  const v=vfa(vars,lang);const dir=lang==='fa'?'rtl':'ltr';const F=lang==='en'&&C.disp?{...FONT.en,disp:C.disp}:FONT[lang];const up=lang==='en';const al=lang==='fa'?'right':'left';const lh=lang==='fa'?'1.9':'1.6';
  const logo=v.assetBase?`<img src="${esc(v.assetBase)}/${lang==='fa'?'logo-horizontal-fa.png':'logo-horizontal.png'}" width="${lang==='fa'?86:112}" height="56" alt="${esc(L.brand)}" style="display:block;border:0;width:${lang==='fa'?86:112}px;height:56px">`:`<span style="font-family:${F.disp};font-size:24px;color:${C.ink}">${esc(L.brand)}</span>`;
  const rows=E.rows(v).map(([a,b])=>`<tr><td style="padding:10px 0;border-top:1px solid ${C.line};font-size:13px;color:${C.muted};width:34%;vertical-align:top;text-align:${al}">${esc(a)}</td><td style="padding:10px 0;border-top:1px solid ${C.line};font-size:15px;color:${C.ink};text-align:${al}">${esc(b)}</td></tr>`).join('');
  const items=E.items&&v.items?`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 0">${v.items.map(it=>`<tr><td style="padding:10px 0;border-top:1px solid ${C.line};font-size:15px;color:${C.ink};text-align:${al}">${it.code?`<span dir="ltr">${esc(it.code)}</span>`:esc(fd(it.name,lang))} <span style="color:${C.muted}">× ${fd(it.qty,lang)}</span>${it.code&&it.name?`<div style="margin-top:2px;font-size:13px;color:${C.muted}">${esc(fd(it.name,lang))}</div>`:''}</td><td style="padding:10px 0;border-top:1px solid ${C.line};font-size:15px;color:${C.ink};text-align:${lang==='fa'?'left':'right'};white-space:nowrap">${esc(fd(it.price,lang))}</td></tr>`).join('')}<tr><td style="padding:12px 0;border-top:1px solid ${C.ink};font-size:16px;font-weight:600;color:${C.ink};text-align:${al}">${lang==='fa'?'جمع کل':'Total'}</td><td style="padding:12px 0;border-top:1px solid ${C.ink};font-size:16px;font-weight:600;color:${C.ink};text-align:${lang==='fa'?'left':'right'};white-space:nowrap">${esc(v.total)}</td></tr></table>`:'';
  const btn=`<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 8px"><tr><td style="border-radius:${C.btnRadius};background:${C.gold}"><a href="${esc(v.link||'#')}" style="display:inline-block;padding:14px 30px;font-family:${F.body};font-size:${up&&C.btnCase==='uppercase'?14:16}px;font-weight:600;letter-spacing:${up?C.btnTrack:'0'};text-transform:${up?C.btnCase:'none'};color:${C.goldInk};text-decoration:none;border-radius:${C.btnRadius}">${esc(E.cta)}</a></td></tr></table>`;
  const html=`<!doctype html><html lang="${lang}" dir="${dir}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>${esc(E.subject(v))}</title></head>
<body style="margin:0;padding:0;background:${C.bg}"><div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(E.pre(v))}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg}"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" dir="${dir}" style="width:100%;max-width:600px;font-family:${F.body};color:${C.ink};line-height:${lh}">
<tr><td align="center" style="padding:0 0 24px">${logo}</td></tr>
<tr><td style="background:${C.card};border:1px solid ${C.line};border-radius:${C.cardRadius};padding:40px 36px;text-align:${al}">
${event==='received'?`<div style="font-size:12px;letter-spacing:${lang==='fa'?'0':'.16em'};text-transform:uppercase;color:${C.accent};font-weight:600">${esc(L.orderNo)} <span dir="ltr">${esc(v.id)}</span></div>`:''}
<h1 style="margin:10px 0 14px;font-family:${F.disp};font-weight:500;font-size:${lang==='fa'?30:(C.dispCase==='uppercase'?32:38)}px;line-height:1.2;letter-spacing:${up&&C.dispCase==='uppercase'?'.02em':'0'};text-transform:${up?C.dispCase:'none'};color:${C.ink}">${esc(E.h(v))}</h1>
<p style="margin:0;font-size:16px;color:${C.ink2}">${esc(E.p(v))}</p>${btn}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0">${rows}</table>${items}
${E.second?`<p style="margin:24px 0 0;padding:16px 18px;background:${C.sunk};border-radius:${parseFloat(C.cardRadius)<=4?'2px':'12px'};font-size:14px;color:${C.ink2}">${esc(E.second)}</p>`:''}
</td></tr>
<tr><td style="padding:24px 8px 0;text-align:center;font-size:12px;color:${C.muted};line-height:1.7">${esc(L.addr)}<br>${esc(L.why)}${E.promo?`<br><a href="${esc(v.unsubLink||'#')}" style="color:${C.muted};text-decoration:underline">${esc(L.unsub)}</a>`:''}</td></tr>
</table></td></tr></table></body></html>`;
  const text=[E.h(v),'',E.p(v),'',...E.rows(v).map(([a,b])=>a+': '+b),'',...(E.items&&v.items?[...v.items.map(it=>(it.code?'\u2066'+it.code+'\u2069'+(it.name?', '+fd(it.name,lang):''):fd(it.name,lang))+' × '+fd(it.qty,lang)+' · '+fd(it.price,lang)),'']:[]),E.cta+': '+(v.link||''),'',L.addr].join('\n');
  return {lang,dir,event,subject:E.subject(v),preheader:E.pre(v),html,text};
};
window.AG_EMAIL={render,events:['received','delivered','reminder'],templates:T,themes:THEMES,themeFromCSS};
})();
