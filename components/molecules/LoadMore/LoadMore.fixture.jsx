import React from 'react';
import {LoadMore} from './LoadMore.jsx';

export function Fixture() {
  const [shown, setShown] = React.useState(4);
  return (
    <div style={{display: 'grid', gap: 24, maxWidth: 420}}>
      <LoadMore
        shown={shown}
        total={6}
        status={'Showing ' + shown + ' of 6 designs'}
        label="Show more"
        onClick={() => setShown(6)}
      />
      <LoadMore shown={4} total={12} status="Loading" label="Loading more" busy />
    </div>
  );
}
