import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontPostClassic({image, paragraphsBefore, quote, heading, paragraphsAfter}) {
  return (
    <>
      <DS.ArchFrame
        ratio="4/3"
        shape="soft"
        src={image}
        sizes="(max-width: 760px) 100vw, 720px"
        priority={true}
        alt=""
      />
      <div className="vf-post-copy tw:flex tw:flex-col tw:text-body tw:gap-4h tw:text-md tw:leading-body">
        {paragraphsBefore.map((p, $index) => (
          <React.Fragment key={$index}>
            <p className="vf-post-paragraph tw:m-0 tw:text-pretty">
              <>{p}</>
            </p>
          </React.Fragment>
        ))}
        <blockquote className="vf-post-quote tw:my-3 tw:mx-0 tw:ps-4h tw:[border-inline-start:2px_solid_var(--text-accent)] tw:font-display tw:text-xl tw:leading-snug tw:text-body">
          <>{quote}</>
        </blockquote>
        <h2 className="vf-post-heading tw:m-0 tw:font-display tw:font-medium tw:leading-tight tw:tracking-display tw:[text-transform:var(--display-case)]">
          <>{heading}</>
        </h2>
        {paragraphsAfter.map((p, $index) => (
          <React.Fragment key={$index}>
            <p className="vf-post-paragraph tw:m-0 tw:text-pretty">
              <>{p}</>
            </p>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
