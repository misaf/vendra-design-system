import React from 'react';
// The label names the radio; the description is read after it as its description, not as part of the name.
export function Radio({label,description,hint,error,disabled,id,className='',style,...rest}){
  const auto=React.useId();const fid=id||auto;const hid=fid+'-hint';const lid=fid+'-label';const did=fid+'-desc';const msg=error||hint;
  const desc=[description?did:null,msg?hid:null,rest['aria-describedby']].filter(Boolean).join(' ')||undefined;
  const named=description&&label&&!rest['aria-label']&&!rest['aria-labelledby'];
  const box=<label className={'ag-check ag-check--radio'+(error?' ag-check--error':'')+(disabled?' ag-check--disabled':'')+(msg?'':' '+className)} style={msg?undefined:style}>
    <input type="radio" id={id} disabled={disabled} {...rest} aria-labelledby={named?lid:rest['aria-labelledby']} aria-invalid={error?true:undefined} aria-describedby={desc} aria-errormessage={error?hid:undefined} />
    <span className="ag-check__box"></span>
    <span style={{display:'flex',flexDirection:'column'}}><span id={lid}>{label}</span>{description && <span id={did} style={{fontSize:'var(--text-sm)',color:'var(--text-muted)'}}>{description}</span>}</span>
  </label>;
  if(!msg) return box;
  return <div className={'ag-field ag-field--check '+className} style={style}>{box}{msg && <span id={hid} className={'ag-field__hint'+(error?' ag-field__hint--error':'')}>{msg}</span>}</div>;
}
