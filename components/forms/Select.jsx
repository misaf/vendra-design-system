import React from 'react';
import { Icon } from '../core/Icon.jsx';
// Group pickers (DatePicker) can own the hint: pass aria-invalid / aria-errormessage / aria-describedby with no hint or error.
export function Select({label,hint,error,options=[],placeholder,disabled,id,className='',style,...rest}){
  const auto=React.useId();const fid=id||auto;const hid=fid+'-hint';const msg=error||hint;const inv=!!error||rest['aria-invalid']===true||rest['aria-invalid']==='true';
  const desc=[msg?hid:null,rest['aria-describedby']].filter(Boolean).join(' ')||undefined;
  return <div className={'ag-field '+className} style={style}>
    {label && <label className="ag-field__label" htmlFor={fid}>{label}</label>}
    <span className={'ag-input'+(inv?' ag-input--error':'')+(disabled?' ag-input--disabled':'')} onClick={e=>{if(e.target===e.currentTarget){const el=document.getElementById(fid);el&&el.focus();}}}>
      <select id={fid} disabled={disabled} {...rest} aria-invalid={inv?true:undefined} aria-describedby={desc} aria-errormessage={error?hid:rest['aria-errormessage']}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o=>typeof o==='string'?<option key={o} value={o}>{o}</option>:<option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
      </select>
      <Icon name="chevron-down" size={16} className="ag-input__chev" />
    </span>
    {msg && <span id={hid} className={'ag-field__hint'+(error?' ag-field__hint--error':'')}>{msg}</span>}
  </div>;
}
