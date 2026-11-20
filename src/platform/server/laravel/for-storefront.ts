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
  const origin = new URL(tenant.storefrontOrigin).origin;
  const {locale, customerAccessToken} = context;
  return createVendraApi({
    apiOrigin: tenant.apiOrigin,
    fetch: (url, init) => {
      const headers = new Headers(init?.headers);
      headers.set('Origin', origin);
      headers.set('Accept-Language', locale);
      if (customerAccessToken) headers.set('Authorization', `Bearer ${customerAccessToken}`);
      return fetch(url, {...init, headers, credentials: 'omit'});
    }
  });
}
