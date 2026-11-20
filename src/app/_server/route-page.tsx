import 'server-only';
import {notFound} from 'next/navigation';
import type {ComponentType} from 'react';
import {StorefrontScreen} from '../_components/StorefrontDocument.jsx';
import {routeHead} from './route-head.mjs';
import {requireLocale} from '@storefront/src/platform/locale/route-locale';
import {liveCatalogBase} from './catalog-mode';
import {liveCatalogPage} from './live-catalog-page';

// Route files select their page component. Next.js serializes only that route's component
// reference, with the persistent storefront session supplied by the shared layout.
export function storefrontPage<Segments extends object = Record<never, never>>(
  path: string | ((params: Segments) => string),
  Screen: ComponentType,
  {fallback = false} = {}
) {
  return async function Page({params}: {params: Promise<{locale: string} & Segments>}) {
    const values = await params;
    const lang = requireLocale(values.locale);
    const segment = typeof path === 'function' ? path(values) : path;
    const apiBase = await liveCatalogBase();
    if (apiBase) return liveCatalogPage(apiBase, lang, segment, fallback);
    const address = [lang, segment].filter(Boolean).join('/') + '/';
    const {tags, route} = routeHead(address, {
      lang,
      base: process.env.NEXT_PUBLIC_VF_BASE_PATH + '/',
      origin: process.env.VF_ORIGIN || ''
    });
    // The export host serves its own 404 document, which also restores runtime tracking URLs.
    if (route.view === 'notfound' && process.env.NEXT_PUBLIC_VF_NEXT_EXPORT !== 'true') notFound();
    return (
      <StorefrontScreen
        initialTags={tags}
        address={address}
        view={fallback ? 'notfound' : route.view}
        fallbackLang={fallback ? lang : null}
      >
        {route.view === 'notfound' && !fallback ? null : <Screen />}
      </StorefrontScreen>
    );
  };
}
