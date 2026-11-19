'use client';

import React from 'react';
import {cx} from '../utils/cx.js';
import {useMessages} from '../utils/messages.js';
import {messages} from './messages.js';

// A spinning ring in the current text colour, for a wait of unknown length. On its own it is a
// polite status that announces `label` ("Loading" by default); `decorative` hides it from screen
// readers when something else says what is happening (Button's `loadingLabel`).
export function Spinner({size = 20, label, decorative, className, style, ref, ...rest}) {
  const text = useMessages('Spinner', messages, {label});
  const ring = (
    <span
      {...(decorative ? rest : undefined)}
      ref={decorative ? ref : undefined}
      className={cx('ag-spin', decorative && className)}
      style={{width: size, height: size, ...(decorative ? style : null)}}
      aria-hidden="true"
    />
  );
  if (decorative) return ring;
  return (
    <span {...rest} ref={ref} role="status" className={cx('ag-spinner', className)} style={style}>
      {ring}
      <span className="ag-sr-only">{text.label}</span>
    </span>
  );
}
