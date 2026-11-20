import {createContext, Suspense, useLayoutEffect} from 'react';
import type {ComponentPropsWithoutRef, ReactNode} from 'react';
import Link from 'next/link';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {vfSetHydrating} from '../../platform/browser/environment.js';
import {vfRuntime} from '../../platform/browser/runtime.js';
import {useStorefrontSession} from '../../storefront/session/useStorefrontSession.js';
import {vfInApp} from '../../storefront/shell/routing.js';
import {StorefrontLinkContext} from '../../storefront/shell/ui/StorefrontLink';
import {VF_STORE} from '../../storefront/store/store-config.js';
import {base} from './browser-runtime';

export const StorefrontContext = createContext<ReturnType<typeof useStorefrontSession> | null>(
  null
);

function AppLink({href, ...props}: ComponentPropsWithoutRef<'a'>) {
  if (
    typeof href !== 'string' ||
    !href.startsWith(base + '/') ||
    !vfInApp(href) ||
    href.includes('#') ||
    props.download != null ||
    (props.target && props.target !== '_self') ||
    /\/track\/[^/?]+/.test(href)
  )
    return <a {...props} href={href} />;
  return <Link {...props} href={href.slice(base.length)} prefetch={false} />;
}

function SearchState({onAddress}: {onAddress: (url: string) => void}) {
  const pathname = usePathname();
  const search = useSearchParams();
  useLayoutEffect(() => {
    onAddress(location.pathname + location.search);
  }, [pathname, search, onAddress]);
  return null;
}

type Navigation = {replace?: boolean; scroll?: boolean; document?: boolean};

export function StorefrontSession({children, lang}: {children: ReactNode; lang: string}) {
  const router = useRouter();
  const pathname = usePathname();
  const values = useStorefrontSession({
    lang,
    initialUrl: base + pathname,
    navigate(url: string, {replace, scroll, document}: Navigation) {
      if (document) {
        location[replace ? 'replace' : 'assign'](url);
        return;
      }
      const target = new URL(url, location.href);
      // Next.js observes the native History API for query-only changes. Update controlled inputs
      // in the same event, without fetching new route data for every keystroke or filter toggle.
      if (target.pathname === location.pathname) {
        if (target.search === location.search) return;
        history[replace ? 'replaceState' : 'pushState'](null, '', url);
        values.receiveAddress(url);
        return;
      }
      router[replace ? 'replace' : 'push'](url.slice(base.length), {scroll});
    }
  });
  const {restoreAddress} = values;
  useLayoutEffect(() => {
    const restore = () => {
      vfSetHydrating(false);
      if (process.env.NODE_ENV === 'development') window.__vfDevStore = VF_STORE;
      vfRuntime.restoreSession = null;
      restoreAddress(location.pathname + location.search);
    };
    vfRuntime.restoreSession = restore;
    return () => {
      if (vfRuntime.restoreSession === restore) vfRuntime.restoreSession = null;
    };
  }, [restoreAddress]);
  return (
    <StorefrontContext.Provider value={values}>
      <Suspense fallback={null}>
        <SearchState onAddress={values.receiveAddress} />
      </Suspense>
      <div id="root" inert={!values.ready}>
        <StorefrontLinkContext.Provider value={AppLink}>{children}</StorefrontLinkContext.Provider>
      </div>
    </StorefrontContext.Provider>
  );
}
