import {notFound} from 'next/navigation';
import {VF_STORE} from '@storefront/domain/store-config.js';

export const locales = VF_STORE.languages;

export function requireLocale(value: string) {
  const locale = locales.find(code => code === value);
  if (!locale) notFound();
  return locale;
}
