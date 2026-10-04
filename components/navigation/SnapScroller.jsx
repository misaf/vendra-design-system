import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
// Flatten fragments, nested arrays and [data-snap-group] wrappers so each repeated item gets its own snap slot.
function flattenSnap(children){const out=[];const walk=(nodes,prefix)=>{React.Children.toArray(nodes).forEach(c=>{if(React.isValidElement(c)&&(c.type===React.Fragment||(c.props&&c.props['data-snap-group']!=null))){walk(c.props.children,prefix+String(c.key)+'/');}else out.push({node:c,key:prefix+(React.isValidElement(c)&&c.key!=null?c.key:out.length)});});};walk(children,'');return out;}
export const SnapScroller=React.forwardRef(function SnapScroller({children,items,renderItem,itemAs='wrap',itemMin='200px',perView=5,perViewMobile=2.3,gap='16px',label,arrows,prevLabel='Previous',nextLabel='Next',onScrollStateChange,bleed=true,className='',style},ref){
  const el=React.useRef(null);
  const [st,setSt]=React.useState({canPrev:false,canNext:false});
  const last=React.useRef(null);const cb=React.useRef(onScrollStateChange);cb.current=onScrollStateChange;
  const measure=React.useCallback(()=>{const t=el.current;if(!t)return;const max=t.scrollWidth-t.clientWidth;const pos=Math.abs(t.scrollLeft);const n={canPrev:pos>1,canNext:pos<max-1};const o=last.current;if(o&&o.canPrev===n.canPrev&&o.canNext===n.canNext)return;last.current=n;setSt(n);cb.current&&cb.current(n);},[]);
  const by=React.useCallback(d=>{const t=el.current;if(!t)return;const rtl=getComputedStyle(t).direction==='rtl';const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;t.scrollBy({left:d*(rtl?-1:1)*t.clientWidth*.85,behavior:reduce?'auto':'smooth'});},[]);
  React.useImperativeHandle(ref,()=>({scrollPrev:()=>by(-1),scrollNext:()=>by(1),get element(){return el.current;},get state(){return st;}}),[by,st]);
  React.useEffect(()=>{measure();const t=el.current;if(!t||typeof ResizeObserver==='undefined')return;const ro=new ResizeObserver(measure);ro.observe(t);return()=>ro.disconnect();},[measure,children,items]);
  const vars={'--ss-min':itemMin,'--ss-per':perView,'--ss-per-m':perViewMobile,'--ss-gap':gap,...style};
  return <div className={'ag-snap'+(bleed?' ag-snap--bleed':'')+(itemAs==='contents'?' ag-snap--contents':'')+' '+className} style={vars}>
    {arrows && <div className="ag-snap__nav">
      <IconButton icon="chevron-left" label={prevLabel} variant="outline" size="sm" onClick={()=>by(-1)} disabled={!st.canPrev}/>
      <IconButton icon="chevron-right" label={nextLabel} variant="outline" size="sm" onClick={()=>by(1)} disabled={!st.canNext}/>
    </div>}
    <div ref={el} className="ag-snap__track" role="region" aria-label={label} tabIndex={0} onScroll={measure}>
      {itemAs==='contents'
        ?(items&&renderItem?items.map((it,i)=><React.Fragment key={it&&it.id!=null?it.id:i}>{renderItem(it,i)}</React.Fragment>):children)
        :[...(items&&renderItem?items.map((it,i)=>({node:renderItem(it,i),key:it&&it.id!=null?'i'+it.id:'i'+i})):[]),...flattenSnap(children)].map(({node,key})=><div className="ag-snap__item" key={key}>{node}</div>)}
    </div>
  </div>;
});
