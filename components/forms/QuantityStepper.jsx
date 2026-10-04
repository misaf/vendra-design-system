import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function QuantityStepper({value,defaultValue=1,min=1,max=99,onChange,disabled,size='md',format=(n)=>String(n),labels={dec:'Decrease',inc:'Increase'}}){
  const [inner,setInner]=React.useState(defaultValue);
  const v=value??inner;
  const set=n=>{n=Math.max(min,Math.min(max,n));if(value===undefined)setInner(n);onChange&&onChange(n);};
  return <div className={'ag-stepper'+(size==='sm'?' ag-stepper--sm':'')+(disabled?' ag-stepper--disabled':'')}>
    <button type="button" aria-label={labels.dec} disabled={disabled||v<=min} onClick={()=>set(v-1)}><Icon name="minus" size={16} /></button>
    <span className="ag-stepper__val" aria-live="polite">{format(v)}</span>
    <button type="button" aria-label={labels.inc} disabled={disabled||v>=max} onClick={()=>set(v+1)}><Icon name="plus" size={16} /></button>
  </div>;
}