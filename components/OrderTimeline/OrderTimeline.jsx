import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';
// Vertical order progress. Cancelled renders nothing — the screen shows an Alert instead.
export function OrderTimeline({
  steps = [],
  current = 0,
  status = 'active',
  label,
  doneLabel = 'done',
  className = '',
  style
}) {
  if (status === 'cancelled') return null;
  return (
    <ol className={cx('ag-otl', className)} style={style} aria-label={label}>
      {steps.map((s, i) => {
        const done = status === 'done' || i < current;
        const now = status !== 'done' && i === current;
        const st = done ? 'done' : now ? 'current' : 'upcoming';
        return (
          <li
            key={i}
            className={cx('ag-otl__step', 'ag-otl__step--' + st)}
            aria-current={now ? 'step' : undefined}
          >
            <span className="ag-otl__rail" aria-hidden="true">
              <span className="ag-otl__dot">{done && <Icon name="check" size={14} />}</span>
              {i < steps.length - 1 && (
                <span className={cx('ag-otl__line', done && 'ag-otl__line--done')}></span>
              )}
            </span>
            <span className="ag-otl__label">
              {s.label}
              {done && <span className="ag-sr-only"> — {doneLabel}</span>}
            </span>
            {s.time && <span className="ag-otl__time">{s.time}</span>}
          </li>
        );
      })}
    </ol>
  );
}
