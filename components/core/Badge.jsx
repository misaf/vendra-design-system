import React from 'react';
// Retired palette names → shared status tones (kept so older markup still renders).
const BADGE_TONE_ALIASES={sage:'success',ochre:'warning',plum:'info'};
export function Badge({tone='neutral',className='',children,...rest}){
  const t=BADGE_TONE_ALIASES[tone]||tone;
  return <span className={'ag-badge ag-badge--'+t+' '+className} {...rest}>{children}</span>;
}