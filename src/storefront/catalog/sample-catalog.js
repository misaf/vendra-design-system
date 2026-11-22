// Reference product, price, and media records shaped like the Vendra API (tests/fixtures/vendra-openapi.json).
// Amounts are in Toman. Product tokens identify designs, and names carry searchable descriptions.
// The sample photos are stored with the public product assets.

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
