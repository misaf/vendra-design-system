import React from 'react';
import { Icon } from './Icon.jsx';
// Label / value pairs as a <dl>. Icons are decorative (aria-hidden) in --text-accent; values wrap anywhere (long addresses, references).
export function DetailList({rows=[],className='',style}){
  return <dl className={'ag-dl '+className} style={style}>
    {rows.filter(Boolean).map((r,i)=><div key={i} className={'ag-dl__row'+(r.icon?' ag-dl__row--icon':'')}>
      <dt className="ag-dl__label">{r.icon&&<Icon name={r.icon} size={18} className="ag-dl__icon"/>}{r.label}</dt>
      <dd className="ag-dl__value">{r.value}</dd>
    </div>)}
  </dl>;
}
