// StorefrontContact: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {StorefrontContactLayout} from '../app/layouts/StorefrontContactLayout/StorefrontContactLayout.jsx';
import {StorefrontContactHeading} from '../app/organisms/StorefrontContactHeading/StorefrontContactHeading.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontContactLayout
            heading={
              <StorefrontContactHeading
                eyebrow={v.t?.eb}
                title={v.t?.hA}
                accent={v.t?.hB}
                intro={v.t?.hP}
              />
            }
            details={
              <>
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
              </>
            }
            form={
              <>
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
              </>
            }
            feedback={
              v.apiError ? (
                <>
                  <DS.Alert tone="danger" title={v.apiError} />
                </>
              ) : null
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
