import React from 'react';
import {Badge} from '../../../../../../ui/components/Badge/Badge.jsx';
import {Button} from '../../../../../../ui/components/Button/Button.jsx';
import {Card} from '../../../../../../ui/components/Card/Card.jsx';

export function StorefrontAccountOrders({orders}) {
  return (
    <div className="vf-account-orders-grid tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]">
      {orders.map((order, index) => (
        <React.Fragment key={index}>
          <Card padding={20}>
            <div className="vf-account-order-body tw:flex tw:flex-col tw:gap-3">
              <div className="tw:flex tw:justify-between tw:items-center tw:gap-3">
                <span dir="ltr" className="vf-account-order-number tw:font-medium">
                  <>{order?.id}</>
                </span>
                <Badge tone={order?.tone}>
                  <>{order?.status}</>
                </Badge>
              </div>
              <div className="vf-account-order-meta tw:text-sm tw:text-quiet">
                <>{order?.meta}</>
              </div>
              <div className="vf-account-order-total tw:font-medium">
                <>{order?.total}</>
              </div>
              <div>
                <Button variant="secondary" size="sm" href={order?.href}>
                  <>{order?.cta}</>
                </Button>
              </div>
            </div>
          </Card>
        </React.Fragment>
      ))}
    </div>
  );
}
