'use client';

import dynamic from 'next/dynamic';
import {StorefrontScreen} from './_document/StorefrontScreen';
import {LiveCatalogNotFound, useLiveCatalog} from './_live-catalog/LiveCatalogDocument';
import {VF_SEO} from '@storefront/src/storefront/shell/seo.js';

const NotFoundScreen = dynamic(
  () => import('@storefront/src/storefront/shell/not-found/NotFoundScreen.jsx')
);

export default function NotFound() {
  if (useLiveCatalog()) return <LiveCatalogNotFound />;
  return (
    <StorefrontScreen
      address="notfound/"
      view="notfound"
      fallbackLang={null}
      initialTags={VF_SEO.headTags({noindex: true})}
    >
      <NotFoundScreen />
    </StorefrontScreen>
  );
}
