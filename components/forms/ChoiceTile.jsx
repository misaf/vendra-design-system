import React from 'react';
// The label names the tile; the description is read after it as its description, not as part of the name.
export function ChoiceTile({label,description,selected,disabled,onSelect,size='md',className='',...rest}){
  const auto=React.useId();const lid=auto+'-label';const did=auto+'-desc';
  const named=description&&label&&!rest['aria-label']&&!rest['aria-labelledby'];
  const desc=[description?did:null,rest['aria-describedby']].filter(Boolean).join(' ')||undefined;
  return <button type="button" role="radio" aria-checked={!!selected} disabled={disabled} tabIndex={selected?0:-1} className={['ag-choice','ag-choice--'+size,selected?'ag-choice--selected':'',className].join(' ')} onClick={()=>onSelect&&onSelect()} {...rest} aria-labelledby={named?lid:rest['aria-labelledby']} aria-describedby={desc}>
    <span id={lid} className="ag-choice__label">{label}</span>{description && <span id={did} className="ag-choice__desc">{description}</span>}
  </button>;
}
