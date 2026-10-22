import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontCheckoutReceipt({change, card, sheba, last4, reference}) {
  return (
    <>
      {change.visible && (
        <div id="vf-receipt-changed" tabIndex={-1}>
          <DS.Alert
            tone="warning"
            title={change.text}
            action={
              <DS.Button variant="secondary" onClick={change.onConfirm}>
                {change.label}
              </DS.Button>
            }
          />
        </div>
      )}
      {card.visible ? (
        <>
          <DS.PaymentCard
            cardNumber={card.number}
            holder={card.holder}
            bank={card.bank}
            amount={card.amount}
            labels={card.labels}
          />
          {card.sheba ? (
            <>
              <p className="vf-checkout-sheba tw:text-sm tw:flex tw:items-center tw:gap-1 tw:flex-wrap tw:m-0">
                <>
                  {sheba.label}
                  {': '}
                </>
                <bdi dir="ltr">
                  <>{card.sheba}</>
                </bdi>
                <DS.Tooltip content={sheba.tip}>
                  <button
                    type="button"
                    className="vf-checkout-info tw:inline-grid tw:place-items-center tw:size-[44px] tw:-my-2 tw:p-0 tw:[border:0] tw:bg-transparent tw:text-quiet tw:cursor-pointer tw:rounded-full"
                    aria-label={sheba.info}
                  >
                    <DS.Icon name="info" size={16} />
                  </button>
                </DS.Tooltip>
              </p>
              <DS.Button variant="ghost" size="sm" onClick={sheba.onCopy}>
                <>{card.labels?.copy}</>
              </DS.Button>
            </>
          ) : null}
          <div className="vf-checkout-receipt-grid tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
            <DS.Input
              id="vf-last4"
              label={last4.label}
              hint={last4.hint}
              error={last4.error}
              inputMode="numeric"
              maxLength={4}
              dir="ltr"
              value={last4.value}
              onChange={last4.onChange}
            />
            <DS.Input
              id="vf-ref"
              value={reference.value}
              onChange={reference.onChange}
              label={reference.label}
              hint={reference.hint}
              inputMode="numeric"
              dir="ltr"
            />
          </div>
        </>
      ) : null}
    </>
  );
}
