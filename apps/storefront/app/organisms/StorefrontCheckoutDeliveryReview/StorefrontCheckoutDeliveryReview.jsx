import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontCheckoutDeliveryReview({labels, edit, rows}) {
  return (
    <section aria-labelledby="vf-delivery-review-title">
      <DS.Card padding={16} className="vf-checkout-delivery-review">
        <div className="tw:flex tw:items-center tw:justify-between tw:flex-wrap tw:gap-2 tw:mb-3">
          <h2 id="vf-delivery-review-title" className="tw:m-0 tw:text-lg! tw:leading-snug">
            {labels.title}
          </h2>
          <DS.Button
            variant="ghost"
            size="md"
            iconStart="pencil"
            href={edit.href}
            onClick={edit.onClick}
          >
            {labels.edit}
          </DS.Button>
        </div>
        <DS.DetailList rows={rows} />
      </DS.Card>
    </section>
  );
}
