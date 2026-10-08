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
  const groupRef = React.useRef(null);
  const {fieldId, messageId, message, controlProps} = useField({id, hint, error});
  const legendId = fieldId + '-legend';
  const enabledTiles = () => [
    ...groupRef.current.querySelectorAll('[role="radio"]:not(:disabled)')
  ];
  // Roving tabindex: with nothing selected, the first enabled tile takes the Tab stop.
  React.useEffect(() => {
    if (!groupRef.current) return;
    const tiles = enabledTiles();
    if (tiles.length && !tiles.some(tile => tile.tabIndex === 0)) tiles[0].tabIndex = 0;
  });
  // Arrow keys move and select (left/right mirror in RTL); Home and End jump to the ends.
  const onKeyDown = event => {
    const tiles = enabledTiles();
    const current = tiles.indexOf(document.activeElement);
    if (current < 0) return;
    const rtl = getComputedStyle(groupRef.current).direction === 'rtl';
    const steps = {ArrowDown: 1, ArrowUp: -1, ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1};
    let target;
    if (event.key in steps) target = (current + steps[event.key] + tiles.length) % tiles.length;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = tiles.length - 1;
    else return;
    event.preventDefault();
    tiles[target].focus();
    tiles[target].click();
  };
  const wrapped = !!(legend || message);
  const group = (
    <div
      ref={groupRef}
      id={fieldId}
      role="radiogroup"
      aria-label={legend ? undefined : label}
      aria-labelledby={legend ? legendId : labelledBy}
      {...controlProps}
      onKeyDown={onKeyDown}
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
