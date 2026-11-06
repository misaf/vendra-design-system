import * as React from 'react';
/** A PaymentStatus state: its heading and the sentence under it ({gateway} is filled in). */
export interface PaymentStatusWords {
  title: string;
  body: string;
}
/** Built-in wording per component; {name} / {date} / {page} / {index} / {count} / {gateway} / {time} are filled in by the component. */
export interface ComponentMessages {
  Lightbox: {
    label: string;
    previous: string;
    next: string;
    close: string;
    position: string;
    photo: string;
  };
  OfflineNotice: {offline: string; online: string};
  ErrorBoundary: {title: string; retry: string};
  PromoCodeField: {label: string; apply: string; remove: string};
  /** {count} in the page's digits */
  ErrorSummary: {one: string; other: string};
  AddressCard: {edit: string; delete: string; default: string; makeDefault: string};
  Alert: {close: string};
  AnnouncementBar: {close: string};
  Breadcrumb: {label: string};
  Carousel: {previous: string; next: string};
  DatePicker: {
    calendar: string;
    jalali: string;
    gregorian: string;
    year: string;
    month: string;
    day: string;
    open: string;
    previous: string;
    next: string;
    equivalent: string;
  };
  Dialog: {close: string};
  FilterBar: {label: string; remove: string; clearAll: string};
  LanguageSwitch: {label: string};
  OrderTimeline: {done: string};
  Pagination: {label: string; previous: string; next: string; page: string};
  LineItem: {remove: string; unavailable: string};
  PaymentCard: {
    card: string;
    holder: string;
    bank: string;
    amount: string;
    copy: string;
    copied: string;
  };
  ProductCard: {placeholder: string; favorite: string};
  QuantityInput: {value: string; decrease: string; increase: string};
  RangeSlider: {label: string; min: string; max: string};
  ReminderRow: {
    paused: string;
    sendFlowers: string;
    reminderFor: string;
    edit: string;
    delete: string;
  };
  PaymentStatus: {
    bank: string;
    redirecting: PaymentStatusWords;
    verifying: PaymentStatusWords;
    paid: PaymentStatusWords;
    cancelled: PaymentStatusWords;
    failed: PaymentStatusWords;
    pending: PaymentStatusWords;
    goToBank: string;
    retry: string;
    otherMethod: string;
    checkAgain: string;
    support: string;
    amount: string;
    order: string;
    reference: string;
  };
  Price: {was: string; now: string};
  /** {time} is m:ss in the page's digits */
  ResendCode: {wait: string; ready: string; resend: string};
  SearchField: {clear: string};
  SectionHeader: {previous: string; next: string};
  Spinner: {label: string};
  StockStatus: {in: string; low: string; soon: string; soonOn: string; out: string};
  Toast: {close: string};
  TrustSeal: {enamad: string; samandehi: string};
}
/** Wording by language (e.g. "en", "fa", "ar"), then component; any part may be left out. */
export type Messages = Record<
  string,
  {[C in keyof ComponentMessages]?: Partial<ComponentMessages[C]>}
>;
export declare const MessagesContext: React.Context<Messages | null>;
/** The language part of a locale: "fa-IR" → "fa". */
export declare function localeLanguage(locale?: string): string;
/** A component's wording: defined values in `props`, then its own `messages` (its folder's messages.js) in the current language (or `locale`), then English; VendraProvider's wording for `component` wins over the built-in one. */
export declare function useMessages<C extends keyof ComponentMessages>(
  component: C,
  messages: {en: ComponentMessages[C]; [language: string]: Partial<ComponentMessages[C]>},
  props?: Partial<ComponentMessages[C]>,
  locale?: string
): ComponentMessages[C];
