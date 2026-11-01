// StorefrontContact: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {StorefrontContactLayout} from '../app/layouts/StorefrontContactLayout/StorefrontContactLayout.jsx';
import {StorefrontContactHeading} from '../app/organisms/StorefrontContactHeading/StorefrontContactHeading.jsx';
import {StorefrontContactDetails} from '../app/organisms/StorefrontContactDetails/StorefrontContactDetails.jsx';
import {StorefrontContactFormControls} from '../app/organisms/StorefrontContactFormControls/StorefrontContactFormControls.jsx';
import {StorefrontContactCompletion} from '../app/organisms/StorefrontContactCompletion/StorefrontContactCompletion.jsx';
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
                  <StorefrontContactFormControls
                    problems={v.problems}
                    name={{label: v.t?.name, value: v.name, onChange: v.setName}}
                    phone={{
                      label: v.t?.phone,
                      value: v.phone,
                      onChange: v.setPhone,
                      hint: v.phoneHint,
                      error: v.phoneErr
                    }}
                    email={{
                      label: v.t?.emailLabel,
                      value: v.email,
                      onChange: v.setEmail,
                      error: v.emailErr
                    }}
                    message={{
                      label: v.t?.msg,
                      value: v.msg,
                      onChange: v.setMsg,
                      error: v.msgErr
                    }}
                    send={{label: v.t?.send, onClick: v.send, busy: v.busy}}
                  />
                ) : null}
                {v.sent ? (
                  <StorefrontContactCompletion
                    title={v.t?.okT}
                    body={v.t?.okP}
                    edit={{label: v.t?.editMessage, onClick: v.editMessage}}
                  />
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
