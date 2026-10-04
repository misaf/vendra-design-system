import React from 'react';
import { Button } from '../core/Button.jsx';
const FA_DIGITS='۰۱۲۳۴۵۶۷۸۹';
export function PaymentCard({cardNumber='',holder,bank,amount,labels={},onCopy,className=''}){
  const L={card:'Card number',holder:'Card holder',bank:'Bank',amount:'Amount',copy:'Copy',copied:'Copied',...labels};
  const digits=String(cardNumber).replace(/[۰-۹]/g,d=>FA_DIGITS.indexOf(d)).replace(/\D/g,'');
  const grouped=digits.replace(/(\d{4})(?=\d)/g,'$1 ');
  const [copied,setCopied]=React.useState(false);const t=React.useRef();
  React.useEffect(()=>()=>clearTimeout(t.current),[]);
  const copy=()=>{
    const done=()=>{setCopied(true);clearTimeout(t.current);t.current=setTimeout(()=>setCopied(false),2000);onCopy&&onCopy(digits);};
    const fallback=()=>{const a=document.createElement('textarea');a.value=digits;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();try{document.execCommand('copy');}catch(e){}a.remove();done();};
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(digits).then(done,fallback);else fallback();
  };
  const rows=[[L.holder,holder],[L.bank,bank],[L.amount,amount,'amount']].filter(r=>r[1]);
  return <div className={'ag-pay '+className}>
    <div className="ag-pay__row">
      <div className="ag-pay__cardcol"><div className="ag-pay__k">{L.card}</div><div className="ag-pay__num" dir="ltr">{grouped}</div></div>
      <Button variant="secondary" iconStart={copied?'check':'copy'} onClick={copy}>{copied?L.copied:L.copy}</Button>
    </div>
    {rows.length>0 && <dl className="ag-pay__meta">{rows.map(([k,v,m])=><div key={k} className={m?'ag-pay__'+m:undefined}><dt className="ag-pay__k">{k}</dt><dd>{v}</dd></div>)}</dl>}
    <span role="status" className="ag-sr">{copied?L.copied:''}</span>
  </div>;
}
