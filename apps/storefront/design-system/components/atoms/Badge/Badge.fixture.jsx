import React from 'react';
import {Badge} from './Badge.jsx';

export function Fixture() {
  return (
    <div style={{display: 'flex', gap: 8}}>
      <Badge>New</Badge>
      <Badge tone="danger">Sold out</Badge>
      <Badge tone="solid" data-test="solid">
        Gift
      </Badge>
    </div>
  );
}
