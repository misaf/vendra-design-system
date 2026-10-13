import React from 'react';
import {cx} from '../utils/cx.js';
import {usePageLocale} from '../utils/locale.js';

// How far a value is towards a target (role="meter"): the spend left before free delivery, a
// balance towards a discount. The label says what it measures; `valueLabel` replaces the default
// percentage ("3,800,000 of 5,000,000 Toman"). `done` fills it in the success colour once the target
// is reached. Not React Aria's Meter: its "meter progressbar" role fallback fails axe's
// aria-allowed-attr, and every browser the storefront supports knows "meter".
export function Meter({
  label,
  value,
  minValue = 0,
  maxValue = 100,
  valueLabel,
  showValue = true,
  done,
  id,
  className,
  style,
  'aria-label': ariaLabel,
  'aria-labelledby': labelledBy
}) {
  const {locale, ref} = usePageLocale();
  const labelId = React.useId();
  const clamped = Math.min(Math.max(Number(value) || 0, minValue), maxValue);
  const share = maxValue > minValue ? (clamped - minValue) / (maxValue - minValue) : 0;
  const valueText = valueLabel ?? new Intl.NumberFormat(locale, {style: 'percent'}).format(share);
  return (
    <div
      ref={ref}
      id={id}
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
      aria-valuetext={valueText}
      aria-label={ariaLabel}
      aria-labelledby={labelledBy || (label ? labelId : undefined)}
      className={cx('ag-meter', done && 'ag-meter--done', className)}
      style={style}
    >
      {(label || showValue) && (
        <span className="ag-meter__head">
          {label && (
            <span id={labelId} className="ag-meter__label">
              {label}
            </span>
          )}
          {showValue && (
            <span className="ag-meter__value" aria-hidden="true">
              {valueText}
            </span>
          )}
        </span>
      )}
      <span className="ag-meter__track">
        <span className="ag-meter__fill" style={{inlineSize: share * 100 + '%'}} />
      </span>
    </div>
  );
}
