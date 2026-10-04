import React from 'react';
export function MenuList({title,label,children,className=''}){
  return <nav aria-label={label||(typeof title==='string'?title:undefined)} className={'ag-menu '+className}>
    {title && <div className="ag-eyebrow ag-menu__title">{title}</div>}
    <ul className="ag-menu__list">{React.Children.map(children,c=>c?<li>{c}</li>:null)}</ul>
  </nav>;
}
