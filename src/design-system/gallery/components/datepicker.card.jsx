import '../card-runtime.js';
const NS=window.VendraDesignSystem;const DT=NS.dates||window.AG_DATES;
const FA={dir:'rtl',lang:'fa','data-lang':'fa'};
// Two panels: EN / FA. Each column is ~350px wide (mobile check).
function Quad({render,note}){return <div style={{display:'flex',flexDirection:'column',gap:16}}>{['light'].map(t=><div key={t} className="q">{['en','fa'].map(l=><div key={l} className="p" {...(l==='fa'?FA:{lang:'en',dir:'ltr'})}><div className="k">{(l==='fa'?'FA':'EN')}</div>{render(l,t)}</div>)}</div>)}</div>;}

const L={en:{jalali:'Shamsi',gregorian:'Gregorian',year:'Year',month:'Month',day:'Day'},fa:{jalali:'شمسی',gregorian:'میلادی',year:'سال',month:'ماه',day:'روز'}};
function Demo({lang,t}){const {DatePicker}=NS;
  const [v,setV]=React.useState(DT.iso(DT.j2g(1404,7,30)));const [y,setY]=React.useState({cal:'j',m:9,d:30});
  return <>
    <DatePicker id={'dp-'+lang+t} lang={lang} label={lang==='fa'?'تاریخ مراسم':'Event date'} value={v} onChange={setV} years={3} labels={L[lang]}/>
    <DatePicker id={'dpy-'+lang+t} lang={lang} yearly label={lang==='fa'?'تاریخ یادآور':'Reminder date'} value={y} onChange={setY} labels={L[lang]}/>
    <DatePicker id={'dpe-'+lang+t} lang={lang} label={lang==='fa'?'تاریخ ارسال':'Delivery date'} value="" onChange={()=>{}} minDate={DT.iso(new Date())} labels={L[lang]} error={lang==='fa'?'تاریخ ارسال را انتخاب کنید.':'Choose a delivery date.'}/>
  </>;}
ReactDOM.createRoot(document.getElementById('root')).render(<Quad render={(l,t)=><Demo lang={l} t={t}/>}/>);
