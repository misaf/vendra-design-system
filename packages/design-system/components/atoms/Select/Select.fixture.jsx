import React from 'react';
import {Select} from './Select.jsx';

export function Fixture() {
  const [city, setCity] = React.useState('');
  return (
    <div>
      <Select
        id="city"
        label="City"
        placeholder="Choose a city"
        value={city}
        onChange={setCity}
        options={['Karaj', 'Tehran', {value: 'qom', label: 'Qom', disabled: true}, 'Shiraz']}
      />
      <output data-test="city">{city}</output>
    </div>
  );
}
