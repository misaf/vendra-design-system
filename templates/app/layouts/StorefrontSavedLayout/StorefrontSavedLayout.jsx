import React from 'react';

export function StorefrontSavedLayout({showResults, showEmpty, heading, notice, results, empty}) {
  return (
    <main id="main" tabIndex={-1} className="vf-shopping tw:mx-auto">
      <div className="vf-saved-header tw:mb-6">{heading}</div>
      {notice}
      {showResults ? (
        <div
          data-vf-keep-focus
          className="vf-saved-product-grid vf-product-grid tw:grid tw:[grid-template-columns:repeat(auto-fill,minmax(max(150px,calc((100%_-_72px)_/_4)),1fr))] tw:gap-y-7 tw:gap-x-5"
        >
          {results}
        </div>
      ) : null}
      {showEmpty ? (
        <div className="vf-saved-empty tw:flex tw:flex-col tw:items-center tw:gap-4h tw:py-6 tw:px-0">
          {empty}
        </div>
      ) : null}
    </main>
  );
}
