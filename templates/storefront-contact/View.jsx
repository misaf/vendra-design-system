// StorefrontContact: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {StorefrontContactLayout} from '../app/layouts/StorefrontContactLayout/StorefrontContactLayout.jsx';
import {StorefrontContactHeading} from '../app/organisms/StorefrontContactHeading/StorefrontContactHeading.jsx';
import {StorefrontContactDetails} from '../app/organisms/StorefrontContactDetails/StorefrontContactDetails.jsx';
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
              <StorefrontContactDetails
                rows={v.rows}
                whatsapp={v.waHref ? {label: v.t?.wa, href: v.waHref} : null}
                phone={{label: v.t?.call, href: v.phoneHref}}
                instagram={v.instagram ? {label: v.t?.instagram, href: v.instagram?.url} : null}
                map={{
                  visible: v.studioMap,
                  label: v.t?.mapL,
                  places: v.placesView?.places,
                  loadLeaflet: v.placesView?.load,
                  tiles: v.placesView?.tiles,
                  center: v.placesView?.center,
                  zoom: v.placesView?.zoom,
                  onFail: v.placesView?.fail
                }}
                directions={v.hasDirections ? {label: v.t?.directions, href: v.directions} : null}
              />
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
