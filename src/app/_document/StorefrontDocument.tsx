'use client';

import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';
import {VF_TENANT_SLUGS} from '../../../.generated/tenant-slugs.js';
import {vfReadRoute} from '../../storefront/shell/routing.js';
import {VF_STORE, vfLocale} from '../../storefront/store/store-config.js';
import {base} from './browser-runtime';
import {StorefrontSession} from './StorefrontSession';

// Keep the session above the language segment so pending checkout and navigation state
// survive switching languages through the App Router.
export function StorefrontDocument({children, tenant}: {children: ReactNode; tenant: string}) {
  const pathname = usePathname();
  const route = vfReadRoute(base + pathname);
  const lang = 'lang' in route && typeof route.lang === 'string' ? route.lang : '';
  const locale = vfLocale(lang || VF_STORE.languages[0]);
  return (
    <html lang={locale.code} dir={locale.dir} data-lang={locale.code} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  const root = document.documentElement;
  try {
    const consent = localStorage.getItem('vf-consent');
    if (consent === 'essential' || consent === 'all' || sessionStorage.getItem('vf-consent-dismissed') === '1')
      root.setAttribute('data-vf-consent-known', '');
  } catch {}
  const tenant = new URLSearchParams(location.search).get('tenant');
  if (tenant === ${JSON.stringify(tenant)} || !${JSON.stringify(VF_TENANT_SLUGS)}.includes(tenant)) return;
  root.setAttribute('data-vf-tenant-loading', '');
  setTimeout(() => root.removeAttribute('data-vf-tenant-loading'), 2500);
})();`
          }}
        />
        {tenant !== 'default' && (
          <link
            id="vf-tenant-css"
            rel="stylesheet"
            href={base + '/apps/storefront/design-system/tokens/tenants/' + tenant + '.css'}
          />
        )}
      </head>
      <body>
        <StorefrontSession lang={locale.code}>{children}</StorefrontSession>
      </body>
    </html>
  );
}
