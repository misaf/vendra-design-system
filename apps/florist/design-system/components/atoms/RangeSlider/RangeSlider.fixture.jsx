import React from 'react';
import {RangeSlider} from './RangeSlider.jsx';

export function Fixture() {
  const [price, setPrice] = React.useState([20, 80]);
  const [renamed, setRenamed] = React.useState(false);
  return (
    <div>
      <RangeSlider
        min={0}
        max={100}
        step={10}
        value={price}
        onChange={setPrice}
        formatValue={value => value + ' Toman'}
        labels={{min: 'Min price', max: 'Max price'}}
        label="Price"
      />
      <span data-test="range">{price.join('-')}</span>
      <label>
        <input
          type="checkbox"
          checked={renamed}
          onChange={event => setRenamed(event.target.checked)}
        />{' '}
        Rename external label
      </label>
      <span id="external-kind">{renamed ? 'Updated' : 'Delivery'}</span>{' '}
      <span id="external-price">price</span>
      <RangeSlider
        labelledBy="external-kind external-price"
        defaultValue={[20, 80]}
        labels={{min: 'Low', max: 'High'}}
      />
      <span id="external-single">Quantity</span>
      <RangeSlider labelledBy="external-single" range={false} defaultValue={3} />
    </div>
  );
}
