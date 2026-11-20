import React from 'react';
import {Badge} from '../../../../../../components/ui/patterns/atoms/Badge/Badge.jsx';
import {Button} from '../../../../../../components/ui/components/Button/Button.jsx';
import {Card} from '../../../../../../components/ui/patterns/atoms/Card/Card.jsx';
import {DetailList} from '../../../../../../components/ui/patterns/molecules/DetailList/DetailList.jsx';
import {EmptyState} from '../../../../../../components/ui/patterns/molecules/EmptyState/EmptyState.jsx';
import {StorefrontStepProgress} from '../../../../../../components/storefront/StorefrontStepProgress/StorefrontStepProgress.jsx';

export function StorefrontCheckoutConfirmation({progress, heading, status, rows, account, links}) {
  return (
    <>
      <StorefrontStepProgress
        steps={progress.steps}
        current={progress.current}
        labels={progress.labels}
        formatNumber={progress.formatNumber}
        captionFormat={progress.captionFormat}
      />
      <EmptyState
        icon="check"
        tone="accent"
        eyebrow={heading.eyebrow}
        title={heading.title}
        titleAccent={heading.accent}
        body={heading.body}
        headingLevel={1}
      />
      <Badge tone="accent">
        <>{status}</>
      </Badge>
      <div className="tw:w-full">
        <DetailList rows={rows} />
      </div>
      {account.visible ? (
        <>
          <div className="tw:w-full">
            <Card variant="sunken" padding={20}>
              <div className="vf-checkout-account tw:flex tw:items-center tw:justify-between tw:gap-4 tw:flex-wrap">
                <div className="tw:flex tw:flex-col tw:gap-1 tw:[flex:1_1_260px]">
                  <h2 className="tw:m-0 tw:text-md tw:font-medium">
                    <>{account.title}</>
                  </h2>
                  <p className="tw:m-0 tw:text-sm tw:text-secondary">
                    <>{account.body}</>
                  </p>
                </div>
                <Button variant="secondary" iconStart="user" href={account.href}>
                  <>{account.label}</>
                </Button>
              </div>
            </Card>
          </div>
        </>
      ) : null}
      <div className="tw:flex tw:gap-3 tw:flex-wrap tw:justify-center">
        <Button variant="primary" iconStart="package-search" href={links.track.href}>
          <>{links.track.label}</>
        </Button>
        <Button variant="secondary" href={links.shop.href}>
          <>{links.shop.label}</>
        </Button>
      </div>
    </>
  );
}
