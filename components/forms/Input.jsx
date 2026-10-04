import React from 'react';
import { Icon } from '../core/Icon.jsx';
// Label text only inside <label>; hint/error sits outside it and is linked via aria-describedby (+ aria-errormessage when invalid).
export function Input({label,hint,error,iconStart,multiline,disabled,id,className='',style,...rest}){
  const auto=React.useId();const fid=id||auto;const hid=fid+'-hint';const msg=error||hint;
  const desc=[msg?hid:null,rest['aria-describedby']].filter(Boolean).join(' ')||undefined;
  const Ctrl=multiline?'textarea':'input';
  return <div className={'ag-field '+className} style={style}>
    {label && <label className="ag-field__label" htmlFor={fid}>{label}</label>}
    <span className={'ag-input'+(error?' ag-input--error':'')+(disabled?' ag-input--disabled':'')} onClick={e=>{if(e.target===e.currentTarget){const el=document.getElementById(fid);el&&el.focus();}}}>
      {iconStart && <Icon name={iconStart} size={18} />}
      <Ctrl id={fid} disabled={disabled} {...rest} aria-invalid={error?true:undefined} aria-describedby={desc} aria-errormessage={error?hid:undefined} />
    </span>
    {msg && <span id={hid} className={'ag-field__hint'+(error?' ag-field__hint--error':'')}>{msg}</span>}
  </div>;
}
