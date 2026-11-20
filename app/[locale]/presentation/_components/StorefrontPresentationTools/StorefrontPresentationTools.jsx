import React from 'react';
import {Alert} from '../../../../../components/ui/patterns/molecules/Alert/Alert.jsx';
import {Button} from '../../../../../components/ui/components/Button/Button.jsx';
import {Dialog} from '../../../../../components/ui/components/Dialog/Dialog.jsx';

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
  onRefreshPhotos = /** @type {(() => void) | undefined} */ (undefined),
  onBrowse,
  onSettings
}) {
  return (
    <Dialog open={open} onClose={onClose} title={labels.title} placement="start" maxWidth={440}>
      <div className="tw:flex tw:flex-col tw:gap-3">
        <p className="tw:m-0 tw:text-sm" role="status" data-offline-status={offline.status}>
          {offline.label}
          {offline.progress}
        </p>
        {!online ? <Alert tone="warning" title={labels.offline} /> : null}
        {photoIssue ? <Alert tone="warning" title={labels.photoIssue} /> : null}
        {stock.issue ? <Alert tone="warning" title={labels.stockIssue} /> : null}
        {stock.updated ? (
          <p className="tw:m-0 tw:text-sm tw:text-quiet">
            {labels.stockUpdated} <bdi>{stock.updated}</bdi>
          </p>
        ) : null}
        {photoIssue ? (
          <Button variant="secondary" disabled={!online} onClick={onRetryPhotos}>
            {labels.retryPhotos}
          </Button>
        ) : null}
        {onRefreshPhotos ? (
          <Button
            variant="secondary"
            disabled={!online || offline.status === 'preparing'}
            onClick={onRefreshPhotos}
          >
            {labels.refreshPhotos}
          </Button>
        ) : null}
        {!setup.done ? <p className="tw:m-0">{labels.setupIntro}</p> : null}
        <Button variant="secondary" onClick={setup.onOpen}>
          {labels.setupTitle}
        </Button>
        {setup.canReview ? (
          <Button variant="secondary" onClick={onSettings}>
            {labels.reviewSetup}
          </Button>
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
        <Button variant="secondary" onClick={onBrowse}>
          {labels.browse}
        </Button>
        <Button variant="secondary" iconStart="star" onClick={shortlist.onClick}>
          {shortlist.label}
        </Button>
        <Button variant="secondary" iconStart="shopping-bag" onClick={order.onClick}>
          {order.label}
        </Button>
        {scan ? (
          <Button variant="secondary" iconStart="camera" onClick={scan.onClick}>
            {scan.label}
          </Button>
        ) : null}
        {startOver ? (
          <Button variant="secondary" onClick={startOver.onClick}>
            {startOver.label}
          </Button>
        ) : null}
        <Button variant="secondary" iconStart="settings" onClick={onSettings}>
          {labels.settings}
        </Button>
      </div>
    </Dialog>
  );
}
