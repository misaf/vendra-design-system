import React from 'react';
import {PhoneInput} from './PhoneInput.jsx';

export function Fixture() {
  const [phone, setPhone] = React.useState('');
  const [parsed, setParsed] = React.useState({number: '', mobile: false});
  return (
    <div>
      <PhoneInput
        id="phone"
        label="Phone"
        value={phone}
        onChange={(typed, number) => {
          setPhone(typed);
          setParsed(number);
        }}
      />
      <output data-test="phone">{parsed.number + (parsed.mobile ? ' mobile' : '')}</output>
    </div>
  );
}
