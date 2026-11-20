import React from 'react';
import {Alert} from '../../../../../../ui/components/Alert/Alert.jsx';
import {Button} from '../../../../../../ui/components/Button/Button.jsx';
import {Radio} from '../../../../../../ui/components/Radio/Radio.jsx';
import {RadioGroup} from '../../../../../../ui/components/RadioGroup/RadioGroup.jsx';

export function StorefrontCheckoutMethods({intro, methods, unavailable, wallet, notice}) {
  return (
    <>
      <p className="vf-checkout-intro tw:text-secondary tw:m-0 tw:max-w-measure tw:text-md tw:leading-body tw:text-pretty">
        <>{intro}</>
      </p>
      {methods.visible ? (
        <>
          <RadioGroup
            className="vf-checkout-methods"
            legend={methods.label}
            name="vf-pay-method"
            value={methods.value}
            onChange={methods.onChange}
          >
            {methods.options.map((o, $index) => (
              <React.Fragment key={$index}>
                <Radio
                  value={o?.value}
                  label={o?.label}
                  description={o?.description}
                  disabled={o?.disabled}
                />
              </React.Fragment>
            ))}
          </RadioGroup>
        </>
      ) : null}
      {unavailable.visible ? (
        <>
          <Alert
            tone="warning"
            title={unavailable.label}
            action={
              <Button size="sm" variant="secondary" iconStart="phone" href={unavailable.href}>
                <>{unavailable.phoneLabel}</>
              </Button>
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
            <Button variant="secondary" size="sm" iconStart="banknote" href={wallet.topUpHref}>
              <>{wallet.topUpLabel}</>
            </Button>
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
