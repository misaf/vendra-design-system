import React from 'react';
import {Spinner} from '@vendra/ui/Spinner';

export function Fixture() {
  return (
    <div style={{display: 'flex', gap: 16}}>
      <Spinner />
      <Spinner label="Loading delivery times" size={28} />
      <Spinner decorative className="decorative" />
    </div>
  );
}
