import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontOrderSummaryCard({title, lines, sums}) {
  return (
    <DS.Card padding={20}>
      <DS.OrderSummary title={title} lines={lines} sums={sums} />
    </DS.Card>
  );
}
