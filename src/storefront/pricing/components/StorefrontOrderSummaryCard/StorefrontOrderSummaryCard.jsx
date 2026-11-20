import React from 'react';
import {Card} from '../../../../design-system/components/Card/Card.jsx';
import {OrderSummary} from '../../../../design-system/components/OrderSummary/OrderSummary.jsx';

export function StorefrontOrderSummaryCard({title, lines, sums}) {
  return (
    <Card padding={20}>
      <OrderSummary title={title} lines={lines} sums={sums} />
    </Card>
  );
}
