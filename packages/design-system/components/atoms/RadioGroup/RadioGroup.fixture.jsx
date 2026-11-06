import React from 'react';
import {Radio} from '../Radio/Radio.jsx';
import {RadioGroup} from './RadioGroup.jsx';

export function Fixture() {
  const [pay, setPay] = React.useState('card');
  return (
    <div>
      <RadioGroup legend="Payment" name="pay" value={pay} onChange={setPay}>
        <Radio value="card" label="Card" description="Transfer" />
        <Radio value="cod" label="Cash" disabled />
        <Radio value="wa" label="WhatsApp" />
      </RadioGroup>
      <RadioGroup legend="Gift wrap" hint="Free with every order" error="Choose one" required>
        <Radio value="paper" label="Paper" />
        <Radio value="box" label="Box" />
      </RadioGroup>
      <output data-test="pay">{pay}</output>
    </div>
  );
}
