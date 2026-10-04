import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Accordion({items=[],openId,defaultOpenId,onToggle,allowMultiple,headingLevel=3,className=''}){
  const uid=React.useId();
  const arr=v=>v==null?[]:Array.isArray(v)?v:[v];
  const [inner,setInner]=React.useState(arr(defaultOpenId));
  const open=openId!==undefined?arr(openId):inner;
  const toggle=id=>{const was=open.includes(id);const next=was?open.filter(x=>x!==id):allowMultiple?[...open,id]:[id];if(openId===undefined)setInner(next);onToggle&&onToggle(id,!was,next);};
  const H='h'+headingLevel;
  return <div className={'ag-acc '+className}>{items.map(it=>{
    const o=open.includes(it.id);const b=uid+'b'+it.id,p=uid+'p'+it.id;
    return <div key={it.id} className={'ag-acc__item'+(o?' ag-acc__item--open':'')}>
      <H className="ag-acc__h"><button type="button" id={b} className="ag-acc__btn" aria-expanded={o} aria-controls={p} onClick={()=>toggle(it.id)}><span>{it.title}</span><Icon name="chevron-down" size={18} className="ag-acc__chev" /></button></H>
      <div id={p} role="region" aria-labelledby={b} className="ag-acc__panel"><div className="ag-acc__clip"><div className="ag-acc__content">{it.content}</div></div></div>
    </div>;})}</div>;
}
