import React from 'react';
import {LineItem} from './LineItem.jsx';

export function Fixture() {
  const [quantity, setQuantity] = React.useState(1);
  const [removed, setRemoved] = React.useState(false);
  return (
    <div style={{maxWidth: 520}}>
      {!removed && (
        <LineItem
          name="Lavender Whisper"
          meta="Classic"
          note="Card: “Happy birthday”"
          price={2400000 * quantity + ' Toman'}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onRemove={() => setRemoved(true)}
          quantityLabels={{decrease: 'Fewer', increase: 'More', value: 'Quantity'}}
        />
      )}
      <LineItem size="sm" name="Ivory Rib Box" price="8,200,000 Toman" quantity={2} />
      <LineItem name="Strelitzia" price="1,800,000 Toman" unavailable onRemove={() => {}} busy />
    </div>
  );
}
