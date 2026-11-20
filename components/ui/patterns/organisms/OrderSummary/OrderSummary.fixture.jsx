import React from 'react';
import {OrderSummary} from './OrderSummary.jsx';

export function Fixture() {
  return (
    <div style={{maxWidth: 420}}>
      <OrderSummary
        title="Your order"
        lines={[
          {
            name: 'Lavender Whisper',
            href: '#product',
            meta: 'Classic',
            note: 'Card: “Happy birthday”',
            total: '2,400,000 Toman'
          },
          {name: 'Gift card', total: '0 Toman'}
        ]}
        sums={[
          {label: 'Subtotal', value: '2,400,000 Toman'},
          {label: 'Total', value: '2,480,000 Toman', strong: true}
        ]}
      />
    </div>
  );
}
