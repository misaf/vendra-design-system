import React from 'react';
import {Input} from './Input.jsx';

export function Fixture() {
  const [note, setNote] = React.useState('');
  return (
    <div>
      <Input id="note" label="Note" hint="Optional" value={note} onChange={setNote} />
      <Input id="email" label="Email" error="Enter an email address" defaultValue="shirin@" />
      <Input id="message" label="Message" multiline rows={3} />
      <Input id="find" label="Find" iconStart="search" />
      <output data-test="note">{note}</output>
    </div>
  );
}
