import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontSavedEmpty({title, accent, body, browse}) {
  return (
    <>
      <DS.EmptyState icon="heart" title={title} titleAccent={accent} body={body} />
      <DS.Button variant="primary" href={browse.href}>
        <>{browse.label}</>
      </DS.Button>
    </>
  );
}
