import '../card-runtime.js';
const NS=window.VendraDesignSystem;const DT=NS.dates||window.AG_DATES;
const FA={dir:'rtl',lang:'fa','data-lang':'fa'};
// Two panels: EN / FA. Each column is ~350px wide (mobile check).
function Quad({render,note}){return <div style={{display:'flex',flexDirection:'column',gap:16}}>{['light'].map(t=><div key={t} className="q">{['en','fa'].map(l=><div key={l} className="p" {...(l==='fa'?FA:{lang:'en',dir:'ltr'})}><div className="k">{(l==='fa'?'FA':'EN')}</div>{render(l,t)}</div>)}</div>)}</div>;}

const P='../../assets/placeholder-studio.svg';
const S={en:{steps:['Order received','Being arranged','Ready — photo sent','On its way','Delivered'],times:['09:12','10:05','14:30'],sub:'Subtotal',del:'Delivery',tot:'Total',title:'Your order',lab:'Order progress',done:'done',
  lines:[{name:'Lavender Whisper',meta:'× 1 · 4,200,000 Toman',note:'“Happy birthday, Mum. Love you — S.”',total:'4,200,000 Toman'},{name:'Ivory Rib Box',meta:'× 1 · 3,600,000 Toman',total:'3,600,000 Toman'}],sums:['7,800,000 Toman','250,000 Toman','8,050,000 Toman']},
 fa:{steps:['سفارش ثبت شد','در حال چیدن','آماده — عکس ارسال شد','در راه','تحویل شد'],times:['۰۹:۱۲','۱۰:۰۵','۱۴:۳۰'],sub:'جمع جزء',del:'ارسال',tot:'مجموع',title:'سفارش شما',lab:'مراحل سفارش',done:'انجام شد',
  lines:[{name:'نجوای اسطوخودوس',meta:'× ۱ · ۴٬۲۰۰٬۰۰۰ تومان',note:'«تولدت مبارک مامان جان. دوستت دارم — ش»',total:'۴٬۲۰۰٬۰۰۰ تومان'},{name:'باکس شیاردار عاجی',meta:'× ۱ · ۳٬۶۰۰٬۰۰۰ تومان',total:'۳٬۶۰۰٬۰۰۰ تومان'}],sums:['۷٬۸۰۰٬۰۰۰ تومان','۲۵۰٬۰۰۰ تومان','۸٬۰۵۰٬۰۰۰ تومان']}};
function Demo({lang}){const {OrderTimeline,OrderSummary,Card}=NS;const s=S[lang];
  return <>
    <Card padding={16}><OrderTimeline label={s.lab} doneLabel={s.done} current={3} status="active" steps={s.steps.map((l,i)=>({label:l,time:s.times[i]}))}/></Card>
    <Card padding={16}><OrderSummary title={s.title} titleAs="div" lines={s.lines.map((l,i)=>({...l,image:P,href:i?undefined:'#',onClick:e=>e.preventDefault()}))} sums={[{label:s.sub,value:s.sums[0]},{label:s.del,value:s.sums[1]},{label:s.tot,value:s.sums[2],strong:true}]}/></Card>
  </>;}
ReactDOM.createRoot(document.getElementById('root')).render(<Quad render={l=><Demo lang={l}/>}/>);
