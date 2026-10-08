import React from 'react';
import {cx} from '../utils/cx.js';
export function Badge({tone = 'neutral', className = '', children, ...rest}) {
  return (
    <span className={cx('ag-badge', 'ag-badge--' + tone, className)} {...rest}>
      {children}
    </span>
  );
}
