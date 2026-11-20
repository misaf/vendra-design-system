// StorefrontContact: the page inside the storefront shell.
import React from 'react';
import {Alert} from '../../../../ui/components/Alert/Alert.jsx';
import {StorefrontContactLayout} from './_components/StorefrontContactLayout/StorefrontContactLayout.jsx';
import {StorefrontPageHeading} from '../../../../components/storefront/StorefrontPageHeading/StorefrontPageHeading.jsx';
import {StorefrontContactDetails} from './_components/StorefrontContactDetails/StorefrontContactDetails.jsx';
import {StorefrontContactFormControls} from './_components/StorefrontContactFormControls/StorefrontContactFormControls.jsx';
import {StorefrontContactCompletion} from './_components/StorefrontContactCompletion/StorefrontContactCompletion.jsx';
import {Shell} from '../../../../components/storefront/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontContactLayout
          heading={
            <StorefrontPageHeading
              variant="info"
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
              directions={v.hasDirections ? {label: v.t?.directions, links: v.directions} : null}
            />
          }
          form={
            <>
              <h2>{v.t?.fA}</h2>
              {v.notSent ? (
                <StorefrontContactFormControls
                  problems={v.problems}
                  name={{label: v.t?.name, value: v.name, onChange: v.setName, error: v.nameErr}}
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
              <div id="vf-contact-api-error" tabIndex={-1} data-vf-keep-focus>
                <Alert tone="danger" title={v.apiError} />
              </div>
            ) : null
          }
        />
      }
      sticky={<></>}
    />
  );
}
