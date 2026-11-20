import {StorefrontLink} from '../../../../../../../shared/ui/StorefrontLink.jsx';
import React from 'react';
import {Icon} from '../../../../../../../components/ui/components/Icon/Icon.jsx';

export function StorefrontPostHeading({journalHref, backLabel, meta, title, intro}) {
  return (
    <>
      <StorefrontLink
        href={journalHref}
        className="vf-post-back tw:inline-flex tw:items-center tw:gap-2 tw:text-sm tw:text-quiet! tw:no-underline!"
      >
        <Icon name="arrow-left" size={16} />
        <>{backLabel}</>
      </StorefrontLink>
      <div className="vf-post-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
        <>{meta}</>
      </div>
      <h1>
        <>{title}</>
      </h1>
      <p className="vf-post-intro tw:text-secondary tw:m-0 tw:text-lg tw:leading-body tw:text-pretty">
        <>{intro}</>
      </p>
    </>
  );
}
