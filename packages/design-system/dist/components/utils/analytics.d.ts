export type AnalyticsEventName =
  | 'view_item'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'view_cart'
  | 'begin_checkout'
  | 'add_payment_info'
  | 'payment_result'
  | 'purchase'
  | 'search'
  | 'filter'
  | 'add_to_wishlist'
  | 'reminder_created'
  | 'top_up'
  | 'login'
  | 'code_resent'
  | 'language_switch'
  | 'order_again'
  | 'contact_whatsapp'
  | 'generate_lead';

export interface AnalyticsItem {
  /** The product code, e.g. "VF-7K2M4Q" */
  item_id: string;
  item_name?: string;
  item_category?: string;
  price?: number;
  quantity?: number;
}

/** An event as the app hands it on: its name and only its own parameters. */
export interface AnalyticsEvent {
  event: AnalyticsEventName;
  language?: string;
  currency?: string;
  items?: AnalyticsItem[];
  [param: string]: unknown;
}

export interface Analytics {
  /** Every event: what it means and the parameters it keeps (besides language and currency). */
  EVENTS: Record<AnalyticsEventName, {about: string; params: string[]}>;
  ITEM_KEYS: string[];
  /** The event with only its own parameters (items reduced to ITEM_KEYS; a search term that looks
   * like a phone number or email replaced), or null for an unknown name. Keys left out go into `dropped`. */
  event(
    name: AnalyticsEventName,
    params?: Record<string, unknown>,
    dropped?: string[]
  ): AnalyticsEvent | null;
}
/** The storefront events every tenant reports, in one shape. Sends nothing itself. */
export declare const analytics: Analytics;
