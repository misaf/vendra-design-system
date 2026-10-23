import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontSigninChangeNumber({label, onChangeNumber}) {
  return (
    <DS.Button variant="ghost" iconStart="arrow-left" onClick={onChangeNumber}>
      <>{label}</>
    </DS.Button>
  );
}
