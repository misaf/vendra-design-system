// StorefrontContact: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <main id="main" tabIndex={-1} className="vf-info">
            <header className="vf-info-header tw:max-w-[680px] tw:flex tw:flex-col tw:gap-4 tw:mb-7">
              <div className="vf-info-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
                <>{v.t?.eb}</>
              </div>
              <h1>
                <>{v.t?.hA} </>
                <em className="vf-contact-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
                  <>{v.t?.hB}</>
                </em>
              </h1>
              <p className="vf-info-intro tw:m-0 tw:text-md tw:leading-body tw:text-secondary tw:text-pretty">
                <>{v.t?.hP}</>
              </p>
            </header>
            <div className="vf-info-columns vf-info-columns--contact tw:grid tw:[grid-template-columns:repeat(2,minmax(0,1fr))] tw:gap-7 tw:items-start">
              <div className="vf-contact-details tw:flex tw:flex-col tw:gap-4h">
                <DS.Card variant="sunken" padding={20}>
                  <DS.DetailList rows={v.rows} />
                </DS.Card>
                <div className="tw:flex tw:gap-3 tw:flex-wrap">
                  {v.waHref ? (
                    <DS.Button
                      variant="ghost"
                      iconStart="message-circle"
                      href={v.waHref}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <>{v.t?.wa}</>
                    </DS.Button>
                  ) : null}
                  <DS.Button variant="secondary" iconStart="phone" href={v.phoneHref}>
                    <>{v.t?.call}</>
                  </DS.Button>
                  {v.instagram ? (
                    <DS.IconButton
                      icon="instagram"
                      label={v.t?.instagram}
                      variant="secondary"
                      href={v.instagram?.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    />
                  ) : null}
                </div>
                {/* The map runs third-party code; if it fails, the address and directions still show. */}
                <DS.ErrorBoundary onError={v.placesView?.fail}>
                  {v.studioMap ? (
                    <>
                      <DS.PlacesMap
                        id="vf-contact-map"
                        label={v.t?.mapL}
                        places={v.placesView?.places}
                        height={300}
                        loadLeaflet={v.placesView?.load}
                        tiles={v.placesView?.tiles}
                        center={v.placesView?.center}
                        zoom={v.placesView?.zoom}
                        onFail={v.placesView?.fail}
                      />
                    </>
                  ) : null}
                </DS.ErrorBoundary>
                {v.hasDirections ? (
                  <>
                    <div>
                      <DS.Button
                        variant="secondary"
                        iconStart="map-pin"
                        href={v.directions}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <>{v.t?.directions}</>
                      </DS.Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="tw:flex tw:flex-col tw:gap-4">
                <h2>
                  <>{v.t?.fA}</>
                </h2>
                {v.notSent ? (
                  <>
                    <div className="tw:flex tw:flex-col tw:gap-4">
                      <DS.ErrorSummary id="vf-contact-errors" errors={v.problems} />
                      <DS.Input
                        id="vf-cname"
                        value={v.name}
                        onChange={v.setName}
                        label={v.t?.name}
                        autoComplete="name"
                      />
                      <DS.PhoneInput
                        id="vf-cphone"
                        value={v.phone}
                        onChange={v.setPhone}
                        label={v.t?.phone}
                        hint={v.phoneHint}
                        error={v.phoneErr}
                      />
                      <DS.Input
                        id="vf-cemail"
                        label={v.t?.emailLabel}
                        value={v.email}
                        onChange={v.setEmail}
                        error={v.emailErr}
                        type="email"
                        dir="ltr"
                        autoComplete="email"
                      />
                      <DS.Input
                        id="vf-cmsg"
                        required={true}
                        label={v.t?.msg}
                        multiline={true}
                        rows={5}
                        value={v.msg}
                        onChange={v.setMsg}
                        error={v.msgErr}
                      />
                      <div>
                        <DS.Button
                          variant="primary"
                          size="lg"
                          iconEnd="send"
                          onClick={v.send}
                          loading={v.busy}
                          disabled={v.busy}
                        >
                          <>{v.t?.send}</>
                        </DS.Button>
                      </div>
                    </div>
                  </>
                ) : null}
                {v.sent ? (
                  <>
                    <div
                      id="vf-contact-success"
                      tabIndex={-1}
                      role="region"
                      aria-label={v.t?.okT}
                      className="tw:flex tw:flex-col tw:gap-4"
                    >
                      <DS.Alert tone="success" title={v.t?.okT}>
                        <>{v.t?.okP}</>
                      </DS.Alert>
                      <div>
                        <DS.Button variant="secondary" onClick={v.editMessage}>
                          <>{v.t?.editMessage}</>
                        </DS.Button>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            {v.apiError ? (
              <>
                <DS.Alert tone="danger" title={v.apiError} />
              </>
            ) : null}
          </main>
        </>
      }
      sticky={<></>}
    />
  );
}
