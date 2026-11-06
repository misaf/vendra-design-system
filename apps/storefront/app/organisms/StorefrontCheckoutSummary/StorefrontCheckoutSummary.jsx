import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontCheckoutSummary({title, lines, sums}) {
  return (
    <DS.Card padding={20}>
      <DS.OrderSummary title={title} lines={lines} sums={sums} />
    </DS.Card>
  );
}
