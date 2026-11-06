import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontAccountAddresses({map, addresses, labels, add}) {
  return (
    <>
      {map.visible ? (
        <>
          <DS.PlacesMap
            id="vf-account-map"
            className="tw:mb-4"
            label={map.label}
            places={map.places}
            height={260}
            loadLeaflet={map.loadLeaflet}
            tiles={map.tiles}
            center={map.center}
            zoom={map.zoom}
            onFail={map.onFail}
          />
        </>
      ) : null}
      <div className="vf-account-addresses-grid tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]">
        {addresses.map((a, $index) => (
          <React.Fragment key={$index}>
            <DS.AddressCard
              label={a?.label}
              line={a?.line}
              recipient={a?.recipient}
              phone={a?.phone}
              zone={a?.zone}
              isDefault={a?.isDefault}
              onMakeDefault={a?.makeDefault}
              onEdit={a?.edit}
              onDelete={a?.remove}
              labels={labels}
            />
          </React.Fragment>
        ))}
        <button
          id="vf-add-address"
          type="button"
          onClick={add.onClick}
          className="vf-account-add-address tw:min-h-[180px] tw:[border:1.5px_dashed_var(--border-input)] tw:rounded-md tw:bg-transparent tw:text-body tw:[font-family:inherit] tw:[line-height:inherit] tw:text-base tw:flex tw:items-center tw:justify-center tw:gap-2 tw:cursor-pointer tw:hover:bg-sunken"
        >
          <>
            {'+ '}
            {add.label}
          </>
        </button>
      </div>
    </>
  );
}
