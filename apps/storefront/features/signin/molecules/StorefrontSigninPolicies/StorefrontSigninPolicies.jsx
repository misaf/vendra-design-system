import {StorefrontLink} from '../../../../shared/ui/StorefrontLink.jsx';
import React from 'react';

export function StorefrontSigninPolicies({before, terms, between, privacy, after}) {
  return (
    <p className="vf-signin-note tw:m-0 tw:text-sm tw:leading-body tw:text-quiet">
      <>{before}</>
      <StorefrontLink href={terms.href} className="tw:text-inherit! tw:[text-underline-offset:3px]">
        <>{terms.label}</>
      </StorefrontLink>
      <>{between}</>
      <StorefrontLink
        href={privacy.href}
        className="tw:text-inherit! tw:[text-underline-offset:3px]"
      >
        <>{privacy.label}</>
      </StorefrontLink>
      <>{after}</>
    </p>
  );
}
