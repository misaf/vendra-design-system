import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontHomeWeddings({labels, weddingHref, contactHref}) {
  return (
    <>
      <div className="tw:[flex:1_1_320px] tw:max-w-prose tw:flex tw:flex-col tw:gap-3">
        <div className="ag-eyebrow tw:text-inverse-quiet!">
          <>{labels.eyebrow}</>
        </div>
        <h2
          id="vf-home-weddings-title"
          className="tw:m-0 tw:font-display tw:font-medium tw:text-2xl tw:tracking-display"
        >
          <>{labels.title}</> <em className="vf-home-weddings-accent">{labels.accent}</em>
        </h2>
        <p className="tw:m-0 tw:text-inverse-quiet tw:max-w-measure">
          <>{labels.description}</>
        </p>
      </div>
      <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-4">
        <DS.Button variant="primary" iconEnd="arrow-right" href={weddingHref}>
          <>{labels.wedding}</>
        </DS.Button>
        <a
          className="tw:text-on-inverse! tw:underline tw:underline-offset-4 tw:min-h-tap tw:inline-flex tw:items-center"
          href={contactHref}
        >
          {labels.contact}
        </a>
      </div>
    </>
  );
}
