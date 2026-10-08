import React from 'react';
import {cx} from '../utils/cx.js';

// A short status label. Tones are shared with Alert and Toast; uppercase in English, never in Persian.
export function Badge({tone = 'neutral', className = '', children, ...rest}) {
  return (
    <span className={cx('ag-badge', 'ag-badge--' + tone, className)} {...rest}>
      {children}
    </span>
  );
}
