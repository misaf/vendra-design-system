import type {AnalyticsEvent} from '../utils/analytics.js';
import type {Messages} from '../utils/messages.js';

export interface VendraProviderProps {
  /** BCP 47 locale, e.g. "en-US" or "fa-IR". Its language picks the built-in wording; React Aria
   * uses the whole locale for number/date formats and keyboard direction. Defaults to the browser's. */
  locale?: string;
  /** Extra or changed wording, by language then component, e.g. {fa: {Dialog: {close: 'بستن پنجره'}}}. Missing entries fall back to the built-in catalog, then English. */
  messages?: Messages;
  /** The app router's navigation (e.g. Next.js `router.push`): links in the components (Button href, NavLink, ProductCard, BottomTabBar, …) then navigate client-side instead of reloading. */
  navigate?: (path: string, routerOptions?: unknown) => void;
  /** Turns a route into the href written on the link, e.g. adding a base path. */
  useHref?: (href: string) => string;
  /** Receives the analytics events the components report (FilterBar filter, PaymentStatus
   * payment_result, ResendCode code_resent, LanguageSwitch language_switch), already reduced to
   * their own parameters by `analytics.event`. Send them on to your backend after consent. A nested
   * VendraProvider without it keeps the outer one. */
  onEvent?: (event: AnalyticsEvent) => void;
  children?: React.ReactNode;
}
/** Language and router for every component below: React Aria's I18nProvider (and RouterProvider when `navigate` is set) plus the components' built-in wording. Props on a component still win. */
export declare function VendraProvider(props: VendraProviderProps): JSX.Element;
