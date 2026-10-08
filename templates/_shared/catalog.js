// Shared sample catalog for home, shop, search, saved items and product pricing.
// The VF_API_* lists are sample responses shaped like the Vendra API (uploads/openapi-*.json):
// ProductCategory, ProductPrice, Multimedia and Product. A live store replaces them with API data;
// vfProductFromApi turns each Product into the storefront's product object, VF_PRODUCTS.
// Products have no shown names: several designs can look alike, so each one is known by its unique code,
// Product.token (e.g. VF-7K2M4Q), which customers quote and the studio and sellers search by. Its category
// says what kind of product it is. Product.name holds a short searchable description that cards don't show.
// Amounts are in Toman. All sample products intentionally use a neutral image placeholder.
// Edit this file, then run: node templates/_build/generate.cjs
const VF_PRODUCT_PLACEHOLDER = 'assets/placeholders/product.svg';

// GET /api/catalog/product-categories
const VF_API_PRODUCT_CATEGORIES = [
  {
    id: 11,
    name: {en: 'Bouquets', fa: 'دسته‌گل'},
    slug: {en: 'bouquets', fa: 'دسته-گل'},
    description: {},
    position: 1,
    active: true
  },
  {
    id: 12,
    name: {en: 'Flower boxes', fa: 'باکس گل'},
    slug: {en: 'boxes', fa: 'باکس-گل'},
    description: {},
    position: 2,
    active: true
  },
  {
    id: 13,
    name: {en: 'Orchids', fa: 'ارکیده'},
    slug: {en: 'orchids', fa: 'ارکیده'},
    description: {},
    position: 3,
    active: true
  },
  {
    id: 14,
    name: {en: 'Bridal', fa: 'دسته‌گل عروس'},
    slug: {en: 'bridal', fa: 'دسته-گل-عروس'},
    description: {},
    position: 4,
    active: true
  }
];

// GET /api/catalog/product-prices (the latest price of each product)
const VF_API_PRODUCT_PRICES = [
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
const VF_API_MULTIMEDIA = [301, 302, 303].map(id => ({
  id,
  uuid: 'sample-' + id,
  name: 'Product placeholder',
  fileName: 'product.svg',
  collection: 'images',
  mimeType: 'image/svg+xml',
  bytes: 0,
  disk: 'public',
  url: VF_PRODUCT_PLACEHOLDER,
  generatedConversions: {},
  customProperties: {},
  responsiveImages: {}
}));
const VF_SAMPLE_MEDIA = [
  '/api/content/multimedia/301',
  '/api/content/multimedia/302',
  '/api/content/multimedia/303'
];

// GET /api/catalog/products
const VF_API_PRODUCTS = [
  {
    id: 101,
    token: 'VF-7K2M4Q',
    name: {en: 'Roses · lisianthus · satin', fa: 'رز · لیسیانتوس · ساتن'},
    slug: {en: 'roses-lisianthus-satin', fa: 'رز-لیسیانتوس-ساتن'},
    description: {
      en: 'Ivory garden roses and lisianthus in a linen-wrapped box, tied with satin.',
      fa: 'رز باغی عاجی و لیسیانتوس در باکسی با روکش کتان و روبان ساتن.'
    },
    quantity: 12,
    inStock: true,
    stockThreshold: null,
    position: 1,
    availableSoon: null,
    availabilityDate: null,
    productCategory: {id: 12, type: 'ProductCategory', label: 'Flower boxes'},
    productPrices: ['/api/catalog/product-prices/201'],
    latestProductPrice: '/api/catalog/product-prices/201',
    multimedia: VF_SAMPLE_MEDIA,
    options: []
  },
  {
    id: 102,
    token: 'VF-3HX9TP',
    name: {en: 'Seasonal · 15 stems', fa: 'فصلی · ۱۵ شاخه'},
    slug: {en: 'seasonal-15-stems', fa: 'فصلی-۱۵-شاخه'},
    description: {
      en: 'A seasonal bouquet of fifteen stems in soft lavender tones.',
      fa: 'دسته‌گلی فصلی با پانزده شاخه در رنگ‌های ملایم اسطوخودوسی.'
    },
    quantity: 20,
    inStock: true,
    stockThreshold: null,
    position: 2,
    availableSoon: null,
    availabilityDate: null,
    productCategory: {id: 11, type: 'ProductCategory', label: 'Bouquets'},
    productPrices: ['/api/catalog/product-prices/202'],
    latestProductPrice: '/api/catalog/product-prices/202',
    multimedia: VF_SAMPLE_MEDIA,
    options: []
  },
  {
    id: 103,
    token: 'VF-8RD5WN',
    name: {en: 'Phalaenopsis · ceramic pot', fa: 'فالانوپسیس · گلدان سرامیکی'},
    slug: {en: 'phalaenopsis-ceramic-pot', fa: 'فالانوپسیس-گلدان-سرامیکی'},
    description: {
      en: 'A Phalaenopsis orchid in a ceramic pot. Water when the roots turn silver and keep in indirect light.',
      fa: 'ارکیده فالانوپسیس در گلدان سرامیکی. وقتی ریشه‌ها نقره‌ای شدند آبیاری کنید و در نور غیرمستقیم نگه دارید.'
    },
    quantity: 8,
    inStock: true,
    stockThreshold: null,
    position: 3,
    availableSoon: null,
    availabilityDate: null,
    productCategory: {id: 13, type: 'ProductCategory', label: 'Orchids'},
    productPrices: ['/api/catalog/product-prices/203'],
    latestProductPrice: '/api/catalog/product-prices/203',
    multimedia: VF_SAMPLE_MEDIA,
    options: []
  },
  {
    id: 104,
    token: 'VF-4CJ6ZB',
    name: {en: 'Red roses · velvet box', fa: 'رز قرمز · باکس مخمل'},
    slug: {en: 'red-roses-velvet-box', fa: 'رز-قرمز-باکس-مخمل'},
    description: {
      en: 'Red roses arranged in a velvet hatbox for a bold gift.',
      fa: 'رزهای قرمز در باکس کلاهی مخمل برای هدیه‌ای چشمگیر.'
    },
    quantity: 6,
    inStock: true,
    stockThreshold: null,
    position: 4,
    availableSoon: null,
    availabilityDate: null,
    productCategory: {id: 12, type: 'ProductCategory', label: 'Flower boxes'},
    productPrices: ['/api/catalog/product-prices/204'],
    latestProductPrice: '/api/catalog/product-prices/204',
    multimedia: VF_SAMPLE_MEDIA,
    options: []
  },
  {
    id: 105,
    token: 'VF-9FA2KE',
    name: {en: 'Garden roses · eucalyptus', fa: 'رز باغی · اکالیپتوس'},
    slug: {en: 'garden-roses-eucalyptus', fa: 'رز-باغی-اکالیپتوس'},
    description: {
      en: 'Garden roses and eucalyptus arranged in a soft pink bouquet.',
      fa: 'رز باغی و اکالیپتوس در دسته‌گلی صورتی و لطیف.'
    },
    quantity: 15,
    inStock: true,
    stockThreshold: null,
    position: 5,
    availableSoon: null,
    availabilityDate: null,
    productCategory: {id: 11, type: 'ProductCategory', label: 'Bouquets'},
    productPrices: ['/api/catalog/product-prices/205'],
    latestProductPrice: '/api/catalog/product-prices/205',
    multimedia: VF_SAMPLE_MEDIA,
    options: []
  },
  {
    id: 106,
    token: 'VF-6MT3VY',
    name: {en: 'Peonies · ranunculus', fa: 'گل صد‌تومانی · آلاله'},
    slug: {en: 'peonies-ranunculus', fa: 'گل-صد‌تومانی-آلاله'},
    description: {
      en: 'An ivory bridal posy of peonies and ranunculus.',
      fa: 'دسته‌گل عروس عاجی با گل صدتومانی و آلاله.'
    },
    quantity: 0,
    inStock: false,
    stockThreshold: null,
    position: 6,
    availableSoon: null,
    availabilityDate: null,
    productCategory: {id: 14, type: 'ProductCategory', label: 'Bridal'},
    productPrices: ['/api/catalog/product-prices/206'],
    latestProductPrice: '/api/catalog/product-prices/206',
    multimedia: VF_SAMPLE_MEDIA,
    options: []
  }
];

// Storefront fields the API doesn't provide yet (templates/API.md, "Product data the storefront
// shows"), keyed by Product.token. `legacy` is the old slug, so earlier links and saved lists still
// work; `occasions` use the ids in VF_SHOP_OCCASIONS; `sizes: true` offers VF_SIZES; `noAddons`
// lists extras the product can't take; `care: true` uses the description as care advice; `same` is
// same-day delivery; `roses` feeds the roses filter.
const VF_PRODUCT_EXTRAS = {
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
    care: true
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
function vfApiRecord(list, iri) {
  return window.AG_COMMERCE.apiRecord(list, iri);
}

// The storefront's product object from an API Product, its price, photos and category, plus the
// storefront-only extras.
function vfProductFromApi(product, sources = {}) {
  return window.AG_COMMERCE.productFromApi(product, {
    prices: sources.prices || VF_API_PRODUCT_PRICES,
    media: sources.media || VF_API_MULTIMEDIA,
    categories: sources.categories || VF_API_PRODUCT_CATEGORIES,
    extras: sources.extras || VF_PRODUCT_EXTRAS,
    placeholder: VF_PRODUCT_PLACEHOLDER
  });
}

const VF_PRODUCTS = VF_API_PRODUCTS.map(product => vfProductFromApi(product));

// Sizes for products with `sizes: true`; price is added to the product's price.
const VF_SIZES = [
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
const VF_ADDONS = [
  {id: 'card', price: 150_000, name: {en: 'Handwritten card', fa: 'کارت دست‌نویس'}},
  {id: 'vase', price: 650_000, name: {en: 'Glass vase', fa: 'گلدان شیشه‌ای'}}
];

// Case, spaces, dashes and Persian or Arabic digits don't matter when a code is typed.
function vfNormalizeToken(text) {
  return window.AG_COMMERCE.normalizeCode(text);
}

// A product by its code, typed any way, or by its old slug (ivory, ivory-classic); null when unknown.
function vfFindProduct(text) {
  const raw = String(text || ''),
    key = vfNormalizeToken(raw);
  const slug = raw === 'ivory-classic' ? 'ivory' : raw;
  return (
    VF_PRODUCTS.find(product => product.legacy === slug) ||
    (key ? VF_PRODUCTS.find(product => vfNormalizeToken(product.id) === key) : null) ||
    null
  );
}

function vfProduct(id) {
  const product = vfFindProduct(id);
  if (!product) throw new Error('Unknown sample product: ' + id);
  return product;
}

// The product's code, from a code or an old slug ('' when unknown).
function vfProductId(id) {
  const product = vfFindProduct(id);
  return product ? product.id : '';
}

// Under the code, a product shows only its category, e.g. "Flower box". Its `sub` description is still searchable.
function vfProductSub(product, lang = 'en') {
  return VF_CATEGORY_ITEM[lang][product.cat];
}

function vfProductImage(product, lang = 'en', asset = product.image || VF_PRODUCT_PLACEHOLDER) {
  const src = /^(https?:|data:|\/)/.test(asset)
    ? asset
    : (window.VF_ASSET_BASE || '../../') + asset;
  const name = VF_CATEGORY_ITEM[lang][product.cat] + ' ' + vfTokenText(product.id);
  const label = lang === 'fa' ? 'جای تصویر محصول' : 'Product image placeholder';
  return {src, alt: asset === VF_PRODUCT_PLACEHOLDER ? label + ' — ' + name : name};
}

// Every product page photo; falls back to the card photo.
function vfProductImages(product, lang = 'en') {
  return (product.images || [product.image]).map(asset => vfProductImage(product, lang, asset));
}

// Lines added from the product page list their product, size and extras; older lines carry them in the id.
function vfLineProductId(line) {
  return vfProductId(line.productId || line.id.split('-')[0]) || line.productId || '';
}

function vfLineSize(line) {
  if ('size' in line) return line.size || null;
  const product = vfFindProduct(line.id.split('-')[0]);
  return product && product.sizes ? line.id.split('-')[1] || null : null;
}

// The code a line was ordered with: also its title in the bag, checkout, orders and messages.
function vfLineToken(line) {
  return line.token || vfLineProductId(line);
}

// A code inside other text, isolated so it stays left to right in Persian.
function vfTokenText(token) {
  return token ? '\u2066' + token + '\u2069' : '';
}

// A bag line's details: category, size and extras, e.g. "Flower box · Classic · 20 stems · Handwritten card".
function vfLineDetail(product, size, addons, lang) {
  const fa = lang === 'fa';
  return [VF_CATEGORY_ITEM[lang][product.cat]]
    .concat(product.sizes && size ? [size.name[lang], size.detail[lang]] : [])
    .concat(addons.map(addon => addon.name[lang]))
    .join(' · ');
}

// Each demo gets its own bag objects; prices and codes come from the same catalog.
function vfSampleBag() {
  const box = vfProduct('VF-7K2M4Q'),
    orchid = vfProduct('VF-8RD5WN');
  const classic = VF_SIZES.find(size => size.id === 'classic'),
    card = VF_ADDONS.find(addon => addon.id === 'card');
  return [
    {
      id: box.id + '-classic-card',
      productId: box.id,
      token: box.id,
      size: 'classic',
      addons: ['card'],
      unit: box.price + classic.price + card.price,
      qty: 1,
      image: box.image,
      card: 'Happy birthday, Shirin.',
      en: [box.id, vfLineDetail(box, classic, [card], 'en')],
      fa: [box.id, vfLineDetail(box, classic, [card], 'fa')]
    },
    {
      id: orchid.id,
      productId: orchid.id,
      token: orchid.id,
      size: null,
      addons: [],
      unit: orchid.price,
      qty: 1,
      image: orchid.image,
      en: [orchid.id, vfLineDetail(orchid, null, [], 'en')],
      fa: [orchid.id, vfLineDetail(orchid, null, [], 'fa')]
    }
  ];
}

// A line's extras: listed on lines added from the product page, read from the id on older lines.
function vfLineAddons(line) {
  return (
    line.addons ||
    VF_ADDONS.filter(addon => line.id.split(/[-+]/).includes(addon.id)).map(addon => addon.id)
  );
}

function vfLineHasCard(line) {
  return vfLineAddons(line).includes('card');
}

// Card messages written for an order's lines, named when there are several. Older orders kept one
// order-wide message in delivery.card.
function vfCardMessages(lines, delivery, lang) {
  // The message keeps its own direction, so English inside Persian quotes (or the reverse) reads correctly.
  const quote = text =>
    lang === 'fa' ? '«\u2068' + text + '\u2069»' : '“\u2068' + text + '\u2069”';
  const cards = (lines || []).filter(line => String(line.card || '').trim());
  if (!cards.length) return delivery && delivery.card ? delivery.card : '';
  return cards.length === 1
    ? quote(cards[0].card)
    : cards.map(line => vfTokenText(vfLineToken(line)) + ': ' + quote(line.card)).join(' · ');
}

// The same line with a handwritten card added, priced and named as the product page would.
function vfLineWithCard(line) {
  const productId = vfLineProductId(line);
  const size = vfLineSize(line);
  const addons = VF_ADDONS.filter(
    addon => addon.id === 'card' || vfLineAddons(line).includes(addon.id)
  );
  const names = lang => {
    const detail = line[lang][1]
      .split(' · ')
      .filter(part => !VF_ADDONS.some(addon => addon.name[lang] === part));
    return [vfLineToken(line), detail.concat(addons.map(addon => addon.name[lang])).join(' · ')];
  };
  return {
    ...line,
    productId,
    token: vfLineToken(line),
    size,
    addons: addons.map(addon => addon.id),
    id: productId + (size ? '-' + size : '') + '-' + addons.map(addon => addon.id).join('+'),
    unit: line.unit + VF_ADDONS.find(addon => addon.id === 'card').price,
    en: names('en'),
    fa: names('fa')
  };
}

// Each product's [English, Persian] detail text, from Product.description, keyed by product code.
const VF_PRODUCT_DETAILS = Object.fromEntries(
  VF_API_PRODUCTS.map(product => [product.token, [product.description.en, product.description.fa]])
);

function vfReorderLines(lines) {
  return lines.flatMap(line => {
    const product = vfFindProduct(vfLineProductId(line));
    if (!product || product.inStock === false) return [];
    const size = VF_SIZES.find(item => item.id === vfLineSize(line));
    const addons = vfLineAddons(line);
    const extra = VF_ADDONS.filter(addon => addons.includes(addon.id)).reduce(
      (sum, addon) => sum + addon.price,
      0
    );
    return [{...line, unit: product.price + (product.sizes && size ? size.price : 0) + extra}];
  });
}

function vfLineAvailable(line) {
  const p = vfFindProduct(vfLineProductId(line));
  return !!p && p.inStock !== false;
}

// Saved and recently viewed lists hold product codes; older lists held slugs, read here as codes.
function vfProductIds(ids) {
  return Array.isArray(ids) ? [...new Set(ids.map(vfProductId).filter(Boolean))] : [];
}

// Recently viewed products, newest first, kept in this browser only.
const VF_RECENT_KEY = 'vendra-recently-viewed';
function vfRecentlyViewed() {
  try {
    const ids = JSON.parse(localStorage.getItem(VF_RECENT_KEY) || '[]');
    return vfProductIds(ids);
  } catch {
    return [];
  }
}
function vfRememberViewed(id) {
  try {
    id = vfProductId(id);
    if (id)
      localStorage.setItem(
        VF_RECENT_KEY,
        JSON.stringify([id, ...vfRecentlyViewed().filter(x => x !== id)].slice(0, 8))
      );
  } catch {}
}
