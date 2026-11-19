import type {ReactNode} from 'react';
import {StorefrontDocument} from './_components/StorefrontDocument.jsx';
import {VF_STORE} from '@storefront/shared/domain/store-config.js';
import '@storefront/_runtime/tailwind.css';
import '@storefront/design-system/styles.css';
import '@storefront/_runtime/custom.css';
import '@storefront/styles/storefront.css';

export default function Layout({children}: {children: ReactNode}) {
  return <StorefrontDocument tenant={VF_STORE.tenant}>{children}</StorefrontDocument>;
}
