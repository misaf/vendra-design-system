import React from 'react';
import {Card} from '../../../../../../ui/components/Card/Card.jsx';

export function StorefrontAccountBalanceOverview({title, amount, status}) {
  return (
    <Card padding={24}>
      <div className="tw:flex tw:flex-col tw:gap-2">
        <span id="vf-balance-label" className="tw:text-sm tw:text-quiet">
          <>{title}</>
        </span>
        <span
          id="vf-balance-amount"
          aria-labelledby="vf-balance-label vf-balance-amount"
          className="tw:text-2xl tw:font-medium"
        >
          <>{amount}</>
        </span>
        <p className="vf-account-balance-status tw:m-0 tw:text-sm tw:text-secondary tw:max-w-measure tw:text-pretty">
          <>{status}</>
        </p>
      </div>
    </Card>
  );
}
