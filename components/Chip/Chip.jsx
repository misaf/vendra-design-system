import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';
export function Chip({selected, onRemove, className = '', children, ...rest}) {
  return (
    <button
      type="button"
      aria-pressed={!!selected}
      className={cx('ag-chip', selected && 'ag-chip--selected', className)}
      {...rest}
    >
      {children}
      {onRemove && (
        <span
          className="ag-chip__x"
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Icon name="x" size={14} />
        </span>
      )}
    </button>
  );
}
