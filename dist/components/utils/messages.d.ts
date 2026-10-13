import * as React from 'react';
/** Built-in wording per component; {name} / {date} / {page} are filled in by the component. */
export interface ComponentMessages {
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
  QuantityInput: {value: string; dec: string; inc: string};
  RangeSlider: {label: string; min: string; max: string};
  ReminderRow: {
    paused: string;
    sendFlowers: string;
    reminderFor: string;
    edit: string;
    delete: string;
  };
  SearchField: {clear: string};
  SectionHeader: {previous: string; next: string};
  Spinner: {label: string};
  Toast: {close: string};
}
/** Wording by language (e.g. "en", "fa", "ar"), then component; any part may be left out. */
export type Messages = Record<
  string,
  {[C in keyof ComponentMessages]?: Partial<ComponentMessages[C]>}
>;
/** The built-in catalog: English and Persian. */
export declare const MESSAGES: {en: ComponentMessages; fa: ComponentMessages};
export declare const MessagesContext: React.Context<Messages | null>;
/** The language part of a locale: "fa-IR" → "fa". */
export declare function localeLanguage(locale?: string): string;
/** A component's wording: defined values in `props`, then the catalog in the current language (or `locale`), then English. */
export declare function useMessages<C extends keyof ComponentMessages>(
  component: C,
  props?: Partial<ComponentMessages[C]>,
  locale?: string
): ComponentMessages[C];
