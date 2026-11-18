import {notFound} from 'next/navigation';
import {Storefront} from '../../../../../storefront.jsx';
import {
  VF_PRODUCTS,
  VF_PRODUCT_DETAILS,
  vfFindProduct,
  vfProductImage,
  vfProductImages,
  vfProductSub
} from '../../../../../../../shared/domain/catalog.js';
import {StorefrontProductLayout} from '../../../../../../../app/layouts/StorefrontProductLayout/StorefrontProductLayout.jsx';
import {VF_CATEGORY_COPY} from '../../../../../../../shared/translations/categories.js';
import {vfProductData} from '../../../../../../../shared/services/structured-data.js';
import {VF_MONEY} from '../../../../../../../shared/domain/formatting.js';
import {VF_STORE, vfLocale} from '../../../../../../../shared/domain/store-config.js';
import {vfReadRoute, vfRouteUrl} from '../../../../../../../shared/services/routing.js';
import {VF_SEO} from '../../../../../../../shared/services/seo.js';

function resolveRoute({lang, segments = []}) {
  if (!VF_STORE.languages.includes(lang)) notFound();
  const address =
    '/apps/storefront/app/' + [lang, ...segments].map(encodeURIComponent).join('/') + '/';
  const route = vfReadRoute(address);
  if (route.view === 'notfound') notFound();
  return route;
}

export function generateStaticParams() {
  return VF_STORE.languages.flatMap(lang =>
    VF_PRODUCTS.map(product => ({lang, segments: ['product', product.id]}))
  );
}

export async function generateMetadata({params}) {
  const route = resolveRoute(await params);
  const {lang, view} = route;
  const brand = VF_STORE.brand[lang];
  if (view !== 'product')
    return {title: brand, robots: {index: !VF_SEO.isNoindex(view) && view !== 'signin'}};

  const product = vfFindProduct(route.id);
  const url = vfRouteUrl(route);
  const description = VF_PRODUCT_DETAILS[product.id][lang === 'fa' ? 1 : 0];
  const title = product.id + ' · ' + brand;
  const {src, alt, width, height} = vfProductImage(product, lang, undefined, 0, '/');
  const images = [{url: src, alt, width, height}];
  return {
    ...(process.env.VF_ORIGIN && {metadataBase: new URL(process.env.VF_ORIGIN)}),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          VF_STORE.languages.map(language => [language, vfRouteUrl({...route, lang: language})])
        ),
        'x-default': vfRouteUrl({...route, lang: VF_STORE.languages[0]})
      }
    },
    openGraph: {title, description, url, locale: vfLocale(lang).tag.replace('-', '_'), images},
    twitter: {card: 'summary_large_image', title, description, images}
  };
}

export default async function Page({params}) {
  const route = resolveRoute(await params);
  if (route.view !== 'product') return <Storefront />;

  const {lang} = route;
  const product = vfFindProduct(route.id);
  const photo = vfProductImage(product, lang, undefined, 0, '/');
  const description = VF_PRODUCT_DETAILS[product.id][lang === 'fa' ? 1 : 0];
  const origin = process.env.VF_ORIGIN;
  const resolveUrl = value => {
    const url = new URL(value, origin || 'http://localhost');
    return origin || url.origin !== 'http://localhost' ? url.href : url.pathname;
  };
  const data = vfProductData({
    product,
    lang,
    url: vfRouteUrl(route),
    images: vfProductImages(product, lang).map(image => image.src),
    description,
    category: VF_CATEGORY_COPY[lang][product.cat],
    resolveUrl
  });
  return (
    <Storefront>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({'@context': 'https://schema.org', ...data}).replace(
            /</g,
            '\\u003c'
          )
        }}
      />
      <div data-tenant={VF_STORE.tenant}>
        <StorefrontProductLayout
          gallery={
            <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
          }
          details={
            <>
              <h1>{product.id}</h1>
              <p>{vfProductSub(product, lang)}</p>
              <p>{description}</p>
              <p>{VF_MONEY(product.price, lang === 'fa')}</p>
            </>
          }
        />
      </div>
    </Storefront>
  );
}
