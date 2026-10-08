import React from 'react';
import {IconButton} from '../IconButton/IconButton.jsx';
import {cx} from '../utils/cx.js';

// A section title with an optional italic `accent`, eyebrow and action, plus prev/next arrows
// when `onPrev`/`onNext` are given (pair them with a Carousel's ref).
export function SectionHeader({
  title,
  accent,
  eyebrow,
  level = 'h2',
  action,
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
  prevLabel = 'Previous',
  nextLabel = 'Next',
  id,
  className = '',
  style
}) {
  const Heading = ['h1', 'h2', 'h3'].includes(level) ? level : 'h2';
  const hasArrows = onPrev || onNext;
  return (
    <div className={cx('ag-sechead', 'ag-sechead--' + Heading, className)} style={style}>
      <div className="ag-sechead__text">
        {eyebrow && <div className="ag-eyebrow ag-sechead__eyebrow">{eyebrow}</div>}
        <Heading id={id} className="ag-sechead__title">
          {title}
          {accent && (
            <>
              {' '}
              <em>{accent}</em>
            </>
          )}
        </Heading>
      </div>
      {(action || hasArrows) && (
        <div className="ag-sechead__actions">
          {action}
          {hasArrows && (
            <div className="ag-sechead__arrows">
              <IconButton
                icon="chevron-left"
                label={prevLabel}
                variant="outline"
                onClick={onPrev}
                disabled={!onPrev || !canPrev}
              />
              <IconButton
                icon="chevron-right"
                label={nextLabel}
                variant="outline"
                onClick={onNext}
                disabled={!onNext || !canNext}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
