import React from 'react';
import {DatePicker} from '../../../../../../components/ui/components/DatePicker/DatePicker.jsx';
import {Input} from '../../../../../../components/ui/components/Input/Input.jsx';
import {Select} from '../../../../../../components/ui/components/Select/Select.jsx';

export function StorefrontAccountReminderEditor({name, occasion, date, before, channel}) {
  return (
    <>
      <Input
        id="vf-reminder-name"
        label={name.label}
        value={name.value}
        onChange={name.onChange}
        error={name.error}
      />
      <Select
        label={occasion.label}
        options={occasion.options}
        value={occasion.value}
        onChange={occasion.onChange}
      />
      <DatePicker
        id="vf-reminder-date"
        yearly={true}
        lang={date.lang}
        label={date.label}
        value={date.value}
        onChange={date.onChange}
        disabled={date.disabled}
        hint={date.hint}
        labels={date.labels}
      />
      <Select
        label={before.label}
        options={before.options}
        value={before.value}
        onChange={before.onChange}
      />
      <Select
        label={channel.label}
        options={channel.options}
        value={channel.value}
        onChange={channel.onChange}
      />
    </>
  );
}
