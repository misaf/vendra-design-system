import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function EmptyState({icon,tone='neutral',eyebrow,title,titleAccent,body,actions,headingLevel=2,className='',style}){
  const H='h'+headingLevel;const t=tone;
  return <div className={'ag-empty '+className} style={style}>
    {icon && <span className={'ag-empty__icon ag-empty__icon--'+t}>{typeof icon==='string'?<Icon name={icon} size={28} />:icon}</span>}
    {eyebrow && <div className="ag-eyebrow ag-empty__eyebrow">{eyebrow}</div>}
    <H className="ag-empty__title">{title}{titleAccent && <><br /><em>{titleAccent}</em></>}</H>
    {body && <div className="ag-empty__body">{body}</div>}
    {actions && <div className="ag-empty__actions">{actions}</div>}
  </div>;
}
