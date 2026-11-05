import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontJournalEmpty({title, clearLabel, onClear}) {
  return (
    <>
      <DS.EmptyState title={title} headingLevel={2} />
      <DS.Button onClick={onClear}>
        <>{clearLabel}</>
      </DS.Button>
    </>
  );
}
