import React from 'react';
import {cx} from '../utils/cx.js';
export function RangeSlider({
  range = true,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  formatValue = v => String(v),
  label = 'Value',
  labels = {min: 'Minimum', max: 'Maximum'},
  showValues = true,
  className = ''
}) {
  const init = defaultValue ?? (range ? [min, max] : min);
  const [inner, setInner] = React.useState(init);
  const cur = value ?? inner;
  const commit = n => {
    if (value === undefined) setInner(n);
    onChange && onChange(n);
  };
  const pct = v => ((v - min) / (max - min || 1)) * 100;
  const common = {type: 'range', min, max, step, className: 'ag-range__input'};
  if (!range) {
    const v = Number(cur);
    return (
      <div className={cx('ag-range', 'ag-range--single', className)}>
        <div className="ag-range__track">
          <span
            className="ag-range__fill"
            style={{insetInlineStart: 0, width: pct(v) + '%'}}
          ></span>
          <input
            {...common}
            value={v}
            aria-label={label}
            aria-valuetext={formatValue(v)}
            onChange={e => commit(Number(e.target.value))}
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
  const [lo, hi] = cur;
  const set = (i, raw) => {
    const v = Number(raw);
    const n = i
      ? [lo, Math.min(max, Math.max(v, lo + step))]
      : [Math.max(min, Math.min(v, hi - step)), hi];
    if (n[0] !== lo || n[1] !== hi) commit(n);
  };
  return (
    <div className={cx('ag-range', className)}>
      <div className="ag-range__track">
        <span
          className="ag-range__fill"
          style={{insetInlineStart: pct(lo) + '%', width: pct(hi) - pct(lo) + '%'}}
        ></span>
        <input
          {...common}
          value={lo}
          aria-label={labels.min}
          aria-valuetext={formatValue(lo)}
          onChange={e => set(0, e.target.value)}
          style={{zIndex: pct(lo) > 90 ? 3 : 2}}
        />
        <input
          {...common}
          value={hi}
          aria-label={labels.max}
          aria-valuetext={formatValue(hi)}
          onChange={e => set(1, e.target.value)}
        />
      </div>
      {showValues && (
        <div className="ag-range__vals">
          <span>{formatValue(lo)}</span>
          <span>{formatValue(hi)}</span>
        </div>
      )}
    </div>
  );
}
