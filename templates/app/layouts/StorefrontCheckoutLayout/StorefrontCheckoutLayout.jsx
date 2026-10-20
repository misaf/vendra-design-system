import React from 'react';

export function StorefrontCheckoutLayout({
  showPayment,
  notices,
  progress,
  heading,
  review,
  payment,
  summary,
  bank,
  success
}) {
  return (
    <main id="main" tabIndex={-1} className="vf-form vf-form--checkout tw:mx-auto">
      {notices}
      {showPayment ? (
        <>
          {progress}
          {heading}
          <div className="vf-checkout-columns tw:flex tw:flex-wrap tw:gap-7 tw:items-start">
            <div className="vf-checkout-payment tw:min-w-0 tw:flex tw:flex-col tw:gap-5 tw:[flex:999_1_440px]">
              {review}
              {payment}
            </div>
            <aside className="vf-checkout-summary tw:[flex:1_1_360px] tw:max-w-form vf-sticky-panel">
              {summary}
            </aside>
          </div>
        </>
      ) : null}
      {bank ? (
        <div className="vf-checkout-bank tw:mx-auto tw:flex tw:flex-col tw:items-center tw:max-w-prose tw:gap-5h">
          {bank}
        </div>
      ) : null}
      {success ? (
        <div className="vf-checkout-success tw:mx-auto tw:flex tw:flex-col tw:items-center tw:max-w-prose tw:gap-5h">
          {success}
        </div>
      ) : null}
    </main>
  );
}
