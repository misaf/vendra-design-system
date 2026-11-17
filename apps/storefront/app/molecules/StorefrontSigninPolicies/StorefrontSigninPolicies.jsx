import React from 'react';

export function StorefrontSigninPolicies({before, terms, between, privacy, after}) {
  return (
    <p className="vf-signin-note tw:m-0 tw:text-sm tw:leading-body tw:text-quiet">
      <>{before}</>
      <a href={terms.href} className="tw:text-inherit! tw:[text-underline-offset:3px]">
        <>{terms.label}</>
      </a>
      <>{between}</>
      <a href={privacy.href} className="tw:text-inherit! tw:[text-underline-offset:3px]">
        <>{privacy.label}</>
      </a>
      <>{after}</>
    </p>
  );
}
