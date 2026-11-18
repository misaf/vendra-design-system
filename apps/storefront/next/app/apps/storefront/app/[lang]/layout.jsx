import {notFound} from 'next/navigation';
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
      <body>{children}</body>
    </html>
  );
}
