import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';
export function BottomTabBar({items = [], label, className = ''}) {
  return (
    <nav aria-label={label} className={cx('ag-tabbar', className)}>
      <ul className="ag-tabbar__list">
        {items.map(it => {
          const cls = cx('ag-tabbar__item', it.current && 'ag-tabbar__item--current');
          const cur = it.current ? 'page' : undefined;
          const inner = (
            <>
              <span className="ag-tabbar__icon">
                <Icon name={it.icon} size={22} />
                {it.count ? <span className="ag-tabbar__count">{it.count}</span> : null}
              </span>
              <span className="ag-tabbar__label">{it.label}</span>
            </>
          );
          return (
            <li key={it.id}>
              {it.href ? (
                <a
                  href={it.href}
                  target={it.target}
                  rel={it.rel ?? (it.target === '_blank' ? 'noopener noreferrer' : undefined)}
                  className={cls}
                  aria-current={cur}
                  onClick={it.onClick}
                >
                  {inner}
                </a>
              ) : (
                <button type="button" className={cls} aria-current={cur} onClick={it.onClick}>
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
