import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontErrorActions({
  retryLabel,
  onRetry,
  homeLabel,
  homeHref,
  phoneLabel,
  phoneHref
}) {
  return (
    <>
      <DS.Button variant="primary" iconStart="rotate-ccw" onClick={onRetry}>
        <>{retryLabel}</>
      </DS.Button>
      <DS.Button variant="secondary" iconStart="house" href={homeHref}>
        <>{homeLabel}</>
      </DS.Button>
      <DS.Button variant="ghost" iconStart="phone" href={phoneHref}>
        <>{phoneLabel}</>
      </DS.Button>
    </>
  );
}
