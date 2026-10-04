// Shared sample catalog for home, shop, search, saved items and product pricing.
// Amounts are in Toman. Language arrays contain [name, subtitle, optional badge].
// Edit this file, then run: node templates/_build/generate.cjs
// All sample products intentionally use a neutral image placeholder.
// Set an individual product's image path when adapting the template to a real store.
const VF_PRODUCT_PLACEHOLDER = 'assets/placeholders/product.svg';
const VF_PRODUCTS = [
  {
    id: 'ivory', cat: 'boxes', price: 4_100_000, same: true, roses: true, image: VF_PRODUCT_PLACEHOLDER,
    en: ['Ivory ribbon box', 'Roses · lisianthus · satin', 'New'],
    fa: ['باکس روبان عاجی', 'رز · لیسیانتوس · ساتن', 'جدید']
  },
  {
    id: 'lavender', cat: 'bouquets', price: 2_800_000, same: true, image: VF_PRODUCT_PLACEHOLDER,
    en: ['Lavender whisper', 'Seasonal · 15 stems'],
    fa: ['زمزمه اسطوخودوس', 'فصلی · ۱۵ شاخه']
  },
  {
    id: 'orchid', cat: 'orchids', price: 3_400_000, image: VF_PRODUCT_PLACEHOLDER,
    en: ['Pearl orchid', 'Phalaenopsis · ceramic pot'],
    fa: ['ارکیده مروارید', 'فالانوپسیس · گلدان سرامیکی']
  },
  {
    id: 'crimson', cat: 'boxes', price: 5_200_000, roses: true, image: VF_PRODUCT_PLACEHOLDER,
    en: ['Crimson hatbox', 'Red roses · velvet box', 'Bestseller'],
    fa: ['باکس کلاهی سرخ', 'رز قرمز · باکس مخمل', 'پرفروش']
  },
  {
    id: 'blush', cat: 'bouquets', price: 2_200_000, same: true, roses: true, image: VF_PRODUCT_PLACEHOLDER,
    en: ['Blush morning', 'Garden roses · eucalyptus'],
    fa: ['صبح صورتی', 'رز باغی · اکالیپتوس']
  },
  {
    id: 'bridal', cat: 'bridal', price: 6_500_000, image: VF_PRODUCT_PLACEHOLDER,
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

function vfProductImage(product, lang = 'en') {
  const asset = product.image || VF_PRODUCT_PLACEHOLDER;
  const src = /^(https?:|data:|\/)/.test(asset) ? asset : (window.VF_ASSET_BASE || '../../') + asset;
  const name = product[lang] ? product[lang][0] : product.en[0];
  const label = lang === 'fa' ? 'جای تصویر محصول' : 'Product image placeholder';
  return {src, alt: asset === VF_PRODUCT_PLACEHOLDER ? label + ' — ' + name : name};
}

// Each demo gets its own bag objects; prices and names come from the same catalog.
function vfSampleBag() {
  const ivory = vfProduct('ivory'), orchid = vfProduct('orchid');
  const classic = VF_SIZES.find(size => size[0] === 'classic');
  return [
    {
      id: 'ivory-classic', unit: ivory.price + classic[1], qty: 1, image: ivory.image,
      en: [ivory.en[0], classic[2] + ' · ' + classic[4], '“Happy birthday, Shirin.”'],
      fa: [ivory.fa[0], classic[3] + ' · ' + classic[5], '«تولدت مبارک، شیرین.»']
    },
    {id: orchid.id, unit: orchid.price, qty: 1, image: orchid.image, en: [...orchid.en], fa: [...orchid.fa]}
  ];
}
