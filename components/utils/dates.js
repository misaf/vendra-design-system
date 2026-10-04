// Jalali (Shamsi) / Gregorian date helpers. Exposed as window.AG_DATES and window.VendraDesignSystem_f4f210.dates.
// Always pass explicit locales: 'fa-IR-u-ca-persian', 'fa-IR-u-ca-gregory', 'en-GB', 'en-GB-u-ca-persian' (see locale()).
(()=>{
const div=(a,b)=>Math.floor(a/b);
const noon=d=>{const x=new Date(d);x.setHours(12,0,0,0);return x;};
// Jalali → Gregorian — jdf 33-year-cycle algorithm. Returns a local Date at 12:00 (DST-safe).
const j2g=(jy,jm,jd)=>{
  jy+=1595;let days=-355668+365*jy+div(jy,33)*8+div((jy%33)+3,4)+jd+(jm<7?(jm-1)*31:(jm-7)*30+186);
  let gy=400*div(days,146097);days%=146097;
  if(days>36524){gy+=100*div(--days,36524);days%=36524;if(days>=365)days++;}
  gy+=4*div(days,1461);days%=1461;
  if(days>365){gy+=div(days-1,365);days=(days-1)%365;}
  let gd=days+1;const sal=[0,31,(gy%4===0&&gy%100!==0)||gy%400===0?29:28,31,30,31,30,31,31,30,31,30,31];
  let gm;for(gm=0;gm<13&&gd>sal[gm];gm++)gd-=sal[gm];
  return new Date(gy,gm-1,gd,12);
};
const JF=new Intl.DateTimeFormat('en-US-u-ca-persian-nu-latn',{year:'numeric',month:'numeric',day:'numeric'});
// Gregorian Date → [jy, jm, jd]
const g2j=date=>{const p=JF.formatToParts(date);const g=t=>parseInt((p.find(x=>x.type===t)||{}).value,10);return [g('year'),g('month'),g('day')];};
const jYear=date=>g2j(date)[0];
const same=(a,b)=>a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();
const isJLeap=y=>!same(j2g(y,12,30),j2g(y+1,1,1));
const daysInMonth=(cal,y,m)=>cal==='j'?(m<=6?31:m<=11?30:(isJLeap(y)?30:29)):new Date(y,m,0).getDate();
// cal 'j' | 'g' → Date / [y,m,d]
const toDate=(cal,y,m,d)=>cal==='j'?j2g(y,m,d):new Date(y,m-1,d,12);
const parts=(cal,date)=>cal==='j'?g2j(date):[date.getFullYear(),date.getMonth()+1,date.getDate()];
const yearOf=(cal,date)=>parts(cal,date)[0];
const iso=date=>date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
const fromIso=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(s||'');return m?new Date(+m[1],+m[2]-1,+m[3],12):null;};
const daysBetween=(a,b)=>Math.round((noon(b)-noon(a))/864e5);
// Next occurrence of a yearly date ({cal:'j'|'g', m, d}), today included. Day clamps (Esfand 30 → 29, 29 Feb → 28).
const nextYearly=({cal='j',m,d},today=new Date())=>{
  const t=noon(today);let y=yearOf(cal,t);
  for(let i=0;i<2;i++){const date=toDate(cal,y,m,Math.min(d,daysInMonth(cal,y,m)));if(date>=t)return {date,days:daysBetween(t,date)};y++;}
  const date=toDate(cal,y,m,Math.min(d,daysInMonth(cal,y,m)));return {date,days:daysBetween(t,date)};
};
// Next Hijri (lunar) month/day — Umm al-Qura arithmetic. Iran's official date can differ by a day: let the store publish the real one (AG_DATA.occasionDates).
const HF=new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura-nu-latn',{month:'numeric',day:'numeric'});
const nextHijri=(hm,hd,today=new Date())=>{const t=noon(today);for(let i=0;i<400;i++){const x=new Date(t);x.setDate(t.getDate()+i);const p=HF.formatToParts(x);const g=k=>+(p.find(q=>q.type===k)||{}).value;if(g('month')===hm&&g('day')===hd)return {date:x,days:i};}return null;};
const locale=(lang,cal)=>lang==='fa'?(cal==='g'?'fa-IR-u-ca-gregory':'fa-IR-u-ca-persian'):(cal==='j'?'en-GB-u-ca-persian':'en-GB');
const calOf=loc=>/ca-persian/.test(loc)||(/^fa/.test(loc)&&!/ca-gregory/.test(loc))?'j':'g';
const clean=s=>s.replace(/\s*AP$/,'').replace(/\s+/g,' ').trim();
const JM={en:['Farvardin','Ordibehesht','Khordad','Tir','Mordad','Shahrivar','Mehr','Aban','Azar','Dey','Bahman','Esfand'],fa:['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند']};
const monthNames=(cal,lang)=>cal==='j'?JM[lang==='fa'?'fa':'en'].slice():Array.from({length:12},(_,i)=>new Intl.DateTimeFormat(locale(lang,'g'),{month:'long'}).format(new Date(2026,i,15,12)));
const FA_D='۰۱۲۳۴۵۶۷۸۹';
const digits=(n,lang)=>lang==='fa'?String(n).replace(/[0-9]/g,d=>FA_D[d]):String(n);
// "7 Mehr" / "۷ مهر" — built from our own month names so en-GB-u-ca-persian never drifts.
const dayMonth=(date,loc)=>{const fa=/^fa/.test(loc);const cal=calOf(loc);if(cal==='j'){const [,m,d]=g2j(date);return digits(d,fa?'fa':'en')+' '+JM[fa?'fa':'en'][m-1];}return clean(new Intl.DateTimeFormat(loc,{day:'numeric',month:'long'}).format(date));};
// Full date. fa never asks Intl for weekday + year together (Chrome returns "۱۴۰۵ مهر ۷, سه‌شنبه"):
// it is built as weekday + '، ' + "day month year" → «سه‌شنبه، ۷ مهر ۱۴۰۵».
const fullDate=(date,loc='en-GB',withWeekday=false)=>{
  if(!date)return '';const fa=/^fa/.test(loc);const cal=calOf(loc);
  let dmy;if(cal==='j'){const [y,m,d]=g2j(date);const L=fa?'fa':'en';dmy=digits(d,L)+' '+JM[L][m-1]+' '+digits(y,L);}
  else dmy=clean(new Intl.DateTimeFormat(loc,{day:'numeric',month:'long',year:'numeric'}).format(date));
  if(!withWeekday)return dmy;
  const wd=new Intl.DateTimeFormat(fa?'fa-IR':'en-GB',{weekday:'long'}).format(date);
  return wd+(fa?'، ':', ')+dmy;
};
const X={j2g,g2j,jYear,isJLeap,daysInMonth,toDate,parts,yearOf,iso,fromIso,daysBetween,nextYearly,nextHijri,locale,fullDate,dayMonth,monthNames,digits};
window.AG_DATES=X;
(window.VendraDesignSystem_f4f210=window.VendraDesignSystem_f4f210||{}).dates=X;
if(typeof module!=='undefined'&&module.exports)module.exports=X;
})();
