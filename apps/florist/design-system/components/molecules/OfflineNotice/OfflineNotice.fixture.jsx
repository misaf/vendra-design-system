import React from 'react';
import {OfflineNotice} from './OfflineNotice.jsx';

// The spec takes the page offline and back with Playwright; "back online" stays briefly here.
export function Fixture() {
  return (
    <div style={{maxWidth: 560}}>
      <OfflineNotice backFor={1500} />
      <p>The page</p>
    </div>
  );
}
