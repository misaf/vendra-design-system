import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontAccountNotices({saveError}) {
  return <DS.Alert tone="danger" title={saveError} />;
}
