// Bilingual saved copy. Edit here, then run npm --prefix apps/storefront run build.
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
      add: 'Add to bag',
      addLabel: '{name}: add to bag',
      inBag: 'Stock already in bag',
      chooseSize: 'Choose size',
      chooseSizeLabel: '{name}: choose a size',
      soldOut: 'Sold out',
      added: 'Added to your bag',
      undoAdd: 'Undo',
      dismiss: 'Dismiss',
      checkout: 'View bag and check out',
      keepShopping: 'Keep shopping',
      bagSubtotal: 'Bag subtotal · {count} items',
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
      add: 'افزودن به سبد',
      addLabel: '{name}: افزودن به سبد',
      inBag: 'موجودی در سبد شماست',
      chooseSize: 'انتخاب اندازه',
      chooseSizeLabel: '{name}: انتخاب اندازه',
      soldOut: 'ناموجود',
      added: 'به سبد شما اضافه شد',
      undoAdd: 'بازگردانی',
      dismiss: 'بستن',
      checkout: 'مشاهده سبد و پرداخت',
      keepShopping: 'ادامه خرید',
      bagSubtotal: 'جمع سبد، {count} مورد',
      designCount: value => n(value) + ' طرح'
    }
  }[S.lang];
}
