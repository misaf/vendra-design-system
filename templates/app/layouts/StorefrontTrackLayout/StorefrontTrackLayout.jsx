import React from 'react';

export function StorefrontTrackLayout({lookup, showOrder, heading, details, summary, feedback}) {
  return (
    <>
      <main id="main" tabIndex={-1} className="vf-form tw:mx-auto">
        {lookup}
        {showOrder ? (
          <>
            <div className="vf-track-header tw:flex tw:flex-col tw:gap-3 tw:mb-7">{heading}</div>
            <div className="vf-track-columns tw:flex tw:flex-wrap tw:gap-7 tw:items-start">
              <div className="vf-track-details tw:min-w-0 tw:flex tw:flex-col tw:gap-6 tw:[flex:999_1_440px]">
                {details}
              </div>
              <aside className="vf-track-summary tw:[flex:1_1_360px] tw:max-w-form vf-sticky-panel">
                {summary}
              </aside>
            </div>
          </>
        ) : null}
      </main>
      {feedback}
    </>
  );
}
