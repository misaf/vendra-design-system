import React from 'react';
import {ToggleButton} from 'react-aria-components';
import {cx} from '../utils/cx.js';

// A filter chip: React Aria's ToggleButton (aria-pressed) that fills with ink when `selected`. It
// takes onClick and the usual button props. The filters that are on, removable, are FilterBar.
export function Chip({selected, className = '', children, ...rest}) {
  return (
    <ToggleButton
      {...rest}
      isSelected={!!selected}
      className={cx('ag-chip', selected && 'ag-chip--selected', className)}
    >
      {children}
    </ToggleButton>
  );
}
