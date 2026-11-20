import React from 'react';
import {Button} from '../../../../../../components/ui/components/Button/Button.jsx';
import {Card} from '../../../../../../components/ui/patterns/atoms/Card/Card.jsx';
import {DatePicker} from '../../../../../../components/ui/components/DatePicker/DatePicker.jsx';
import {ErrorSummary} from '../../../../../../components/ui/patterns/molecules/ErrorSummary/ErrorSummary.jsx';
import {Input} from '../../../../../../components/ui/components/Input/Input.jsx';
import {PhoneInput} from '../../../../../../components/ui/patterns/atoms/PhoneInput/PhoneInput.jsx';
import {Select} from '../../../../../../components/ui/components/Select/Select.jsx';

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
    <Card padding={24}>
      <div className="tw:flex tw:flex-col tw:gap-4">
        <ErrorSummary id="vf-wedding-errors" errors={problems} data-vf-keep-focus />
        <div className="vf-weddings-fields tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
          <Input
            id="vf-wname"
            required={true}
            label={name.label}
            autoComplete="name"
            value={name.value}
            onChange={name.onChange}
            error={name.error}
          />
          <Input
            id="vf-wemail"
            label={email.label}
            error={email.error}
            value={email.value}
            onChange={email.onChange}
            type="email"
            dir="ltr"
            autoComplete="email"
          />
          <PhoneInput
            id="vf-wphone"
            required={true}
            label={phone.label}
            value={phone.value}
            onChange={phone.onChange}
            error={phone.error}
          />
        </div>
        <div className="vf-weddings-fields tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
          <Select
            id="vf-wtype"
            value={event.value}
            onChange={event.onChange}
            label={event.label}
            options={event.options}
          />
        </div>
        <Input
          label={guests.label}
          inputMode="numeric"
          value={guests.value}
          onChange={guests.onChange}
        />
        <DatePicker
          label={date.label}
          value={date.value}
          onChange={date.onChange}
          lang={date.lang}
          minDate={date.minDate}
        />
        <Select
          id="vf-wbudget"
          value={budget.value}
          onChange={budget.onChange}
          label={budget.label}
          options={budget.options}
        />
        <Input
          id="vf-wmsg"
          value={message.value}
          onChange={message.onChange}
          label={message.label}
          error={message.error}
          hint={message.hint}
          multiline={true}
          rows={4}
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
    </Card>
  );
}
