import React from 'react';
import {Input} from '../../../../../../components/ui/components/Input/Input.jsx';
import {LocationPicker} from '../../../../../../components/ui/patterns/organisms/LocationPicker/LocationPicker.jsx';
import {Select} from '../../../../../../components/ui/components/Select/Select.jsx';

export function StorefrontBagLocation({picker, zone, fallback, address}) {
  return (
    <>
      <div className="vf-bag-pin tw:flex tw:flex-col tw:gap-2">
        {picker.visible ? (
          <>
            <LocationPicker
              id="vf-map"
              data-vf-keep-focus
              label={picker.label}
              status={picker.status}
              error={picker.error}
              value={picker.value}
              onChange={picker.onChange}
              loadLeaflet={picker.loadLeaflet}
              tiles={picker.tiles}
              center={picker.center}
              zoom={picker.zoom}
              locateLabel={picker.locateLabel}
              onLocateError={picker.onLocateError}
              onReady={picker.onReady}
              onFail={picker.onFail}
            />
            <div className="vf-bag-zone tw:flex tw:flex-col tw:gap-1 tw:pt-2" role="status">
              <span className="ag-field__label">
                <>{zone.label}</>
              </span>
              {zone.text ? (
                <>
                  <span className="tw:text-md tw:font-medium">
                    <>{zone.text}</>
                  </span>
                </>
              ) : null}
              <span className="ag-field__hint">
                <>{zone.status}</>
              </span>
            </div>
          </>
        ) : null}
        {fallback.visible ? (
          <>
            <span className="ag-field__label">
              <>{picker.label}</>
            </span>
            <p className="ag-field__hint tw:m-0">
              <>{fallback.message}</>
            </p>
            <Select
              id="vf-zone"
              label={zone.label}
              hint={fallback.hint}
              value={fallback.value}
              options={fallback.options}
              onChange={fallback.onChange}
            />
          </>
        ) : null}
      </div>
      <Input
        id="vf-address"
        value={address.value}
        onChange={address.onChange}
        error={address.error}
        required={true}
        label={address.label}
        hint={address.hint}
        autoComplete="off"
      />
    </>
  );
}
