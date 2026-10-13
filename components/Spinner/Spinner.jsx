import React from 'react';
import {cx} from '../utils/cx.js';
import {useMessages} from '../utils/messages.js';

// A spinning ring in the current text colour, for a wait of unknown length. On its own it is a
// polite status that announces `label` ("Loading" by default); `decorative` hides it from screen
// readers when something else says what is happening (Button's `loadingLabel`).
export function Spinner({size = 20, label, decorative, className, style}) {
  const text = useMessages('Spinner', {label});
  const ring = (
    <span
      className={cx('ag-spin', decorative && className)}
      style={{width: size, height: size, ...(decorative ? style : null)}}
      aria-hidden="true"
    />
  );
  if (decorative) return ring;
  return (
    <span role="status" className={cx('ag-spinner', className)} style={style}>
      {ring}
      <span className="ag-sr-only">{text.label}</span>
    </span>
  );
}
