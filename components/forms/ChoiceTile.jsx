import React from 'react';
export function ChoiceTile({label,description,selected,disabled,onSelect,size='md',className='',...rest}){
  return <button type="button" role="radio" aria-checked={!!selected} disabled={disabled} tabIndex={selected?0:-1} className={['ag-choice','ag-choice--'+size,selected?'ag-choice--selected':'',className].join(' ')} onClick={()=>onSelect&&onSelect()} {...rest}>
    <span className="ag-choice__label">{label}</span>{description && <span className="ag-choice__desc">{description}</span>}
  </button>;
}
