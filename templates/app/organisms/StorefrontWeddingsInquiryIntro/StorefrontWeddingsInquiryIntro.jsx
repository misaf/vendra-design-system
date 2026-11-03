import React from 'react';

export function StorefrontWeddingsInquiryIntro({title, intro}) {
  return (
    <>
      <h2 className="vf-weddings-inquiry-title tw:m-0 tw:font-display tw:font-medium tw:leading-tight tw:tracking-display tw:[text-transform:var(--display-case)]">
        <>{title}</>
      </h2>
      <p className="vf-weddings-inquiry-intro tw:text-secondary tw:m-0 tw:max-w-measure tw:text-md tw:leading-body tw:text-pretty">
        <>{intro}</>
      </p>
    </>
  );
}
