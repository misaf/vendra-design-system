import React from 'react';
export function Card({variant='default',padding=24,className='',style,children,...rest}){
  return <div className={'ag-card'+(variant!=='default'?' ag-card--'+variant:'')+' '+className} style={{padding,...style}} {...rest}>{children}</div>;
}