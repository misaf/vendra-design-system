import React from 'react';

export function StorefrontPolicyLayout({
  heading,
  policyNavigation,
  notice,
  tableOfContents,
  document
}) {
  return (
    <main id="main" tabIndex={-1} className="vf-info">
      <header className="vf-info-header tw:max-w-prose tw:flex tw:flex-col tw:gap-4 tw:mb-7">
        {heading}
      </header>
      {policyNavigation}
      <div className="vf-info-notice tw:mb-7">{notice}</div>
      <div className="vf-info-columns vf-info-columns--policy tw:grid tw:[grid-template-columns:240px_minmax(0,1fr)] tw:gap-7 tw:items-start">
        {tableOfContents}
        <div className="vf-info-sections tw:flex tw:flex-col tw:gap-7 tw:min-w-0">{document}</div>
      </div>
    </main>
  );
}
