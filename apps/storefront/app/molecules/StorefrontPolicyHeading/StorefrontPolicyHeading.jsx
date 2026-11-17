import React from 'react';

export function StorefrontPolicyHeading({
  eyebrow,
  title,
  intro,
  updatedLabel,
  updatedDate,
  updatedIso
}) {
  return (
    <>
      <div className="vf-info-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
        <>{eyebrow}</>
      </div>
      <h1>
        <>{title}</>
      </h1>
      <p className="vf-info-intro tw:m-0 tw:text-md tw:leading-body tw:text-secondary tw:text-pretty">
        <>{intro}</>
      </p>
      <div className="vf-info-meta tw:text-sm tw:text-quiet">
        <>{updatedLabel}</> <time dateTime={updatedIso}>{updatedDate}</time>
      </div>
    </>
  );
}
