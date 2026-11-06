import React from 'react';
import {ResendCode} from './ResendCode.jsx';

export function Fixture() {
  const [sent, setSent] = React.useState(0);
  return (
    <div>
      <ResendCode seconds={90} onResend={() => setSent(count => count + 1)} />
      <output data-test="sent">{sent}</output>
    </div>
  );
}
