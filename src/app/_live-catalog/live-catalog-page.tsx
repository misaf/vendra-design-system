import 'server-only';
import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';
import {loadLiveCategories, loadLiveProducts} from '../../platform/server/laravel/catalog.mjs';

const copy = {
  en: {
    catalog: 'Flower catalog',
    empty: 'No products are available in this selection.',
    stock: 'In stock',
    soldOut: 'Sold out',
    priceUnavailable: 'Price unavailable',
    restricted: 'Online ordering is unavailable.',
    error: 'The catalog is temporarily unavailable.',
    retry: 'Try again',
    all: 'All flowers',
    categories: 'Categories'
  },
  fa: {
    catalog: 'فهرست گل‌ها',
    empty: 'در این بخش محصولی موجود نیست.',
    stock: 'موجود',
    soldOut: 'ناموجود',
    priceUnavailable: 'قیمت در دسترس نیست',
    restricted: 'ثبت سفارش آنلاین در دسترس نیست.',
    error: 'فهرست محصولات موقتاً در دسترس نیست.',
    retry: 'تلاش دوباره',
    all: 'همهٔ گل‌ها',
    categories: 'دسته‌بندی‌ها'
  }
};

type Locale = keyof typeof copy;

function localized(values: Record<string, unknown> | undefined, lang: Locale) {
  const value = values?.[lang] ?? values?.en ?? values?.fa;
  return typeof value === 'string' ? value : '';
}

function liveRouteKey(segment: string) {
  const key = decodeURIComponent(segment);
  // Next may supply an already percent-encoded param for a dynamic localized URL.
  try {
    return decodeURIComponent(key);
  } catch {
    return key;
  }
}

function productPrice(
  price: {amount?: number; currency?: string} | null | undefined,
  lang: Locale
) {
  const {amount, currency} = price ?? {};
  if (
    typeof amount !== 'number' ||
    !Number.isFinite(amount) ||
    amount < 0 ||
    !currency ||
    !/^[A-Z]{3}$/.test(currency)
  )
    return copy[lang].priceUnavailable;
  if (currency === 'IRT') {
    const value = new Intl.NumberFormat(lang).format(amount);
    return value + (lang === 'fa' ? ' تومان' : ' Toman');
  }
  return new Intl.NumberFormat(lang, {style: 'currency', currency}).format(amount);
}

export async function liveCatalogPage(
  base: string,
  lang: Locale,
  segment: string,
  fallback: boolean
) {
  const strings = copy[lang];
  const storePath = (process.env.NEXT_PUBLIC_VF_BASE_PATH || '') + '/' + lang;
  const catalogPath = storePath + '/shop/';
  const shell = (title: string, body: ReactNode) => (
    <main className="vf-live-catalog">
      <title>{title}</title>
      <nav aria-label={strings.catalog}>
        <a href={catalogPath}>{strings.catalog}</a>
        {' · '}
        <a
          href={
            (process.env.NEXT_PUBLIC_VF_BASE_PATH || '') +
            (lang === 'fa' ? '/en/shop/' : '/fa/shop/')
          }
          lang={lang === 'fa' ? 'en' : 'fa'}
        >
          {lang === 'fa' ? 'English' : 'فارسی'}
        </a>
      </nav>
      <h1>{title}</h1>
      {body}
    </main>
  );
  if (fallback) notFound();

  const [view, key = ''] = segment.split('/');
  if (view && view !== 'shop' && view !== 'product')
    return shell(strings.catalog, <p>{strings.restricted}</p>);

  const retryPath = storePath + '/' + (segment ? segment + '/' : '');
  const unavailable = () => shell(strings.error, <a href={retryPath}>{strings.retry}</a>);
  if (view === 'product') {
    const token = liveRouteKey(key);
    const products = await loadLiveProducts(base, {token}).catch(() => null);
    if (!products) return unavailable();
    const product = products.find(record => record.token === token);
    if (!product) notFound();
    return shell(
      localized(product.name, lang) || product.token,
      <>
        <p>
          <bdi>{product.token}</bdi>
        </p>
        <p>{productPrice(product.latestProductPrice, lang)}</p>
        <p>{product.inStock ? strings.stock : strings.soldOut}</p>
        <p>{localized(product.description, lang)}</p>
        <p>{strings.restricted}</p>
      </>
    );
  }

  const categories = await loadLiveCategories(base).catch(() => null);
  if (!categories) return unavailable();
  const slug = liveRouteKey(key);
  const category =
    slug && categories.find(record => [record.slug.en, record.slug.fa].includes(slug));
  if (key && !category) notFound();
  const products = await loadLiveProducts(
    base,
    category ? {categoryId: String(category.id)} : {}
  ).catch(() => null);
  if (!products) return unavailable();
  const href = (record: (typeof categories)[number]) =>
    catalogPath + encodeURIComponent(localized(record.slug, lang)) + '/';
  return shell(
    (category && localized(category.name, lang)) || strings.catalog,
    <>
      {categories.length > 0 && (
        <nav aria-label={strings.categories}>
          <ul>
            <li>
              <a href={catalogPath}>{strings.all}</a>
            </li>
            {categories
              .filter(record => localized(record.slug, lang))
              .map(record => (
                <li key={record.id}>
                  <a href={href(record)}>
                    {localized(record.name, lang) || localized(record.slug, lang)}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      )}
      {products.length ? (
        <ul>
          {products.map(product => (
            <li key={product.token}>
              <a href={storePath + '/product/' + encodeURIComponent(product.token) + '/'}>
                {localized(product.name, lang) || product.token}
              </a>
              {' · '}
              {productPrice(product.latestProductPrice, lang)}
            </li>
          ))}
        </ul>
      ) : (
        <p>{strings.empty}</p>
      )}
      <p>{strings.restricted}</p>
    </>
  );
}
