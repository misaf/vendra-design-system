// Shared sample catalog for home, shop, search, saved items and product pricing.
// Amounts are in Toman. Language arrays contain [name, subtitle, optional badge].
// occasions use the ids in VF_SHOP_OCCASIONS (translations/categories.js).
// Edit this file, then run: node templates/_build/generate.cjs
// All sample products intentionally use a neutral image placeholder.
// Set an individual product's image path when adapting the template to a real store.
// `image` is the card photo; optional `images` lists every photo for the product page gallery.
const VF_PRODUCT_PLACEHOLDER = 'assets/placeholders/product.svg';
const VF_SAMPLE_GALLERY = [VF_PRODUCT_PLACEHOLDER, VF_PRODUCT_PLACEHOLDER, VF_PRODUCT_PLACEHOLDER];
const VF_PRODUCTS = [
  {
    id: 'ivory', occasions: ['birthday', 'thanks'], cat: 'boxes', price: 4_100_000, same: true, roses: true, image: VF_PRODUCT_PLACEHOLDER, images: VF_SAMPLE_GALLERY,
    en: ['Ivory ribbon box', 'Roses · lisianthus · satin', 'New'],
    fa: ['باکس روبان عاجی', 'رز · لیسیانتوس · ساتن', 'جدید']
  },
  {
    id: 'lavender', occasions: ['birthday', 'sympathy'], cat: 'bouquets', price: 2_800_000, same: true, image: VF_PRODUCT_PLACEHOLDER, images: VF_SAMPLE_GALLERY,
    en: ['Lavender whisper', 'Seasonal · 15 stems'],
    fa: ['زمزمه اسطوخودوس', 'فصلی · ۱۵ شاخه']
  },
  {
    id: 'orchid', occasions: ['thanks', 'sympathy'], cat: 'orchids', price: 3_400_000, image: VF_PRODUCT_PLACEHOLDER, images: VF_SAMPLE_GALLERY,
    en: ['Pearl orchid', 'Phalaenopsis · ceramic pot'],
    fa: ['ارکیده مروارید', 'فالانوپسیس · گلدان سرامیکی']
  },
  {
    id: 'crimson', occasions: ['anniversary'], cat: 'boxes', price: 5_200_000, roses: true, image: VF_PRODUCT_PLACEHOLDER, images: VF_SAMPLE_GALLERY,
    en: ['Crimson hatbox', 'Red roses · velvet box', 'Bestseller'],
    fa: ['باکس کلاهی سرخ', 'رز قرمز · باکس مخمل', 'پرفروش']
  },
  {
    id: 'blush', occasions: ['anniversary', 'birthday'], cat: 'bouquets', price: 2_200_000, same: true, roses: true, image: VF_PRODUCT_PLACEHOLDER, images: VF_SAMPLE_GALLERY,
    en: ['Blush morning', 'Garden roses · eucalyptus'],
    fa: ['صبح صورتی', 'رز باغی · اکالیپتوس']
  },
  {
    id: 'bridal', occasions: [], cat: 'bridal', inStock: false, price: 6_500_000, image: VF_PRODUCT_PLACEHOLDER, images: VF_SAMPLE_GALLERY,
    en: ['Ivory bridal posy', 'Peonies · ranunculus'],
    fa: ['دسته‌گل عروس عاجی', 'گل صد‌تومانی · آلاله']
  }
];

// Ivory box sizes: [id, extra price, English name, Persian name, English detail, Persian detail].
const VF_SIZES = [
  ['petite', 0, 'Petite', 'کوچک', '12 stems', '۱۲ شاخه'],
  ['classic', 800_000, 'Classic', 'کلاسیک', '20 stems', '۲۰ شاخه'],
  ['generous', 1_900_000, 'Generous', 'بزرگ', '32 stems', '۳۲ شاخه']
];
// Optional extras: [id, price, English name, Persian name].
const VF_ADDONS = [
  ['card', 150_000, 'Handwritten card', 'کارت دست‌نویس'],
  ['vase', 650_000, 'Glass vase', 'گلدان شیشه‌ای']
];

function vfProduct(id) {
  const product = VF_PRODUCTS.find(product => product.id === id);
  if (!product) throw new Error('Unknown sample product: ' + id);
  return product;
}

function vfProductImage(product, lang = 'en', asset = product.image || VF_PRODUCT_PLACEHOLDER) {
  const src = /^(https?:|data:|\/)/.test(asset) ? asset : (window.VF_ASSET_BASE || '../../') + asset;
  const name = product[lang] ? product[lang][0] : product.en[0];
  const label = lang === 'fa' ? 'جای تصویر محصول' : 'Product image placeholder';
  return {src, alt: asset === VF_PRODUCT_PLACEHOLDER ? label + ' — ' + name : name};
}

// Every product page photo; falls back to the card photo.
function vfProductImages(product, lang = 'en') {
  return (product.images || [product.image]).map(asset => vfProductImage(product, lang, asset));
}

// Each demo gets its own bag objects; prices and names come from the same catalog.
function vfSampleBag() {
  const ivory = vfProduct('ivory'), orchid = vfProduct('orchid');
  const classic = VF_SIZES.find(size => size[0] === 'classic'), card = VF_ADDONS.find(addon => addon[0] === 'card');
  return [
    {
      id: 'ivory-classic-card', productId: 'ivory', size: 'classic', addons: ['card'], unit: ivory.price + classic[1] + card[1], qty: 1, image: ivory.image,
      card: 'Happy birthday, Shirin.',
      en: [ivory.en[0], [classic[2], classic[4], card[2]].join(' · ')],
      fa: [ivory.fa[0], [classic[3], classic[5], card[3]].join(' · ')]
    },
    {id: orchid.id, unit: orchid.price, qty: 1, image: orchid.image, en: [...orchid.en], fa: [...orchid.fa]}
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
  return cards.length === 1 ? quote(cards[0].card) : cards.map(line => line[lang][0] + ': ' + quote(line.card)).join(' · ');
}

// The same line with a handwritten card added, priced and named as the product page would.
function vfLineWithCard(line) {
  const productId = line.productId || line.id.split('-')[0];
  const size = line.size || (productId === 'ivory' ? line.id.split('-')[1] : null);
  const addons = VF_ADDONS.filter(addon => addon[0] === 'card' || vfLineAddons(line).includes(addon[0]));
  const names = lang => {
    const index = lang === 'en' ? 2 : 3;
    const detail = line[lang][1].split(' · ').filter(part => !VF_ADDONS.some(addon => addon[index] === part));
    return [line[lang][0], detail.concat(addons.map(addon => addon[index])).join(' · ')];
  };
  return {
    ...line, productId, size, addons: addons.map(addon => addon[0]),
    id: productId + (size ? '-' + size : '') + '-' + addons.map(addon => addon[0]).join('+'),
    unit: line.unit + VF_ADDONS.find(addon => addon[0] === 'card')[1],
    en: names('en'), fa: names('fa')
  };
}

// Bilingual detail copy follows the same [English, Persian] convention as the catalog.
const VF_PRODUCT_DETAILS = {
  ivory: ['Ivory garden roses and lisianthus in a linen-wrapped box, tied with satin.', 'رز باغی عاجی و لیسیانتوس در باکسی با روکش کتان و روبان ساتن.'],
  lavender: ['A seasonal bouquet of fifteen stems in soft lavender tones.', 'دسته‌گلی فصلی با پانزده شاخه در رنگ‌های ملایم اسطوخودوسی.'],
  orchid: ['A Phalaenopsis orchid in a ceramic pot. Water when the roots turn silver and keep in indirect light.', 'ارکیده فالانوپسیس در گلدان سرامیکی. وقتی ریشه‌ها نقره‌ای شدند آبیاری کنید و در نور غیرمستقیم نگه دارید.'],
  crimson: ['Red roses arranged in a velvet hatbox for a bold gift.', 'رزهای قرمز در باکس کلاهی مخمل برای هدیه‌ای چشمگیر.'],
  blush: ['Garden roses and eucalyptus arranged in a soft pink bouquet.', 'رز باغی و اکالیپتوس در دسته‌گلی صورتی و لطیف.'],
  bridal: ['An ivory bridal posy of peonies and ranunculus.', 'دسته‌گل عروس عاجی با گل صدتومانی و آلاله.']
};

function vfReorderLines(lines) {
 return lines.flatMap(line => {
  const product=VF_PRODUCTS.find(p=>p.id===(line.productId||line.id.split('-')[0]));
  if(!product||product.inStock===false)return [];
  const size=VF_SIZES.find(s=>s[0]===(line.size||line.id.split('-')[1]));
  const addons=vfLineAddons(line);
  const extra=VF_ADDONS.filter(a=>addons.includes(a[0])).reduce((sum,a)=>sum+a[1],0);
  return [{...line,unit:product.price+(product.id==='ivory'&&size?size[1]:0)+extra}];
 });
}

function vfLineAvailable(line){const p=VF_PRODUCTS.find(p=>p.id===(line.productId||line.id.split('-')[0]));return !!p&&p.inStock!==false;}

// Recently viewed products, newest first, kept in this browser only.
const VF_RECENT_KEY = 'vendra-recently-viewed';
function vfRecentlyViewed() {
  try {
    const ids = JSON.parse(localStorage.getItem(VF_RECENT_KEY) || '[]');
    return Array.isArray(ids) ? ids.filter(id => VF_PRODUCTS.some(p => p.id === id)) : [];
  } catch (_) {
    return [];
  }
}
function vfRememberViewed(id) {
  try {
    localStorage.setItem(VF_RECENT_KEY, JSON.stringify([id, ...vfRecentlyViewed().filter(x => x !== id)].slice(0, 8)));
  } catch (_) {}
}
