import React from 'react';
// WCAG 1.4.13: the bubble describes its trigger (aria-describedby), stays open while the pointer is over it, and Esc dismisses it until the pointer or focus leaves.
export function Tooltip({content,placement='top',open,children}){
  const id=React.useId();const [hover,setHover]=React.useState(false);const [focus,setFocus]=React.useState(false);const [dismissed,setDismissed]=React.useState(false);
  const active=hover||focus;
  React.useEffect(()=>{if(!active)return;const onKey=e=>{if(e.key==='Escape')setDismissed(true);};document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey);},[active]);
  React.useEffect(()=>{if(!active)setDismissed(false);},[active]);
  // Template runtimes pass even a single child as an array, so unwrap a lone element before linking it.
  const kids=React.Children.toArray(children);const only=kids.length===1&&React.isValidElement(kids[0])?kids[0]:null;
  const trigger=only?React.cloneElement(only,{'aria-describedby':[only.props['aria-describedby'],id].filter(Boolean).join(' ')}):children;
  return <span className={'ag-tip'+(open?' ag-tip--open':'')+(dismissed?' ag-tip--dismissed':'')} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onFocus={()=>setFocus(true)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setFocus(false);}}>{trigger}<span id={id} role="tooltip" className={'ag-tip__bubble'+(placement==='bottom'?' ag-tip__bubble--bottom':'')}>{content}</span></span>;
}
