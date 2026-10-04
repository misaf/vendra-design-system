// Shared sample catalog for home, shop, search, saved items and product pricing.
// Amounts are in Toman. Language arrays contain [name, subtitle, optional badge].
// Edit this file, then run: node templates/_build/generate.cjs
const VF_PRODUCTS = [
  {
    id: 'ivory', cat: 'boxes', price: 4_100_000, same: true, roses: true,
    en: ['Ivory ribbon box', 'Roses · lisianthus · satin', 'New'],
    fa: ['باکس روبان عاجی', 'رز · لیسیانتوس · ساتن', 'جدید']
  },
  {
    id: 'lavender', cat: 'bouquets', price: 2_800_000, same: true,
    en: ['Lavender whisper', 'Seasonal · 15 stems'],
    fa: ['زمزمه اسطوخودوس', 'فصلی · ۱۵ شاخه']
  },
  {
    id: 'orchid', cat: 'orchids', price: 3_400_000,
    en: ['Pearl orchid', 'Phalaenopsis · ceramic pot'],
    fa: ['ارکیده مروارید', 'فالانوپسیس · گلدان سرامیکی']
  },
  {
    id: 'crimson', cat: 'boxes', price: 5_200_000, roses: true,
    en: ['Crimson hatbox', 'Red roses · velvet box', 'Bestseller'],
    fa: ['باکس کلاهی سرخ', 'رز قرمز · باکس مخمل', 'پرفروش']
  },
  {
    id: 'blush', cat: 'bouquets', price: 2_200_000, same: true, roses: true,
    en: ['Blush morning', 'Garden roses · eucalyptus'],
    fa: ['صبح صورتی', 'رز باغی · اکالیپتوس']
  },
  {
    id: 'bridal', cat: 'bridal', price: 6_500_000,
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

// Each demo gets its own bag objects; prices and names come from the same catalog.
function vfSampleBag() {
  const ivory = vfProduct('ivory'), orchid = vfProduct('orchid');
  const classic = VF_SIZES.find(size => size[0] === 'classic');
  return [
    {
      id: 'ivory-classic', unit: ivory.price + classic[1], qty: 1,
      en: [ivory.en[0], classic[2] + ' · ' + classic[4], '“Happy birthday, Shirin.”'],
      fa: [ivory.fa[0], classic[3] + ' · ' + classic[5], '«تولدت مبارک، شیرین.»']
    },
    {id: orchid.id, unit: orchid.price, qty: 1, en: [...orchid.en], fa: [...orchid.fa]}
  ];
}
