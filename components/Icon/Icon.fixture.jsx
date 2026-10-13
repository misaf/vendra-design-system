import React from 'react';
import {Icon} from './Icon.jsx';

export function Fixture() {
  return (
    <div style={{display: 'flex', gap: 8}}>
      <Icon name="flower-2" data-test="decorative" />
      <Icon name="heart" label="Saved" size={28} color="rgb(200, 64, 95)" />
      <Icon name="arrow-right" data-test="arrow" />
      <Icon name="arrow-right" flipRtl={false} data-test="fixed" />
    </div>
  );
}
