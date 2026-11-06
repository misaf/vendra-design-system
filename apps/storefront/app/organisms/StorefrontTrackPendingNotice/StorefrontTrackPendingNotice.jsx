import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontTrackPendingNotice({title, body}) {
  return (
    <div className="tw:max-w-measure">
      <DS.Alert tone="neutral" icon="clock" title={title}>
        <>{body}</>
      </DS.Alert>
    </div>
  );
}
