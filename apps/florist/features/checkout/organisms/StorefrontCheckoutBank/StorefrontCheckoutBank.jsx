import React from 'react';
import * as DS from '../../../../shell/ds.js';
import {StorefrontStepProgress} from '../../../../shell/molecules/StorefrontStepProgress/StorefrontStepProgress.jsx';

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
      <DS.PaymentStatus
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
