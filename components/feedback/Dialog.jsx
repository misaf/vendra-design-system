import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
const FOCUSABLE='a[href],area[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),iframe,[tabindex]:not([tabindex="-1"]),[contenteditable="true"]';
let locks=0,saved=null;
const lockScroll=()=>{if(locks++===0){const b=document.body,sw=window.innerWidth-document.documentElement.clientWidth;saved={o:b.style.overflow,p:b.style.paddingInlineEnd};b.style.overflow='hidden';if(sw>0)b.style.paddingInlineEnd=sw+'px';}};
const unlockScroll=()=>{if(--locks===0&&saved){document.body.style.overflow=saved.o;document.body.style.paddingInlineEnd=saved.p;saved=null;}};
// role="dialog" + aria-modal + aria-labelledby → title. Focus moves in on open, Tab/Shift+Tab stay inside, Esc closes,
// focus returns to the opener on close, and the page behind can't scroll (skipped for inline previews).
export function Dialog({open,onClose,title,children,footer,inline,closeLabel='Close',maxWidth,initialFocus,placement='center'}){
  const tid=React.useId();const ref=React.useRef(null);const closeRef=React.useRef(onClose);closeRef.current=onClose;
  React.useEffect(()=>{
    if(!open)return;const d=ref.current;if(!d)return;
    const opener=document.activeElement;
    const list=()=>[...d.querySelectorAll(FOCUSABLE)].filter(el=>el.getClientRects().length);
    const f=list();
    const first=(initialFocus&&d.querySelector(initialFocus))||f.find(el=>!el.closest('.ag-dialog__head'))||f[0]||d;
    // Inline previews don't move or trap focus — several on one page would fight over it.
    if(!inline)first.focus({preventScroll:true});
    const onKey=e=>{
      if(e.key==='Escape'){if(closeRef.current){e.stopPropagation();closeRef.current();}return;}
      if(e.key!=='Tab')return;const all=list();if(!all.length){e.preventDefault();d.focus();return;}
      const a=all[0],z=all[all.length-1],cur=document.activeElement;
      if(e.shiftKey&&(cur===a||cur===d||!d.contains(cur))){e.preventDefault();z.focus();}
      else if(!e.shiftKey&&(cur===z||!d.contains(cur))){e.preventDefault();a.focus();}
    };
    const onFocusIn=e=>{if(!d.contains(e.target)){const all=list();(all[0]||d).focus({preventScroll:true});}};
    if(inline)return;
    document.addEventListener('keydown',onKey,true);document.addEventListener('focusin',onFocusIn);
    lockScroll();
    return()=>{document.removeEventListener('keydown',onKey,true);document.removeEventListener('focusin',onFocusIn);unlockScroll();
      if(opener&&opener.focus&&document.contains(opener))opener.focus({preventScroll:true});};
  },[open,inline]);
  if(!open)return null;
  return <div className={'ag-dialog__overlay'+(inline?' ag-dialog__overlay--inline':'')+(placement==='start'?' ag-dialog__overlay--sheet':'')} onClick={e=>{if(e.target===e.currentTarget&&onClose)onClose();}}>
    <div ref={ref} role="dialog" aria-modal="true" aria-labelledby={title?tid:undefined} tabIndex={-1} className={'ag-dialog'+(placement==='start'?' ag-dialog--sheet':'')} style={maxWidth?{maxWidth}:undefined}>
      <div className="ag-dialog__head"><h2 id={tid} className="ag-dialog__title">{title}</h2>{onClose && <IconButton icon="x" label={closeLabel} size="sm" onClick={onClose} />}</div>
      <div className="ag-dialog__body">{children}</div>
      {footer && <div className="ag-dialog__foot">{footer}</div>}
    </div>
  </div>;
}
