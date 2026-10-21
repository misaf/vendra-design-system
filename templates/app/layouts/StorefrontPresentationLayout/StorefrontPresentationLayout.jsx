import React from 'react';

export function StorefrontPresentationLayout({
  density,
  hideCatalog,
  heading,
  bar,
  catalog,
  display,
  overlays,
  feedback
}) {
  return (
    <main
      id="main"
      tabIndex={-1}
      data-density={density}
      className="vf-presentation tw:min-h-screen tw:bg-page tw:text-body tw:flex tw:flex-col tw:[container-type:inline-size]"
    >
      <h1 className="ag-sr-only">{heading}</h1>
      <div
        hidden={hideCatalog}
        className="vf-presentation-bar tw:sticky tw:top-0 tw:z-header tw:bg-header tw:[backdrop-filter:blur(10px)] tw:[border-bottom:1px_solid_var(--border-subtle)]"
      >
        <div className="vf-presentation-bar-row tw:mx-auto tw:max-w-page tw:px-gutter tw:py-2">
          {bar}
        </div>
      </div>
      <div hidden={hideCatalog} className="tw:flex-1">
        <div className="tw:mx-auto tw:max-w-page tw:px-gutter tw:py-5">{catalog}</div>
      </div>
      {display}
      {overlays}
      {feedback}
    </main>
  );
}
