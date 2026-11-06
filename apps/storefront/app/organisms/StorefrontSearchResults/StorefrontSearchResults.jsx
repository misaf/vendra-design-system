import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontSearchResults({countLabel, results}) {
  return (
    <div className="vf-search-results tw:flex tw:flex-col">
      <div role="status" className="vf-search-result-count tw:text-sm tw:text-quiet tw:mb-2">
        <>{countLabel}</>
      </div>
      {results.map((r, $index) => (
        <React.Fragment key={$index}>
          <a
            href={r?.href}
            className="vf-search-result vf-search-row tw:grid tw:[grid-template-columns:48px_minmax(0,1fr)_auto] tw:gap-4 tw:items-center tw:py-3 tw:px-0 tw:[border-top:1px_solid_var(--border-subtle)] tw:text-body! tw:no-underline! tw:hover:bg-sunken"
          >
            <div className="vf-search-thumbnail tw:w-12 tw:flex-none">
              <DS.ArchFrame
                src={r?.image}
                sizes="48px"
                shape="soft"
                size="thumb"
                tone="product"
                alt={r?.image?.alt}
              />
            </div>
            <span className="vf-search-details tw:flex-1 tw:min-w-0 tw:flex tw:flex-col tw:gap-1">
              <bdi dir="ltr" className="vf-search-name tw:font-medium">
                <>{r?.name}</>
              </bdi>
              <span className="vf-search-subtitle tw:text-sm tw:text-quiet">
                <>{r?.sub}</>
              </span>
            </span>
            <DS.Price value={r?.price} size="md" className="vf-price" />
          </a>
        </React.Fragment>
      ))}
    </div>
  );
}
