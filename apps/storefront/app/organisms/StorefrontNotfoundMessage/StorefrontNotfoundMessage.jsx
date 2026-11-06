import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontNotfoundMessage({eyebrow, title, accent, body}) {
  return (
    <DS.EmptyState
      icon="flower-2"
      eyebrow={eyebrow}
      title={title}
      titleAccent={accent}
      body={body}
      headingLevel={1}
    />
  );
}
