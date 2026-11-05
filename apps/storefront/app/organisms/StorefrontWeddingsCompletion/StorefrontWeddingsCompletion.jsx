import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontWeddingsCompletion({title, body, edit}) {
  return (
    <div
      id="vf-weddings-success"
      tabIndex={-1}
      role="region"
      aria-label={title}
      className="tw:flex tw:flex-col tw:gap-4"
    >
      <DS.Alert tone="success" title={title}>
        <>{body}</>
      </DS.Alert>
      <div>
        <DS.Button variant="secondary" onClick={edit.onClick}>
          <>{edit.label}</>
        </DS.Button>
      </div>
    </div>
  );
}
