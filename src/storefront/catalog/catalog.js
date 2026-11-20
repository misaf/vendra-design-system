// Product lookup, search, and presentation for the storefront catalog.
import {VF_API_PRODUCT_CATEGORIES} from './product-categories.js';
import {VF_CATEGORY_COPY, VF_CATEGORY_ITEM} from './categories.js';
import {apiRecord, productFromApi} from './product-api.js';
import {normalizeCode, searchIndex, matchesSearch} from './search-index.js';
import {VF_STORE} from '../store/store-config.js';
import {vfAssetBase} from '../../platform/browser/environment.js';
import {
  VF_API_PRODUCT_PRICES,
  VF_API_MULTIMEDIA,
  VF_API_PRODUCTS,
  VF_PRODUCT_EXTRAS
} from './sample-catalog.js';
export const VF_PRODUCT_PLACEHOLDER = 'assets/placeholders/product.svg';

// An API record by its IRI (e.g. /api/catalog/product-prices/201) from a sample list.
export function vfApiRecord(list, iri) {
  return apiRecord(list, iri);
}

// The storefront's product object from an API Product, its price, photos and category, plus the
// storefront-only extras.
export function vfProductFromApi(product, sources = {}) {
  return productFromApi(product, {
    prices: sources.prices || VF_API_PRODUCT_PRICES,
    media: sources.media || VF_API_MULTIMEDIA,
    categories: sources.categories || VF_API_PRODUCT_CATEGORIES,
    extras: sources.extras || VF_PRODUCT_EXTRAS,
    placeholder: VF_PRODUCT_PLACEHOLDER
  });
}

export const VF_PRODUCTS = VF_API_PRODUCTS.map(product => vfProductFromApi(product));

// Sizes for products with `sizes: true`; price is added to the product's price.
export const VF_SIZES = [
  {
    id: 'petite',
    price: 0,
    name: {en: 'Petite', fa: 'کوچک'},
    detail: {en: '12 stems', fa: '۱۲ شاخه'}
  },
  {
    id: 'classic',
    price: 800_000,
    name: {en: 'Classic', fa: 'کلاسیک'},
    detail: {en: '20 stems', fa: '۲۰ شاخه'}
  },
  {
    id: 'generous',
    price: 1_900_000,
    name: {en: 'Generous', fa: 'بزرگ'},
    detail: {en: '32 stems', fa: '۳۲ شاخه'}
  }
];
// Optional extras a product can take.
export const VF_ADDONS = [
  {id: 'card', price: 150_000, name: {en: 'Handwritten card', fa: 'کارت دست‌نویس'}},
  {id: 'vase', price: 650_000, name: {en: 'Glass vase', fa: 'گلدان شیشه‌ای'}}
];

// Case, spaces, dashes and Persian or Arabic digits don't matter when a code is typed.
export function vfNormalizeToken(text) {
  return normalizeCode(text);
}

// A product by its code, typed any way, or by its old slug (ivory, ivory-classic); null when unknown.
export function vfFindProduct(text) {
  const raw = String(text || ''),
    key = vfNormalizeToken(raw);
  const slug = raw === 'ivory-classic' ? 'ivory' : raw;
  return (
    VF_PRODUCTS.find(product => product.legacy === slug) ||
    (key ? VF_PRODUCTS.find(product => vfNormalizeToken(product.id) === key) : null) ||
    null
  );
}

export function vfProduct(id) {
  const product = vfFindProduct(id);
  if (!product) throw new Error('Unknown sample product: ' + id);
  return product;
}

// The product's code, from a code or an old slug ('' when unknown).
export function vfProductId(id) {
  const product = vfFindProduct(id);
  return product ? product.id : '';
}

// Under the code, a product shows only its category, e.g. "Flower box". Its `sub` description is still searchable.
// A code inside other text, isolated so it stays left to right in Persian.
export function vfTokenText(token) {
  return token ? '\u2066' + token + '\u2069' : '';
}

export function vfProductSub(product, lang = 'en') {
  return VF_CATEGORY_ITEM[lang][product.cat];
}

// A product photo for Picture, with its alt text in `lang`. `asset` is a URL or a photo
// (imageFromApi in product-api.js); a relative URL is resolved against the asset base (vfAssetBase).
export function vfProductImage(
  product,
  lang = 'en',
  asset = product.image || VF_PRODUCT_PLACEHOLDER,
  index = 0
) {
  const photo = typeof asset === 'string' ? {src: asset} : asset;
  const src = /^(https?:|data:|\/)/.test(photo.src) ? photo.src : vfAssetBase() + photo.src;
  const name = VF_CATEGORY_ITEM[lang][product.cat] + ' ' + vfTokenText(product.id);
  const label = lang === 'fa' ? 'جای تصویر محصول' : 'Product image placeholder';
  const alts = product[lang] && product[lang].alts;
  const alt =
    photo.src === VF_PRODUCT_PLACEHOLDER ? label + ' — ' + name : (alts && alts[index]) || name;
  const resolveSet = value =>
    value &&
    value
      .split(',')
      .map(candidate => {
        const [url, descriptor] = candidate.trim().split(/\s+/);
        return (
          (/^(https?:|data:|\/)/.test(url) ? url : vfAssetBase() + url) +
          (descriptor ? ' ' + descriptor : '')
        );
      })
      .join(', ');
  return {
    ...photo,
    src,
    alt,
    ...(photo.srcSet ? {srcSet: resolveSet(photo.srcSet)} : {}),
    ...(photo.sources
      ? {sources: photo.sources.map(source => ({...source, srcSet: resolveSet(source.srcSet)}))}
      : {})
  };
}

// Every product page photo; falls back to the card photo.
export function vfProductImages(product, lang = 'en') {
  return (product.images || [product.image]).map((asset, index) =>
    vfProductImage(product, lang, asset, index)
  );
}

// Each product's search index (searchIndex of its kind, description and category in both
// languages), built once per product rather than on every keystroke.
const vfProductSearchIndexes = new WeakMap();
function vfProductSearchIndex(product) {
  let index = vfProductSearchIndexes.get(product);
  if (index === undefined) {
    index = searchIndex(
      ['en', 'fa']
        .map(
          lang =>
            vfProductSub(product, lang) +
            ' ' +
            product[lang].sub +
            ' ' +
            VF_CATEGORY_COPY[lang][product.cat]
        )
        .join(' ')
    );
    vfProductSearchIndexes.set(product, index);
  }
  return index;
}

// The products a search finds (the search page and the counter presentation). A product code, typed
// whole or in part (3 or more characters), finds its product; so do its kind and description, with
// every word of the query in any order, however Persian is typed (Arabic ي/ك, half-spaces, diacritics,
// digits: normalizeSearchText in search-index.js).
export function vfSearchProducts(text, products = VF_PRODUCTS) {
  const q = String(text || '').trim();
  const code = vfNormalizeToken(q);
  const byCode = p => code.length >= 3 && vfNormalizeToken(p.id).includes(code);
  return q ? products.filter(p => byCode(p) || matchesSearch(vfProductSearchIndex(p), q)) : [];
}

export const VF_SAVED_IDS_PATTERN = /^[\w,-]{1,400}$/;

// Saved and recently viewed lists hold product codes; older lists held slugs, read here as codes.
export function vfProductIds(ids) {
  return Array.isArray(ids) ? [...new Set(ids.map(vfProductId).filter(Boolean))] : [];
}

// The studio's ready-made designs (VF_STORE.featuredProducts): already arranged, so quickest to send.
// Their cards and page say "Ready" in place of any other badge.
export const VF_READY_BADGE = {en: 'Ready', fa: 'آماده'};
export function vfReady(product) {
  return product.inStock !== false && VF_STORE.featuredProducts.includes(product.id);
}
export function vfProductBadge(product, lang) {
  return vfReady(product) ? VF_READY_BADGE[lang] : product[lang].badge;
}
