import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';

// Label / value pairs as a <dl>. Icons are decorative (aria-hidden) in --text-accent; values wrap anywhere (long addresses, references).
export function DetailList({rows = [], className = '', style}) {
  return (
    <dl className={cx('ag-dl', className)} style={style}>
      {rows.filter(Boolean).map((row, i) => (
        <div key={i} className={cx('ag-dl__row', row.icon && 'ag-dl__row--icon')}>
          <dt className="ag-dl__label">
            {row.icon && <Icon name={row.icon} size={18} className="ag-dl__icon" />}
            {row.label}
          </dt>
          <dd className="ag-dl__value">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
