import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontBagItems({lines, removeLabel, quantityLabels, formatQuantity}) {
  return (
    <div
      data-vf-keep-focus
      className="vf-bag-line-list tw:flex tw:flex-col tw:[border-top:1px_solid_var(--border-subtle)]"
    >
      {lines.map((l, $index) => (
        <React.Fragment key={$index}>
          <div className="vf-bag-line tw:[border-bottom:1px_solid_var(--border-subtle)] tw:py-4h tw:px-0">
            <DS.LineItem
              image={l?.image}
              size="lg"
              unavailable={l?.unavailable}
              unavailableLabel={l?.unavailableLabel}
              name={l?.name}
              meta={l?.meta}
              note={l?.note}
              price={l?.price}
              quantity={l?.qty}
              quantityMax={l?.quantityMax}
              onQuantityChange={l?.setQty}
              onRemove={l?.remove}
              removeLabel={removeLabel}
              quantityLabels={quantityLabels}
              formatQuantity={formatQuantity}
            />
            {l.stockWarning && <DS.Alert tone="warning">{l.stockWarning}</DS.Alert>}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
