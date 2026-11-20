import {StorefrontLink} from '../../../../../../shared/ui/StorefrontLink.jsx';
import React from 'react';
import {Button} from '../../../../../../components/ui/components/Button/Button.jsx';
import {EmptyState} from '../../../../../../components/ui/patterns/molecules/EmptyState/EmptyState.jsx';

export function StorefrontSigninCompletion({
  title,
  accent,
  body,
  fromCheckout,
  notFromCheckout,
  checkout,
  account,
  namePrompt
}) {
  return (
    <>
      <EmptyState
        icon="check"
        tone="accent"
        title={title}
        titleAccent={accent}
        body={body}
        headingLevel={1}
      />
      {namePrompt ? (
        <p className="tw:m-0 tw:text-center tw:text-sm tw:leading-body tw:text-quiet">
          <>{namePrompt.text} </>
          <StorefrontLink
            href={namePrompt.href}
            className="tw:text-inherit! tw:[text-underline-offset:3px]"
          >
            <>{namePrompt.label}</>
          </StorefrontLink>
        </p>
      ) : null}
      <div className="tw:flex tw:justify-center tw:gap-3 tw:flex-wrap">
        {fromCheckout ? (
          <>
            <Button
              variant="primary"
              iconEnd="arrow-right"
              href={checkout.href}
              onClick={checkout.onClick}
            >
              <>{checkout.label}</>
            </Button>
            <Button variant="ghost" href={account.href}>
              <>{account.label}</>
            </Button>
          </>
        ) : null}
        {notFromCheckout ? (
          <>
            <Button variant="primary" href={account.href}>
              <>{account.label}</>
            </Button>
          </>
        ) : null}
      </div>
    </>
  );
}
