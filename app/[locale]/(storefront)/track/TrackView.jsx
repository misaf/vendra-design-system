// StorefrontTrack: the page inside the storefront shell.
import React from 'react';
import {Alert} from '../../../../ui/components/Alert/Alert.jsx';
import {StorefrontTrackLayout} from './_components/StorefrontTrackLayout/StorefrontTrackLayout.jsx';
import {StorefrontPageHeading} from '../../../../components/storefront/StorefrontPageHeading/StorefrontPageHeading.jsx';
import {StorefrontTrackLookup} from './_components/StorefrontTrackLookup/StorefrontTrackLookup.jsx';
import {StorefrontTrackProgress} from './_components/StorefrontTrackProgress/StorefrontTrackProgress.jsx';
import {StorefrontTrackDeliveryPhoto} from './_components/StorefrontTrackDeliveryPhoto/StorefrontTrackDeliveryPhoto.jsx';
import {StorefrontTrackOrderDetails} from './_components/StorefrontTrackOrderDetails/StorefrontTrackOrderDetails.jsx';
import {StorefrontTrackOrderActions} from './_components/StorefrontTrackOrderActions/StorefrontTrackOrderActions.jsx';
import {StorefrontOrderSummaryCard} from '../../../../components/storefront/StorefrontOrderSummaryCard/StorefrontOrderSummaryCard.jsx';
import {StorefrontTrackReorderDialog} from './_components/StorefrontTrackReorderDialog/StorefrontTrackReorderDialog.jsx';
import {Shell} from '../../../../components/storefront/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontTrackLayout
          showOrder={v.hasOrder}
          lookup={
            v.noOrder ? (
              <StorefrontTrackLookup
                heading={{
                  title: v.t?.lookup?.titleA,
                  accent: v.t?.lookup?.titleB,
                  intro: v.t?.lookup?.intro
                }}
                failure={{visible: v.lookupFailed, message: v.t?.lookup?.failed}}
                orderId={{
                  label: v.t?.lookup?.id,
                  hint: v.t?.lookup?.idHint,
                  value: v.lookupId,
                  onChange: v.setLookupId,
                  error: v.lookupIdError
                }}
                phone={{
                  label: v.t?.lookup?.phone,
                  value: v.lookupPhone,
                  onChange: v.setLookupPhone,
                  error: v.lookupPhoneError
                }}
                onSubmit={v.findOrder}
                submitLabel={v.t?.lookup?.submit}
                browse={{href: v.href?.shop, label: v.t?.browse}}
              />
            ) : null
          }
          heading={
            v.hasOrder ? (
              <>
                <StorefrontPageHeading
                  eyebrow={v.t?.orderNo}
                  title={v.titleA}
                  accent={v.titleB}
                  intro={v.statusP}
                />
                {v.pending ? (
                  <div className="tw:max-w-measure">
                    <Alert tone="neutral" icon="clock" title={v.pendingTitle}>
                      {v.pendingBody}
                    </Alert>
                  </div>
                ) : null}
              </>
            ) : null
          }
          details={
            v.hasOrder ? (
              <>
                <StorefrontTrackProgress
                  steps={v.steps}
                  current={v.current}
                  status={v.tlStatus}
                  label={v.t?.progress}
                  doneLabel={v.t?.doneL}
                />
                {v.delivered ? (
                  <StorefrontTrackDeliveryPhoto
                    src={v.photo}
                    placeholderLabel={v.t?.photoPh}
                    alt={v.t?.photoAlt}
                    caption={v.t?.photoCap}
                  />
                ) : null}
                <StorefrontTrackOrderDetails rows={v.rows} />
                <StorefrontTrackOrderActions
                  contact={v.waHref ? {href: v.waHref, label: v.t?.ask} : null}
                  repeat={
                    v.showSummary
                      ? {
                          href: v.reorder ? undefined : v.href?.bag,
                          onClick: v.reorder,
                          label: v.t?.again
                        }
                      : null
                  }
                  lookup={{onClick: v.trackAnother, label: v.t?.lookup?.another}}
                />
              </>
            ) : null
          }
          summary={
            v.hasOrder && v.showSummary ? (
              <StorefrontOrderSummaryCard title={v.t?.summary} lines={v.lines} sums={v.sums} />
            ) : null
          }
          feedback={
            <StorefrontTrackReorderDialog
              open={v.reorderOpen}
              onClose={v.closeReorder}
              title={v.t.reorderTitle}
              cancelLabel={v.t.reorderCancel}
              confirm={{
                disabled: v.reorderEmpty,
                onClick: v.confirmReorder,
                label: v.reorderMode === 'add' ? v.t.reorderAdd : v.t.reorderReplace
              }}
              choice={{
                visible: v.hasBag,
                legend: v.t.reorderChoose,
                value: v.reorderMode,
                onChange: v.setReorderMode,
                add: {label: v.t.reorderAdd, description: v.t.reorderAddHint},
                replace: {label: v.t.reorderReplace, description: v.t.reorderReplaceHint}
              }}
              intro={v.t.reorderIntro}
              changes={v.reorderChanges}
              empty={{visible: v.reorderEmpty, message: v.t.reorderNone}}
            />
          }
        />
      }
      sticky={<></>}
    />
  );
}
