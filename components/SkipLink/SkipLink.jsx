import React from 'react';
import {cx} from '../utils/cx.js';

// First element in <body>. Hidden until focused; moves focus to the target (adds tabindex="-1" if needed) without touching the URL.
export function SkipLink({href = '#main', children, className = '', onClick, ...rest}) {
  const focusTarget = event => {
    onClick && onClick(event);
    if (event.defaultPrevented || !href.startsWith('#')) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus();
  };
  return (
    <a href={href} className={cx('ag-skip', className)} onClick={focusTarget} {...rest}>
      {children}
    </a>
  );
}
