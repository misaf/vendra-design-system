import type {ReactNode} from 'react';
import {tenantFontUrls} from '@storefront/server/route-head.mjs';
import {vfConfigureRendering} from '@storefront/shared/platform/environment.js';
import {requireLocale, locales} from '@storefront/app/route-locale';
import {VF_STORE} from '@storefront/src/storefront/store/store-config.js';

const base = process.env.NEXT_PUBLIC_VF_BASE_PATH + '/';
vfConfigureRendering(base, 0);

export function generateStaticParams() {
  return locales.map(locale => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const lang = requireLocale((await params).locale);

  const fonts = await tenantFontUrls(VF_STORE.tenant, lang, base);

  return (
    <>
      {fonts.map(href => (
        <link key={href} rel="preload" as="font" href={href} type="font/woff2" crossOrigin="" />
      ))}
      {children}
    </>
  );
}
