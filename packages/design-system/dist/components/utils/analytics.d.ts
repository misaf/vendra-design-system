export type AnalyticsEventName =
  | 'page_view'
  | 'view_item_list'
  | 'select_item'
  | 'view_item'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'view_cart'
  | 'add_shipping_info'
  | 'begin_checkout'
  | 'add_payment_info'
  | 'order_placed'
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
  /** The list the item was picked from, e.g. "saved" */
  item_list_name?: string;
  price?: number;
  quantity?: number;
  /** Position in a list (view_item_list, select_item), from 0 */
  index?: number;
}

/** An event as the app hands it on: its name and only its own parameters. */
export interface AnalyticsEvent {
  event: AnalyticsEventName;
  language?: string;
  /** An ISO 4217 code: Toman amounts are reported as Rial (IRR) */
  currency?: string;
  items?: AnalyticsItem[];
  [param: string]: unknown;
}

/** A tenant's currency table: units per 1 Toman, and the decimals it is written with. */
export type AnalyticsCurrencies = Record<string, {rate: number; decimals?: number}>;

export interface Analytics {
  /** Every event: what it means and the parameters it keeps (besides language and currency). */
  EVENTS: Record<AnalyticsEventName, {about: string; params: string[]}>;
  ITEM_KEYS: string[];
  /** The events whose `value` is an amount in Toman (turned into the report currency). */
  AMOUNT_EVENTS: AnalyticsEventName[];
  /** The ISO 4217 code reports use for `currency` (Toman, IRT, becomes Rial, IRR, 10 to the Toman),
   * and how to turn a Toman amount into it. A currency without a usable rate falls back to Rial. */
  reportCurrency(
    currency?: string,
    currencies?: AnalyticsCurrencies
  ): {code: string; amount(toman: number): number};
  /** The event's parameters with an ISO `currency` and its amounts (`value` for AMOUNT_EVENTS, each
   * item's `price`) turned from Toman into that currency. */
  inCurrency(
    name: AnalyticsEventName,
    params?: Record<string, unknown>,
    options?: {currency?: string; currencies?: AnalyticsCurrencies}
  ): Record<string, unknown>;
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
