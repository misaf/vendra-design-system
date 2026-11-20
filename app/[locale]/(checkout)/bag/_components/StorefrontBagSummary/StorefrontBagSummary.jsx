import React from 'react';
import {Button} from '../../../../../../components/ui/components/Button/Button.jsx';
import {Card} from '../../../../../../components/ui/patterns/atoms/Card/Card.jsx';
import {Meter} from '../../../../../../components/ui/patterns/atoms/Meter/Meter.jsx';
import {OrderSummary} from '../../../../../../components/ui/patterns/organisms/OrderSummary/OrderSummary.jsx';
import {PromoCodeField} from '../../../../../../components/ui/patterns/molecules/PromoCodeField/PromoCodeField.jsx';

export function StorefrontBagSummary({summary, freeDelivery, promo, actions, paymentNote}) {
  return (
    <>
      <Card padding={20}>
        <OrderSummary
          title={summary.title}
          lines={summary.lines}
          sums={summary.sums}
          itemsDisclosureLabel={summary.itemsDisclosureLabel}
        />
        {freeDelivery ? (
          <>
            <Meter
              className="tw:mt-4"
              label={freeDelivery?.label}
              value={freeDelivery?.value}
              maxValue={freeDelivery?.max}
              valueLabel={freeDelivery?.valueLabel}
              done={freeDelivery?.done}
            />
          </>
        ) : null}
      </Card>
      {promo.visible ? (
        <>
          <PromoCodeField
            id="vf-promo"
            value={promo.value}
            onChange={promo.onChange}
            onApply={promo.onApply}
            error={promo.error}
            applied={promo.applied}
            onRemove={promo.onRemove}
            collapsible={true}
          />
        </>
      ) : null}
      <div className="tw:contents tw:max-md:hidden">
        {actions.delivery.visible ? (
          <>
            <Button
              variant="primary"
              size="lg"
              block={true}
              iconEnd="arrow-right"
              onClick={actions.delivery.onClick}
            >
              <>{actions.delivery.label}</>
            </Button>
          </>
        ) : null}
        {actions.payment.visible ? (
          <>
            <Button
              variant="primary"
              size="lg"
              block={true}
              iconEnd="arrow-right"
              onClick={actions.payment.onClick}
            >
              <>{actions.payment.label}</>
            </Button>
          </>
        ) : null}
      </div>
      {actions.back.visible ? (
        <>
          <Button
            variant="ghost"
            size="lg"
            block={true}
            iconStart="arrow-left"
            href={actions.back.href}
            onClick={actions.back.onClick}
          >
            <>{actions.back.label}</>
          </Button>
        </>
      ) : null}
      <p className="vf-bag-payment-note tw:m-0 tw:text-sm tw:leading-body tw:text-quiet tw:text-center">
        <>{paymentNote}</>
      </p>
    </>
  );
}
