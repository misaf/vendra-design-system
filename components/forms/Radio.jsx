import React from 'react';
export function Radio({label,description,hint,error,disabled,id,className='',style,...rest}){
  const auto=React.useId();const fid=id||auto;const hid=fid+'-hint';const msg=error||hint;
  const desc=[msg?hid:null,rest['aria-describedby']].filter(Boolean).join(' ')||undefined;
  const box=<label className={'ag-check ag-check--radio'+(error?' ag-check--error':'')+(disabled?' ag-check--disabled':'')+(msg?'':' '+className)} style={msg?undefined:style}>
    <input type="radio" id={id} disabled={disabled} {...rest} aria-invalid={error?true:undefined} aria-describedby={desc} aria-errormessage={error?hid:undefined} />
    <span className="ag-check__box"></span>
    <span style={{display:'flex',flexDirection:'column'}}>{label}{description && <span style={{fontSize:'var(--text-sm)',color:'var(--text-muted)'}}>{description}</span>}</span>
  </label>;
  if(!msg) return box;
  return <div className={'ag-field ag-field--check '+className} style={style}>{box}{msg && <span id={hid} className={'ag-field__hint'+(error?' ag-field__hint--error':'')}>{msg}</span>}</div>;
}
