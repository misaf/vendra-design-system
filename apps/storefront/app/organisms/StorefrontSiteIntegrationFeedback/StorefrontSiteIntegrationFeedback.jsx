import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontSiteIntegrationFeedback({message}) {
  return <DS.Alert tone="danger" title={message} />;
}
