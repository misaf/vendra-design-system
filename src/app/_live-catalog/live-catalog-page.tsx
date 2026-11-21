import 'server-only';
import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';
import {
  currentProductPrice,
  loadLiveCategories,
  loadLiveProducts,
  lookupLiveProduct
} from '../../platform/server/laravel/catalog.mjs';

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

type DescriptionNode = {type: string; content?: unknown; text?: unknown};

function isDescriptionNode(value: unknown): value is DescriptionNode {
  return !!value && typeof value === 'object' && 'type' in value && typeof value.type === 'string';
}

function descriptionText(value: unknown): string {
  if (!isDescriptionNode(value)) return '';
  if (value.type === 'text' && typeof value.text === 'string') return value.text;
  if (value.type === 'hardBreak') return ' ';
  return Array.isArray(value.content) ? value.content.map(descriptionText).join('') : '';
}

function descriptionParagraphs(value: unknown): string[] {
  if (!isDescriptionNode(value)) return [];
  if (['paragraph', 'heading', 'text'].includes(value.type)) return [descriptionText(value)];
  return Array.isArray(value.content) ? value.content.flatMap(descriptionParagraphs) : [];
}

function productDescription(values: Record<string, unknown> | undefined, lang: Locale) {
  const locales: Locale[] = [lang, 'en', 'fa'];
  const language = locales.find(locale => values?.[locale] != null);
  if (!language) return null;
  const value = values?.[language];
  const paragraphs =
    typeof value === 'string'
      ? [value]
      : isDescriptionNode(value) && value.type === 'doc'
        ? descriptionParagraphs(value)
        : [];
  return paragraphs
    .filter(text => text.trim())
    .map((text, index) => (
      <p key={index} lang={language} dir={language === 'fa' ? 'rtl' : 'ltr'}>
        {text}
      </p>
    ));
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

function productPrice(price: ReturnType<typeof currentProductPrice>, lang: Locale) {
  if (!price) return copy[lang].priceUnavailable;
  const {amount, currency} = price;
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
  const catalog = {
    base,
    storefrontOrigin: process.env.VF_ORIGIN?.trim() || undefined,
    locale: lang
  };
  if (view === 'product') {
    const result = await lookupLiveProduct(catalog, liveRouteKey(key));
    if (result.kind === 'missing') notFound();
    if (result.kind === 'unavailable') return unavailable();
    const {product, price} = result;
    return shell(
      localized(product.name, lang) || product.token,
      <>
        <p>
          <bdi>{product.token}</bdi>
        </p>
        <p>{productPrice(price, lang)}</p>
        <p>{product.inStock ? strings.stock : strings.soldOut}</p>
        {productDescription(product.description, lang)}
        <p>{strings.restricted}</p>
      </>
    );
  }

  const categories = await loadLiveCategories(catalog).catch(() => null);
  if (!categories) return unavailable();
  const slug = liveRouteKey(key);
  const category =
    slug && categories.find(record => [record.slug.en, record.slug.fa].includes(slug));
  if (key && !category) notFound();
  const products = await loadLiveProducts(
    catalog,
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
              {productPrice(currentProductPrice(product.latestProductPrice), lang)}
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
