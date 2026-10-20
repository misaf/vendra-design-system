import React from 'react';

export function StorefrontProductLayout({breadcrumbs, gallery, details, related, feedback}) {
  return (
    <main id="main" tabIndex={-1} className="vf-shopping tw:mx-auto">
      {breadcrumbs}
      <div className="vf-product-columns tw:grid tw:items-start tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))] tw:gap-8">
        <div className="tw:flex tw:flex-col tw:gap-3">{gallery}</div>
        <div className="vf-product-details tw:flex tw:flex-col tw:gap-5 vf-sticky-panel">
          {details}
        </div>
      </div>
      {related}
      {feedback}
    </main>
  );
}
