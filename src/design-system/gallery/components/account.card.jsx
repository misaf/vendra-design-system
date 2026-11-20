import '../card-runtime.js';
const NS=window.VendraDesignSystem;const DT=NS.dates||window.AG_DATES;
const FA={dir:'rtl',lang:'fa','data-lang':'fa'};
// Two panels: EN / FA. Each column is ~350px wide (mobile check).
function Quad({render,note}){return <div style={{display:'flex',flexDirection:'column',gap:16}}>{['light'].map(t=><div key={t} className="q">{['en','fa'].map(l=><div key={l} className="p" {...(l==='fa'?FA:{lang:'en',dir:'ltr'})}><div className="k">{(l==='fa'?'FA':'EN')}</div>{render(l,t)}</div>)}</div>)}</div>;}

const S={en:{a:{label:'Home',line:'Azimiyeh, 14th St., No. 22, Unit 3, Karaj',recipient:'Shirin Ahmadi',zone:'Karaj — central'},b:{label:'Mum',line:'Niavaran, Bahonar St., No. 8, Tehran',recipient:'Mina Rahimi',zone:'Tehran'},
  al:{edit:'Edit {name}',delete:'Delete {name}',default:'Default',makeDefault:'Set as default'},
  r:[{name:'Mum',day:'9',month:'Mehr',occasion:'Birthday',occasionIcon:'cake',before:'3 days before',channel:'sms',altDate:'1 Oct',when:'in 2 days',soon:true,on:true},{name:'Yalda at Grandma’s',day:'30',month:'Azar',occasion:'Yalda night',occasionIcon:'moon',before:'1 week before',altDate:'21 Dec',when:'in 83 days',on:false}],
  rl:{paused:'Paused',sendFlowers:'Send flowers',reminderFor:'Reminder for {name}',edit:'Edit reminder for {name}',delete:'Delete reminder for {name}'}},
 fa:{a:{label:'خانه',line:'کرج، عظیمیه، خیابان چهاردهم، پلاک ۲۲، واحد ۳',recipient:'شیرین احمدی',zone:'کرج — مرکزی'},b:{label:'مامان',line:'تهران، نیاوران، خیابان باهنر، پلاک ۸',recipient:'مینا رحیمی',zone:'تهران'},
  al:{edit:'ویرایش {name}',delete:'حذف {name}',default:'پیش‌فرض',makeDefault:'انتخاب به‌عنوان پیش‌فرض'},
  r:[{name:'مامان',day:'۹',month:'مهر',occasion:'تولد',occasionIcon:'cake',before:'۳ روز قبل',channel:'sms',altDate:'۱ اکتبر',when:'۲ روز دیگر',soon:true,on:true},{name:'یلدا خانه مادربزرگ',day:'۳۰',month:'آذر',occasion:'شب یلدا',occasionIcon:'moon',before:'۱ هفته قبل',altDate:'۲۱ دسامبر',when:'۸۳ روز دیگر',on:false}],
  rl:{paused:'متوقف',sendFlowers:'ارسال گل',reminderFor:'یادآور برای {name}',edit:'ویرایش یادآور {name}',delete:'حذف یادآور {name}'}}};
function Demo({lang}){const {AddressCard,ReminderRow}=NS;const s=S[lang];const [on,setOn]=React.useState([true,false]);
  return <>
    <AddressCard {...s.a} phone="0912 564 9438" isDefault onEdit={()=>{}} onDelete={()=>{}} labels={s.al}/>
    <AddressCard {...s.b} phone="0912 111 2233" onEdit={()=>{}} onDelete={()=>{}} onMakeDefault={()=>{}} labels={s.al}/>
    {s.r.map((r,i)=><ReminderRow key={i} {...r} on={on[i]} onToggle={v=>setOn(o=>o.map((x,j)=>j===i?v:x))} onEdit={()=>{}} onDelete={()=>{}} sendHref="#" sendOnClick={e=>e.preventDefault()} labels={s.rl}/>)}
  </>;}
function Wide(){const {ReminderRow}=NS;const s=S.en;return <div className="p"><div className="k">EN · wide (controls inline)</div><ReminderRow {...s.r[0]} onToggle={()=>{}} onEdit={()=>{}} onDelete={()=>{}} sendHref="#" sendOnClick={e=>e.preventDefault()} labels={s.rl}/></div>;}
ReactDOM.createRoot(document.getElementById('root')).render(<div style={{display:'flex',flexDirection:'column',gap:16}}><Wide/><Quad render={l=><Demo lang={l}/>}/></div>);
