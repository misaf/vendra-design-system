import React from 'react';
import {cx} from '../utils/cx.js';

// A plain surface: default (white with a hairline), `sunken` or `raised`. `padding` takes px (number) or any CSS length.
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
