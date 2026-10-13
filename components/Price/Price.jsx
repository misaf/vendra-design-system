import React from 'react';
import {cx} from '../utils/cx.js';
import {usePageLocale} from '../utils/locale.js';
import {useMessages} from '../utils/messages.js';

// A price, formatted by the app (format.money with the tenant's currency). `compareAt` is the price
// before a reduction: struck through and read first, with "Was" and "Now" for screen readers, which
// do not announce strikethrough. Without `size` the font size follows the surrounding text.
export function Price({value, compareAt, size, className, style}) {
  const {locale, ref} = usePageLocale();
  const text = useMessages('Price', undefined, locale);
  return (
    <span
      ref={ref}
      className={cx(
        'ag-price',
        size && 'ag-price--' + size,
        compareAt && 'ag-price--sale',
        className
      )}
      style={style}
    >
      {compareAt && (
        <s className="ag-price__was">
          <span className="ag-sr-only">{text.was} </span>
          {compareAt}
        </s>
      )}
      {/* Keeps the two prices apart as text; the flex gap spaces them on screen. */}
      {compareAt && ' '}
      <span className="ag-price__now">
        {compareAt && <span className="ag-sr-only">{text.now} </span>}
        {value}
      </span>
    </span>
  );
}
