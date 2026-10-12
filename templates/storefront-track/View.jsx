// StorefrontTrack: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <main id="main" tabIndex="-1" className="vf-form tw:mx-auto">
            {v.noOrder ? (
              <>
                <form
                  className="vf-track-lookup tw:flex tw:flex-col tw:gap-5 tw:max-w-[420px] tw:mx-auto"
                  onSubmit={v.findOrder}
                  noValidate=""
                >
                  <h1>
                    <>{v.t?.lookup?.titleA} </>
                    <em className="vf-track-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
                      <>{v.t?.lookup?.titleB}</>
                    </em>
                  </h1>
                  <p className="tw:text-secondary tw:m-0 tw:text-md tw:leading-body tw:text-pretty">
                    <>{v.t?.lookup?.intro}</>
                  </p>
                  {v.lookupFailed ? (
                    <>
                      <div id="vf-lookup-failed" tabIndex="-1">
                        <DS.Alert tone="warning">
                          <>{v.t?.lookup?.failed}</>
                        </DS.Alert>
                      </div>
                    </>
                  ) : null}
                  <DS.Input
                    id="vf-lookup-id"
                    label={v.t?.lookup?.id}
                    hint={v.t?.lookup?.idHint}
                    value={v.lookupId}
                    onChange={v.setLookupId}
                    error={v.lookupIdError}
                    required={true}
                    dir="ltr"
                    autoComplete="off"
                    autoCapitalize="characters"
                  />
                  <DS.PhoneInput
                    id="vf-lookup-phone"
                    label={v.t?.lookup?.phone}
                    value={v.lookupPhone}
                    onChange={v.setLookupPhone}
                    error={v.lookupPhoneError}
                    required={true}
                    placeholder="0912 000 0000"
                  />
                  <DS.Button
                    variant="primary"
                    size="lg"
                    block={true}
                    type="submit"
                    iconStart="package-search"
                  >
                    <>{v.t?.lookup?.submit}</>
                  </DS.Button>
                  <DS.Button variant="ghost" href={v.href?.shop} onClick={v.go?.shop}>
                    <>{v.t?.browse}</>
                  </DS.Button>
                </form>
              </>
            ) : null}
            {v.hasOrder ? (
              <>
                <div className="vf-track-header tw:flex tw:flex-col tw:gap-3 tw:mb-7">
                  <div className="vf-track-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
                    <>{v.t?.orderNo}</>
                  </div>
                  <h1>
                    <>{v.titleA} </>
                    <em className="vf-track-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
                      <>{v.titleB}</>
                    </em>
                  </h1>
                  <p className="vf-track-intro tw:text-secondary tw:m-0 tw:max-w-measure tw:text-md tw:leading-body tw:text-pretty">
                    <>{v.statusP}</>
                  </p>
                  {v.pending ? (
                    <>
                      <div className="tw:max-w-measure">
                        <DS.Alert tone="neutral" icon="clock" title={v.pendingTitle}>
                          <>{v.pendingBody}</>
                        </DS.Alert>
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="vf-track-columns tw:flex tw:flex-wrap tw:gap-7 tw:items-start">
                  <div className="vf-track-details tw:min-w-0 tw:flex tw:flex-col tw:gap-6 tw:[flex:999_1_440px]">
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
                          <div className="vf-track-photo-frame tw:max-w-[320px]">
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
                      <DS.Button
                        variant="primary"
                        iconStart="message-circle"
                        href={v.waHref}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <>{v.t?.ask}</>
                      </DS.Button>
                      <DS.Button
                        variant="secondary"
                        iconStart="rotate-ccw"
                        href={v.href?.bag}
                        onClick={v.reorder}
                      >
                        <>{v.t?.again}</>
                      </DS.Button>
                      <DS.Button
                        variant="ghost"
                        iconStart="package-search"
                        onClick={v.trackAnother}
                      >
                        <>{v.t?.lookup?.another}</>
                      </DS.Button>
                    </div>
                  </div>
                  <aside className="vf-track-summary tw:[flex:1_1_360px] tw:max-w-[440px] tw:sticky tw:top-9">
                    <DS.Card padding={20}>
                      <DS.OrderSummary title={v.t?.summary} lines={v.lines} sums={v.sums} />
                    </DS.Card>
                  </aside>
                </div>
              </>
            ) : null}
          </main>
        </>
      }
      sticky={<></>}
    />
  );
}
