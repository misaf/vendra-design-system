import React from 'react';
import * as DS from '../../../../shell/ds.js';

export function StorefrontJournalLoading({message}) {
  return (
    <>
      <DS.Skeleton shape="card" />
      <p role="status">
        <>{message}</>
      </p>
    </>
  );
}
