import React from 'react';
export function Tooltip({content,placement='top',open,children}){
  return <span className={'ag-tip'+(open?' ag-tip--open':'')}>{children}<span role="tooltip" className={'ag-tip__bubble'+(placement==='bottom'?' ag-tip__bubble--bottom':'')}>{content}</span></span>;
}