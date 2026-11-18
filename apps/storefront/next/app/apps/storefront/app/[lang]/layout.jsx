import {notFound} from 'next/navigation';
import exported from '../../../../../_generated/pages.json';
import {VF_STORE, vfLocale} from '../../../../../../shared/domain/store-config.js';
import '../../../../../../_runtime/tailwind.css';
import '../../../../../../../../packages/design-system/styles.css';
import '../../../../../../_runtime/custom.css';
import './storefront.css';

export default async function RootLayout({children, params}) {
  const {lang} = await params;
  if (!VF_STORE.languages.includes(lang)) notFound();
  const {dir} = vfLocale(lang);

  return (
    <html lang={lang} dir={dir} data-lang={lang} suppressHydrationWarning>
      <head>
        {exported.fonts?.[lang]?.map(href => (
          <link key={href} rel="preload" as="font" href={href} type="font/woff2" crossOrigin="" />
        ))}
        {VF_STORE.tenant !== 'default' && (
          <link
            id="vf-tenant-css"
            rel="stylesheet"
            href={
              process.env.NEXT_PUBLIC_VF_BASE_PATH +
              '/packages/design-system/tokens/tenants/' +
              VF_STORE.tenant +
              '.css'
            }
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
