import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontContactDetails({rows, whatsapp, phone, instagram, map, directions}) {
  return (
    <>
      <DS.Card variant="sunken" padding={20}>
        <DS.DetailList
          rows={rows.map(({icon, label, value, status, details}) => ({
            icon,
            label,
            value:
              status || details?.length ? (
                <>
                  <span className="tw:block">{value}</span>
                  {status ? (
                    <span
                      className="vf-contact-status tw:block tw:font-medium"
                      data-open={status.open ? 'true' : 'false'}
                    >
                      <>{status.text}</>
                    </span>
                  ) : null}
                  {(details || []).map((detail, index) => (
                    <span key={index} className="tw:block tw:text-sm tw:text-secondary">
                      <>{detail}</>
                    </span>
                  ))}
                </>
              ) : (
                value
              )
          }))}
        />
      </DS.Card>
      <div className="tw:flex tw:gap-3 tw:flex-wrap">
        {whatsapp?.href ? (
          <DS.Button
            variant="ghost"
            iconStart="message-circle"
            href={whatsapp?.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <>{whatsapp.label}</>
          </DS.Button>
        ) : null}
        <DS.Button variant="secondary" iconStart="phone" href={phone.href}>
          <>{phone.label}</>
        </DS.Button>
        {instagram ? (
          <DS.IconButton
            icon="instagram"
            label={instagram.label}
            variant="secondary"
            href={instagram.href}
            rel="noopener noreferrer"
            target="_blank"
          />
        ) : null}
      </div>
      {/* The map runs third-party code; if it fails, the address and directions still show. */}
      <DS.ErrorBoundary onError={map.onFail}>
        {map.visible ? (
          <>
            <DS.PlacesMap
              id="vf-contact-map"
              label={map.label}
              places={map.places}
              height={300}
              loadLeaflet={map.loadLeaflet}
              tiles={map.tiles}
              center={map.center}
              zoom={map.zoom}
              onFail={map.onFail}
            />
          </>
        ) : null}
      </DS.ErrorBoundary>
      {directions?.links?.length ? (
        <div className="vf-contact-directions tw:flex tw:flex-col tw:gap-2">
          <span id="vf-contact-directions" className="tw:font-medium">
            <>{directions.label}</>
          </span>
          {/* Neshan, Balad and Google Maps, in the order the page's language prefers. */}
          <ul
            aria-labelledby="vf-contact-directions"
            className="tw:flex tw:flex-wrap tw:gap-3 tw:m-0 tw:p-0 tw:list-none"
          >
            {directions.links.map((link, index) => (
              <li key={link.app}>
                <DS.Button
                  variant="secondary"
                  iconStart={index === 0 ? 'map-pin' : undefined}
                  href={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <>{link.label}</>
                </DS.Button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
