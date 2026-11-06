import * as React from 'react';
export type Density = 'compact' | 'comfortable' | 'tv';

/** VendraProvider's `density`, for the overlays below it. */
export declare const DensityContext: React.Context<Density | undefined>;
/** The density set by the nearest VendraProvider, if any: overlays put it on their own root as `data-density`. */
export declare function useDensity(): Density | undefined;
