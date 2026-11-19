import React from 'react';
import * as DS from '../../../../shell/ds.js';

export function StorefrontPostMissing({title, backLabel, journalHref}) {
  return (
    <>
      <DS.EmptyState title={title} headingLevel={1} />
      <DS.Button href={journalHref}>
        <>{backLabel}</>
      </DS.Button>
    </>
  );
}
