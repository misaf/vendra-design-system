import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';

// A navigation link (or a button without `href`) in header, footer or menu style;
// `current` marks it aria-current="page". The menu style adds a chevron.
export function NavLink({
  href,
  current,
  variant = 'header',
  onClick,
  children,
  className = '',
  ...rest
}) {
  const Element = href ? 'a' : 'button';
  return (
    <Element
      href={href}
      type={href ? undefined : 'button'}
      onClick={onClick}
      aria-current={current ? 'page' : undefined}
      className={cx('ag-nav', 'ag-nav--' + variant, current && 'ag-nav--current', className)}
      {...rest}
    >
      <span>{children}</span>
      {variant === 'menu' && <Icon name="chevron-right" size={18} className="ag-nav__chev" />}
    </Element>
  );
}
