// Bilingual post copy. Edit here, then run npm --prefix apps/storefront run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
export function vfCopy(S) {
  const result = {
    en: {
      back: 'Journal',
      shopIt: 'Shop all flowers',
      copy: 'Copy link',
      copied: 'Link copied',
      moreA: 'More from',
      moreB: 'the journal.'
    },
    fa: {
      back: 'دفترچه',
      shopIt: 'خرید همه گل‌ها',
      copy: 'کپی پیوند',
      copied: 'پیوند کپی شد',
      moreA: 'بیشتر از',
      moreB: 'دفترچه.'
    }
  }[S.lang];
  return {
    ...result,
    migration: {
      en: {
        missing: 'This story has moved',
        back: 'Back to the journal',
        loading: 'Loading story'
      },
      fa: {
        missing: 'این مطلب جابه‌جا شده است',
        back: 'بازگشت به دفترچه',
        loading: 'در حال بارگذاری مطلب'
      }
    }[S.lang]
  };
}
