// Bilingual search copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  const n = S.n;
  return {
    en: {
      label: 'Search the shop',
      ph: 'Roses, orchids, “birthday”…',
      close: 'Close search',
      popular: 'Popular',
      noneA: 'No flowers match',
      noneB: '— yet.',
      noneP: 'Try a flower, a colour or an occasion.',
      labels: {
        tryAnotherSearch: 'Try another search',
        browseTheShop: 'Browse the shop'
      },
      popularTerms: ['Roses', 'Orchid', 'Box', 'Bridal'],
      resultCount: value => value + (value === 1 ? ' result' : ' results')
    },
    fa: {
      label: 'جستجو در فروشگاه',
      ph: 'رز، ارکیده، «تولد»…',
      close: 'بستن جستجو',
      popular: 'جستجوهای پرطرفدار',
      noneA: 'گلی پیدا نشد',
      noneB: '— فعلاً.',
      noneP: 'نام گل، رنگ یا مناسبت را امتحان کنید.',
      labels: {
        tryAnotherSearch: 'جستجوی دوباره',
        browseTheShop: 'رفتن به فروشگاه'
      },
      popularTerms: ['رز', 'ارکیده', 'باکس', 'عروس'],
      resultCount: value => n(value) + ' نتیجه'
    }
  }[S.lang];
}
