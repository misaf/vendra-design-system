import React from 'react';
import {ToggleButton} from 'react-aria-components';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';

// A filter chip: React Aria's ToggleButton (aria-pressed) that fills with ink when `selected`, with
// an optional remove icon (`onRemove`). It takes onClick and the usual button props.
export function Chip({selected, onRemove, className = '', children, ...rest}) {
  return (
    <ToggleButton
      {...rest}
      isSelected={!!selected}
      className={cx('ag-chip', selected && 'ag-chip--selected', className)}
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
    </ToggleButton>
  );
}
