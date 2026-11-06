import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontPresentationTools({
  open,
  onClose,
  labels,
  offline,
  online,
  photoIssue,
  stock,
  setup,
  device,
  shortlist,
  order,
  scan,
  startOver,
  onRetryPhotos,
  onBrowse,
  onSettings
}) {
  return (
    <DS.Dialog open={open} onClose={onClose} title={labels.title} placement="start" maxWidth={440}>
      <div className="tw:flex tw:flex-col tw:gap-3">
        <p className="tw:m-0 tw:text-sm" role="status" data-offline-status={offline.status}>
          {offline.label}
          {offline.progress}
        </p>
        {!online ? <DS.Alert tone="warning" title={labels.offline} /> : null}
        {photoIssue ? <DS.Alert tone="warning" title={labels.photoIssue} /> : null}
        {stock.issue ? <DS.Alert tone="warning" title={labels.stockIssue} /> : null}
        {stock.updated ? (
          <p className="tw:m-0 tw:text-sm tw:text-quiet">
            {labels.stockUpdated} <bdi>{stock.updated}</bdi>
          </p>
        ) : null}
        {photoIssue ? (
          <DS.Button variant="secondary" disabled={!online} onClick={onRetryPhotos}>
            {labels.retryPhotos}
          </DS.Button>
        ) : null}
        {!setup.done ? <p className="tw:m-0">{labels.setupIntro}</p> : null}
        <DS.Button variant="secondary" onClick={setup.onOpen}>
          {labels.setupTitle}
        </DS.Button>
        {setup.canReview ? (
          <DS.Button variant="secondary" onClick={onSettings}>
            {labels.reviewSetup}
          </DS.Button>
        ) : null}
        <dl className="tw:m-0 tw:flex tw:flex-col tw:gap-2" aria-label={labels.deviceStatus}>
          <div>
            <dt>{labels.screenStatus}</dt>
            <dd>{device.screen}</dd>
          </div>
          <div>
            <dt>{labels.wakeStatus}</dt>
            <dd>{device.wake}</dd>
          </div>
        </dl>
        {!stock.updated ? <p className="tw:m-0 tw:text-sm">{labels.stockDemo}</p> : null}
        <p className="tw:m-0 tw:text-sm tw:text-quiet">{labels.gallerySample}</p>
        <DS.Button variant="secondary" onClick={onBrowse}>
          {labels.browse}
        </DS.Button>
        <DS.Button variant="secondary" iconStart="star" onClick={shortlist.onClick}>
          {shortlist.label}
        </DS.Button>
        <DS.Button variant="secondary" iconStart="shopping-bag" onClick={order.onClick}>
          {order.label}
        </DS.Button>
        {scan ? (
          <DS.Button variant="secondary" iconStart="camera" onClick={scan.onClick}>
            {scan.label}
          </DS.Button>
        ) : null}
        {startOver ? (
          <DS.Button variant="secondary" onClick={startOver.onClick}>
            {startOver.label}
          </DS.Button>
        ) : null}
        <DS.Button variant="secondary" iconStart="settings" onClick={onSettings}>
          {labels.settings}
        </DS.Button>
      </div>
    </DS.Dialog>
  );
}
