import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontPostActions({copyLabel, onCopy, shopLabel, shopHref}) {
  return (
    <>
      <DS.Button variant="secondary" size="sm" iconStart="link" onClick={onCopy}>
        <>{copyLabel}</>
      </DS.Button>
      <DS.Button variant="primary" size="sm" iconEnd="arrow-right" href={shopHref}>
        <>{shopLabel}</>
      </DS.Button>
    </>
  );
}
