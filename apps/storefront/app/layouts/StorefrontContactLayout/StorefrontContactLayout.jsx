import React from 'react';

export function StorefrontContactLayout({heading, details, form, feedback}) {
  return (
    <main id="main" tabIndex={-1} className="vf-info">
      <header className="vf-info-header tw:max-w-prose tw:flex tw:flex-col tw:gap-4 tw:mb-7">
        {heading}
      </header>
      <div className="vf-info-columns vf-info-columns--contact tw:grid tw:[grid-template-columns:repeat(2,minmax(0,1fr))] tw:gap-7 tw:items-start">
        <div className="vf-contact-details tw:flex tw:flex-col tw:gap-4h">{details}</div>
        <div className="tw:flex tw:flex-col tw:gap-4">{form}</div>
      </div>
      {feedback}
    </main>
  );
}
