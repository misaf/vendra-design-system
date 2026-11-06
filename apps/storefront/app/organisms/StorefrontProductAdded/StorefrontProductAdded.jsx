import React from 'react';
import * as DS from '../../ds.js';

// undo ({label, onClick}) is optional: it reverses the add and closes the panel.
export function StorefrontProductAdded({
  open,
  onClose,
  lines,
  sums,
  checkout,
  labels,
  undo = null
}) {
  return (
    <DS.Dialog
      open={open}
      onClose={onClose}
      title={labels.title}
      closeLabel={labels.close}
      maxWidth={440}
    >
      <div className="vf-product-added tw:flex tw:flex-col tw:gap-5">
        <DS.OrderSummary lines={lines} sums={sums} />
        <div className="tw:flex tw:flex-col tw:gap-2">
          <DS.Button
            variant="primary"
            size="lg"
            block={true}
            iconEnd="arrow-right"
            href={checkout.href}
            onClick={checkout.onClick}
            autoFocus={true}
            className="vf-product-added-checkout"
          >
            <>{labels.checkout}</>
          </DS.Button>
          <DS.Button variant="ghost" size="lg" block={true} onClick={onClose}>
            <>{labels.continue}</>
          </DS.Button>
          {undo ? (
            <DS.Button
              variant="ghost"
              size="lg"
              block={true}
              iconStart="undo-2"
              onClick={undo.onClick}
              className="vf-product-added-undo"
            >
              <>{undo.label}</>
            </DS.Button>
          ) : null}
        </div>
      </div>
    </DS.Dialog>
  );
}
