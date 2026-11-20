import React from 'react';
import {Alert} from '../../../../../../ui/components/Alert/Alert.jsx';
import {Button} from '../../../../../../ui/components/Button/Button.jsx';
import {Icon} from '../../../../../../ui/components/Icon/Icon.jsx';
import {Input} from '../../../../../../ui/components/Input/Input.jsx';
import {PaymentCard} from '../../../../../../ui/components/PaymentCard/PaymentCard.jsx';
import {Tooltip} from '../../../../../../ui/components/Tooltip/Tooltip.jsx';

export function StorefrontCheckoutReceipt({change, card, sheba, last4, reference}) {
  return (
    <>
      {change.visible && (
        <div id="vf-receipt-changed" tabIndex={-1}>
          <Alert
            tone="warning"
            title={change.text}
            action={
              <Button variant="secondary" onClick={change.onConfirm}>
                {change.label}
              </Button>
            }
          />
        </div>
      )}
      {card.visible ? (
        <>
          <PaymentCard
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
                <Tooltip content={sheba.tip}>
                  <button
                    type="button"
                    className="vf-checkout-info tw:inline-grid tw:place-items-center tw:size-[44px] tw:-my-2 tw:p-0 tw:[border:0] tw:bg-transparent tw:text-quiet tw:cursor-pointer tw:rounded-full"
                    aria-label={sheba.info}
                  >
                    <Icon name="info" size={16} />
                  </button>
                </Tooltip>
              </p>
              <Button variant="ghost" size="sm" onClick={sheba.onCopy}>
                <>{card.labels?.copy}</>
              </Button>
            </>
          ) : null}
          <div className="vf-checkout-receipt-grid tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
            <Input
              id="vf-last4"
              label={last4.label}
              hint={last4.hint}
              error={last4.error}
              disabled={last4.disabled}
              inputMode="numeric"
              maxLength={4}
              dir="ltr"
              value={last4.value}
              onChange={last4.onChange}
            />
            <Input
              id="vf-ref"
              value={reference.value}
              onChange={reference.onChange}
              label={reference.label}
              hint={reference.hint}
              error={reference.error}
              disabled={reference.disabled}
              inputMode="numeric"
              dir="ltr"
            />
          </div>
        </>
      ) : null}
    </>
  );
}
