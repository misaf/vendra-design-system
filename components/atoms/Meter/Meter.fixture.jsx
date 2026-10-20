import React from 'react';
import {Meter} from './Meter.jsx';

export function Fixture() {
  return (
    <div style={{display: 'grid', gap: 16, maxWidth: 420}}>
      <Meter label="Free delivery" value={3800000} maxValue={5000000} valueLabel="3.8M of 5M" />
      <Meter label="Profile" value={3} maxValue={4} showValue />
      <Meter label="Reached" value={5} maxValue={5} done />
    </div>
  );
}
