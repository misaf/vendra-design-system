import React from 'react';

export function StorefrontTrackHeading({eyebrow, title, accent, intro}) {
  return (
    <>
      <div className="vf-track-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
        <>{eyebrow}</>
      </div>
      <h1>
        <>{title} </>
        <em className="vf-track-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
          <>{accent}</>
        </em>
      </h1>
      <p className="vf-track-intro tw:text-secondary tw:m-0 tw:max-w-measure tw:text-md tw:leading-body tw:text-pretty">
        <>{intro}</>
      </p>
    </>
  );
}
