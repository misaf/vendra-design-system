import React from 'react';
import {LiveRegion} from './LiveRegion.jsx';

export function Fixture() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button type="button" onClick={() => setCount(n => n + 1)}>
        Add to bag
      </button>
      <LiveRegion id="bag-status">{count ? count + ' in your bag' : ''}</LiveRegion>
      <LiveRegion politeness="assertive" atomic={false} id="errors">
        Payment failed
      </LiveRegion>
    </div>
  );
}
