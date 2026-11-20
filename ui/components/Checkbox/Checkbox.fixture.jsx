import React from 'react';
import {Checkbox} from './Checkbox.jsx';

export function Fixture() {
  const [agreed, setAgreed] = React.useState(false);
  return (
    <div style={{display: 'grid', gap: 12}}>
      <Checkbox label="Add a card" checked={agreed} onChange={setAgreed} />
      <Checkbox
        id="terms"
        label="I accept the terms"
        required
        error="Accept the terms to continue"
      />
      <Checkbox label="Gift wrap" hint="Free" defaultChecked disabled />
      <output data-test="agreed">{String(agreed)}</output>
    </div>
  );
}
