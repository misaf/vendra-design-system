// The click-through site: the routed page, the shared bag and saved items.
import React, {Suspense, useEffect} from 'react';
import * as DS from '../app/ds.js';
import {PageBoundary} from '../app/PageError.jsx';
import {lazyPage, preloadPages} from '../app/pages.js';

// Each page loads on first view; the rest follow once the browser is idle. The site switches to a
// page once its code has loaded (vfShowRoute in logic.js), so the current page stays until then.
const StorefrontAccount = lazyPage('account');
const StorefrontBag = lazyPage('bag');
const StorefrontCheckout = lazyPage('checkout');
const StorefrontContact = lazyPage('contact');
const StorefrontFaq = lazyPage('faq');
const StorefrontHome = lazyPage('home');
const StorefrontJournal = lazyPage('journal');
const StorefrontNotfound = lazyPage('notfound');
const StorefrontError = lazyPage('error');
const StorefrontPolicy = lazyPage('policy');
const StorefrontPost = lazyPage('post');
const StorefrontProduct = lazyPage('product');
const StorefrontSaved = lazyPage('saved');
const StorefrontSearch = lazyPage('search');
const StorefrontShop = lazyPage('shop');
const StorefrontSignin = lazyPage('signin');
const StorefrontTrack = lazyPage('track');
const StorefrontWeddings = lazyPage('weddings');

export function View({v}) {
  useEffect(preloadPages, []);
  return (
    // In-site links (Button href, NavLink, ProductCard, ...) navigate through the site's router.
    <DS.VendraProvider locale={v.lang === 'fa' ? 'fa-IR' : 'en-US'} navigate={v.routerNavigate}>
      <DS.LiveRegion>
        <>{v.announcement}</>
      </DS.LiveRegion>
      {v.integrationError ? (
        <>
          <DS.Alert tone="danger" title={v.integrationErrorText} />
        </>
      ) : null}
      <PageBoundary view={v.routeInfo?.view}>
        <Suspense fallback={null}>
          {v.is?.home ? (
            <>
              <StorefrontHome
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.shop ? (
            <>
              <StorefrontShop
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.product ? (
            <>
              <StorefrontProduct
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.bag ? (
            <>
              <StorefrontBag
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.checkout ? (
            <>
              <StorefrontCheckout
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.track ? (
            <>
              <StorefrontTrack
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.signin ? (
            <>
              <StorefrontSignin
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.account ? (
            <>
              <StorefrontAccount
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.weddings ? (
            <>
              <StorefrontWeddings
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.contact ? (
            <>
              <StorefrontContact
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.journal ? (
            <>
              <StorefrontJournal
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.post ? (
            <>
              <StorefrontPost
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.search ? (
            <>
              <StorefrontSearch
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.saved ? (
            <>
              <StorefrontSaved
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.policy ? (
            <>
              <StorefrontPolicy
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.faq ? (
            <>
              <StorefrontFaq
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.notfound ? (
            <>
              <StorefrontNotfound
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
          {v.is?.error ? (
            <>
              <StorefrontError
                routeInfo={v.routeInfo}
                lang={v.lang}
                tenant={v.tenant}
                mobile={v.mobile}
                go={v.go}
                store={v.store}
                setLang={v.setLang}
              />
            </>
          ) : null}
        </Suspense>
      </PageBoundary>
    </DS.VendraProvider>
  );
}
