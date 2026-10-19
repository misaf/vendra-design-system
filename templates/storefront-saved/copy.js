// Bilingual saved copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
export function vfCopy(S) {
  const n = S.n;
  return {
    en: {
      hA: 'Saved',
      hB: 'for later.',
      unsave: 'Remove from saved',
      removed: '{name} removed from saved products.',
      undo: 'Undo',
      emptyA: 'Nothing saved',
      emptyB: '— yet.',
      emptyP: 'Tap the heart on any bouquet to keep it here.',
      browse: 'Browse the shop',
      designCount: value => value + (value === 1 ? ' design' : ' designs')
    },
    fa: {
      hA: 'ذخیره‌شده',
      hB: 'برای بعد.',
      unsave: 'حذف از ذخیره‌ها',
      removed: 'محصول {name} از ذخیره‌ها حذف شد.',
      undo: 'بازگردانی',
      emptyA: 'چیزی ذخیره نشده',
      emptyB: '— فعلاً.',
      emptyP: 'روی قلب هر دسته‌گل بزنید تا این‌جا بماند.',
      browse: 'رفتن به فروشگاه',
      designCount: value => n(value) + ' طرح'
    }
  }[S.lang];
}
