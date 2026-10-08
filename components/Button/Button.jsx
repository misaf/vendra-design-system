import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';

// href → <a> (navigation); no href → <button> (action). A disabled link drops its href and gets aria-disabled.
// loading: spinner replaces iconStart, label stays (width doesn't jump), button is disabled + aria-busy; loadingLabel is announced to screen readers.
export function Button({
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  block,
  className = '',
  children,
  type = 'button',
  href,
  target,
  rel,
  disabled,
  loading,
  loadingLabel,
  ...rest
}) {
  if (loading) disabled = true;
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18;
  const classes = cx(
    'ag-btn',
    'ag-btn--' + variant,
    'ag-btn--' + size,
    block && 'ag-btn--block',
    loading && 'ag-btn--loading',
    className
  );
  const content = (
    <>
      {loading ? (
        <span
          className="ag-spin"
          style={{width: iconSize, height: iconSize}}
          aria-hidden="true"
        ></span>
      ) : (
        iconStart && <Icon name={iconStart} size={iconSize} />
      )}
      {children}
      {!loading && iconEnd && <Icon name={iconEnd} size={iconSize} />}
      {loading && loadingLabel && (
        <span className="ag-sr-only" role="status">
          {loadingLabel}
        </span>
      )}
    </>
  );
  if (href != null)
    return (
      <a
        href={disabled ? undefined : href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        aria-disabled={disabled || undefined}
        className={classes + (disabled ? ' ag-btn--disabled' : '')}
        {...rest}
      >
        {content}
      </a>
    );
  return (
    <button
      type={type}
      disabled={disabled}
      aria-busy={loading || undefined}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  );
}
