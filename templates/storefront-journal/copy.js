// Bilingual journal copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  const fa = S.fa,
    m = S.m,
    n = S.n;
  return {
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
}
