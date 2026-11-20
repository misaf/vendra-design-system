import React from 'react';
import {Input} from '../../../../../../ui/components/Input/Input.jsx';
import {LocationPicker} from '../../../../../../ui/components/LocationPicker/LocationPicker.jsx';
import {PhoneInput} from '../../../../../../ui/components/PhoneInput/PhoneInput.jsx';
import {Select} from '../../../../../../ui/components/Select/Select.jsx';

export function StorefrontAccountAddressEditor({label, zone, pin, address, recipient, phone}) {
  return (
    <>
      <Input
        id="vf-address-label"
        label={label.label}
        value={label.value}
        onChange={label.onChange}
      />
      <Select
        label={zone.label}
        value={zone.value}
        options={zone.options}
        onChange={zone.onChange}
      />
      <div className="vf-account-pin tw:flex tw:flex-col tw:gap-2">
        {pin.visible ? (
          <>
            <LocationPicker
              id="vf-address-map"
              compact={true}
              label={pin.label}
              status={pin.status}
              error={pin.error}
              value={pin.value}
              onChange={pin.onChange}
              loadLeaflet={pin.loadLeaflet}
              tiles={pin.tiles}
              center={pin.center}
              zoom={pin.zoom}
              locateLabel={pin.locateLabel}
              onLocateError={pin.onLocateError}
              onFail={pin.onFail}
            />
          </>
        ) : null}
        {pin.failed ? (
          <>
            <span className="ag-field__label">
              <>{pin.label}</>
            </span>
            <p className="ag-field__hint tw:m-0">
              <>{pin.failureText}</>
            </p>
          </>
        ) : null}
      </div>
      <Input
        id="vf-address-line"
        label={address.label}
        multiline={true}
        value={address.value}
        onChange={address.onChange}
        error={address.error}
        autoComplete="street-address"
      />
      <Input
        label={recipient.label}
        value={recipient.value}
        onChange={recipient.onChange}
        autoComplete="name"
      />
      <PhoneInput
        id="vf-address-phone"
        label={phone.label}
        value={phone.value}
        onChange={phone.onChange}
        error={phone.error}
      />
    </>
  );
}
