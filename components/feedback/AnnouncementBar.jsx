import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
export function AnnouncementBar({children,onClose,closeLabel='Dismiss',label,className=''}){
  return <div role="region" aria-label={label} className={'ag-announce '+className}>
    <div className="ag-announce__text">{children}</div>
    {onClose && <IconButton icon="x" label={closeLabel} className="ag-announce__close" onClick={onClose} />}
  </div>;
}
