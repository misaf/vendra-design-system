// The click-through site: the routed page, the shared bag and saved items.
import React from 'react';
import * as DS from '../app/ds.js';
import {interp, list, cssToObj} from '../app/runtime.jsx';
import StorefrontAccount from '../storefront-account/Page.jsx';
import StorefrontBag from '../storefront-bag/Page.jsx';
import StorefrontCheckout from '../storefront-checkout/Page.jsx';
import StorefrontContact from '../storefront-contact/Page.jsx';
import StorefrontFaq from '../storefront-faq/Page.jsx';
import StorefrontHome from '../storefront-home/Page.jsx';
import StorefrontJournal from '../storefront-journal/Page.jsx';
import StorefrontNotfound from '../storefront-notfound/Page.jsx';
import StorefrontPolicy from '../storefront-policy/Page.jsx';
import StorefrontPost from '../storefront-post/Page.jsx';
import StorefrontProduct from '../storefront-product/Page.jsx';
import StorefrontSaved from '../storefront-saved/Page.jsx';
import StorefrontSearch from '../storefront-search/Page.jsx';
import StorefrontShop from '../storefront-shop/Page.jsx';
import StorefrontSignin from '../storefront-signin/Page.jsx';
import StorefrontTrack from '../storefront-track/Page.jsx';
import StorefrontWeddings from '../storefront-weddings/Page.jsx';

export function View({v}) {
  return (
    <>
      <DS.LiveRegion>
        <>{interp(v.announcement)}</>
      </DS.LiveRegion>
      {v.integrationError ? (
        <>
          <DS.Alert tone="danger" title={v.integrationErrorText} />
        </>
      ) : null}
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
    </>
  );
}
