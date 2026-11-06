import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontAccountSessionAction({label, onSignOut}) {
  return (
    <DS.Button variant="ghost" iconStart="log-out" onClick={onSignOut}>
      <>{label}</>
    </DS.Button>
  );
}
