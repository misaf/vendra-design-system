// Bilingual home copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
export function vfCopy(S) {
  const n = S.n;
  return {
    en: {
      heroA: 'Soft flowers,',
      heroB: 'gathered by hand.',
      sameDay: 'Order by {time} for same-day delivery in Karaj.',
      nextDay: 'Next delivery in Karaj: {day}, {date}.',
      ctaSame: 'Shop same-day flowers',
      cta: 'Shop bouquets',
      wa: 'Order on WhatsApp',
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
      heroA: 'گل‌های لطیف،',
      heroB: 'چیده با دست.',
      sameDay: 'سفارش تا ساعت {time}، تحویل همان روز در کرج.',
      nextDay: 'نزدیک‌ترین تحویل در کرج: {day}، {date}.',
      ctaSame: 'خرید گل‌های تحویل همان روز',
      cta: 'خرید دسته‌گل',
      wa: 'سفارش در واتساپ',
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
