import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontContactDetails({rows, whatsapp, phone, instagram, map, directions}) {
  return (
    <>
      <DS.Card variant="sunken" padding={20}>
        <DS.DetailList rows={rows} />
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
      {directions ? (
        <>
          <div>
            <DS.Button
              variant="secondary"
              iconStart="map-pin"
              href={directions.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <>{directions.label}</>
            </DS.Button>
          </div>
        </>
      ) : null}
    </>
  );
}
