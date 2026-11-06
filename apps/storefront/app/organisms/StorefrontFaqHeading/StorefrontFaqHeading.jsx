import React from 'react';

export function StorefrontFaqHeading({eyebrow, title, accent, intro}) {
  return (
    <>
      <div className="vf-info-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
        <>{eyebrow}</>
      </div>
      <h1>
        <>{title} </>
        <em className="vf-faq-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
          <>{accent}</>
        </em>
      </h1>
      <p className="vf-info-intro tw:m-0 tw:text-md tw:leading-body tw:text-secondary tw:text-pretty">
        <>{intro}</>
      </p>
    </>
  );
}
