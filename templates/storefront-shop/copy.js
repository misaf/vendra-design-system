// Bilingual shop copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  const n = S.n;
  return {
    en: {
      eyebrow: 'All flowers',
      titleA: 'The',
      titleB: 'shop.',
      cats: 'Categories',
      sort: 'Sort by',
      emptyA: 'Nothing here',
      emptyB: '— for now.',
      emptyP: 'Try another category or clear the filters.',
      clear: 'Clear filters',
      sortOptions: [{
        value: 'featured',
        label: 'Featured'
      }, {
        value: 'low',
        label: 'Price: low to high'
      }, {
        value: 'high',
        label: 'Price: high to low'
      }],
      chipLabels: {
        under3: 'Under 3M',
        same: 'Same day',
        roses: 'Roses'
      },
      designCount: value => value + (value === 1 ? ' design' : ' designs')
    },
    fa: {
      eyebrow: 'همه گل‌ها',
      titleA: 'فروشگاه',
      titleB: 'وندرا.',
      cats: 'دسته‌بندی‌ها',
      sort: 'مرتب‌سازی',
      emptyA: 'چیزی پیدا نشد',
      emptyB: '— فعلاً.',
      emptyP: 'دسته‌بندی دیگری را امتحان کنید یا فیلترها را پاک کنید.',
      clear: 'پاک کردن فیلترها',
      sortOptions: [{
        value: 'featured',
        label: 'پیشنهادی'
      }, {
        value: 'low',
        label: 'قیمت: کم به زیاد'
      }, {
        value: 'high',
        label: 'قیمت: زیاد به کم'
      }],
      chipLabels: {
        under3: 'زیر ۳ میلیون',
        same: 'ارسال همان روز',
        roses: 'رز'
      },
      designCount: value => n(value) + ' طرح'
    }
  }[S.lang];
}
