import {renderDemoScreen} from '@storefront/src/app/_routing/route-page';
import {liveCatalogBase} from '@storefront/src/app/_live-catalog/catalog-mode';
import {liveProductPage} from '@storefront/src/app/_live-catalog/live-catalog-page';
import {requireLocale} from '@storefront/src/platform/locale/route-locale';
import ProductScreen from '../../../../storefront/catalog/product/ProductScreen.jsx';
import {demoProductCodes, readDemoProduct} from '@storefront/src/demo/catalog.mjs';

export function generateStaticParams() {
  return demoProductCodes().map(code => ({code}));
}

export default async function Page({params}: {params: Promise<{locale: string; code: string}>}) {
  const {locale, code} = await params;
  const lang = requireLocale(locale);
  const segment = encodeURIComponent(code);
  const apiBase = await liveCatalogBase();
  if (apiBase) return liveProductPage(apiBase, lang, segment);
  const fixture = readDemoProduct(code, lang);
  return renderDemoScreen(lang, 'product/' + segment, fixture && <ProductScreen {...fixture} />);
}
