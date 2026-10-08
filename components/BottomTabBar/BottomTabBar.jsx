import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';

// The phone tab bar. Items with `href` are links (aria-current="page" when current); the rest
// are buttons. `count` shows a badge on the icon.
export function BottomTabBar({items = [], label, className = ''}) {
  return (
    <nav aria-label={label} className={cx('ag-tabbar', className)}>
      <ul className="ag-tabbar__list">
        {items.map(item => {
          const classes = cx('ag-tabbar__item', item.current && 'ag-tabbar__item--current');
          const current = item.current ? 'page' : undefined;
          const content = (
            <>
              <span className="ag-tabbar__icon">
                <Icon name={item.icon} size={22} />
                {item.count ? <span className="ag-tabbar__count">{item.count}</span> : null}
              </span>
              <span className="ag-tabbar__label">{item.label}</span>
            </>
          );
          return (
            <li key={item.id}>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.target}
                  rel={item.rel ?? (item.target === '_blank' ? 'noopener noreferrer' : undefined)}
                  className={classes}
                  aria-current={current}
                  onClick={item.onClick}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  className={classes}
                  aria-current={current}
                  onClick={item.onClick}
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
