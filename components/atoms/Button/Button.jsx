import React from 'react';
import {Button as AriaButton, Link} from 'react-aria-components';
import {Icon} from '../Icon/Icon.jsx';
import {Spinner} from '../Spinner/Spinner.jsx';
import {cx} from '../../utils/cx.js';

// href → React Aria's Link (navigation; in-site links go through VendraProvider's navigate); no href
// → React Aria's Button (action), with onClick, type, disabled and the ARIA button attributes. A
// disabled link renders without its href, aria-disabled.
// loading: spinner replaces iconStart, label stays (width doesn't jump), the button is pending (it
// keeps focus but can't be pressed); loadingLabel is announced to screen readers.
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
  autoFocus,
  ...rest
}) {
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
        <Spinner size={iconSize} decorative />
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
      <Link
        {...rest}
        href={disabled || loading ? undefined : href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        isDisabled={disabled || loading}
        autoFocus={autoFocus}
        className={classes + (disabled || loading ? ' ag-btn--disabled' : '')}
      >
        {content}
      </Link>
    );
  return (
    <AriaButton {...rest} type={type} isDisabled={disabled} isPending={loading} className={classes}>
      {content}
    </AriaButton>
  );
}
