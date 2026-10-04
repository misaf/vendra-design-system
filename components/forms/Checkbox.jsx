import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Checkbox({label,hint,error,disabled,id,className='',style,...rest}){
  const auto=React.useId();const fid=id||auto;const hid=fid+'-hint';const msg=error||hint;
  const desc=[msg?hid:null,rest['aria-describedby']].filter(Boolean).join(' ')||undefined;
  const box=<label className={'ag-check ag-check--checkbox'+(error?' ag-check--error':'')+(disabled?' ag-check--disabled':'')+(msg?'':' '+className)} style={msg?undefined:style}>
    <input type="checkbox" id={id} disabled={disabled} {...rest} aria-invalid={error?true:undefined} aria-describedby={desc} aria-errormessage={error?hid:undefined} />
    <span className="ag-check__box"><Icon name="check" size={14} /></span>
    {label && <span>{label}</span>}
  </label>;
  if(!msg) return box;
  return <div className={'ag-field ag-field--check '+className} style={style}>{box}{msg && <span id={hid} className={'ag-field__hint'+(error?' ag-field__hint--error':'')}>{msg}</span>}</div>;
}
