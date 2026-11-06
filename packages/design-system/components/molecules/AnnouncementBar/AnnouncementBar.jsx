import React from 'react';
import {IconButton} from '../../atoms/IconButton/IconButton.jsx';
import {cx} from '../../utils/cx.js';
import {useMessages} from '../../utils/messages.js';
import {messages} from './messages.js';

// A dismissible strip above the header (role="region", named by `label`) for store-wide news.
export function AnnouncementBar({children, onClose, closeLabel, label, className = ''}) {
  const text = useMessages('AnnouncementBar', messages, {close: closeLabel});
  return (
    <div role="region" aria-label={label} className={cx('ag-announce', className)}>
      <div className="ag-announce__text">{children}</div>
      {onClose && (
        <IconButton icon="x" label={text.close} className="ag-announce__close" onClick={onClose} />
      )}
    </div>
  );
}
