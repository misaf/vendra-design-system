import type {ReactNode} from 'react';
import {StorefrontDocument} from './_document/StorefrontDocument';
import {LiveCatalogDocument} from './_live-catalog/LiveCatalogDocument';
import {liveCatalogBase} from './_live-catalog/catalog-mode';
import {VF_STORE} from '@storefront/src/storefront/store/store-config.js';
import '@storefront/.generated/tailwind.css';
import '@storefront/src/design-system/storefront.css';
import '@storefront/.generated/custom.css';
import '@storefront/src/app/globals.css';

export default async function Layout({children}: {children: ReactNode}) {
  if (await liveCatalogBase()) return <LiveCatalogDocument>{children}</LiveCatalogDocument>;
  return <StorefrontDocument tenant={VF_STORE.tenant}>{children}</StorefrontDocument>;
}
