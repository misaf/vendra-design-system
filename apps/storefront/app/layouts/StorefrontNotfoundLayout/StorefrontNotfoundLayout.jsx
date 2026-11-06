import React from 'react';

export function StorefrontNotfoundLayout({
  message,
  actions,
  recommendationHeading,
  recommendations
}) {
  return (
    <main id="main" tabIndex={-1} className="vf-shopping tw:mx-auto">
      <div className="vf-notfound-message tw:mx-auto tw:flex tw:flex-col tw:items-center tw:max-w-prose tw:gap-4h">
        {message}
        <div className="tw:flex tw:gap-3 tw:flex-wrap tw:justify-center">{actions}</div>
      </div>
      <section className="vf-notfound-recommendations tw:flex tw:flex-col tw:mt-9 tw:gap-5h">
        {recommendationHeading}
        <div className="vf-notfound-product-grid vf-product-grid tw:grid tw:[grid-template-columns:repeat(auto-fill,minmax(max(150px,calc((100%_-_72px)_/_4)),1fr))] tw:gap-y-7 tw:gap-x-5">
          {recommendations}
        </div>
      </section>
    </main>
  );
}
