import * as React from 'react';
import type {AnalyticsEvent, AnalyticsEventName} from './analytics.js';

/** VendraProvider's `onEvent`, for the components below it. */
export declare const AnalyticsContext: React.Context<((event: AnalyticsEvent) => void) | null>;
/** Reports an event from the contract to VendraProvider's `onEvent`, if there is one. */
export declare function useTrack(): (
  name: AnalyticsEventName,
  params?: Record<string, unknown>
) => void;
