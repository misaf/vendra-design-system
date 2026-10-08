import React from 'react';
import {QuantityInput} from '../QuantityInput/QuantityInput.jsx';
import {cx} from '../utils/cx.js';

// A bag or order row. `size="lg"` (bag) adds the quantity control and Remove; `sm` (summaries)
// shows ×quantity. `unavailable` greys it out and hides the price; `busy` marks it aria-busy.
export function LineItem({
  image,
  srcSet,
  name,
  meta,
  note,
  price,
  quantity,
  onQuantityChange,
  onRemove,
  removeLabel = 'Remove',
  quantityLabels,
  formatQuantity = n => String(n),
  size = 'lg',
  unavailable,
  unavailableLabel = 'No longer available',
  busy,
  className = ''
}) {
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
            <img
              src={image}
              srcSet={srcSet}
              sizes={srcSet ? thumbWidth + 'px' : undefined}
              alt=""
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="ag-product__ph"></span>
          )}
        </span>
        <div className="ag-line__main">
          <div className="ag-line__name">{name}</div>
          {meta && <div className="ag-line__meta">{meta}</div>}
          {note && <div className="ag-line__note">{note}</div>}
          {unavailable && <div className="ag-line__flag">{unavailableLabel}</div>}
          {large && (onQuantityChange || onRemove) && (
            <div className="ag-line__actions">
              {onQuantityChange && !unavailable && (
                <QuantityInput
                  value={quantity}
                  disabled={busy}
                  onChange={onQuantityChange}
                  format={formatQuantity}
                  labels={quantityLabels}
                />
              )}
              {onRemove && (
                <button type="button" className="ag-line__remove" onClick={onRemove}>
                  {removeLabel}
                </button>
              )}
            </div>
          )}
        </div>
        <div className="ag-line__end">
          {!large && quantity != null && (
            <span className="ag-line__qty">×{formatQuantity(quantity)}</span>
          )}
          {!unavailable && <span className="ag-line__price">{price}</span>}
        </div>
      </div>
    </div>
  );
}
