import type {ReactNode} from 'react';
import {StorefrontDocument} from './_components/StorefrontDocument.jsx';
import {LiveCatalogDocument} from './_components/LiveCatalogDocument.jsx';
import {liveCatalogBase} from '@storefront/server/catalog-mode';
import {VF_STORE} from '@storefront/domain/store-config.js';
import '@storefront/_runtime/tailwind.css';
import '@storefront/ui/storefront.css';
import '@storefront/_runtime/custom.css';
import '@storefront/styles/storefront.css';

export default async function Layout({children}: {children: ReactNode}) {
  if (await liveCatalogBase()) return <LiveCatalogDocument>{children}</LiveCatalogDocument>;
  return <StorefrontDocument tenant={VF_STORE.tenant}>{children}</StorefrontDocument>;
}
