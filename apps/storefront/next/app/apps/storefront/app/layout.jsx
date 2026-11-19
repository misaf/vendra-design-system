import {StorefrontDocument} from '@storefront/next/app/storefront.jsx';
import {VF_STORE} from '@storefront/shared/domain/store-config.js';
import '@storefront/_runtime/tailwind.css';
import '@storefront/design-system/styles.css';
import '@storefront/_runtime/custom.css';
import './storefront.css';

export default function Layout({children}) {
  return <StorefrontDocument tenant={VF_STORE.tenant}>{children}</StorefrontDocument>;
}
