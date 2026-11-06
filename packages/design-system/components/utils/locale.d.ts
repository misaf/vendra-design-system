/** The page's language for React Aria: attach `ref` to the outer element and pass `locale` to an
 * I18nProvider around the React Aria parts. Falls back to the app's own React Aria locale. */
export declare function usePageLocale(): {locale: string; ref: {current: HTMLElement | null}};
