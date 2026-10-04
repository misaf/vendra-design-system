import React from 'react';
import { Badge } from '../core/Badge.jsx';
import { IconButton } from '../core/IconButton.jsx';
import { Button } from '../core/Button.jsx';
const AC_DEF={edit:'Edit {name}',delete:'Delete {name}',default:'Default',makeDefault:'Set as default'};
// Saved delivery address. Edit / delete IconButtons get specific names ("Edit Home", "Delete Home").
export function AddressCard({label,line,recipient,phone,zone,isDefault,onEdit,onDelete,onMakeDefault,labels,className='',style}){
  const L={...AC_DEF,...labels};const nm=s=>s.replace('{name}',label||'');
  return <div className={'ag-card ag-addr '+className} style={style}>
    <div className="ag-addr__head">
      <span className="ag-addr__label">{label}</span>
      <div className="ag-addr__tools">{isDefault&&<Badge tone="accent">{L.default}</Badge>}{onEdit&&<IconButton icon="pencil" size="sm" label={nm(L.edit)} onClick={onEdit}/>}{onDelete&&<IconButton icon="trash-2" size="sm" label={nm(L.delete)} onClick={onDelete}/>}</div>
    </div>
    <div className="ag-addr__line">{line}</div>
    <div className="ag-addr__meta">{[recipient,phone&&<span key="p" dir="ltr">{phone}</span>,zone].filter(Boolean).map((x,i)=><React.Fragment key={i}>{i>0&&<span aria-hidden="true"> · </span>}{x}</React.Fragment>)}</div>
    {!isDefault&&onMakeDefault&&<div><Button variant="ghost" size="sm" onClick={onMakeDefault} className="ag-addr__default">{L.makeDefault}</Button></div>}
  </div>;
}
