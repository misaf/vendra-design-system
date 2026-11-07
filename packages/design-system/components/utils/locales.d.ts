/** One language the components support. */
export interface LocaleConfig {
  /** Language code, e.g. "en", "fa", "ar"; the key in the locales table and in `messages`. */
  code: string;
  /** BCP 47 tag for Intl and React Aria, e.g. "en-US", "fa-IR". */
  tag: string;
  /** Short label for the language switch, in the language itself, e.g. "EN", "فا". */
  label: string;
  /** Writing direction. */
  dir: 'ltr' | 'rtl';
  /** Intl numbering system for the language's digits, e.g. "latn", "arabext", "arab". */
  digits: string;
  /** Intl calendar the language prefers, e.g. "gregory", "persian". */
  calendar: string;
  /** Font family role the language's text uses, e.g. "latin", "persian". */
  font: string;
}
/** The languages by code. */
export type Locales = Record<string, LocaleConfig>;
/** The default languages: English and Persian. */
export declare const LOCALES: {en: LocaleConfig; fa: LocaleConfig};
/** A locale's settings ("fa-IR" or "fa" → fa); an unknown language falls back to English. */
export declare function localeConfig(locale?: string, locales?: Locales): LocaleConfig;
/** A count's plural form by Intl.PluralRules; a missing form falls back to `other`. */
export declare function plural<T>(
  count: number,
  forms: Partial<Record<Intl.LDMLPluralRule, T>> & {other: T},
  locale?: string,
  locales?: Locales
): T;
