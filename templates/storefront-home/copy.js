// Bilingual home copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  const n = S.n;
  return {
    en: {
      eyebrow: S.t.brand,
      heroA: 'Soft flowers,',
      heroB: 'gathered by hand.',
      heroP: 'Blush roses, lilies and eucalyptus, wrapped in paper and satin. Hand-tied each morning from what the growers bring in.',
      cta: 'Shop bouquets',
      wa: 'Order on WhatsApp',
      heroPh: 'Hero photo',
      catEb: 'Shop by occasion',
      catA: 'Something for',
      catB: 'every day.',
      newEb: 'This week',
      newA: 'Fresh from',
      newB: 'the studio.',
      catLabel: 'Occasions',
      catPrev: 'Previous occasions',
      catNext: 'More occasions',
      newLabel: 'New this week',
      prev: 'Previous designs',
      next: 'More designs',
      designCount: value => value + ' designs'
    },
    fa: {
      eyebrow: S.t.brand,
      heroA: 'گل‌های لطیف،',
      heroB: 'چیده با دست.',
      heroP: 'رز صورتی، لیلیوم و اکالیپتوس، پیچیده در کاغذ و ساتن. هر صبح از گل‌هایی که باغدارها می‌آورند، با دست بسته می‌شود.',
      cta: 'خرید دسته‌گل',
      wa: 'سفارش در واتساپ',
      heroPh: 'عکس اصلی',
      catEb: 'خرید بر اساس مناسبت',
      catA: 'چیزی برای',
      catB: 'هر روز.',
      newEb: 'این هفته',
      newA: 'تازه از',
      newB: 'استودیو.',
      catLabel: 'مناسبت‌ها',
      catPrev: 'مناسبت‌های قبلی',
      catNext: 'مناسبت‌های بیشتر',
      newLabel: 'تازه‌های این هفته',
      prev: 'طرح‌های قبلی',
      next: 'طرح‌های بیشتر',
      designCount: value => n(value) + ' طرح'
    }
  }[S.lang];
}
