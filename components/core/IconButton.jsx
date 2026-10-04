import React from 'react';
import { Icon } from './Icon.jsx';
export function IconButton({icon,label,variant='ghost',size='md',active,count,className='',type='button',href,target,rel,...rest}){
  const is=size==='sm'?16:size==='lg'?22:20;
  const cls=['ag-iconbtn','ag-iconbtn--'+variant,'ag-iconbtn--'+size,active?'ag-iconbtn--active':'',className].join(' ');
  const inner=<><Icon name={icon} size={is} />{count>0 && <span className="ag-iconbtn__count">{count}</span>}</>;
  if(href) return <a href={href} target={target} rel={rel??(target==='_blank'?'noopener noreferrer':undefined)} aria-label={label} title={label} className={cls} {...rest}>{inner}</a>;
  return <button type={type} aria-label={label} title={label} aria-pressed={active} className={cls} {...rest}>{inner}</button>;
}
