// The languages the components know, in one place: each one's BCP 47 tag (for Intl and React Aria),
// switch label, writing direction, digits (an Intl numbering system), calendar (an Intl calendar)
// and font family role. Pure data and helpers (it imports nothing); utils/locale.js has the hooks. Components and apps look these up instead of checking for 'en' or 'fa'.
// English and Persian are the defaults; a tenant offers more by passing its own table to
// VendraProvider's `locales`, e.g. {...LOCALES, ar: {code: 'ar', tag: 'ar-AE', label: 'ع', dir:
// 'rtl', digits: 'arab', calendar: 'gregory', font: 'arabic'}}, and adds that language's wording
// (VendraProvider's `messages`). English is the fallback for anything unknown.
export const LOCALES = {
  en: {
    code: 'en',
    tag: 'en-US',
    label: 'EN',
    dir: 'ltr',
    digits: 'latn',
    calendar: 'gregory',
    font: 'latin'
  },
  fa: {
    code: 'fa',
    tag: 'fa-IR',
    label: 'فا',
    dir: 'rtl',
    digits: 'arabext',
    calendar: 'persian',
    font: 'persian'
  }
};

// A locale's settings: 'fa-IR' or 'fa' → the fa entry; an unknown language → English (or the
// table's first entry when it has no English).
export function localeConfig(locale, locales = LOCALES) {
  const code = String(locale || '')
    .split('-')[0]
    .toLowerCase();
  return locales[code] || locales.en || Object.values(locales)[0] || LOCALES.en;
}

// A count's plural form in a language, by Intl.PluralRules: plural(2, {one: ' design', other: '
// designs'}, 'en') → ' designs'. A form the language uses but `forms` leaves out falls back to
// `other`.
export function plural(count, forms, locale = 'en', locales = LOCALES) {
  const rule = new Intl.PluralRules(localeConfig(locale, locales).tag).select(Number(count));
  return rule in forms ? forms[rule] : forms.other;
}
