'use client';

import React from 'react';
import {Link} from 'react-aria-components';
import {ArchFrame} from '../../atoms/ArchFrame/ArchFrame.jsx';
import {Price} from '../../atoms/Price/Price.jsx';
import {cx} from '../../utils/cx.js';

// Lines + totals for order pages and confirmations. Card note: italic in EN, upright in FA (CSS).
// Every amount is a Price, so totals share the product prices' digits and stay whole in RTL.
export function OrderSummary({
  lines = [],
  sums = [],
  title,
  titleAs = 'h2',
  itemsDisclosureLabel,
  className = '',
  style,
  ref,
  ...rest
}) {
  const Title = titleAs;
  const items = (
    <ul className="ag-osum__lines">
      {lines.map((line, i) => (
        <li key={i} className="ag-osum__line">
          <ArchFrame size="thumb" tone="product" src={line.image} sizes="56px" alt="" />
          <div className="ag-osum__details">
            <div className="ag-osum__main">
              <div className="ag-osum__name">
                {line.href ? (
                  <Link href={line.href} onClick={line.onClick}>
                    {line.name}
                  </Link>
                ) : (
                  line.name
                )}
              </div>
              {line.meta && <div className="ag-osum__meta">{line.meta}</div>}
              {line.note && <div className="ag-osum__note">{line.note}</div>}
            </div>
            {line.total != null && <Price value={line.total} className="ag-osum__total" />}
          </div>
        </li>
      ))}
    </ul>
  );
  return (
    <section {...rest} ref={ref} className={cx('ag-osum', className)} style={style}>
      {title && <Title className="ag-osum__title">{title}</Title>}
      {itemsDisclosureLabel && lines.length > 0 ? (
        <details className="ag-osum__items">
          <summary>{itemsDisclosureLabel}</summary>
          {items}
        </details>
      ) : (
        items
      )}
      {sums.length > 0 && (
        <dl className="ag-osum__sums">
          {sums.map((sum, i) => (
            <div key={i} className={cx('ag-osum__sum', sum.strong && 'ag-osum__sum--strong')}>
              <dt>{sum.label}</dt>
              <dd>
                <Price value={sum.value} />
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
