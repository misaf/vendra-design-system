import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';

// An icon-only button, or link with `href`. `label` is its accessible name and tooltip; `active`
// sets aria-pressed and `count` shows a badge.
export function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  active,
  count,
  className = '',
  type = 'button',
  href,
  target,
  rel,
  ...rest
}) {
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 22 : 20;
  const classes = cx(
    'ag-iconbtn',
    'ag-iconbtn--' + variant,
    'ag-iconbtn--' + size,
    active && 'ag-iconbtn--active',
    className
  );
  // count may be a pre-localized string (Persian digits), so test for a value rather than count>0.
  const content = (
    <>
      <Icon name={icon} size={iconSize} />
      {count ? <span className="ag-iconbtn__count">{count}</span> : null}
    </>
  );
  if (href)
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        aria-label={label}
        title={label}
        className={classes}
        {...rest}
      >
        {content}
      </a>
    );
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  );
}
