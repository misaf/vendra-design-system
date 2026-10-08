import React from 'react';
import {ArchFrame} from '../ArchFrame/ArchFrame.jsx';
import {cx} from '../utils/cx.js';
// Lines + totals for order pages and confirmations. Card note: italic in EN, upright in FA (CSS).
export function OrderSummary({
  lines = [],
  sums = [],
  title,
  titleAs = 'h2',
  className = '',
  style
}) {
  const H = titleAs;
  return (
    <section className={cx('ag-osum', className)} style={style}>
      {title && <H className="ag-osum__title">{title}</H>}
      <ul className="ag-osum__lines">
        {lines.map((l, i) => (
          <li key={i} className="ag-osum__line">
            <ArchFrame size="thumb" tone="product" src={l.image} alt="" />
            <div className="ag-osum__main">
              <div className="ag-osum__name">
                {l.href ? (
                  <a href={l.href} onClick={l.onClick}>
                    {l.name}
                  </a>
                ) : (
                  l.name
                )}
              </div>
              {l.meta && <div className="ag-osum__meta">{l.meta}</div>}
              {l.note && <div className="ag-osum__note">{l.note}</div>}
            </div>
            <div className="ag-osum__total">{l.total}</div>
          </li>
        ))}
      </ul>
      {sums.length > 0 && (
        <dl className="ag-osum__sums">
          {sums.map((s, i) => (
            <div key={i} className={cx('ag-osum__sum', s.strong && 'ag-osum__sum--strong')}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
