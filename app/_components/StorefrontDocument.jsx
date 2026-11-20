'use client';

import {createContext, Fragment, Suspense, useContext, useLayoutEffect, useState} from 'react';
import Link from 'next/link';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useStorefrontSession} from '../../session/useStorefrontSession.js';
import {StorefrontPageContext} from '../../shared/ui/storefront-page.js';
import {StorefrontLinkContext} from '../../shared/ui/StorefrontLink.jsx';
import {Alert} from '../../ui/components/Alert/Alert.jsx';
import {Button} from '../../ui/components/Button/Button.jsx';
import {LiveRegion} from '../../ui/components/LiveRegion/LiveRegion.jsx';
import {VendraProvider} from '../../ui/components/VendraProvider/VendraProvider.jsx';
import {PageBoundary} from '../../components/storefront/PageError.jsx';
import {lazyPage} from './preview-screens.js';
import {BagRouteScreen} from '../[locale]/(checkout)/bag/BagRouteScreen.jsx';
import {installTenantTheme, tenantRendered} from '../../components/storefront/tenant-theme.js';
import {vfApplyTvMode} from '../../shared/services/tv.js';
import {vfConfigureRendering, vfSetHydrating} from '../../shared/platform/environment.js';
import {vfRuntime} from '../../shared/platform/runtime.js';
import {vfInstallRuntime} from '../../shared/services/integrations/runtime.js';
import {vfApplyTenant, vfTenant} from '../../shared/services/tenant.js';
import {VF_TENANT_SLUGS} from '../../_runtime/tenant-slugs.js';
import {vfInApp, vfReadRoute, VF_ROUTES} from '../../shared/services/routing.js';
import {vfBrandLinks} from '../../src/storefront/store/brand.js';
import {VF_SEO} from '../../shared/services/seo.js';
import {VF_STORE, vfLanguage, vfLocale} from '../../src/storefront/store/store-config.js';

const base = process.env.NEXT_PUBLIC_VF_BASE_PATH;
vfConfigureRendering(base + '/', Number(process.env.NEXT_PUBLIC_VF_RENDER_TIME));
const StorefrontContext = createContext(null);
const previews = Object.fromEntries(VF_ROUTES.map(name => [name, lazyPage(name, true)]));

if (typeof window !== 'undefined') {
  vfInstallRuntime();
  window.__vfRuntime = vfRuntime;
  // Resolve the tenant from the browser URL before hydration suppresses browser reads.
  vfApplyTenant(vfTenant());
  vfSetHydrating(true);
  installTenantTheme(base + '/');
  vfApplyTvMode();
  vfRuntime.offlineDisplay = process.env.NEXT_PUBLIC_VF_NEXT_EXPORT === 'true';
}

function AppLink({href, ...props}) {
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

function SearchState({onAddress}) {
  const pathname = usePathname();
  const search = useSearchParams();
  useLayoutEffect(() => {
    onAddress(location.pathname + location.search);
  }, [pathname, search, onAddress]);
  return null;
}

// Keep the session above the language segment so pending checkout and navigation state
// survive switching languages through the App Router.
export function StorefrontDocument({children, tenant}) {
  const pathname = usePathname();
  const locale = vfLocale(vfReadRoute(base + pathname).lang || VF_STORE.languages[0]);
  return (
    <html lang={locale.code} dir={locale.dir} data-lang={locale.code} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  const root = document.documentElement;
  try {
    const consent = localStorage.getItem('vf-consent');
    if (consent === 'essential' || consent === 'all' || sessionStorage.getItem('vf-consent-dismissed') === '1')
      root.setAttribute('data-vf-consent-known', '');
  } catch {}
  const tenant = new URLSearchParams(location.search).get('tenant');
  if (tenant === ${JSON.stringify(tenant)} || !${JSON.stringify(VF_TENANT_SLUGS)}.includes(tenant)) return;
  root.setAttribute('data-vf-tenant-loading', '');
  setTimeout(() => root.removeAttribute('data-vf-tenant-loading'), 2500);
})();`
          }}
        />
        {tenant !== 'default' && (
          <link
            id="vf-tenant-css"
            rel="stylesheet"
            href={base + '/apps/storefront/design-system/tokens/tenants/' + tenant + '.css'}
          />
        )}
      </head>
      <body>
        <Storefront lang={locale.code}>{children}</Storefront>
      </body>
    </html>
  );
}

function Storefront({children, lang}) {
  const router = useRouter();
  const pathname = usePathname();
  const values = useStorefrontSession({
    lang,
    initialUrl: base + pathname,
    navigate(url, {replace, scroll, document}) {
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
  useLayoutEffect(() => {
    const restore = () => {
      vfSetHydrating(false);
      if (process.env.NODE_ENV === 'development') window.__vfDevStore = VF_STORE;
      vfRuntime.restoreSession = null;
      values.restoreAddress(location.pathname + location.search);
    };
    vfRuntime.restoreSession = restore;
    return () => {
      if (vfRuntime.restoreSession === restore) vfRuntime.restoreSession = null;
    };
  }, [values.restoreAddress]);
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

const alternateScreens = {
  bag: BagRouteScreen,
  signin: lazyPage('signin'),
  track: lazyPage('track'),
  notfound: lazyPage('notfound')
};

function PageHead({tags, tenant, lang}) {
  return (
    <>
      <title>{tags.title}</title>
      {tags.meta
        .filter(({content}) => content != null && content !== '')
        .map(({key, name, content}) => (
          <meta key={name} {...{[key]: name, content}} />
        ))}
      {tags.links.map(({rel, hreflang, href}) => (
        <link key={hreflang || rel} rel={rel} hrefLang={hreflang} href={href} />
      ))}
      {tags.jsonLd && (
        <script
          type="application/ld+json"
          data-ag-seo=""
          dangerouslySetInnerHTML={{__html: tags.jsonLd}}
        />
      )}
      {vfBrandLinks(tenant, lang).map(link => (
        <link key={link.rel + (link.sizes || '')} {...link} />
      ))}
    </>
  );
}

export function StorefrontScreen({children, view, fallbackLang, initialTags, address}) {
  const [head, setHead] = useState(null);
  // Initial tags travel in Next.js route data. The view can update them after a query change,
  // checkout step, or session restore. React owns these nodes for the entire navigation.
  const updateHead = values => {
    const tags = JSON.stringify(VF_SEO.headTags(values));
    setHead(previous =>
      previous?.address === address && previous.tags === tags ? previous : {address, tags}
    );
  };
  const values = useContext(StorefrontContext);
  const {routeInfo, store, go, tenant, setLang, preview} = values;
  useLayoutEffect(() => tenantRendered(tenant), [tenant]);
  useLayoutEffect(() => {
    if (values.ready) document.documentElement.removeAttribute('data-vf-consent-known');
  }, [values.ready]);
  const restoringFallback = fallbackLang && !values.ready;
  const lang = restoringFallback ? fallbackLang : values.lang;
  const name = restoringFallback ? 'notfound' : routeInfo.view;
  const Preview = previews[preview?.name];
  const pageProps = {
    routeInfo: restoringFallback ? {view: 'notfound', lang} : routeInfo,
    lang,
    tenant,
    go,
    store,
    ready: values.ready,
    setLang,
    updateHead
  };
  const key = ['account', 'bag', 'checkout', 'track'].includes(name) ? store.customerId : undefined;
  const Alternate = alternateScreens[name];
  const useAlternate = !(view === name && children) && Alternate;
  const screen = Preview ? (
    <Preview lang={vfLanguage(preview.lang || lang)} updateHead={updateHead} />
  ) : useAlternate ? (
    <Alternate />
  ) : (
    children
  );
  return (
    <VendraProvider locale={vfLocale(lang).tag} navigate={values.routerNavigate}>
      <PageHead
        tags={head?.address === address ? JSON.parse(head.tags) : initialTags}
        tenant={tenant}
        lang={lang}
      />
      <LiveRegion>{values.announcement}</LiveRegion>
      {values.checkoutNotice && (
        <Alert
          tone="info"
          title={values.checkoutNotice.title}
          onClose={values.dismissCheckoutNotice}
          action={
            <Button variant="secondary" href={values.checkoutNotice.href}>
              {values.checkoutNotice.label}
            </Button>
          }
        />
      )}
      {values.integrationError && <Alert tone="danger" title={values.integrationErrorText} />}
      <PageBoundary view={name}>
        <StorefrontPageContext.Provider value={Preview ? null : pageProps}>
          <Fragment key={key}>
            {/* Keep native route content in the initial HTML's visible shell. */}
            {Preview || useAlternate ? <Suspense fallback={null}>{screen}</Suspense> : screen}
          </Fragment>
        </StorefrontPageContext.Provider>
      </PageBoundary>
    </VendraProvider>
  );
}
