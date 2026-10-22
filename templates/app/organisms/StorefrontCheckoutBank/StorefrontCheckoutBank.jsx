import React from 'react';
import * as DS from '../../ds.js';
import {StorefrontCheckoutProgress} from '../StorefrontCheckoutProgress/StorefrontCheckoutProgress.jsx';

export function StorefrontCheckoutBank({progress, payment, actions}) {
  return (
    <>
      <StorefrontCheckoutProgress
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
