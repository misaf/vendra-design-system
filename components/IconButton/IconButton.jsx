import React from 'react';
import {Button as AriaButton, Link} from 'react-aria-components';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';

// An icon-only React Aria Button, or React Aria Link with `href`. `label` is its accessible name and tooltip;
// `active` sets aria-pressed and `count` shows a badge.
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
  disabled,
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
      <Link
        {...rest}
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        aria-label={label}
        ref={element => element && (element.title = label)}
        className={classes}
      >
        {content}
      </Link>
    );
  return (
    <AriaButton
      {...rest}
      type={type}
      isDisabled={disabled}
      aria-label={label}
      aria-pressed={active}
      // React Aria passes on only the attributes it knows, so the tooltip title is set here.
      ref={element => element && (element.title = label)}
      className={classes}
    >
      {content}
    </AriaButton>
  );
}
