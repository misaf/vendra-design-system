import React from 'react';
import {ChoiceGroup} from './ChoiceGroup.jsx';
import {ChoiceTile} from './ChoiceTile.jsx';

export function Fixture() {
  const [slot, setSlot] = React.useState('morning');
  return (
    <div>
      <ChoiceGroup label="Delivery time" columns={3} value={slot} onChange={setSlot}>
        <ChoiceTile value="morning" label="Morning" description="09:00–12:00" />
        <ChoiceTile value="noon" label="Noon" disabled description="Closed" />
        <ChoiceTile value="evening" label="Evening" description="17:00–20:00" />
      </ChoiceGroup>
      <output data-test="slot">{slot}</output>
    </div>
  );
}
