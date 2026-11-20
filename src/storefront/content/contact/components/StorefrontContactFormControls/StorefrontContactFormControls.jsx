import React from 'react';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';
import {ErrorSummary} from '../../../../../design-system/components/ErrorSummary/ErrorSummary.jsx';
import {Input} from '../../../../../design-system/components/Input/Input.jsx';
import {PhoneInput} from '../../../../../design-system/components/PhoneInput/PhoneInput.jsx';

export function StorefrontContactFormControls({problems, name, phone, email, message, send}) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      <ErrorSummary id="vf-contact-errors" errors={problems} data-vf-keep-focus />
      <Input
        id="vf-cname"
        value={name.value}
        onChange={name.onChange}
        error={name.error}
        label={name.label}
        autoComplete="name"
      />
      <PhoneInput
        id="vf-cphone"
        value={phone.value}
        onChange={phone.onChange}
        label={phone.label}
        hint={phone.hint}
        error={phone.error}
      />
      <Input
        id="vf-cemail"
        label={email.label}
        value={email.value}
        onChange={email.onChange}
        error={email.error}
        type="email"
        dir="ltr"
        autoComplete="email"
      />
      <Input
        id="vf-cmsg"
        required={true}
        label={message.label}
        multiline={true}
        rows={5}
        value={message.value}
        onChange={message.onChange}
        error={message.error}
      />
      <div>
        <Button
          variant="primary"
          size="lg"
          iconEnd="send"
          onClick={send.onClick}
          loading={send.busy}
          disabled={send.busy}
        >
          <>{send.label}</>
        </Button>
      </div>
    </div>
  );
}
