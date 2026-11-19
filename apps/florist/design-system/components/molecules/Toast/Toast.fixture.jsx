import React from 'react';
import {Toast} from './Toast.jsx';

export function Fixture() {
  const [closed, setClosed] = React.useState(0);
  return (
    <div>
      <Toast
        title="Added to your bag"
        message="Wild Meadow · Generous"
        action={{label: 'View bag', href: '#bag'}}
        onClose={() => setClosed(count => count + 1)}
      />
      <output data-test="closed">{closed}</output>
    </div>
  );
}
