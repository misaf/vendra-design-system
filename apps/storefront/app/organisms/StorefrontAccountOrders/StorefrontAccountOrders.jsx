import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontAccountOrders({orders}) {
  return (
    <div className="vf-account-orders-grid tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]">
      {orders.map((order, index) => (
        <React.Fragment key={index}>
          <DS.Card padding={20}>
            <div className="vf-account-order-body tw:flex tw:flex-col tw:gap-3">
              <div className="tw:flex tw:justify-between tw:items-center tw:gap-3">
                <span dir="ltr" className="vf-account-order-number tw:font-medium">
                  <>{order?.id}</>
                </span>
                <DS.Badge tone={order?.tone}>
                  <>{order?.status}</>
                </DS.Badge>
              </div>
              <div className="vf-account-order-meta tw:text-sm tw:text-quiet">
                <>{order?.meta}</>
              </div>
              <div className="vf-account-order-total tw:font-medium">
                <>{order?.total}</>
              </div>
              <div>
                <DS.Button variant="secondary" size="sm" href={order?.href}>
                  <>{order?.cta}</>
                </DS.Button>
              </div>
            </div>
          </DS.Card>
        </React.Fragment>
      ))}
    </div>
  );
}
