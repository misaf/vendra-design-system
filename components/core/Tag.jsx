import React from 'react';
import { Icon } from './Icon.jsx';
export function Tag({selected,onRemove,className='',children,...rest}){
  return <button type="button" aria-pressed={!!selected} className={'ag-tag'+(selected?' ag-tag--selected':'')+' '+className} {...rest}>
    {children}{onRemove && <span className="ag-tag__x" onClick={e=>{e.stopPropagation();onRemove();}}><Icon name="x" size={14} /></span>}
  </button>;
}