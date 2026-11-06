import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontProductBreadcrumbs({label, items}) {
  return <DS.Breadcrumb label={label} className="tw:mb-5h" items={items} />;
}
