import React from 'react';
import {cx} from '../utils/cx.js';

// An on/off toggle: a native checkbox with role="switch" inside its label.
export function Switch({label, className = '', style, ...rest}) {
  return (
    <label className={cx('ag-switch', className)} style={style}>
      <input type="checkbox" role="switch" {...rest} />
      <span className="ag-switch__track">
        <span className="ag-switch__thumb"></span>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
