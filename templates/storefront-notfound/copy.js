// Bilingual notfound copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  const fa = S.fa,
    m = S.m,
    n = S.n;
  return {
    en: {
      code: '404',
      hA: 'This page has',
      hB: 'wilted.',
      hP: 'The link may be old, or the bouquet is no longer in season. Everything else is still fresh.',
      home: 'Back home',
      popA: 'Fresh',
      popB: 'this week.'
    },
    fa: {
      code: '۴۰۴',
      hA: 'این صفحه',
      hB: 'پژمرده شده.',
      hP: 'شاید پیوند قدیمی است یا این دسته‌گل دیگر در فصل نیست. بقیه همه تازه‌اند.',
      home: 'صفحه اصلی',
      popA: 'تازه‌های',
      popB: 'این هفته.'
    }
  }[S.lang];
}
