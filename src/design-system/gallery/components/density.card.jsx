import '../card-runtime.js';
const { Button, IconButton, Chip, Tabs, Input, Checkbox, Switch, QuantityInput } = window.VendraDesignSystem;
const D=[['compact','Compact','dense screens with a mouse · touch keeps 44px'],['comfortable','Comfortable','the default'],['tv','TV','a screen read from across the room']];
const T={
en:{shop:'Add to bag',det:'Details',search:'Search',close:'Close',tags:['Fresh','Dried'],pills:['All','Fresh','Dried'],name:'Recipient',ph:'Full name',card:'Add a card',wrap:'Gift wrap'},
fa:{shop:'افزودن به سبد',det:'جزئیات',search:'جستجو',close:'بستن',tags:['تازه','خشک'],pills:['همه','تازه','خشک'],name:'گیرنده',ph:'نام کامل',card:'افزودن کارت',wrap:'کادوپیچ'}};
function Side({l,d}){const t=T[l];
return <div lang={l} dir={l==='fa'?'rtl':'ltr'} data-lang={l==='fa'?'fa':undefined}>
<div className="r"><Button iconEnd="arrow-right">{t.shop}</Button><Button variant="secondary" size="sm">{t.det}</Button><IconButton icon="search" label={t.search}/><IconButton icon="x" label={t.close} size="sm"/>{t.tags.map((x,i)=><Chip key={x} selected={i===0}>{x}</Chip>)}</div>
<div className="r"><Tabs variant="pill" label={t.pills[0]} items={t.pills.map((x,i)=>({id:'p'+i,label:x}))}/><QuantityInput defaultValue={2}/></div>
<div className="r" style={{alignItems:'flex-end'}}><div style={{flex:'1 1 220px',minWidth:0}}><Input id={'nm-'+d+'-'+l} label={t.name} placeholder={t.ph}/></div><Checkbox label={t.card} defaultChecked/><Switch label={t.wrap} defaultChecked/></div>
</div>;}
ReactDOM.createRoot(document.getElementById('root')).render(<>{D.map(([d,name,note])=>
<section key={d} className="row" data-density={d}><p className="dh"><b>{name}</b><span>data-density="{d}" · {note}</span></p><div className="split"><Side l="en" d={d}/><Side l="fa" d={d}/></div></section>)}</>);
