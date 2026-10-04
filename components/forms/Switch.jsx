import React from 'react';
export function Switch({label,className='',style,...rest}){
  return <label className={'ag-switch '+className} style={style}>
    <input type="checkbox" role="switch" {...rest} />
    <span className="ag-switch__track"><span className="ag-switch__thumb"></span></span>
    {label && <span>{label}</span>}
  </label>;
}