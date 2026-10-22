import React from 'react';
import * as DS from '../../ds.js';
import {StorefrontAccountBalanceOverview} from '../StorefrontAccountBalanceOverview/StorefrontAccountBalanceOverview.jsx';
import {StorefrontAccountTopUp} from '../StorefrontAccountTopUp/StorefrontAccountTopUp.jsx';
import {StorefrontAccountBalanceHistory} from '../StorefrontAccountBalanceHistory/StorefrontAccountBalanceHistory.jsx';

export function StorefrontAccountBalancePanel({overview, topUp, checkoutReturn, history}) {
  return (
    <div className="vf-account-balance tw:flex tw:flex-col tw:gap-6 tw:max-w-wide">
      <StorefrontAccountBalanceOverview {...overview} />
      <StorefrontAccountTopUp {...topUp} />
      {checkoutReturn && (
        <DS.Button variant="secondary" href={checkoutReturn.href} iconStart="arrow-left">
          {checkoutReturn.label}
        </DS.Button>
      )}
      <StorefrontAccountBalanceHistory {...history} />
    </div>
  );
}
