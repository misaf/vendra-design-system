import React from 'react';
import {analytics} from './analytics.js';

// Where components report analytics events: VendraProvider's `onEvent`. Without one, nothing is
// reported.
export const AnalyticsContext = React.createContext(null);

// A component's way to report an event from the contract (analytics.EVENTS), with only that
// event's parameters. Call it from event handlers and effects, never while rendering.
export function useTrack() {
  const onEvent = React.useContext(AnalyticsContext);
  return React.useCallback(
    (name, params) => {
      if (!onEvent) return;
      const event = analytics.event(name, params);
      if (event) onEvent(event);
    },
    [onEvent]
  );
}
