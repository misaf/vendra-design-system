import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontPolicyNotice({title, body}) {
  return (
    <DS.Alert tone="warning" title={title}>
      <>{body}</>
    </DS.Alert>
  );
}
