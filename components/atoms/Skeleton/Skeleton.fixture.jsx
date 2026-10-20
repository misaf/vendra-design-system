import React from 'react';
import {Skeleton} from './Skeleton.jsx';

export function Fixture() {
  return (
    <div style={{display: 'grid', gap: 16, maxWidth: 320}}>
      <Skeleton lines={3} className="lines" />
      <Skeleton shape="circle" width={48} className="circle" />
      <Skeleton shape="card" className="card" />
    </div>
  );
}
