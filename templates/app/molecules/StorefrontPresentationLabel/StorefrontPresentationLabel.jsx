import React from 'react';

// The code under a photo (and "Sold out" when it is); `large` in the full-screen view. The price
// sits beside it. Nothing more: the presentation is about the photos.
export function StorefrontPresentationLabel({code, soldOut, soldOutLabel, large = false}) {
  return (
    <span className="tw:flex tw:flex-col">
      <span
        className={
          'tw:font-display tw:tracking-display tw:whitespace-nowrap ' +
          (large ? 'tw:text-3xl' : 'tw:text-xl')
        }
        dir="ltr"
      >
        <>{code}</>
      </span>
      {soldOut ? (
        <span className={large ? 'tw:text-inverse-quiet' : 'tw:text-sm tw:text-quiet'}>
          <>{soldOutLabel}</>
        </span>
      ) : null}
    </span>
  );
}
