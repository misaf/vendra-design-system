import React from 'react';
import {IconButton} from '../IconButton/IconButton.jsx';
import {cx} from '../utils/cx.js';
export function AnnouncementBar({
  children,
  onClose,
  closeLabel = 'Dismiss',
  label,
  className = ''
}) {
  return (
    <div role="region" aria-label={label} className={cx('ag-announce', className)}>
      <div className="ag-announce__text">{children}</div>
      {onClose && (
        <IconButton icon="x" label={closeLabel} className="ag-announce__close" onClick={onClose} />
      )}
    </div>
  );
}
