import React from 'react';
import {useField, FieldMessage} from '../Field/Field.jsx';
import {cx} from '../utils/cx.js';

// A radiogroup of ChoiceTiles with arrow-key navigation (mirrored in RTL), Home and End.
// `legend` renders <fieldset><legend>; the hint or error sits under the tiles (see Field).
export function ChoiceGroup({
  label,
  labelledBy,
  legend,
  hint,
  error,
  id,
  columns,
  minTileWidth = 140,
  children,
  className,
  style
}) {
  const ref = React.useRef(null);
  const {fieldId, messageId, message, controlProps} = useField({id, hint, error});
  const legendId = fieldId + '-legend';
  React.useEffect(() => {
    const r = ref.current;
    if (!r) return;
    const t = [...r.querySelectorAll('[role="radio"]:not(:disabled)')];
    if (t.length && !t.some(x => x.tabIndex === 0)) t[0].tabIndex = 0;
  });
  const onKey = e => {
    const t = [...ref.current.querySelectorAll('[role="radio"]:not(:disabled)')];
    const i = t.indexOf(document.activeElement);
    if (i < 0) return;
    const rtl = getComputedStyle(ref.current).direction === 'rtl';
    const map = {ArrowDown: 1, ArrowUp: -1, ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1};
    let n;
    if (e.key in map) n = (i + map[e.key] + t.length) % t.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = t.length - 1;
    else return;
    e.preventDefault();
    t[n].focus();
    t[n].click();
  };
  const wrapped = !!(legend || message);
  const group = (
    <div
      ref={ref}
      id={fieldId}
      role="radiogroup"
      aria-label={legend ? undefined : label}
      aria-labelledby={legend ? legendId : labelledBy}
      {...controlProps}
      onKeyDown={onKey}
      className={cx('ag-choices', error && 'ag-choices--error', !wrapped && className)}
      style={{
        gridTemplateColumns: columns
          ? 'repeat(' + columns + ',minmax(0,1fr))'
          : 'repeat(auto-fill,minmax(' + minTileWidth + 'px,1fr))',
        ...(wrapped ? null : style)
      }}
    >
      {children}
    </div>
  );
  if (!wrapped) return group;
  const hintEl = (
    <FieldMessage id={messageId} error={!!error}>
      {message}
    </FieldMessage>
  );
  if (legend)
    return (
      <fieldset className={cx('ag-field ag-fieldset', className)} style={style}>
        <legend id={legendId} className="ag-field__label">
          {legend}
        </legend>
        {group}
        {hintEl}
      </fieldset>
    );
  return (
    <div className={cx('ag-field', className)} style={style}>
      {group}
      {hintEl}
    </div>
  );
}
