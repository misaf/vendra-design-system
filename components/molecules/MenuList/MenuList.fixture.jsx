import React from 'react';
import {NavLink} from '../NavLink/NavLink.jsx';
import {MenuList} from './MenuList.jsx';

export function Fixture() {
  return (
    <div>
      <MenuList title="Explore">
        <NavLink variant="menu" href="#weddings">
          Weddings
        </NavLink>
        {null}
        <NavLink variant="menu" href="#journal">
          Journal
        </NavLink>
      </MenuList>
      <MenuList title={<em>Help</em>} label="Help pages">
        <NavLink variant="menu" href="#faq">
          FAQ
        </NavLink>
      </MenuList>
    </div>
  );
}
