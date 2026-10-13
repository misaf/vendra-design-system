import React from 'react';
import {Alert} from '../Alert/Alert.jsx';
import {NavLink} from '../NavLink/NavLink.jsx';
import {VendraProvider} from './VendraProvider.jsx';

export function Fixture() {
  const [path, setPath] = React.useState('');
  return (
    <div>
      <VendraProvider navigate={setPath}>
        <NavLink href="/shop">Shop</NavLink>
      </VendraProvider>
      <output data-test="path">{path}</output>
      <VendraProvider locale="fa-IR" messages={{fa: {Alert: {close: 'بستن پیام'}}}}>
        <Alert onClose={() => {}}>پیام</Alert>
      </VendraProvider>
    </div>
  );
}
