import React from 'react';
import {Alert} from '../../../../../design-system/components/Alert/Alert.jsx';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';
import {Input} from '../../../../../design-system/components/Input/Input.jsx';
import {PhoneInput} from '../../../../../design-system/components/PhoneInput/PhoneInput.jsx';
import {StorefrontPageHeading} from '../../../../shell/components/StorefrontPageHeading/StorefrontPageHeading';

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
      <StorefrontPageHeading
        variant="info"
        title={heading.title}
        accent={heading.accent}
        intro={heading.intro}
      />
      {failure.visible ? (
        <>
          <div id="vf-lookup-failed" tabIndex={-1}>
            <Alert tone="warning">
              <>{failure.message}</>
            </Alert>
          </div>
        </>
      ) : null}
      <Input
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
      <PhoneInput
        id="vf-lookup-phone"
        label={phone.label}
        value={phone.value}
        onChange={phone.onChange}
        error={phone.error}
        required={true}
        placeholder="0912 000 0000"
      />
      <Button variant="primary" size="lg" block={true} type="submit" iconStart="package-search">
        <>{submitLabel}</>
      </Button>
      <Button variant="ghost" href={browse.href}>
        <>{browse.label}</>
      </Button>
    </form>
  );
}
