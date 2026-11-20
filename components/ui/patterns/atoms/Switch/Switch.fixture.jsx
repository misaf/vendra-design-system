import React from 'react';
import {Switch} from './Switch.jsx';

export function Fixture() {
  const [on, setOn] = React.useState(false);
  return (
    <div style={{display: 'grid', gap: 12}}>
      <Switch label="In stock only" checked={on} onChange={setOn} />
      <Switch label="SMS reminders" defaultChecked disabled />
      <output data-test="on">{String(on)}</output>
    </div>
  );
}
