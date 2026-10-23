// StorefrontTrack: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {StorefrontTrackLayout} from '../app/layouts/StorefrontTrackLayout/StorefrontTrackLayout.jsx';
import {StorefrontTrackHeading} from '../app/organisms/StorefrontTrackHeading/StorefrontTrackHeading.jsx';
import {StorefrontTrackLookup} from '../app/organisms/StorefrontTrackLookup/StorefrontTrackLookup.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontTrackLayout
            showOrder={v.hasOrder}
            lookup={
              v.noOrder ? (
                <>
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
                </>
              ) : null
            }
            heading={
              v.hasOrder ? (
                <>
                  <StorefrontTrackHeading
                    eyebrow={v.t?.orderNo}
                    title={v.titleA}
                    accent={v.titleB}
                    intro={v.statusP}
                  />
                  {v.pending ? (
                    <>
                      <div className="tw:max-w-measure">
                        <DS.Alert tone="neutral" icon="clock" title={v.pendingTitle}>
                          <>{v.pendingBody}</>
                        </DS.Alert>
                      </div>
                    </>
                  ) : null}
                </>
              ) : null
            }
            details={
              v.hasOrder ? (
                <>
                  <DS.Card padding={24}>
                    <DS.OrderTimeline
                      steps={v.steps}
                      current={v.current}
                      status={v.tlStatus}
                      label={v.t?.progress}
                      doneLabel={v.t?.doneL}
                    />
                  </DS.Card>
                  {v.delivered ? (
                    <>
                      <figure className="vf-track-photo tw:m-0 tw:flex tw:flex-col tw:gap-3">
                        <div className="vf-track-photo-frame tw:max-w-media">
                          <DS.ArchFrame
                            src={v.photo}
                            ratio="4/5"
                            shape="soft"
                            tone="product"
                            placeholderLabel={v.t?.photoPh}
                            alt={v.t?.photoAlt}
                          />
                        </div>
                        <figcaption className="vf-track-photo-caption tw:text-sm tw:text-quiet">
                          <>{v.t?.photoCap}</>
                        </figcaption>
                      </figure>
                    </>
                  ) : null}
                  <DS.Card variant="sunken" padding={20}>
                    <DS.DetailList rows={v.rows} />
                  </DS.Card>
                  <div className="tw:flex tw:gap-3 tw:flex-wrap">
                    {v.waHref ? (
                      <DS.Button
                        variant="primary"
                        iconStart="message-circle"
                        href={v.waHref}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <>{v.t?.ask}</>
                      </DS.Button>
                    ) : null}
                    <DS.Button
                      variant="secondary"
                      iconStart="rotate-ccw"
                      href={v.href?.bag}
                      onClick={v.reorder}
                    >
                      <>{v.t?.again}</>
                    </DS.Button>
                    <DS.Button variant="ghost" iconStart="package-search" onClick={v.trackAnother}>
                      <>{v.t?.lookup?.another}</>
                    </DS.Button>
                  </div>
                </>
              ) : null
            }
            summary={
              v.hasOrder ? (
                <>
                  <DS.Card padding={20}>
                    <DS.OrderSummary title={v.t?.summary} lines={v.lines} sums={v.sums} />
                  </DS.Card>
                </>
              ) : null
            }
            feedback={
              <DS.Dialog
                open={v.reorderOpen}
                onClose={v.closeReorder}
                title={v.t.reorderTitle}
                footer={
                  <>
                    <DS.Button variant="ghost" onClick={v.closeReorder}>
                      {v.t.reorderCancel}
                    </DS.Button>
                    <DS.Button disabled={v.reorderEmpty} onClick={v.confirmReorder}>
                      {v.reorderMode === 'add' ? v.t.reorderAdd : v.t.reorderReplace}
                    </DS.Button>
                  </>
                }
              >
                {v.hasBag ? (
                  <DS.RadioGroup
                    legend={v.t.reorderChoose}
                    value={v.reorderMode}
                    onChange={v.setReorderMode}
                  >
                    <DS.Radio value="add" label={v.t.reorderAdd} description={v.t.reorderAddHint} />
                    <DS.Radio
                      value="replace"
                      label={v.t.reorderReplace}
                      description={v.t.reorderReplaceHint}
                    />
                  </DS.RadioGroup>
                ) : (
                  <p>{v.t.reorderIntro}</p>
                )}
                {v.reorderChanges.length > 0 && (
                  <DS.Alert tone="warning">
                    <ul>
                      {v.reorderChanges.map((message, index) => (
                        <li key={index}>{message}</li>
                      ))}
                    </ul>
                  </DS.Alert>
                )}
                {v.reorderEmpty && <p>{v.t.reorderNone}</p>}
              </DS.Dialog>
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
