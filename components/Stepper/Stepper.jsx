import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';
const defaultCaption = (n, total, label) => 'Step ' + n + ' of ' + total + ' · ' + label;
export function Stepper({
  steps = [],
  current = 0,
  onStepClick,
  formatNumber = n => String(n),
  doneLabel,
  label,
  compact = false,
  captionFormat = defaultCaption,
  className = ''
}) {
  const list = (
    <ol
      aria-label={label}
      className={cx('ag-steps', compact && 'ag-steps--compact', !compact && className)}
    >
      {steps.map((s, i) => {
        const st = i < current ? 'done' : i === current ? 'current' : 'upcoming';
        const inner = (
          <>
            <span className="ag-steps__dot" aria-hidden={compact || undefined}>
              {st === 'done' ? <Icon name="check" size={14} /> : (s.number ?? formatNumber(i + 1))}
            </span>
            <span className={compact ? 'ag-sr-only' : 'ag-steps__label'}>
              {s.label}
              {st === 'done' && doneLabel && <span className="ag-sr-only"> {doneLabel}</span>}
            </span>
          </>
        );
        return (
          <li
            key={i}
            className={cx('ag-steps__item', 'ag-steps__item--' + st)}
            aria-current={st === 'current' ? 'step' : undefined}
          >
            {st === 'done' && onStepClick ? (
              <button type="button" className="ag-steps__btn" onClick={() => onStepClick(i)}>
                {inner}
              </button>
            ) : (
              <span className="ag-steps__btn">{inner}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
  if (!compact) return list;
  const ci = Math.min(Math.max(current, 0), steps.length - 1);
  const cur = steps[ci];
  return (
    <div className={cx('ag-steps-wrap', className)}>
      {list}
      {cur && (
        <p className="ag-steps__caption" aria-hidden="true">
          {captionFormat(cur.number ?? formatNumber(ci + 1), formatNumber(steps.length), cur.label)}
        </p>
      )}
    </div>
  );
}
