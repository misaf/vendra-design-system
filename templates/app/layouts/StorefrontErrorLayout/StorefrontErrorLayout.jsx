import React from 'react';

export function StorefrontErrorLayout({message, actions}) {
  return (
    <main id="main" tabIndex={-1} className="vf-shopping tw:mx-auto">
      <div className="vf-error-message tw:mx-auto tw:flex tw:flex-col tw:items-center tw:max-w-prose tw:gap-4h">
        {message}
        <div className="tw:flex tw:gap-3 tw:flex-wrap tw:justify-center">{actions}</div>
      </div>
    </main>
  );
}
