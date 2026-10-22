import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontAccountReminderEditor({name, occasion, date, before, channel}) {
  return (
    <>
      <DS.Input
        id="vf-reminder-name"
        label={name.label}
        value={name.value}
        onChange={name.onChange}
        error={name.error}
      />
      <DS.Select
        label={occasion.label}
        options={occasion.options}
        value={occasion.value}
        onChange={occasion.onChange}
      />
      <DS.DatePicker
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
      <DS.Select
        label={before.label}
        options={before.options}
        value={before.value}
        onChange={before.onChange}
      />
      <DS.Select
        label={channel.label}
        options={channel.options}
        value={channel.value}
        onChange={channel.onChange}
      />
    </>
  );
}
