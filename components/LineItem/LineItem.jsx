import React from 'react';
import {Button} from 'react-aria-components';
import {Picture} from '../atoms/Picture/Picture.jsx';
import {Price} from '../atoms/Price/Price.jsx';
import {QuantityInput} from '../QuantityInput/QuantityInput.jsx';
import {cx} from '../utils/cx.js';
import {useMessages} from '../utils/messages.js';
import {messages} from './messages.js';

// A bag or order row. `size="lg"` (bag) adds the quantity control and Remove; `sm` (summaries)
// shows ×quantity. `unavailable` greys it out and hides the price; `busy` marks it aria-busy.
export function LineItem({
  image,
  name,
  meta,
  note,
  price,
  quantity,
  quantityMax,
  onQuantityChange,
  onRemove,
  removeLabel,
  quantityLabels,
  formatQuantity = n => String(n),
  size = 'lg',
  unavailable,
  unavailableLabel,
  busy,
  className = ''
}) {
  const text = useMessages('LineItem', messages, {
    remove: removeLabel,
    unavailable: unavailableLabel
  });
  const large = size !== 'sm';
  const thumbWidth = large ? 88 : 44;
  return (
    <div className="ag-linewrap">
      <div
        className={cx(
          'ag-line',
          'ag-line--' + (large ? 'lg' : 'sm'),
          unavailable && 'ag-line--unavailable',
          className
        )}
        aria-busy={busy || undefined}
      >
        <span className="ag-line__thumb" style={{width: thumbWidth}}>
          {image ? (
            <Picture image={image} sizes={thumbWidth + 'px'} alt="" />
          ) : (
            <span className="ag-product__ph"></span>
          )}
        </span>
        <div className="ag-line__main">
          <div className="ag-line__name">{name}</div>
          {meta && <div className="ag-line__meta">{meta}</div>}
          {note && <div className="ag-line__note">{note}</div>}
          {unavailable && <div className="ag-line__flag">{text.unavailable}</div>}
          {large && (onQuantityChange || onRemove) && (
            <div className="ag-line__actions">
              {onQuantityChange && !unavailable && (
                <QuantityInput
                  value={quantity}
                  max={quantityMax}
                  disabled={busy}
                  onChange={onQuantityChange}
                  labels={quantityLabels}
                />
              )}
              {onRemove && (
                <Button className="ag-line__remove" onClick={onRemove}>
                  {text.remove}
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="ag-line__end">
          {!large && quantity != null && (
            <span className="ag-line__qty">×{formatQuantity(quantity)}</span>
          )}
          {!unavailable && <Price value={price} className="ag-line__price" />}
        </div>
      </div>
    </div>
  );
}
