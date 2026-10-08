import React from 'react';
import {cx} from '../utils/cx.js';
export function MenuList({title, label, children, className = ''}) {
  return (
    <nav
      aria-label={label || (typeof title === 'string' ? title : undefined)}
      className={cx('ag-menu', className)}
    >
      {title && <div className="ag-eyebrow ag-menu__title">{title}</div>}
      <ul className="ag-menu__list">
        {React.Children.map(children, c => (c ? <li>{c}</li> : null))}
      </ul>
    </nav>
  );
}
