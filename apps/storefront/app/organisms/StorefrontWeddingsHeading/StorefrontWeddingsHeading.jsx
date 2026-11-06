import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontWeddingsHeading({eyebrow, title, accent, intro, plan, whatsapp}) {
  return (
    <>
      <div className="vf-weddings-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
        <>{eyebrow}</>
      </div>
      <h1>
        <>{title} </>
        <em className="vf-weddings-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
          <>{accent}</>
        </em>
      </h1>
      <p className="vf-weddings-intro tw:text-secondary tw:m-0 tw:max-w-measure tw:text-md tw:leading-body tw:text-pretty">
        <>{intro}</>
      </p>
      <div className="tw:flex tw:gap-3 tw:flex-wrap">
        <DS.Button variant="primary" size="lg" href={plan.href} iconEnd="arrow-down">
          <>{plan.label}</>
        </DS.Button>
        {whatsapp ? (
          <DS.Button
            variant="ghost"
            size="lg"
            iconStart="message-circle"
            href={whatsapp.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <>{whatsapp.label}</>
          </DS.Button>
        ) : null}
      </div>
    </>
  );
}
