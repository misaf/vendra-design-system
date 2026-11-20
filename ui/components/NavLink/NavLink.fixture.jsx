import React from 'react';
import {NavLink} from './NavLink.jsx';

export function Fixture() {
  const [opened, setOpened] = React.useState('');
  return (
    <nav aria-label="Site">
      <NavLink href="#shop" current>
        Shop
      </NavLink>
      <NavLink href="#journal">Journal</NavLink>
      <NavLink variant="menu" onClick={() => setOpened('weddings')}>
        Weddings
      </NavLink>
      <output data-test="opened">{opened}</output>
    </nav>
  );
}
