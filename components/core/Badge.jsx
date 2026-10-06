import React from 'react';
export function Badge({tone='neutral',className='',children,...rest}){
  return <span className={'ag-badge ag-badge--'+tone+' '+className} {...rest}>{children}</span>;
}