import React from 'react';
import {RadioGroup} from '../RadioGroup/RadioGroup.jsx';
import {Radio} from './Radio.jsx';

export function Fixture() {
  return (
    <div>
      <RadioGroup legend="Size" defaultValue="classic">
        <Radio value="classic" label="Classic" description="12 stems" />
        <Radio value="generous" label="Generous" description="20 stems" />
        <Radio value="grand" label="Grand" disabled />
      </RadioGroup>
    </div>
  );
}
