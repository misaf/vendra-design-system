import React from 'react';
import {BottomTabBar} from './BottomTabBar.jsx';

export function Fixture() {
  const [opened, setOpened] = React.useState('');
  return (
    <div>
      <BottomTabBar
        label="Main"
        items={[
          {id: 'home', icon: 'house', label: 'Home', href: '#home', current: true},
          {id: 'shop', icon: 'flower-2', label: 'Shop', href: '#shop'},
          {id: 'menu', icon: 'menu', label: 'Menu', onClick: () => setOpened('menu')},
          {id: 'bag', icon: 'shopping-bag', label: 'Bag', href: '#bag', count: 2}
        ]}
      />
      <output data-test="opened">{opened}</output>
    </div>
  );
}
