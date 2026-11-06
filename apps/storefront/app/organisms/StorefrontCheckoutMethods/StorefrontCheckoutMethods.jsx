import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontCheckoutMethods({intro, methods, unavailable, wallet, notice}) {
  return (
    <>
      <p className="vf-checkout-intro tw:text-secondary tw:m-0 tw:max-w-measure tw:text-md tw:leading-body tw:text-pretty">
        <>{intro}</>
      </p>
      {methods.visible ? (
        <>
          <DS.RadioGroup
            className="vf-checkout-methods"
            legend={methods.label}
            name="vf-pay-method"
            value={methods.value}
            onChange={methods.onChange}
          >
            {methods.options.map((o, $index) => (
              <React.Fragment key={$index}>
                <DS.Radio
                  value={o?.value}
                  label={o?.label}
                  description={o?.description}
                  disabled={o?.disabled}
                />
              </React.Fragment>
            ))}
          </DS.RadioGroup>
        </>
      ) : null}
      {unavailable.visible ? (
        <>
          <DS.Alert
            tone="warning"
            title={unavailable.label}
            action={
              <DS.Button size="sm" variant="secondary" iconStart="phone" href={unavailable.href}>
                <>{unavailable.phoneLabel}</>
              </DS.Button>
            }
          />
        </>
      ) : null}
      {wallet.hint ? (
        <>
          <p className="vf-checkout-wallet-hint tw:m-0 tw:text-sm">
            <>{wallet.hint}</>
          </p>
        </>
      ) : null}
      {wallet.showTopUp ? (
        <>
          <div>
            <DS.Button variant="secondary" size="sm" iconStart="banknote" href={wallet.topUpHref}>
              <>{wallet.topUpLabel}</>
            </DS.Button>
          </div>
        </>
      ) : null}
      {wallet.selected ? (
        <>
          <p className="vf-checkout-wallet-after tw:m-0 tw:text-sm tw:font-medium">
            <>{wallet.after}</>
          </p>
        </>
      ) : null}
      <p className="tw:text-sm tw:text-quiet">
        <>{notice}</>
      </p>
    </>
  );
}
