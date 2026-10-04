import React from 'react';
// legend → <fieldset><legend>; hint/error below the tiles, linked to the radiogroup via aria-describedby (+ aria-invalid / aria-errormessage).
export function ChoiceGroup({label,labelledBy,legend,hint,error,id,columns,minTileWidth=140,children,className='',style}){
  const ref=React.useRef(null);const auto=React.useId();const gid=id||auto;const hid=gid+'-hint';const lid=gid+'-legend';const msg=error||hint;
  React.useEffect(()=>{const r=ref.current;if(!r)return;const t=[...r.querySelectorAll('[role="radio"]:not(:disabled)')];if(t.length&&!t.some(x=>x.tabIndex===0))t[0].tabIndex=0;});
  const onKey=e=>{
    const t=[...ref.current.querySelectorAll('[role="radio"]:not(:disabled)')];const i=t.indexOf(document.activeElement);if(i<0)return;
    const rtl=getComputedStyle(ref.current).direction==='rtl';
    const map={ArrowDown:1,ArrowUp:-1,ArrowRight:rtl?-1:1,ArrowLeft:rtl?1:-1};
    let n;if(e.key in map)n=(i+map[e.key]+t.length)%t.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=t.length-1;else return;
    e.preventDefault();t[n].focus();t[n].click();
  };
  const wrapped=!!(legend||msg);
  const group=<div ref={ref} id={gid} role="radiogroup" aria-label={legend?undefined:label} aria-labelledby={legend?lid:labelledBy} aria-describedby={msg?hid:undefined} aria-invalid={error?true:undefined} aria-errormessage={error?hid:undefined} onKeyDown={onKey} className={'ag-choices'+(error?' ag-choices--error':'')+(wrapped?'':' '+className)} style={{gridTemplateColumns:columns?'repeat('+columns+',minmax(0,1fr))':'repeat(auto-fill,minmax('+minTileWidth+'px,1fr))',...(wrapped?null:style)}}>{children}</div>;
  if(!wrapped) return group;
  const hintEl=msg && <span id={hid} className={'ag-field__hint'+(error?' ag-field__hint--error':'')}>{msg}</span>;
  if(legend) return <fieldset className={'ag-field ag-fieldset '+className} style={style}><legend id={lid} className="ag-field__label">{legend}</legend>{group}{hintEl}</fieldset>;
  return <div className={'ag-field '+className} style={style}>{group}{hintEl}</div>;
}
