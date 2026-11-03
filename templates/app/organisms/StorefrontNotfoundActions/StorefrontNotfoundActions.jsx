import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontNotfoundActions({homeLabel, homeHref, searchLabel, searchHref}) {
  return (
    <>
      <DS.Button variant="primary" iconStart="house" href={homeHref}>
        <>{homeLabel}</>
      </DS.Button>
      <DS.Button variant="secondary" iconStart="search" href={searchHref}>
        <>{searchLabel}</>
      </DS.Button>
    </>
  );
}
