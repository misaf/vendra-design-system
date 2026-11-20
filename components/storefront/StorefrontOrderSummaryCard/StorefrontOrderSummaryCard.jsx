import React from 'react';
import {Card} from '../../ui/patterns/atoms/Card/Card.jsx';
import {OrderSummary} from '../../ui/patterns/organisms/OrderSummary/OrderSummary.jsx';

export function StorefrontOrderSummaryCard({title, lines, sums}) {
  return (
    <Card padding={20}>
      <OrderSummary title={title} lines={lines} sums={sums} />
    </Card>
  );
}
