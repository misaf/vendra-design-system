'use client';

import {usePathname} from 'next/navigation';
import {createContext, useContext} from 'react';
import type {ReactNode} from 'react';

const LiveCatalogContext = createContext(false);

export function useLiveCatalog() {
  return useContext(LiveCatalogContext);
}

function useLiveLocale() {
  const pathname = usePathname();
  return /^\/(?:apps\/storefront\/app\/)?fa(?:\/|$)/.test(pathname) ? 'fa' : 'en';
}

export function LiveCatalogDocument({children}: {children: ReactNode}) {
  const lang = useLiveLocale();
  return (
    <html lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'} data-lang={lang}>
      <head>
        <meta name="robots" content="noindex" />
      </head>
      <body>
        <LiveCatalogContext.Provider value>{children}</LiveCatalogContext.Provider>
      </body>
    </html>
  );
}

export function LiveCatalogNotFound() {
  const lang = useLiveLocale();
  return (
    <main className="vf-live-catalog">
      <h1>{lang === 'fa' ? 'صفحه پیدا نشد' : 'Page not found'}</h1>
    </main>
  );
}
