import React from 'react';
import {QuantityInput} from './QuantityInput.jsx';

export function Fixture() {
  const [quantity, setQuantity] = React.useState(2);
  return (
    <div>
      <QuantityInput
        value={quantity}
        min={1}
        max={3}
        onChange={setQuantity}
        labels={{dec: 'Fewer', inc: 'More', value: 'Quantity'}}
      />
      <QuantityInput defaultValue={1} disabled />
      <output data-test="quantity">{quantity}</output>
    </div>
  );
}
