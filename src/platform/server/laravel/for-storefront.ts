import 'server-only';
import {createVendraApi} from './index.mjs';

interface TenantApi {
  apiOrigin: string;
  storefrontOrigin: string;
}

interface RequestContext {
  locale: 'en' | 'fa';
  customerAccessToken?: string;
}

/** Use the resolved tenant configuration and the current customer's server-side session. */
export function createFloristApi(tenant: TenantApi, context: RequestContext) {
  return createVendraApi({
    apiOrigin: tenant.apiOrigin,
    storefrontOrigin: tenant.storefrontOrigin,
    ...context
  });
}
