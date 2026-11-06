import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontBagSticky({summary, delivery, payment}) {
  return (
    <div className="vf-mobile-action tw:flex tw:items-center tw:gap-3 tw:py-3 tw:px-4 tw:bg-card tw:[border-top:1px_solid_var(--border-subtle)]">
      <div className="vf-action-total">
        <span className="vf-action-caption tw:text-xs tw:text-quiet">
          <>{summary.label}</>
        </span>
        <DS.Price value={summary.total} size="md" className="vf-price" />
      </div>
      {delivery.visible ? (
        <>
          <DS.Button variant="primary" iconEnd="arrow-right" onClick={delivery.onClick}>
            <>{delivery.label}</>
          </DS.Button>
        </>
      ) : null}
      {payment.visible ? (
        <>
          <DS.Button variant="primary" iconEnd="arrow-right" onClick={payment.onClick}>
            <>{payment.label}</>
          </DS.Button>
        </>
      ) : null}
    </div>
  );
}
