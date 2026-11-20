import type {LocaleConfig, Locales} from './locales.js';
/** The languages VendraProvider offers below it (LOCALES unless its `locales` prop sets others). */
export declare const LocalesContext: React.Context<Locales>;
/** The offered languages, by code. */
export declare function useLocales(): Locales;
/** localeConfig among VendraProvider's offered languages; an unknown language falls back to English. */
export declare function useLocaleConfig(locale?: string): LocaleConfig;
/** The page's language for React Aria: attach `ref` to the outer element and pass `locale` to an
 * I18nProvider around the React Aria parts. Falls back to the app's own React Aria locale. */
export declare function usePageLocale(): {locale: string; ref: {current: HTMLElement | null}};
