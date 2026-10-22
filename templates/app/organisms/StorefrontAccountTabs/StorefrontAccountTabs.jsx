import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontAccountTabs({items, value, onChange, label, children}) {
  return (
    <DS.Tabs
      variant="pill"
      items={items}
      value={value}
      onChange={onChange}
      label={label}
      listClassName="vf-account-tabs tw:mb-6 tw:overflow-x-auto tw:[scrollbar-width:none]"
      panelClassName="vf-account-panel"
    >
      {children}
    </DS.Tabs>
  );
}
