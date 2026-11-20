import React from 'react';
import {Button} from '../../../../../../ui/components/Button/Button.jsx';
import {Card} from '../../../../../../ui/components/Card/Card.jsx';
import {DetailList} from '../../../../../../ui/components/DetailList/DetailList.jsx';
import {ErrorBoundary} from '../../../../../../ui/components/ErrorBoundary/ErrorBoundary.jsx';
import {IconButton} from '../../../../../../ui/components/IconButton/IconButton.jsx';
import {PlacesMap} from '../../../../../../ui/components/PlacesMap/PlacesMap.jsx';

export function StorefrontContactDetails({rows, whatsapp, phone, instagram, map, directions}) {
  return (
    <>
      <Card variant="sunken" padding={20}>
        <DetailList
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
      </Card>
      <div className="tw:flex tw:gap-3 tw:flex-wrap">
        {whatsapp?.href ? (
          <Button
            variant="ghost"
            iconStart="message-circle"
            href={whatsapp?.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <>{whatsapp.label}</>
          </Button>
        ) : null}
        <Button variant="secondary" iconStart="phone" href={phone.href}>
          <>{phone.label}</>
        </Button>
        {instagram ? (
          <IconButton
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
      <ErrorBoundary onError={map.onFail}>
        {map.visible ? (
          <>
            <PlacesMap
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
      </ErrorBoundary>
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
                <Button
                  variant="secondary"
                  iconStart={index === 0 ? 'map-pin' : undefined}
                  href={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <>{link.label}</>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
