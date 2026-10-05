// Bilingual shop copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  const n = S.n;
  const result = {
    en: {
      eyebrow: 'All flowers',
      titleA: 'The',
      titleB: 'shop.',
      cats: 'Categories',
      sort: 'Sort by',
      occasion: 'Occasion',
      color: 'Colour',
      clearAll: 'Clear all',
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
      occasion: 'مناسبت',
      color: 'رنگ',
      clearAll: 'پاک کردن همه',
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
  return {
    ...result,
    migration: {
      "en": {
        "price": "Price range",
        "stock": "In stock only",
        "filters": "Filters",
        "close": "Show results",
        "loading": "Loading products",
        "failed": "Products could not be loaded",
        "retry": "Try again"
      },
      "fa": {
        "price": "بازه قیمت",
        "stock": "فقط موجود",
        "filters": "فیلترها",
        "close": "نمایش نتایج",
        "loading": "در حال بارگذاری محصولات",
        "failed": "بارگذاری محصولات ناموفق بود",
        "retry": "تلاش دوباره"
      }
    }[S.lang]
  };
}
