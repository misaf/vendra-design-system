import React from 'react';
import {Tabs} from './Tabs.jsx';

const ITEMS = [
  {id: 'orders', label: 'Orders'},
  {id: 'addresses', label: 'Addresses'},
  {id: 'profile', label: 'Profile'}
];

export function Fixture() {
  const [tab, setTab] = React.useState('orders');
  return (
    <div>
      <Tabs items={ITEMS} value={tab} onChange={setTab} label="Account">
        {tab} panel
      </Tabs>
    </div>
  );
}
