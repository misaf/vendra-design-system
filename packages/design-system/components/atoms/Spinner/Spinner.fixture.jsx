import React from 'react';
import {Spinner} from './Spinner.jsx';

export function Fixture() {
  return (
    <div style={{display: 'flex', gap: 16}}>
      <Spinner />
      <Spinner label="Loading delivery times" size={28} />
      <Spinner decorative className="decorative" />
    </div>
  );
}
