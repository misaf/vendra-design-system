// Bilingual bag copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  const fa = S.fa,
    m = S.m,
    n = S.n;
  return {
    en: {
      steps: 'Checkout steps',
      s1: 'Bag',
      s2: 'Payment',
      s3: 'Done',
      titleA: 'Your',
      titleB: 'bag.',
      remove: 'Remove',
      dec: 'Fewer',
      inc: 'More',
      delivery: 'Delivery',
      name: 'Recipient name',
      phone: 'Recipient phone',
      zone: 'Delivery zone',
      address2: 'Address',
      slot: 'Time slot',
      card: 'Card message',
      cardHint: 'We write every card by hand. Up to 200 characters.',
      summary: 'Order summary',
      sub: 'Subtotal',
      fee: 'Delivery',
      total: 'Total',
      free: 'Free',
      next: 'Continue to payment',
      payNote: 'Card-to-card payment on the next step. No card details are stored.',
      emptyA: 'Your bag is empty',
      emptyB: '— for now.',
      emptyP: 'Seasonal bouquets are hand-tied each morning.',
      keep: 'Keep browsing',
      labels: {
        each: 'Each: '
      },
      errors: {
        name: 'Enter the recipient’s name.',
        phone: 'Enter an 11-digit mobile number starting with 09.',
        address: 'Enter a full address (at least 6 characters).'
      }
    },
    fa: {
      steps: 'مراحل خرید',
      s1: 'سبد',
      s2: 'پرداخت',
      s3: 'پایان',
      titleA: 'سبد',
      titleB: 'شما.',
      remove: 'حذف',
      dec: 'کمتر',
      inc: 'بیشتر',
      delivery: 'ارسال',
      name: 'نام گیرنده',
      phone: 'موبایل گیرنده',
      zone: 'محدوده ارسال',
      address2: 'آدرس',
      slot: 'بازه زمانی',
      card: 'متن کارت',
      cardHint: 'همه کارت‌ها را با دست می‌نویسیم. تا ۲۰۰ نویسه.',
      summary: 'خلاصه سفارش',
      sub: 'جمع جزء',
      fee: 'هزینه ارسال',
      total: 'جمع کل',
      free: 'رایگان',
      next: 'ادامه و پرداخت',
      payNote: 'پرداخت کارت‌به‌کارت در مرحله بعد. اطلاعات کارت ذخیره نمی‌شود.',
      emptyA: 'سبد شما خالی است',
      emptyB: '— فعلاً.',
      emptyP: 'دسته‌گل‌های فصلی هر صبح با دست بسته می‌شوند.',
      keep: 'ادامه خرید',
      labels: {
        each: 'هر عدد: '
      },
      errors: {
        name: 'نام گیرنده را وارد کنید.',
        phone: 'شماره موبایل ۱۱ رقمی با ۰۹ وارد کنید.',
        address: 'آدرس کامل را وارد کنید؛ دست‌کم ۶ نویسه.'
      }
    }
  }[S.lang];
}
