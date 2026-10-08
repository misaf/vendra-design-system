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
  const Title = titleAs;
  return (
    <section className={cx('ag-osum', className)} style={style}>
      {title && <Title className="ag-osum__title">{title}</Title>}
      <ul className="ag-osum__lines">
        {lines.map((line, i) => (
          <li key={i} className="ag-osum__line">
            <ArchFrame size="thumb" tone="product" src={line.image} alt="" />
            <div className="ag-osum__main">
              <div className="ag-osum__name">
                {line.href ? (
                  <a href={line.href} onClick={line.onClick}>
                    {line.name}
                  </a>
                ) : (
                  line.name
                )}
              </div>
              {line.meta && <div className="ag-osum__meta">{line.meta}</div>}
              {line.note && <div className="ag-osum__note">{line.note}</div>}
            </div>
            <div className="ag-osum__total">{line.total}</div>
          </li>
        ))}
      </ul>
      {sums.length > 0 && (
        <dl className="ag-osum__sums">
          {sums.map((sum, i) => (
            <div key={i} className={cx('ag-osum__sum', sum.strong && 'ag-osum__sum--strong')}>
              <dt>{sum.label}</dt>
              <dd>{sum.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
