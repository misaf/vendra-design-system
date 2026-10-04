import React from 'react';
// Mount once, keep mounted, change children to announce. polite → role="status"; assertive → role="alert" (errors only).
export function LiveRegion({children,politeness='polite',atomic=true,id,className=''}){
  return <div id={id} role={politeness==='assertive'?'alert':'status'} aria-live={politeness} aria-atomic={atomic} className={'ag-sr-only '+className}>{children}</div>;
}
