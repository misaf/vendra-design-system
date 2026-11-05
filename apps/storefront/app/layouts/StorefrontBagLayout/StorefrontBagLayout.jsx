import React from 'react';

export function StorefrontBagLayout({
  showContents,
  notice,
  progress,
  heading,
  items,
  summary,
  empty
}) {
  return (
    <main id="main" tabIndex={-1} className="vf-form vf-form--bag tw:mx-auto">
      {notice}
      {showContents ? (
        <>
          {progress}
          {heading}
          <div className="vf-bag-columns tw:flex tw:flex-wrap tw:gap-7 tw:items-start">
            <div className="vf-bag-items tw:min-w-0 tw:flex tw:flex-col tw:[flex:999_1_480px] tw:gap-7">
              {items}
            </div>
            <aside className="vf-bag-summary tw:flex tw:flex-col tw:gap-4 tw:[flex:1_1_380px] tw:max-w-form vf-sticky-panel">
              {summary}
            </aside>
          </div>
        </>
      ) : null}
      {empty}
    </main>
  );
}
