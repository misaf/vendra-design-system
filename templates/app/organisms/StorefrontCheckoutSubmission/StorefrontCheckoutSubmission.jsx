import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontCheckoutSubmission({whatsapp, processing, failure, safe, place, back}) {
  return (
    <>
      {whatsapp.visible ? (
        <>
          <DS.Button
            variant="secondary"
            href={whatsapp.href}
            onClick={whatsapp.onClick}
            target="_blank"
            rel="noopener noreferrer"
          >
            <>{whatsapp.label}</>
          </DS.Button>
        </>
      ) : null}
      {place.loading ? (
        <>
          <p role="status">
            <>{processing}</>
          </p>
        </>
      ) : null}
      {failure.visible ? (
        <>
          <DS.Alert tone="danger" title={failure.title}>
            <>{failure.body}</>
          </DS.Alert>
          <div className="tw:flex tw:gap-3">
            <DS.Button onClick={failure.retry.onClick}>
              <>{failure.retry.label}</>
            </DS.Button>
            <DS.Button variant="ghost" onClick={failure.other.onClick}>
              <>{failure.other.label}</>
            </DS.Button>
          </div>
        </>
      ) : null}
      <DS.Alert tone="neutral" icon="shield-check">
        <>{safe}</>
      </DS.Alert>
      <div className="tw:flex tw:gap-3 tw:flex-wrap">
        <div className="tw:contents tw:max-md:hidden">
          <DS.Button
            variant="primary"
            size="lg"
            iconEnd="arrow-right"
            onClick={place.onClick}
            loading={place.loading}
            disabled={place.disabled}
          >
            <>{place.label}</>
          </DS.Button>
        </div>
        <DS.Button
          variant="ghost"
          size="lg"
          iconStart="arrow-left"
          href={back.href}
          onClick={back.onClick}
        >
          <>{back.label}</>
        </DS.Button>
      </div>
    </>
  );
}
