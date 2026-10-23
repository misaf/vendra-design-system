import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontContactFormControls({problems, name, phone, email, message, send}) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      <DS.ErrorSummary id="vf-contact-errors" errors={problems} />
      <DS.Input
        id="vf-cname"
        value={name.value}
        onChange={name.onChange}
        label={name.label}
        autoComplete="name"
      />
      <DS.PhoneInput
        id="vf-cphone"
        value={phone.value}
        onChange={phone.onChange}
        label={phone.label}
        hint={phone.hint}
        error={phone.error}
      />
      <DS.Input
        id="vf-cemail"
        label={email.label}
        value={email.value}
        onChange={email.onChange}
        error={email.error}
        type="email"
        dir="ltr"
        autoComplete="email"
      />
      <DS.Input
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
        <DS.Button
          variant="primary"
          size="lg"
          iconEnd="send"
          onClick={send.onClick}
          loading={send.busy}
          disabled={send.busy}
        >
          <>{send.label}</>
        </DS.Button>
      </div>
    </div>
  );
}
