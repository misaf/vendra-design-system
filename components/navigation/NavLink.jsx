import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function NavLink({href,current,variant='header',onClick,children,className='',...rest}){
  const T=href?'a':'button';
  return <T href={href} type={href?undefined:'button'} onClick={onClick} aria-current={current?'page':undefined} className={['ag-nav','ag-nav--'+variant,current?'ag-nav--current':'',className].join(' ')} {...rest}>
    <span>{children}</span>{variant==='menu' && <Icon name="chevron-right" size={18} className="ag-nav__chev" />}
  </T>;
}
