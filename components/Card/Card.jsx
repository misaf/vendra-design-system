import React from 'react';
import {cx} from '../utils/cx.js';
export function Card({
  variant = 'default',
  padding = 24,
  className = '',
  style,
  children,
  ...rest
}) {
  return (
    <div
      className={cx('ag-card', variant !== 'default' && 'ag-card--' + variant, className)}
      style={{padding, ...style}}
      {...rest}
    >
      {children}
    </div>
  );
}
