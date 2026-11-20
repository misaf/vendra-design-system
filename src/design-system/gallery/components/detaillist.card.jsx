import '../card-runtime.js';
const NS=window.VendraDesignSystem;const DT=NS.dates||window.AG_DATES;
const FA={dir:'rtl',lang:'fa','data-lang':'fa'};
// Two panels: EN / FA. Each column is ~350px wide (mobile check).
function Quad({render,note}){return <div style={{display:'flex',flexDirection:'column',gap:16}}>{['light'].map(t=><div key={t} className="q">{['en','fa'].map(l=><div key={l} className="p" {...(l==='fa'?FA:{lang:'en',dir:'ltr'})}><div className="k">{(l==='fa'?'FA':'EN')}</div>{render(l,t)}</div>)}</div>)}</div>;}

const R={en:[{icon:'map-pin',label:'Deliver to',value:'Niavaran, Bahonar St., No. 8, Tehran · Tehran'},{icon:'clock',label:'Delivery',value:'Tuesday, 29 September 2026 · 16:00–20:00'},{icon:'user',label:'Recipient',value:<>Mina Rahimi · <span dir="ltr">0912 111 2233</span></>},{icon:'mail',label:'Card message',value:'“Happy birthday, Mum.”'},{icon:'receipt',label:'Card-to-card reference',value:<span dir="ltr">482913</span>}],
 fa:[{icon:'map-pin',label:'ارسال به',value:'تهران، نیاوران، خیابان باهنر، پلاک ۸ · تهران'},{icon:'clock',label:'زمان ارسال',value:'سه‌شنبه، ۷ مهر ۱۴۰۵ · \u2068۱۶:۰۰\u2069 تا \u2068۲۰:۰۰\u2069'},{icon:'user',label:'گیرنده',value:<>مینا رحیمی · <span dir="ltr">0912 111 2233</span></>},{icon:'mail',label:'متن کارت',value:'«تولدت مبارک مامان جان.»'},{icon:'receipt',label:'شماره پیگیری کارت‌به‌کارت',value:<span dir="ltr">۴۸۲۹۱۳</span>}]};
ReactDOM.createRoot(document.getElementById('root')).render(<Quad render={l=><NS.Card variant="sunken" padding={16}><NS.DetailList rows={R[l]}/></NS.Card>}/>);
