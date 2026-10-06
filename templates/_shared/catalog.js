// Shared sample catalog for home, shop, search, saved items and product pricing.
// Products have no names: several designs can look alike, so each one is known by its unique code (`id`),
// which customers quote and the studio and sellers search by. Its category says what kind of product it is.
// Amounts are in Toman. `en`/`fa` hold a short description (`sub`, searchable but not shown: cards show only the category) and an optional `badge`.
// `sizes: true` offers VF_SIZES; `noAddons` lists extras the product can't take; `care: true` uses the
// product's own detail text as its care advice. `legacy` is the old slug, so earlier links and saved lists still work.
// occasions use the ids in VF_SHOP_OCCASIONS (translations/categories.js).
// Edit this file, then run: node templates/_build/generate.cjs
// All sample products intentionally use a neutral image placeholder.
// Set an individual product's image path when adapting the template to a real store.
// `image` is the card photo; optional `images` lists every photo for the product page gallery.
const VF_PRODUCT_PLACEHOLDER = 'assets/placeholders/product.svg';
const VF_SAMPLE_GALLERY = [VF_PRODUCT_PLACEHOLDER, VF_PRODUCT_PLACEHOLDER, VF_PRODUCT_PLACEHOLDER];
const VF_PRODUCTS = [
  {
    id: 'VF-7K2M4Q', legacy: 'ivory', occasions: ['birthday', 'thanks'], cat: 'boxes', sizes: true, price: 4_100_000, same: true, roses: true, image: VF_PRODUCT_PLACEHOLDER, images: VF_SAMPLE_GALLERY,
    en: {sub: 'Roses · lisianthus · satin', badge: 'New'},
    fa: {sub: 'رز · لیسیانتوس · ساتن', badge: 'جدید'}
  },
  {
    id: 'VF-3HX9TP', legacy: 'lavender', occasions: ['birthday', 'sympathy'], cat: 'bouquets', price: 2_800_000, same: true, image: VF_PRODUCT_PLACEHOLDER, images: VF_SAMPLE_GALLERY,
    en: {sub: 'Seasonal · 15 stems'},
    fa: {sub: 'فصلی · ۱۵ شاخه'}
  },
  {
    id: 'VF-8RD5WN', legacy: 'orchid', occasions: ['thanks', 'sympathy'], cat: 'orchids', noAddons: ['vase'], care: true, price: 3_400_000, image: VF_PRODUCT_PLACEHOLDER, images: VF_SAMPLE_GALLERY,
    en: {sub: 'Phalaenopsis · ceramic pot'},
    fa: {sub: 'فالانوپسیس · گلدان سرامیکی'}
  },
  {
    id: 'VF-4CJ6ZB', legacy: 'crimson', occasions: ['anniversary'], cat: 'boxes', price: 5_200_000, roses: true, image: VF_PRODUCT_PLACEHOLDER, images: VF_SAMPLE_GALLERY,
    en: {sub: 'Red roses · velvet box', badge: 'Bestseller'},
    fa: {sub: 'رز قرمز · باکس مخمل', badge: 'پرفروش'}
  },
  {
    id: 'VF-9FA2KE', legacy: 'blush', occasions: ['anniversary', 'birthday'], cat: 'bouquets', price: 2_200_000, same: true, roses: true, image: VF_PRODUCT_PLACEHOLDER, images: VF_SAMPLE_GALLERY,
    en: {sub: 'Garden roses · eucalyptus'},
    fa: {sub: 'رز باغی · اکالیپتوس'}
  },
  {
    id: 'VF-6MT3VY', legacy: 'bridal', occasions: [], cat: 'bridal', inStock: false, price: 6_500_000, image: VF_PRODUCT_PLACEHOLDER, images: VF_SAMPLE_GALLERY,
    en: {sub: 'Peonies · ranunculus'},
    fa: {sub: 'گل صد‌تومانی · آلاله'}
  }
];

// Sizes for products with `sizes: true`: [id, extra price, English name, Persian name, English detail, Persian detail].
/** @type {[id: string, price: number, en: string, fa: string, enDetail: string, faDetail: string][]} */
const VF_SIZES = [
  ['petite', 0, 'Petite', 'کوچک', '12 stems', '۱۲ شاخه'],
  ['classic', 800_000, 'Classic', 'کلاسیک', '20 stems', '۲۰ شاخه'],
  ['generous', 1_900_000, 'Generous', 'بزرگ', '32 stems', '۳۲ شاخه']
];
// Optional extras: [id, price, English name, Persian name].
/** @type {[id: string, price: number, en: string, fa: string][]} */
const VF_ADDONS = [
  ['card', 150_000, 'Handwritten card', 'کارت دست‌نویس'],
  ['vase', 650_000, 'Glass vase', 'گلدان شیشه‌ای']
];

// Case, spaces, dashes and Persian or Arabic digits don't matter when a code is typed.
function vfNormalizeToken(text) {
  return vfLatin(text || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

// A product by its code, typed any way, or by its old slug (ivory, ivory-classic); null when unknown.
function vfFindProduct(text) {
  const raw = String(text || ''), key = vfNormalizeToken(raw);
  const slug = raw === 'ivory-classic' ? 'ivory' : raw;
  return VF_PRODUCTS.find(product => product.legacy === slug) || (key ? VF_PRODUCTS.find(product => vfNormalizeToken(product.id) === key) : null) || null;
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
  const src = /^(https?:|data:|\/)/.test(asset) ? asset : (window.VF_ASSET_BASE || '../../') + asset;
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
    .concat(product.sizes && size ? [size[fa ? 3 : 2], size[fa ? 5 : 4]] : [])
    .concat(addons.map(addon => addon[fa ? 3 : 2])).join(' · ');
}

// Each demo gets its own bag objects; prices and codes come from the same catalog.
function vfSampleBag() {
  const box = vfProduct('VF-7K2M4Q'), orchid = vfProduct('VF-8RD5WN');
  const classic = VF_SIZES.find(size => size[0] === 'classic'), card = VF_ADDONS.find(addon => addon[0] === 'card');
  return [
    {
      id: box.id + '-classic-card', productId: box.id, token: box.id, size: 'classic', addons: ['card'], unit: box.price + classic[1] + card[1], qty: 1, image: box.image,
      card: 'Happy birthday, Shirin.',
      en: [box.id, vfLineDetail(box, classic, [card], 'en')],
      fa: [box.id, vfLineDetail(box, classic, [card], 'fa')]
    },
    {id: orchid.id, productId: orchid.id, token: orchid.id, size: null, addons: [], unit: orchid.price, qty: 1, image: orchid.image,
      en: [orchid.id, vfLineDetail(orchid, null, [], 'en')], fa: [orchid.id, vfLineDetail(orchid, null, [], 'fa')]}
  ];
}

// A line's extras: listed on lines added from the product page, read from the id on older lines.
function vfLineAddons(line) {
  return line.addons || VF_ADDONS.filter(addon => line.id.split(/[-+]/).includes(addon[0])).map(addon => addon[0]);
}

function vfLineHasCard(line) {
  return vfLineAddons(line).includes('card');
}

// Card messages written for an order's lines, named when there are several. Older orders kept one
// order-wide message in delivery.card.
function vfCardMessages(lines, delivery, lang) {
  // The message keeps its own direction, so English inside Persian quotes (or the reverse) reads correctly.
  const quote = text => (lang === 'fa' ? '«\u2068' + text + '\u2069»' : '“\u2068' + text + '\u2069”');
  const cards = (lines || []).filter(line => String(line.card || '').trim());
  if (!cards.length) return delivery && delivery.card ? delivery.card : '';
  return cards.length === 1 ? quote(cards[0].card) : cards.map(line => vfTokenText(vfLineToken(line)) + ': ' + quote(line.card)).join(' · ');
}

// The same line with a handwritten card added, priced and named as the product page would.
function vfLineWithCard(line) {
  const productId = vfLineProductId(line);
  const size = vfLineSize(line);
  const addons = VF_ADDONS.filter(addon => addon[0] === 'card' || vfLineAddons(line).includes(addon[0]));
  const names = lang => {
    const index = lang === 'en' ? 2 : 3;
    const detail = line[lang][1].split(' · ').filter(part => !VF_ADDONS.some(addon => addon[index] === part));
    return [vfLineToken(line), detail.concat(addons.map(addon => addon[index])).join(' · ')];
  };
  return {
    ...line, productId, token: vfLineToken(line), size, addons: addons.map(addon => addon[0]),
    id: productId + (size ? '-' + size : '') + '-' + addons.map(addon => addon[0]).join('+'),
    unit: line.unit + VF_ADDONS.find(addon => addon[0] === 'card')[1],
    en: names('en'), fa: names('fa')
  };
}

// Bilingual detail copy follows the same [English, Persian] convention as the catalog, keyed by product code.
const VF_PRODUCT_DETAILS = {
  'VF-7K2M4Q': ['Ivory garden roses and lisianthus in a linen-wrapped box, tied with satin.', 'رز باغی عاجی و لیسیانتوس در باکسی با روکش کتان و روبان ساتن.'],
  'VF-3HX9TP': ['A seasonal bouquet of fifteen stems in soft lavender tones.', 'دسته‌گلی فصلی با پانزده شاخه در رنگ‌های ملایم اسطوخودوسی.'],
  'VF-8RD5WN': ['A Phalaenopsis orchid in a ceramic pot. Water when the roots turn silver and keep in indirect light.', 'ارکیده فالانوپسیس در گلدان سرامیکی. وقتی ریشه‌ها نقره‌ای شدند آبیاری کنید و در نور غیرمستقیم نگه دارید.'],
  'VF-4CJ6ZB': ['Red roses arranged in a velvet hatbox for a bold gift.', 'رزهای قرمز در باکس کلاهی مخمل برای هدیه‌ای چشمگیر.'],
  'VF-9FA2KE': ['Garden roses and eucalyptus arranged in a soft pink bouquet.', 'رز باغی و اکالیپتوس در دسته‌گلی صورتی و لطیف.'],
  'VF-6MT3VY': ['An ivory bridal posy of peonies and ranunculus.', 'دسته‌گل عروس عاجی با گل صدتومانی و آلاله.']
};

function vfReorderLines(lines) {
 return lines.flatMap(line => {
  const product=vfFindProduct(vfLineProductId(line));
  if(!product||product.inStock===false)return [];
  const size=VF_SIZES.find(s=>s[0]===vfLineSize(line));
  const addons=vfLineAddons(line);
  const extra=VF_ADDONS.filter(a=>addons.includes(a[0])).reduce((sum,a)=>sum+a[1],0);
  return [{...line,unit:product.price+(product.sizes&&size?size[1]:0)+extra}];
 });
}

function vfLineAvailable(line){const p=vfFindProduct(vfLineProductId(line));return !!p&&p.inStock!==false;}

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
  } catch (_) {
    return [];
  }
}
function vfRememberViewed(id) {
  try {
    id = vfProductId(id);
    if (id) localStorage.setItem(VF_RECENT_KEY, JSON.stringify([id, ...vfRecentlyViewed().filter(x => x !== id)].slice(0, 8)));
  } catch (_) {}
}
