import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontBagRecipient({title, saved, name, phone}) {
  return (
    <>
      <h2
        id="vf-recipient-title"
        className="vf-bag-delivery-title tw:m-0 tw:font-display tw:font-medium tw:text-xl! tw:leading-tight tw:tracking-display tw:[text-transform:var(--display-case)]"
      >
        <>{title}</>
      </h2>
      {saved.visible ? (
        <>
          <fieldset className="vf-bag-saved tw:[border:0] tw:p-0 tw:m-0 tw:min-w-0">
            <legend className="ag-field__label tw:p-0 tw:mb-2">
              <>{saved.label}</>
            </legend>
            <div className="tw:flex tw:flex-wrap tw:gap-2">
              {saved.options.map((a, $index) => (
                <React.Fragment key={$index}>
                  <DS.Chip selected={a?.on} onClick={a?.pick}>
                    <>{a?.label}</>
                  </DS.Chip>
                </React.Fragment>
              ))}
            </div>
          </fieldset>
        </>
      ) : null}
      <div className="vf-bag-recipient-grid tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
        <DS.Input
          id="vf-name"
          value={name.value}
          onChange={name.onChange}
          error={name.error}
          required={true}
          label={name.label}
          autoComplete="off"
        />
        <DS.PhoneInput
          id="vf-phone"
          value={phone.value}
          onChange={phone.onChange}
          error={phone.error}
          required={true}
          label={phone.label}
          autoComplete="off"
          placeholder="0912 000 0000"
        />
      </div>
    </>
  );
}
