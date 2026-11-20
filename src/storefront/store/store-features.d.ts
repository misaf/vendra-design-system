/** An optional part of the storefront a store turns on (STORE_FEATURES). */
export type StoreFeature =
  'promoCodes' | 'sameDay' | 'weddings' | 'journal' | 'reminders' | 'newsletter';

/** The optional features a store can turn on. */
export declare const STORE_FEATURES: StoreFeature[];

/** The store's feature list as one boolean per STORE_FEATURES id; unknown ids are dropped. */
export declare function storeFeatures(
  list: readonly string[] | null | undefined
): Record<StoreFeature, boolean>;
