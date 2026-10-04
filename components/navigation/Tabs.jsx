import React from 'react';
// role="tablist" with a roving tabindex: only the selected tab is in the Tab order; ←/→ (mirrored in RTL), Home and End move and select.
export function Tabs({items=[],value,defaultValue,onChange,variant='underline',label,className=''}){
  const [inner,setInner]=React.useState(defaultValue??items[0]?.id);
  const v=value??inner;const refs=React.useRef([]);
  const pick=id=>{if(value===undefined)setInner(id);onChange&&onChange(id);};
  const onKey=(e,i)=>{const n=items.length;if(!n)return;const rtl=getComputedStyle(e.currentTarget).direction==='rtl';let j=null;
    if(e.key==='ArrowRight')j=rtl?i-1:i+1;else if(e.key==='ArrowLeft')j=rtl?i+1:i-1;else if(e.key==='Home')j=0;else if(e.key==='End')j=n-1;
    if(j===null)return;e.preventDefault();j=(j+n)%n;refs.current[j]&&refs.current[j].focus();pick(items[j].id);};
  const sel=items.some(it=>it.id===v)?v:items[0]?.id;
  return <div role="tablist" aria-label={label} className={'ag-tabs'+(variant==='pill'?' ag-tabs--pill':'')+' '+className}>
    {items.map((it,i)=><button key={it.id} ref={el=>refs.current[i]=el} role="tab" type="button" aria-selected={v===it.id} tabIndex={sel===it.id?0:-1} className={'ag-tab'+(v===it.id?' ag-tab--active':'')} onClick={()=>pick(it.id)} onKeyDown={e=>onKey(e,i)}>{it.label}</button>)}
  </div>;
}
