import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontSearchEmpty({countLabel, title, accent, body, retry, browse}) {
  return (
    <>
      <div role="status">
        <>{countLabel}</>
      </div>
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-4">
        <DS.EmptyState icon="search-x" title={title} titleAccent={accent} body={body} />
        <div className="tw:flex tw:gap-3 tw:flex-wrap">
          <DS.Button variant="primary" onClick={retry.onClick}>
            <>{retry.label}</>
          </DS.Button>
          <DS.Button variant="secondary" href={browse.href}>
            <>{browse.label}</>
          </DS.Button>
        </div>
      </div>
    </>
  );
}
