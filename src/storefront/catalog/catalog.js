// Shared sample catalog for home, shop, search, saved items and product pricing.
// The VF_API_* lists are sample responses shaped like the Vendra API (tests/fixtures/vendra-openapi.json):
// ProductCategory, ProductPrice, Multimedia and Product. A live store replaces them with API data;
// vfProductFromApi turns each Product into the storefront's product object, VF_PRODUCTS.
// Products have no shown names: several designs can look alike, so each one is known by its unique code,
// Product.token (e.g. VF-7K2M4Q), which customers quote and the studio and sellers search by. Its category
// says what kind of product it is. Product.name holds a short searchable description that cards don't show.
// Amounts are in Toman. Sample products use locally stored AI-generated demonstration photos; the neutral placeholder remains a fallback.
import {VF_API_PRODUCT_CATEGORIES} from './product-categories.js';
import {VF_CATEGORY_COPY, VF_CATEGORY_ITEM} from './categories.js';
import {apiRecord, productFromApi} from './product-api.js';
import {normalizeCode, searchIndex, matchesSearch} from './search-index.js';
import {VF_STORE} from '../store/store-config.js';
import {vfAssetBase, vfStoredValue} from '../../platform/browser/environment.js';
export const VF_PRODUCT_PLACEHOLDER = 'assets/placeholders/product.svg';

// GET /api/catalog/product-prices (the latest price of each product)
export const VF_API_PRODUCT_PRICES = [
  {
    id: 201,
    minorAmount: 4_100_000,
    amount: 4_100_000,
    currency: 'IRT',
    formatted: '4,100,000 Toman'
  },
  {
    id: 202,
    minorAmount: 2_800_000,
    amount: 2_800_000,
    currency: 'IRT',
    formatted: '2,800,000 Toman'
  },
  {
    id: 203,
    minorAmount: 3_400_000,
    amount: 3_400_000,
    currency: 'IRT',
    formatted: '3,400,000 Toman'
  },
  {
    id: 204,
    minorAmount: 5_200_000,
    amount: 5_200_000,
    currency: 'IRT',
    formatted: '5,200,000 Toman'
  },
  {
    id: 205,
    minorAmount: 2_200_000,
    amount: 2_200_000,
    currency: 'IRT',
    formatted: '2,200,000 Toman'
  },
  {
    id: 206,
    minorAmount: 6_500_000,
    amount: 6_500_000,
    currency: 'IRT',
    formatted: '6,500,000 Toman'
  }
];

// GET /api/content/multimedia (the first photo is the card photo; the rest fill the product page gallery)
const VF_SAMPLE_PHOTOS = [
  'ivory-box',
  'pink-bouquet',
  'orchid',
  'red-box',
  'blush-bouquet',
  'bridal'
];
export const VF_API_MULTIMEDIA = VF_SAMPLE_PHOTOS.flatMap((name, index) =>
  [0, 1, 2].map(offset => ({
    id: 301 + index * 3 + offset,
    uuid: 'sample-' + (301 + index * 3 + offset),
    name: 'AI-generated sample product',
    fileName: name + '.webp',
    collection: 'images',
    mimeType: 'image/webp',
    bytes: 0,
    disk: 'public',
    url: 'assets/products/' + name + '.webp',
    generatedConversions: {},
    customProperties: {width: '1120', height: '1400'},
    responsiveImages: {
      480: 'assets/products/' + name + '-480.webp',
      1120: 'assets/products/' + name + '.webp'
    }
  }))
);
const VF_SAMPLE_MEDIA = VF_SAMPLE_PHOTOS.map((_, index) =>
  [0, 1, 2].map(offset => '/api/content/multimedia/' + (301 + index * 3 + offset))
);

// GET /api/catalog/products
export const VF_API_PRODUCTS = [
  {
    id: 101,
    token: 'VF-7K2M4Q',
    name: {en: 'Roses · lisianthus · satin', fa: 'رز، لیسیانتوس، ساتن'},
    slug: {en: 'roses-lisianthus-satin', fa: 'رز-لیسیانتوس-ساتن'},
    description: {
      en: 'Ivory garden roses and lisianthus in a linen-wrapped box, tied with satin.',
      fa: 'رز باغی عاجی و لیسیانتوس در باکسی با روکش کتان و روبان ساتن.'
    },
    quantity: 12,
    inStock: true,
    stockThreshold: 3,
    position: 1,
    availableSoon: null,
    availabilityDate: null,
    productCategory: {id: 12, type: 'ProductCategory', label: 'Flower boxes'},
    productPrices: ['/api/catalog/product-prices/201'],
    latestProductPrice: '/api/catalog/product-prices/201',
    multimedia: VF_SAMPLE_MEDIA[0],
    options: []
  },
  {
    id: 102,
    token: 'VF-3HX9TP',
    name: {en: 'Seasonal · 15 stems', fa: 'فصلی، ۱۵ شاخه'},
    slug: {en: 'seasonal-15-stems', fa: 'فصلی-۱۵-شاخه'},
    description: {
      en: 'A seasonal bouquet of fifteen stems in soft lavender tones.',
      fa: 'دسته‌گلی فصلی با پانزده شاخه در رنگ‌های ملایم اسطوخودوسی.'
    },
    quantity: 20,
    inStock: true,
    stockThreshold: 3,
    position: 2,
    availableSoon: null,
    availabilityDate: null,
    productCategory: {id: 11, type: 'ProductCategory', label: 'Bouquets'},
    productPrices: ['/api/catalog/product-prices/202'],
    latestProductPrice: '/api/catalog/product-prices/202',
    multimedia: VF_SAMPLE_MEDIA[1],
    options: []
  },
  {
    id: 103,
    token: 'VF-8RD5WN',
    name: {en: 'Phalaenopsis · ceramic pot', fa: 'فالانوپسیس، گلدان سرامیکی'},
    slug: {en: 'phalaenopsis-ceramic-pot', fa: 'فالانوپسیس-گلدان-سرامیکی'},
    description: {
      en: 'A Phalaenopsis orchid in a ceramic pot.',
      fa: 'ارکیده فالانوپسیس در گلدان سرامیکی.'
    },
    quantity: 8,
    inStock: true,
    stockThreshold: 3,
    position: 3,
    availableSoon: null,
    availabilityDate: null,
    productCategory: {id: 13, type: 'ProductCategory', label: 'Orchids'},
    productPrices: ['/api/catalog/product-prices/203'],
    latestProductPrice: '/api/catalog/product-prices/203',
    multimedia: VF_SAMPLE_MEDIA[2],
    options: []
  },
  {
    id: 104,
    token: 'VF-4CJ6ZB',
    name: {en: 'Red roses · velvet box', fa: 'رز قرمز، باکس مخمل'},
    slug: {en: 'red-roses-velvet-box', fa: 'رز-قرمز-باکس-مخمل'},
    description: {
      en: 'Red roses arranged in a velvet hatbox for a bold gift.',
      fa: 'رزهای قرمز در باکس کلاهی مخمل برای هدیه‌ای چشمگیر.'
    },
    quantity: 6,
    inStock: true,
    stockThreshold: 3,
    position: 4,
    availableSoon: null,
    availabilityDate: null,
    productCategory: {id: 12, type: 'ProductCategory', label: 'Flower boxes'},
    productPrices: ['/api/catalog/product-prices/204'],
    latestProductPrice: '/api/catalog/product-prices/204',
    multimedia: VF_SAMPLE_MEDIA[3],
    options: []
  },
  {
    id: 105,
    token: 'VF-9FA2KE',
    name: {en: 'Garden roses · eucalyptus', fa: 'رز باغی، اکالیپتوس'},
    slug: {en: 'garden-roses-eucalyptus', fa: 'رز-باغی-اکالیپتوس'},
    description: {
      en: 'Garden roses and eucalyptus arranged in a soft pink bouquet.',
      fa: 'رز باغی و اکالیپتوس در دسته‌گلی صورتی و لطیف.'
    },
    quantity: 2,
    inStock: true,
    stockThreshold: 3,
    position: 5,
    availableSoon: null,
    availabilityDate: null,
    productCategory: {id: 11, type: 'ProductCategory', label: 'Bouquets'},
    productPrices: ['/api/catalog/product-prices/205'],
    latestProductPrice: '/api/catalog/product-prices/205',
    multimedia: VF_SAMPLE_MEDIA[4],
    options: []
  },
  {
    id: 106,
    token: 'VF-6MT3VY',
    name: {en: 'Peonies · ranunculus', fa: 'گل صد‌تومانی، آلاله'},
    slug: {en: 'peonies-ranunculus', fa: 'گل-صد‌تومانی-آلاله'},
    description: {
      en: 'An ivory bridal posy of peonies and ranunculus.',
      fa: 'دسته‌گل عروس عاجی با گل صدتومانی و آلاله.'
    },
    quantity: 0,
    inStock: false,
    stockThreshold: 3,
    position: 6,
    availableSoon: true,
    availabilityDate: '2026-10-12',
    productCategory: {id: 14, type: 'ProductCategory', label: 'Bridal'},
    productPrices: ['/api/catalog/product-prices/206'],
    latestProductPrice: '/api/catalog/product-prices/206',
    multimedia: VF_SAMPLE_MEDIA[5],
    options: []
  }
];

// Storefront fields the API doesn't provide yet (docs/API.md, "Product data the storefront
// shows"), keyed by Product.token. `legacy` is the old slug, so earlier links and saved lists still
// work; `occasions` use the ids in VF_SHOP_OCCASIONS; `sizes: true` offers VF_SIZES; `noAddons`
// lists extras the product can't take; `care` holds localized advice separate from its description; `same` is
// same-day delivery; `roses` feeds the roses filter.
export const VF_PRODUCT_EXTRAS = {
  'VF-7K2M4Q': {
    legacy: 'ivory',
    occasions: ['birthday', 'thanks'],
    sizes: true,
    same: true,
    roses: true,
    badge: {en: 'New', fa: 'جدید'}
  },
  'VF-3HX9TP': {legacy: 'lavender', occasions: ['birthday', 'sympathy'], same: true},
  'VF-8RD5WN': {
    legacy: 'orchid',
    occasions: ['thanks', 'sympathy'],
    noAddons: ['vase'],
    care: {
      en: 'Water when the roots turn silver and keep in indirect light.',
      fa: 'وقتی ریشه‌ها نقره‌ای شدند آبیاری کنید و در نور غیرمستقیم نگه دارید.'
    }
  },
  'VF-4CJ6ZB': {
    legacy: 'crimson',
    occasions: ['anniversary'],
    roses: true,
    badge: {en: 'Bestseller', fa: 'پرفروش'}
  },
  'VF-9FA2KE': {
    legacy: 'blush',
    occasions: ['anniversary', 'birthday'],
    same: true,
    roses: true
  },
  'VF-6MT3VY': {legacy: 'bridal', occasions: []}
};

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

// Each product's [English, Persian] detail text, from Product.description, keyed by product code.
export const VF_PRODUCT_DETAILS = Object.fromEntries(
  VF_API_PRODUCTS.map(product => [product.token, [product.description.en, product.description.fa]])
);

export const VF_SAVED_IDS_PATTERN = /^[\w,-]{1,400}$/;

// Saved and recently viewed lists hold product codes; older lists held slugs, read here as codes.
export function vfProductIds(ids) {
  return Array.isArray(ids) ? [...new Set(ids.map(vfProductId).filter(Boolean))] : [];
}

// Recently viewed products, newest first, kept in this browser only.
export const VF_RECENT_KEY = 'vendra-recently-viewed';
export function vfRecentlyViewed() {
  try {
    const ids = JSON.parse(vfStoredValue(VF_RECENT_KEY) || '[]');
    return vfProductIds(ids);
  } catch {
    return [];
  }
}
export function vfRememberViewed(id) {
  try {
    id = vfProductId(id);
    if (id)
      localStorage.setItem(
        VF_RECENT_KEY,
        JSON.stringify([id, ...vfRecentlyViewed().filter(x => x !== id)].slice(0, 8))
      );
  } catch {}
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
