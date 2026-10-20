import React from 'react';
import {Breadcrumb as AriaBreadcrumb, Breadcrumbs, Link} from 'react-aria-components';
import {Icon} from '../atoms/Icon/Icon.jsx';
import {cx} from '../utils/cx.js';
import {useMessages} from '../utils/messages.js';
import {messages} from './messages.js';

// Where a page sits in the site, on React Aria's Breadcrumbs: a labelled nav around an ordered list
// of links. Items are {label, href, onClick}; the last one is the current page (aria-current="page",
// not a link). The chevrons between them are decorative and mirror in RTL. In-site links go through
// VendraProvider's navigate.
export function Breadcrumb({items = [], label, className, style}) {
  const text = useMessages('Breadcrumb', messages, {label});
  return (
    <nav aria-label={text.label} className={cx('ag-crumbs', className)} style={style}>
      <Breadcrumbs className="ag-crumbs__list">
        {items.map((item, index) => (
          <AriaBreadcrumb key={index} id={String(index)} className="ag-crumbs__item">
            <Link href={item.href} onClick={item.onClick} className="ag-crumbs__link">
              {item.label}
            </Link>
            {index < items.length - 1 && (
              <Icon name="chevron-right" size={14} className="ag-crumbs__sep" />
            )}
          </AriaBreadcrumb>
        ))}
      </Breadcrumbs>
    </nav>
  );
}
