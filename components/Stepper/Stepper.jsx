import React from 'react';
import {Icon} from '../Icon/Icon.jsx';
import {cx} from '../utils/cx.js';

const defaultCaption = (number, total, label) => 'Step ' + number + ' of ' + total + ' · ' + label;

// Checkout progress as an ordered list; done steps can be revisited with `onStepClick`.
// `compact` (phones) shows only the dots plus a "Step 2 of 3 · Label" caption.
export function Stepper({
  steps = [],
  current = 0,
  onStepClick,
  formatNumber = number => String(number),
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
      {steps.map((step, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'upcoming';
        const content = (
          <>
            <span className="ag-steps__dot" aria-hidden={compact || undefined}>
              {state === 'done' ? (
                <Icon name="check" size={14} />
              ) : (
                (step.number ?? formatNumber(i + 1))
              )}
            </span>
            <span className={compact ? 'ag-sr-only' : 'ag-steps__label'}>
              {step.label}
              {state === 'done' && doneLabel && <span className="ag-sr-only"> {doneLabel}</span>}
            </span>
          </>
        );
        return (
          <li
            key={i}
            className={cx('ag-steps__item', 'ag-steps__item--' + state)}
            aria-current={state === 'current' ? 'step' : undefined}
          >
            {state === 'done' && onStepClick ? (
              <button type="button" className="ag-steps__btn" onClick={() => onStepClick(i)}>
                {content}
              </button>
            ) : (
              <span className="ag-steps__btn">{content}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
  if (!compact) return list;
  const currentIndex = Math.min(Math.max(current, 0), steps.length - 1);
  const currentStep = steps[currentIndex];
  return (
    <div className={cx('ag-steps-wrap', className)}>
      {list}
      {currentStep && (
        <p className="ag-steps__caption" aria-hidden="true">
          {captionFormat(
            currentStep.number ?? formatNumber(currentIndex + 1),
            formatNumber(steps.length),
            currentStep.label
          )}
        </p>
      )}
    </div>
  );
}
