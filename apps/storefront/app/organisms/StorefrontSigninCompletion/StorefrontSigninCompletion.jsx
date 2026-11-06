import React from 'react';
import * as DS from '../../ds.js';

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
      <DS.EmptyState
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
          <a href={namePrompt.href} className="tw:text-inherit! tw:[text-underline-offset:3px]">
            <>{namePrompt.label}</>
          </a>
        </p>
      ) : null}
      <div className="tw:flex tw:justify-center tw:gap-3 tw:flex-wrap">
        {fromCheckout ? (
          <>
            <DS.Button
              variant="primary"
              iconEnd="arrow-right"
              href={checkout.href}
              onClick={checkout.onClick}
            >
              <>{checkout.label}</>
            </DS.Button>
            <DS.Button variant="ghost" href={account.href}>
              <>{account.label}</>
            </DS.Button>
          </>
        ) : null}
        {notFromCheckout ? (
          <>
            <DS.Button variant="primary" href={account.href}>
              <>{account.label}</>
            </DS.Button>
          </>
        ) : null}
      </div>
    </>
  );
}
