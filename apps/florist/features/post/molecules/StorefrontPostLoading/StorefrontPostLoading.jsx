import React from 'react';
import * as DS from '../../../../shell/ds.js';

export function StorefrontPostLoading({title, message}) {
  return (
    <>
      <h1>
        <>{title}</>
      </h1>
      <DS.Skeleton shape="card" />
      <p role="status">
        <>{message}</>
      </p>
    </>
  );
}
