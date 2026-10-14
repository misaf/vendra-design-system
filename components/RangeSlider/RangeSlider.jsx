import React from 'react';
import {I18nProvider, Slider, SliderThumb, SliderTrack} from 'react-aria-components';
import {cx} from '../utils/cx.js';
import {useClientLayoutEffect} from '../utils/effects.js';
import {usePageLocale} from '../utils/locale.js';
import {useMessages} from '../utils/messages.js';
import {messages} from './messages.js';

// A slider on React Aria: two handles over one track (or one with `range={false}`). Each handle is
// a real range input for keyboards and screen readers (read as formatValue); dragging a handle or
// pressing the track moves the nearest one. The handles stay a step apart; RTL mirrors it, following
// the page's language.
export function RangeSlider({
  range = true,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  formatValue = number => String(number),
  label,
  labelledBy,
  labels,
  showValues = true,
  className = ''
}) {
  const {locale, ref} = usePageLocale();
  const text = useMessages('RangeSlider', messages, {label, ...labels}, locale);
  const initial = defaultValue ?? (range ? [min, max] : min);
  const [uncontrolledValue, setUncontrolledValue] = React.useState(initial);
  const current = value ?? uncontrolledValue;
  const values = range ? current : [Number(current)];
  const commit = next => {
    if (value === undefined) setUncontrolledValue(next);
    onChange && onChange(next);
  };
  // React Aria reads values with its number formatter; screen readers get formatValue instead.
  const inputs = [React.useRef(null), React.useRef(null)];
  useClientLayoutEffect(() => {
    values.forEach((number, index) => {
      const input = inputs[index].current;
      if (input) input.setAttribute('aria-valuetext', formatValue(number));
    });
  });
  const change = next => {
    if (!range) return commit(next);
    const [low, high] = values;
    // Only one handle moves at a time; keep it at least one step from the other.
    const moved =
      next[0] !== low
        ? [Math.max(min, Math.min(next[0], high - step)), high]
        : [low, Math.min(max, Math.max(next[1], low + step))];
    if (moved[0] !== low || moved[1] !== high) commit(moved);
  };
  const percent = number => ((number - min) / (max - min || 1)) * 100;
  const fill = range
    ? {
        insetInlineStart: percent(values[0]) + '%',
        width: percent(values[1]) - percent(values[0]) + '%'
      }
    : {insetInlineStart: 0, width: percent(values[0]) + '%'};
  // React Aria names each handle by its own label followed by the slider's (label or labelledBy).
  const thumbLabels = range ? [text.min, text.max] : [undefined];
  return (
    <I18nProvider locale={locale}>
      <Slider
        ref={ref}
        value={range ? values : values[0]}
        minValue={min}
        maxValue={max}
        step={step}
        onChange={change}
        aria-label={labelledBy ? undefined : text.label}
        aria-labelledby={labelledBy}
        className={cx('ag-range', !range && 'ag-range--single', className)}
      >
        <div className="ag-range__track">
          <span className="ag-range__fill" style={fill}></span>
          <SliderTrack className="ag-range__rail">
            {values.map((number, index) => (
              <SliderThumb
                key={index}
                index={index}
                inputRef={inputs[index]}
                aria-label={thumbLabels[index]}
                className="ag-range__thumb"
              />
            ))}
          </SliderTrack>
        </div>
        {showValues && (
          <div className="ag-range__vals">
            <span>{formatValue(range ? values[0] : min)}</span>
            <span>{formatValue(range ? values[1] : max)}</span>
          </div>
        )}
      </Slider>
    </I18nProvider>
  );
}
