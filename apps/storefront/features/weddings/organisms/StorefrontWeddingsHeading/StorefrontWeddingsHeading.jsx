import React from 'react';
import * as DS from '../../../../shell/ds.js';
import {StorefrontPageHeading} from '../../../../shell/molecules/StorefrontPageHeading/StorefrontPageHeading.jsx';

export function StorefrontWeddingsHeading({eyebrow, title, accent, intro, plan, whatsapp}) {
  return (
    <>
      <StorefrontPageHeading eyebrow={eyebrow} title={title} accent={accent} intro={intro} />
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
