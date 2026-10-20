import React from 'react';
import {Button, Link} from 'react-aria-components';
import {Icon} from '../atoms/Icon/Icon.jsx';
import {cx} from '../utils/cx.js';

// A navigation link (React Aria Link; a React Aria Button without `href`) in header, footer or menu
// style; `current` marks it aria-current="page". The menu style adds a chevron. In-site links go
// through VendraProvider's navigate.
export function NavLink({
  href,
  current,
  variant = 'header',
  onClick,
  children,
  className = '',
  ...rest
}) {
  const Element = href ? Link : Button;
  return (
    <Element
      {...rest}
      href={href}
      onClick={onClick}
      aria-current={current ? 'page' : undefined}
      className={cx('ag-nav', 'ag-nav--' + variant, current && 'ag-nav--current', className)}
    >
      <span>{children}</span>
      {variant === 'menu' && <Icon name="chevron-right" size={18} className="ag-nav__chev" />}
    </Element>
  );
}
