import {notFound} from 'next/navigation';
import {tenantFontUrls} from '@storefront/next/route-head.mjs';
import {vfConfigureRendering} from '@storefront/shared/platform/environment.js';
import {VF_STORE} from '@storefront/shared/domain/store-config.js';

const base = process.env.NEXT_PUBLIC_VF_BASE_PATH + '/';
vfConfigureRendering(base, 0);

export function generateStaticParams() {
  return VF_STORE.languages.map(lang => ({lang}));
}

export default async function LanguageLayout({children, params}) {
  const {lang} = await params;
  if (!VF_STORE.languages.includes(lang)) notFound();

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
