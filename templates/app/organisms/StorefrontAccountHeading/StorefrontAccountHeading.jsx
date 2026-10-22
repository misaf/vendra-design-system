import React from 'react';

export function StorefrontAccountHeading({eyebrow, title, accent}) {
  return (
    <>
      <div className="vf-account-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
        <>{eyebrow}</>
      </div>
      <h1>
        <>{title} </>
        <em className="vf-account-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
          <>{accent}</>
        </em>
      </h1>
    </>
  );
}
