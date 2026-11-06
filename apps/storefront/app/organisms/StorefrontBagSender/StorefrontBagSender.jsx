import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontBagSender({labels, name, phone}) {
  return (
    <section
      className="vf-bag-delivery tw:flex tw:flex-col tw:gap-4h"
      aria-labelledby="vf-you-title"
    >
      <div className="tw:flex tw:flex-col tw:gap-1">
        <h2
          id="vf-you-title"
          className="vf-bag-delivery-title tw:m-0 tw:font-display tw:font-medium tw:text-xl! tw:leading-tight tw:tracking-display tw:[text-transform:var(--display-case)]"
        >
          <>{labels.title}</>
        </h2>
        <p className="ag-field__hint tw:m-0">
          <>{labels.hint}</>
        </p>
      </div>
      <div className="vf-bag-recipient-grid tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
        <DS.Input
          id="vf-sender"
          value={name.value}
          onChange={name.onChange}
          error={name.error}
          required={true}
          label={name.label}
          autoComplete="name"
        />
        <DS.PhoneInput
          id="vf-sender-phone"
          value={phone.value}
          onChange={phone.onChange}
          error={phone.error}
          required={true}
          label={phone.label}
          placeholder="0912 000 0000"
        />
      </div>
    </section>
  );
}
