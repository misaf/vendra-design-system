import React from 'react';

export function StorefrontFaqLayout({heading, questions, contact}) {
  return (
    <main id="main" tabIndex={-1} className="vf-info">
      <header className="vf-info-header tw:max-w-prose tw:flex tw:flex-col tw:gap-4 tw:mb-7">
        {heading}
      </header>
      <div className="vf-info-columns tw:grid tw:[grid-template-columns:minmax(0,1fr)_320px] tw:gap-7 tw:items-start">
        <div className="vf-info-sections tw:flex tw:flex-col tw:gap-7 tw:min-w-0">{questions}</div>
        <aside className="tw:flex tw:flex-col tw:gap-5">{contact}</aside>
      </div>
    </main>
  );
}
