import React from 'react';

export function StorefrontSearchLayout({heading, query, close, popular, results, empty}) {
  return (
    <main id="main" tabIndex={-1} className="vf-shopping tw:mx-auto tw:flex tw:flex-col tw:gap-5">
      <div className="vf-reading tw:w-full tw:max-w-wide tw:mx-auto">
        {heading}
        <div className="vf-search-controls tw:flex tw:gap-3 tw:items-end">
          <div className="vf-search-input tw:min-w-0 tw:flex-1">{query}</div>
          {close}
        </div>
        {popular}
        {results}
        {empty}
      </div>
    </main>
  );
}
