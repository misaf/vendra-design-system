'use client';

import dynamic from 'next/dynamic';
import {StorefrontScreen} from './_components/StorefrontDocument.jsx';
import {VF_SEO} from '@storefront/shared/services/seo.js';

const NotFoundScreen = dynamic(() => import('@storefront/features/notfound/NotFoundScreen.jsx'));

export default function NotFound() {
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
