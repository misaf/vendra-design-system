import {notFound} from 'next/navigation';
import {StorefrontScreen} from './storefront.jsx';
import {routeHead} from '../route-head.mjs';
import {VF_STORE} from '../../shared/domain/store-config.js';

// Route files select their page component. Next.js serializes only that route's component
// reference, with the persistent storefront session supplied by the shared layout.
export function storefrontPage(path, Screen, {fallback = false} = {}) {
  return async function Page({params}) {
    const values = await params;
    const {lang} = values;
    if (!VF_STORE.languages.includes(lang)) notFound();
    const segment = typeof path === 'function' ? path(values) : path;
    const address = [lang, segment].filter(Boolean).join('/') + '/';
    const {tags, route} = routeHead(address, {
      lang,
      base: process.env.NEXT_PUBLIC_VF_BASE_PATH + '/',
      origin: process.env.VF_ORIGIN || ''
    });
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
