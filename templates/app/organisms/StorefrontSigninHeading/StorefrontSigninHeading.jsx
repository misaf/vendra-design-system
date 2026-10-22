import React from 'react';

export function StorefrontSigninHeading({title, accent, intro}) {
  return (
    <>
      <h1>
        <>{title} </>
        <em className="vf-signin-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
          <>{accent}</>
        </em>
      </h1>
      <p className="vf-signin-intro tw:text-secondary tw:m-0 tw:max-w-measure tw:text-md tw:leading-body tw:text-pretty">
        <>{intro}</>
      </p>
    </>
  );
}
