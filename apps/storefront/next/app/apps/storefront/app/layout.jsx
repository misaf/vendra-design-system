import {StorefrontDocument} from '../../../storefront.jsx';
import {VF_STORE} from '../../../../../shared/domain/store-config.js';
import '../../../../../_runtime/tailwind.css';
import '../../../../../design-system/styles.css';
import '../../../../../_runtime/custom.css';
import './storefront.css';

export default function Layout({children}) {
  return <StorefrontDocument tenant={VF_STORE.tenant}>{children}</StorefrontDocument>;
}
