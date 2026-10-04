// Bilingual journal copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  const result = {
    en: {
      eb: 'Notes from the studio',
      hA: 'The',
      hB: 'journal.',
      read: 'Read the story'
    },
    fa: {
      eb: 'یادداشت‌های استودیو',
      hA: 'دفترچه',
      hB: 'وندرا.',
      read: 'خواندن مطلب'
    }
  }[S.lang];
  return {
    ...result,
    migration: {
      "en": {
        "search": "Search stories",
        "empty": "No stories match",
        "clear": "Clear search",
        "loading": "Loading stories",
        "studio": "Studio life"
      },
      "fa": {
        "search": "جست‌وجوی مطالب",
        "empty": "مطلبی پیدا نشد",
        "clear": "پاک کردن جست‌وجو",
        "loading": "در حال بارگذاری مطالب",
        "studio": "پشت صحنه"
      }
    }[S.lang]
  };
}
