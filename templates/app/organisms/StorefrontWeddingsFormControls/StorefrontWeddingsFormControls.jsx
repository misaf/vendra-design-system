import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontWeddingsFormControls({
  problems,
  name,
  email,
  phone,
  event,
  guests,
  date,
  budget,
  message,
  send
}) {
  return (
    <DS.Card padding={24}>
      <div className="tw:flex tw:flex-col tw:gap-4">
        <DS.ErrorSummary id="vf-wedding-errors" errors={problems} />
        <div className="vf-weddings-fields tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
          <DS.Input
            id="vf-wname"
            required={true}
            label={name.label}
            autoComplete="name"
            value={name.value}
            onChange={name.onChange}
            error={name.error}
          />
          <DS.Input
            label={email.label}
            value={email.value}
            onChange={email.onChange}
            type="email"
            dir="ltr"
            autoComplete="email"
          />
          <DS.PhoneInput
            id="vf-wphone"
            required={true}
            label={phone.label}
            value={phone.value}
            onChange={phone.onChange}
            error={phone.error}
          />
        </div>
        <div className="vf-weddings-fields tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
          <DS.Select
            id="vf-wtype"
            value={event.value}
            onChange={event.onChange}
            label={event.label}
            options={event.options}
          />
        </div>
        <DS.Input
          label={guests.label}
          inputMode="numeric"
          value={guests.value}
          onChange={guests.onChange}
        />
        <DS.DatePicker
          label={date.label}
          value={date.value}
          onChange={date.onChange}
          lang={date.lang}
          minDate={date.minDate}
        />
        <DS.Select
          id="vf-wbudget"
          value={budget.value}
          onChange={budget.onChange}
          label={budget.label}
          options={budget.options}
        />
        <DS.Input
          id="vf-wmsg"
          value={message.value}
          onChange={message.onChange}
          label={message.label}
          hint={message.hint}
          multiline={true}
          rows={4}
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
    </DS.Card>
  );
}
