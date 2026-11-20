'use client';

import {Fragment, Suspense, useContext, useLayoutEffect, useState} from 'react';
import type {ComponentType, ReactNode} from 'react';
import {Alert} from '../../design-system/components/Alert/Alert.jsx';
import {Button} from '../../design-system/components/Button/Button.jsx';
import {LiveRegion} from '../../design-system/components/LiveRegion/LiveRegion.jsx';
import {VendraProvider} from '../../design-system/components/VendraProvider/VendraProvider.jsx';
import {BagRouteScreen} from '../../storefront/cart/bag/BagRouteScreen.jsx';
import {PageBoundary} from '../../storefront/shell/components/PageError.jsx';
import {tenantRendered} from '../../storefront/shell/components/tenant-theme.js';
import {VF_ROUTES} from '../../storefront/shell/routing.js';
import {VF_SEO} from '../../storefront/shell/seo.js';
import {StorefrontPageContext} from '../../storefront/session/page-context';
import {vfLanguage, vfLocale} from '../../storefront/store/store-config.js';
import {PageHead, type HeadTags} from './PageHead';
import {StorefrontContext} from './StorefrontSession';
import {lazyPage} from './preview-screens';

const previews: Partial<Record<string, ReturnType<typeof lazyPage>>> = Object.fromEntries(
  VF_ROUTES.map(name => [name, lazyPage(name, true)])
);

const alternateScreens: Partial<Record<string, ComponentType>> = {
  bag: BagRouteScreen,
  signin: lazyPage('signin'),
  track: lazyPage('track'),
  notfound: lazyPage('notfound')
};

type StorefrontScreenProps = {
  children: ReactNode;
  view: string;
  fallbackLang: string | null;
  initialTags: HeadTags;
  address: string;
};

export function StorefrontScreen({
  children,
  view,
  fallbackLang,
  initialTags,
  address
}: StorefrontScreenProps) {
  const [head, setHead] = useState<{address: string; tags: HeadTags; serialized: string} | null>(
    null
  );
  // Initial tags travel in Next.js route data. The view can update them after a query change,
  // checkout step, or session restore. React owns these nodes for the entire navigation.
  const updateHead = (values: Parameters<typeof VF_SEO.headTags>[0]) => {
    const tags = VF_SEO.headTags(values);
    const serialized = JSON.stringify(tags);
    setHead(previous =>
      previous?.address === address && previous.serialized === serialized
        ? previous
        : {address, tags, serialized}
    );
  };
  const values = useContext(StorefrontContext);
  if (!values) throw new Error('StorefrontScreen requires a StorefrontSession');
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
        tags={head?.address === address ? head.tags : initialTags}
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
