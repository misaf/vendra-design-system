import React from 'react';
import {cx} from '../utils/cx.js';

// Two native range inputs over one track (or one with `range={false}`), so keyboard and screen
// readers work as usual. The handles can't cross; RTL mirrors the fill.
export function RangeSlider({
  range = true,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  formatValue = number => String(number),
  label = 'Value',
  labels = {min: 'Minimum', max: 'Maximum'},
  showValues = true,
  className = ''
}) {
  const initial = defaultValue ?? (range ? [min, max] : min);
  const [uncontrolledValue, setUncontrolledValue] = React.useState(initial);
  const current = value ?? uncontrolledValue;
  const commit = next => {
    if (value === undefined) setUncontrolledValue(next);
    onChange && onChange(next);
  };
  const percent = number => ((number - min) / (max - min || 1)) * 100;
  const inputProps = {type: 'range', min, max, step, className: 'ag-range__input'};
  if (!range) {
    const single = Number(current);
    return (
      <div className={cx('ag-range', 'ag-range--single', className)}>
        <div className="ag-range__track">
          <span
            className="ag-range__fill"
            style={{insetInlineStart: 0, width: percent(single) + '%'}}
          ></span>
          <input
            {...inputProps}
            value={single}
            aria-label={label}
            aria-valuetext={formatValue(single)}
            onChange={event => commit(Number(event.target.value))}
          />
        </div>
        {showValues && (
          <div className="ag-range__vals">
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
          </div>
        )}
      </div>
    );
  }
  const [low, high] = current;
  // Moves one handle (0 = low, 1 = high), keeping at least one step between them.
  const moveHandle = (handle, raw) => {
    const number = Number(raw);
    const next = handle
      ? [low, Math.min(max, Math.max(number, low + step))]
      : [Math.max(min, Math.min(number, high - step)), high];
    if (next[0] !== low || next[1] !== high) commit(next);
  };
  return (
    <div className={cx('ag-range', className)}>
      <div className="ag-range__track">
        <span
          className="ag-range__fill"
          style={{insetInlineStart: percent(low) + '%', width: percent(high) - percent(low) + '%'}}
        ></span>
        <input
          {...inputProps}
          value={low}
          aria-label={labels.min}
          aria-valuetext={formatValue(low)}
          onChange={event => moveHandle(0, event.target.value)}
          style={{zIndex: percent(low) > 90 ? 3 : 2}}
        />
        <input
          {...inputProps}
          value={high}
          aria-label={labels.max}
          aria-valuetext={formatValue(high)}
          onChange={event => moveHandle(1, event.target.value)}
        />
      </div>
      {showValues && (
        <div className="ag-range__vals">
          <span>{formatValue(low)}</span>
          <span>{formatValue(high)}</span>
        </div>
      )}
    </div>
  );
}
