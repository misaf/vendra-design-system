import '../card-runtime.js';
const { DatePicker, Input, PhoneInput, CodeInput, LocationPicker, PlacesMap, Select, Checkbox, Radio, RadioGroup, Switch, QuantityInput, ChoiceTile, ChoiceGroup, RangeSlider } = window.VendraDesignSystem;
const fa=n=>window.AG_FORMAT.number(n,'fa');
const T={
en:{h:'English',d:n=>n.toLocaleString('en-US'),name:'Recipient name',ph:'e.g. Shirin',win:'Delivery window',wins:['Morning · 8–12','Afternoon · 12–16','Evening · 16–20'],card:'Add a handwritten card',un:'Unavailable',sz:[['Petite','8–10 stems'],['Generous','15–18 stems']],sub:'Weekly subscription',
 ke:'Errors · label → control → hint',phone:'Recipient phone',phErr:'Enter an 11-digit mobile number.',code:'Sign-in code',codeH:'We sent a 5-digit code to 0912 345 6789.',kl:'LocationPicker · PlacesMap · maps load in the app (frames shown here)',places:'Your saved addresses',pin:'Delivery pin',pinH:'Move the map so the pin sits on the front door.',locate:'Use my location',nameH:'As written on the card.',terms:'I agree to the delivery terms',termsErr:'Please accept the terms to continue.',zone:'Delivery area',zph:'Choose an area',zones:['Karaj — central','Tehran'],zErr:'Choose where we deliver.',
 kd:'DatePicker · Shamsi / Gregorian',date:'Delivery date',kg:'ChoiceGroup · fieldset + legend + error',bs:'Bouquet size',bsErr:'Choose a size.',bsz:['Petite','Generous','Luxe'],
 kt:'ChoiceTile · ChoiceGroup',dt:'Delivery time',slots:[['08','08–12','Free'],['12','12–16','Free'],['16','16–20','+80,000'],['20','20–22','Full']],area:'Area',areas:['Central Karaj','Azimiyeh','Fardis'],
 kr:'RangeSlider',money:v=>(v/1000000).toLocaleString('en-US',{maximumFractionDigits:1})+'M Toman',rl:{min:'Min price',max:'Max price'},kr1:'RangeSlider · range=false',stems:'Stem count',st:v=>v+' stems'},
fa:{h:'فارسی',d:fa,name:'نام گیرنده',ph:'مثلاً شیرین',win:'بازهٔ ارسال',wins:['صبح · ۸ تا ۱۲','ظهر · ۱۲ تا ۱۶','عصر · ۱۶ تا ۲۰'],card:'افزودن کارت دست‌نویس',un:'غیرفعال',sz:[['کوچک','۸ تا ۱۰ شاخه'],['پرپشت','۱۵ تا ۱۸ شاخه']],sub:'اشتراک هفتگی',
 ke:'خطاها · برچسب ← فیلد ← راهنما',phone:'تلفن گیرنده',phErr:'شمارهٔ موبایل ۱۱ رقمی وارد کنید.',code:'کد ورود',codeH:'کد ۵ رقمی به ۰۹۱۲ ۳۴۵ ۶۷۸۹ فرستاده شد.',kl:'انتخاب مکان · نقشه مکان‌ها · نقشه‌ها در برنامه بارگذاری می‌شوند (اینجا فقط قاب)',places:'نشانی‌های ذخیره‌شده',pin:'پین محل تحویل',pinH:'نقشه را جابه‌جا کنید تا پین روی درِ ورودی بنشیند.',locate:'مکان من',nameH:'همان‌طور که روی کارت نوشته می‌شود.',terms:'شرایط ارسال را می‌پذیرم',termsErr:'برای ادامه، شرایط را بپذیرید.',zone:'منطقهٔ ارسال',zph:'یک منطقه انتخاب کنید',zones:['کرج — مرکز','تهران'],zErr:'محل ارسال را انتخاب کنید.',
 kd:'انتخاب تاریخ · شمسی / میلادی',date:'تاریخ ارسال',kg:'گروه انتخاب · خطا',bs:'اندازهٔ دسته‌گل',bsErr:'یک اندازه انتخاب کنید.',bsz:['کوچک','پرپشت','لوکس'],
 kt:'کاشی انتخاب',dt:'زمان ارسال',slots:[['08','۸ تا ۱۲','رایگان'],['12','۱۲ تا ۱۶','رایگان'],['16','۱۶ تا ۲۰','+۸۰٬۰۰۰'],['20','۲۰ تا ۲۲','پر']],area:'منطقه',areas:['کرج مرکزی','عظیمیه','فردیس'],
 kr:'بازهٔ قیمت',money:v=>fa(v)+' تومان',rl:{min:'حداقل قیمت',max:'حداکثر قیمت'},kr1:'لغزنده · تک‌مقدار',stems:'تعداد شاخه',st:v=>fa(v)+' شاخه'}};
function Side({l}){const t=T[l];const isFa=l==='fa';const f=isFa?fa:undefined;
const [one,setOne]=React.useState(40);const [slot,setSlot]=React.useState('12');const [r,setR]=React.useState([1500000,6000000]);const [z,setZ]=React.useState(0);
return <div lang={l} dir={isFa?'rtl':'ltr'} data-lang={isFa?'fa':undefined}><div className="lh">{t.h}</div>
<div className="g2">
<Input id={'nm-'+l} label={t.name} placeholder={t.ph} hint={t.nameH}/>
<Select id={'win-'+l} label={t.win} options={t.wins}/>
<div className="col"><Checkbox label={t.card} defaultChecked/><Checkbox label={t.un} disabled/></div>
<RadioGroup className="col" label={t.bs} name={'s-'+l} defaultValue={t.sz[1][0]}>{t.sz.map(([a,b])=><Radio key={a} value={a} label={a} description={b}/>)}</RadioGroup>
<Switch label={t.sub} defaultChecked/>
<div style={{display:'flex',gap:12,alignItems:'center'}}><QuantityInput defaultValue={2}/><QuantityInput size="sm" defaultValue={3}/></div>
</div>
<div><div className="k">{t.ke}</div><div className="g2">
<PhoneInput id={'ph-'+l} label={t.phone} autoComplete="off" defaultValue="0912" error={t.phErr}/>
<CodeInput id={'cd-'+l} label={t.code} hint={t.codeH} length={5} defaultValue="48"/>
<Select id={'zn-'+l} label={t.zone} placeholder={t.zph} options={t.zones} error={t.zErr}/>
<Checkbox id={'tr-'+l} label={t.terms} error={t.termsErr}/>
</div></div>
<div><div className="k">{t.kl}</div><div className="g2"><div><LocationPicker id={'lp-'+l} compact label={t.pin} status={t.pinH} value={null} onChange={()=>{}} loadLeaflet={()=>new Promise(()=>{})} tiles={{url:'',attribution:''}} center={[35.83,50.96]} locateLabel={t.locate}/></div><PlacesMap id={'pm-'+l} label={t.places} places={[]} height={220} loadLeaflet={()=>new Promise(()=>{})} tiles={{url:'',attribution:''}} center={[35.83,50.96]}/></div></div>
<div><div className="k">{t.kd}</div>{DatePicker&&<DatePicker id={'dp-'+l} lang={l} label={t.date} value="2026-09-29" onChange={()=>{}}/>}</div>
<div><div className="k">{t.kg}</div><ChoiceGroup id={'bs-'+l} legend={t.bs} error={t.bsErr} columns={3} value={null}>{t.bsz.map(x=><ChoiceTile key={x} size="sm" value={x} label={x}/>)}</ChoiceGroup></div>
<div><div className="k">{t.kt}</div><ChoiceGroup label={t.dt} columns={4} value={slot} onChange={setSlot}>{t.slots.map(([id,a,b])=><ChoiceTile key={id} value={id} label={a} description={b} disabled={id==='20'}/>)}</ChoiceGroup>
<div style={{marginTop:12}}><ChoiceGroup label={t.area} columns={3} value={String(z)} onChange={v=>setZ(+v)}>{t.areas.map((x,i)=><ChoiceTile key={x} size="sm" value={String(i)} label={x}/>)}</ChoiceGroup></div></div>
<div className="g2">
<div><div className="k">{t.kr}</div><RangeSlider min={0} max={10000000} step={100000} value={r} onChange={setR} formatValue={t.money} labels={t.rl} label={t.kr}/></div>
<div><div className="k">{t.kr1}</div><RangeSlider range={false} min={0} max={100} step={5} value={one} onChange={setOne} label={t.stems} formatValue={t.st}/></div>
</div></div>;}
ReactDOM.createRoot(document.getElementById('root')).render(<div className="split"><Side l="en"/><Side l="fa"/></div>);
