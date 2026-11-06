import React from 'react';
import {RangeSlider} from './RangeSlider.jsx';

export function Fixture() {
  const [price, setPrice] = React.useState([20, 80]);
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
      <output data-test="range">{price.join('-')}</output>
    </div>
  );
}
