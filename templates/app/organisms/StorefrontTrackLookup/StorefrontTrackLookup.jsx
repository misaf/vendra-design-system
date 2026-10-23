import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontTrackLookup({
  heading,
  failure,
  orderId,
  phone,
  onSubmit,
  submitLabel,
  browse
}) {
  return (
    <form
      className="vf-track-lookup tw:flex tw:flex-col tw:gap-5 tw:max-w-form tw:mx-auto"
      onSubmit={onSubmit}
      noValidate
    >
      <h1>
        <>{heading.title} </>
        <em className="vf-track-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
          <>{heading.accent}</>
        </em>
      </h1>
      <p className="tw:text-secondary tw:m-0 tw:text-md tw:leading-body tw:text-pretty">
        <>{heading.intro}</>
      </p>
      {failure.visible ? (
        <>
          <div id="vf-lookup-failed" tabIndex={-1}>
            <DS.Alert tone="warning">
              <>{failure.message}</>
            </DS.Alert>
          </div>
        </>
      ) : null}
      <DS.Input
        id="vf-lookup-id"
        label={orderId.label}
        hint={orderId.hint}
        value={orderId.value}
        onChange={orderId.onChange}
        error={orderId.error}
        required={true}
        dir="ltr"
        autoComplete="off"
        autoCapitalize="characters"
      />
      <DS.PhoneInput
        id="vf-lookup-phone"
        label={phone.label}
        value={phone.value}
        onChange={phone.onChange}
        error={phone.error}
        required={true}
        placeholder="0912 000 0000"
      />
      <DS.Button variant="primary" size="lg" block={true} type="submit" iconStart="package-search">
        <>{submitLabel}</>
      </DS.Button>
      <DS.Button variant="ghost" href={browse.href}>
        <>{browse.label}</>
      </DS.Button>
    </form>
  );
}
