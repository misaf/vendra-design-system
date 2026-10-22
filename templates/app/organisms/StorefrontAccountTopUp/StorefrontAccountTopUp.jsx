import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontAccountTopUp({title, quickLabel, presets, amount, payment, demo}) {
  return (
    <section
      aria-labelledby="vf-topup-title"
      className="tw:flex tw:flex-col tw:gap-4 tw:max-w-narrow"
    >
      <h2 id="vf-topup-title" className="tw:m-0 tw:text-xl">
        <>{title}</>
      </h2>
      <div role="group" aria-label={quickLabel} className="tw:flex tw:gap-2 tw:flex-wrap">
        {presets.map((v, $index) => (
          <React.Fragment key={$index}>
            <DS.Chip selected={v?.pressed} aria-pressed={v?.pressed} onClick={v?.pick}>
              <>{v?.label}</>
            </DS.Chip>
          </React.Fragment>
        ))}
      </div>
      <DS.Input
        id="vf-topup-amount"
        label={amount.label}
        value={amount.value}
        onChange={amount.onChange}
        hint={amount.hint}
        error={amount.error}
        inputMode="numeric"
        dir="ltr"
        autoComplete="off"
      />
      <div>
        <DS.Button
          variant="primary"
          iconStart="banknote"
          onClick={payment.onClick}
          loading={payment.busy}
          disabled={payment.busy}
        >
          <>{payment.label}</>
        </DS.Button>
      </div>
      {payment.busy ? (
        <>
          <p role="status" className="tw:m-0 tw:text-sm">
            <>{payment.processing}</>
          </p>
        </>
      ) : null}
      {payment.done ? (
        <>
          <p
            id="vf-topup-done"
            tabIndex={-1}
            role="status"
            className="tw:m-0 tw:text-sm tw:font-medium"
          >
            <>{payment.done}</>
          </p>
        </>
      ) : null}
      <p className="tw:m-0 tw:text-sm tw:text-quiet">
        <>{demo}</>
      </p>
    </section>
  );
}
