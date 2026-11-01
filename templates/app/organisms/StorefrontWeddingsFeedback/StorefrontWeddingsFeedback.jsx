import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontWeddingsFeedback({message}) {
  return <DS.Alert tone="danger" title={message} />;
}
