import React from 'react';
import {Card} from '../../../ui/components/Card/Card.jsx';
import {OrderSummary} from '../../../ui/components/OrderSummary/OrderSummary.jsx';

export function StorefrontOrderSummaryCard({title, lines, sums}) {
  return (
    <Card padding={20}>
      <OrderSummary title={title} lines={lines} sums={sums} />
    </Card>
  );
}
