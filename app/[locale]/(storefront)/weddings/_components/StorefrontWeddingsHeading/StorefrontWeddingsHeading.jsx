import React from 'react';
import {Button} from '../../../../../../ui/components/Button/Button.jsx';
import {StorefrontPageHeading} from '../../../../../../components/storefront/StorefrontPageHeading/StorefrontPageHeading.jsx';

export function StorefrontWeddingsHeading({eyebrow, title, accent, intro, plan, whatsapp}) {
  return (
    <>
      <StorefrontPageHeading eyebrow={eyebrow} title={title} accent={accent} intro={intro} />
      <div className="tw:flex tw:gap-3 tw:flex-wrap">
        <Button variant="primary" size="lg" href={plan.href} iconEnd="arrow-down">
          <>{plan.label}</>
        </Button>
        {whatsapp ? (
          <Button
            variant="ghost"
            size="lg"
            iconStart="message-circle"
            href={whatsapp.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <>{whatsapp.label}</>
          </Button>
        ) : null}
      </div>
    </>
  );
}
