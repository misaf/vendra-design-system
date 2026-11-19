import React from 'react';
import * as DS from '../../../../shell/ds.js';

export function StorefrontTrackOrderDetails({rows}) {
  return (
    <DS.Card variant="sunken" padding={20}>
      <DS.DetailList rows={rows} />
    </DS.Card>
  );
}
