import React from 'react';
import * as DS from '../../ds.js';
import {StorefrontCheckoutProgress} from '../StorefrontCheckoutProgress/StorefrontCheckoutProgress.jsx';

export function StorefrontCheckoutConfirmation({progress, heading, status, rows, account, links}) {
  return (
    <>
      <StorefrontCheckoutProgress
        steps={progress.steps}
        current={progress.current}
        labels={progress.labels}
        formatNumber={progress.formatNumber}
        captionFormat={progress.captionFormat}
      />
      <DS.EmptyState
        icon="check"
        tone="accent"
        eyebrow={heading.eyebrow}
        title={heading.title}
        titleAccent={heading.accent}
        body={heading.body}
        headingLevel={1}
      />
      <DS.Badge tone="accent">
        <>{status}</>
      </DS.Badge>
      <div className="tw:w-full">
        <DS.DetailList rows={rows} />
      </div>
      {account.visible ? (
        <>
          <div className="tw:w-full">
            <DS.Card variant="sunken" padding={20}>
              <div className="vf-checkout-account tw:flex tw:items-center tw:justify-between tw:gap-4 tw:flex-wrap">
                <div className="tw:flex tw:flex-col tw:gap-1 tw:[flex:1_1_260px]">
                  <h2 className="tw:m-0 tw:text-md tw:font-medium">
                    <>{account.title}</>
                  </h2>
                  <p className="tw:m-0 tw:text-sm tw:text-secondary">
                    <>{account.body}</>
                  </p>
                </div>
                <DS.Button variant="secondary" iconStart="user" href={account.href}>
                  <>{account.label}</>
                </DS.Button>
              </div>
            </DS.Card>
          </div>
        </>
      ) : null}
      <div className="tw:flex tw:gap-3 tw:flex-wrap tw:justify-center">
        <DS.Button variant="primary" iconStart="package-search" href={links.track.href}>
          <>{links.track.label}</>
        </DS.Button>
        <DS.Button variant="secondary" href={links.shop.href}>
          <>{links.shop.label}</>
        </DS.Button>
      </div>
    </>
  );
}
