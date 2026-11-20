import React from 'react';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';
import {Price} from '../../../../../design-system/components/Price/Price.jsx';

export function StorefrontBagSticky({summary, delivery, payment}) {
  return (
    <div className="vf-mobile-action tw:flex tw:items-center tw:gap-3 tw:py-3 tw:px-4 tw:bg-card tw:[border-top:1px_solid_var(--border-subtle)]">
      <div className="vf-action-total">
        <span className="vf-action-caption tw:text-xs tw:text-quiet">
          <>{summary.label}</>
        </span>
        <Price value={summary.total} size="md" className="vf-price" />
      </div>
      {delivery.visible ? (
        <>
          <Button variant="primary" iconEnd="arrow-right" onClick={delivery.onClick}>
            <>{delivery.label}</>
          </Button>
        </>
      ) : null}
      {payment.visible ? (
        <>
          <Button variant="primary" iconEnd="arrow-right" onClick={payment.onClick}>
            <>{payment.label}</>
          </Button>
        </>
      ) : null}
    </div>
  );
}
