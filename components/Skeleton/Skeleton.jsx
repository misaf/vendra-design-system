import React from 'react';
import {cx} from '../utils/cx.js';

// Loading placeholders: text lines, a shape (`block`, `circle`, `arch`) or a whole product `card`.
// Hidden from screen readers; the shimmer stops with reduced motion.
export function Skeleton({
  shape = 'text',
  width,
  height,
  lines = 1,
  radius,
  className = '',
  style
}) {
  if (shape === 'card')
    return (
      <div aria-hidden="true" className={cx('ag-skel-card', className)} style={{width, ...style}}>
        <span className="ag-skel ag-skel--arch"></span>
        <span className="ag-skel ag-skel--text" style={{width: '70%', height: 20}}></span>
        <span className="ag-skel ag-skel--text" style={{width: '45%'}}></span>
        <span className="ag-skel ag-skel--text" style={{width: '30%'}}></span>
      </div>
    );
  if (shape === 'text')
    return (
      <div aria-hidden="true" className={cx('ag-skel-lines', className)} style={{width, ...style}}>
        {Array.from({length: Math.max(1, lines)}, (_, i) => (
          <span
            key={i}
            className="ag-skel ag-skel--text"
            style={{
              height,
              borderRadius: radius,
              width: lines > 1 && i === lines - 1 ? '60%' : undefined
            }}
          ></span>
        ))}
      </div>
    );
  return (
    <span
      aria-hidden="true"
      className={cx('ag-skel', 'ag-skel--' + shape, className)}
      style={{
        width,
        height: height ?? (shape === 'circle' ? width : undefined),
        borderRadius: radius,
        ...style
      }}
    ></span>
  );
}
