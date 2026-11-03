import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontSiteCheckoutNotice({title, actionLabel, actionHref, onDismiss}) {
  return (
    <DS.Alert
      tone="info"
      title={title}
      onClose={onDismiss}
      action={
        <DS.Button variant="secondary" href={actionHref}>
          {actionLabel}
        </DS.Button>
      }
    />
  );
}
