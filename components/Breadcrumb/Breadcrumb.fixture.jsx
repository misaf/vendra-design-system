import React from 'react';
import {Breadcrumb} from './Breadcrumb.jsx';

export function Fixture() {
  const [opened, setOpened] = React.useState('');
  return (
    <div>
      <Breadcrumb
        items={[
          {label: 'Shop', href: '#shop'},
          {label: 'Flower boxes', href: '#boxes', onClick: () => setOpened('boxes')},
          {label: 'Ivory Morning box'}
        ]}
      />
      <output data-test="opened">{opened}</output>
    </div>
  );
}
