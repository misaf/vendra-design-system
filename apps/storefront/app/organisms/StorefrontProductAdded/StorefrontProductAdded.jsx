import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontProductAdded({open, onClose, lines, sums, checkout, labels}) {
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
        </div>
      </div>
    </DS.Dialog>
  );
}
