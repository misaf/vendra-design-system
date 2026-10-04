import React from 'react';
export function LanguageSwitch({value='en',onChange,options=[{id:'en',label:'EN'},{id:'fa',label:'فا'}]}){
  return <div className="ag-lang" role="group" aria-label="Language">
    {options.map(o=><button key={o.id} type="button" lang={o.id} aria-pressed={value===o.id} onClick={()=>onChange&&onChange(o.id)}>{o.label}</button>)}
  </div>;
}