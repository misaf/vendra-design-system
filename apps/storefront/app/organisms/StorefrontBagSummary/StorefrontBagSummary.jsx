import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontBagSummary({summary, freeDelivery, promo, actions, paymentNote}) {
  return (
    <>
      <DS.Card padding={20}>
        <DS.OrderSummary title={summary.title} lines={summary.lines} sums={summary.sums} />
        {freeDelivery ? (
          <>
            <DS.Meter
              className="tw:mt-4"
              label={freeDelivery?.label}
              value={freeDelivery?.value}
              maxValue={freeDelivery?.max}
              valueLabel={freeDelivery?.valueLabel}
              done={freeDelivery?.done}
            />
          </>
        ) : null}
      </DS.Card>
      {promo.visible ? (
        <>
          <DS.PromoCodeField
            id="vf-promo"
            value={promo.value}
            onChange={promo.onChange}
            onApply={promo.onApply}
            error={promo.error}
            applied={promo.applied}
            onRemove={promo.onRemove}
          />
        </>
      ) : null}
      <div className="tw:contents tw:max-md:hidden">
        {actions.delivery.visible ? (
          <>
            <DS.Button
              variant="primary"
              size="lg"
              block={true}
              iconEnd="arrow-right"
              onClick={actions.delivery.onClick}
            >
              <>{actions.delivery.label}</>
            </DS.Button>
          </>
        ) : null}
        {actions.payment.visible ? (
          <>
            <DS.Button
              variant="primary"
              size="lg"
              block={true}
              iconEnd="arrow-right"
              onClick={actions.payment.onClick}
            >
              <>{actions.payment.label}</>
            </DS.Button>
          </>
        ) : null}
      </div>
      {actions.back.visible ? (
        <>
          <DS.Button
            variant="ghost"
            size="lg"
            block={true}
            iconStart="arrow-left"
            href={actions.back.href}
            onClick={actions.back.onClick}
          >
            <>{actions.back.label}</>
          </DS.Button>
        </>
      ) : null}
      <p className="vf-bag-payment-note tw:m-0 tw:text-sm tw:leading-body tw:text-quiet tw:text-center">
        <>{paymentNote}</>
      </p>
    </>
  );
}
