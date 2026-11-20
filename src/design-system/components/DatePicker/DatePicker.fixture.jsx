import React from 'react';
import {DatePicker} from './DatePicker.jsx';

export function Fixture({lang}) {
  const [day, setDay] = React.useState('2026-10-08');
  return (
    <div>
      <DatePicker
        id="when"
        lang={lang}
        label="Delivery"
        value={day}
        onChange={setDay}
        minDate="2026-10-05"
        years={2}
      />
      <output data-test="date">{day}</output>
    </div>
  );
}
