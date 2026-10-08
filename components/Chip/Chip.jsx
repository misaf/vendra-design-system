import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';

// A filter chip: a toggle button (aria-pressed) that fills with ink when `selected`, with an
// optional remove icon (`onRemove`).
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
