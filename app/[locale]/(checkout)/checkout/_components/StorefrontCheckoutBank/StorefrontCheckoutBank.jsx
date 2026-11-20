import React from 'react';
import {PaymentStatus} from '../../../../../../ui/components/PaymentStatus/PaymentStatus.jsx';
import {StorefrontStepProgress} from '../../../../../../components/storefront/StorefrontStepProgress/StorefrontStepProgress.jsx';

export function StorefrontCheckoutBank({progress, payment, actions}) {
  return (
    <>
      <StorefrontStepProgress
        steps={progress.steps}
        current={progress.current}
        labels={progress.labels}
        formatNumber={progress.formatNumber}
        captionFormat={progress.captionFormat}
      />
      <PaymentStatus
        status={payment.status}
        amount={payment.amount}
        orderNumber={payment.orderNumber}
        reference={payment.reference}
        gateway={payment.gateway}
        redirect={payment.redirect}
        supportHref={payment.supportHref}
        onRetry={actions.retry}
        onOtherMethod={actions.other}
        onCheckAgain={actions.checkAgain}
        headingLevel={1}
      />
    </>
  );
}
