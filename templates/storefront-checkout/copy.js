// Bilingual checkout copy. Edit here, then run npm --prefix templates run build.
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
      payA: 'Card to',
      payB: 'card.',
      payP: 'Transfer the total from your banking app to the card below, then enter the last four digits of your card so we can match the payment.',
      last4: 'Last 4 digits of your card',
      last4Hint: 'Only these four digits are sent.',
      last4Err: 'Enter the last four digits.',
      ref: 'Tracking number (optional)',
      refHint: 'From your bank receipt.',
      safe: 'We never ask for or store your card number.',
      place: 'I’ve paid — place order',
      back: 'Back to bag',
      summary: 'Order summary',
      sub: 'Subtotal',
      fee: 'Delivery',
      free: 'Free',
      total: 'Total',
      orderNo: 'Order VN-10522',
      doneA: 'Thank you.',
      doneB: 'It’s in.',
      doneP: 'We’ll arrange your flowers on the morning of delivery and text you a photo before they leave the studio.',
      track: 'Track order',
      keep: 'Keep browsing',
      when: 'Delivery',
      to: 'Deliver to',
      pay: 'Payment',
      card: 'Card',
      labels: {
        order: 'Order ',
        cardToCard: 'Card to card · ',
        cardMessage: 'Card message'
      },
      payLabels: {
        card: 'Card number',
        amount: 'Amount',
        copy: 'Copy',
        copied: 'Copied'
      },
      caption: undefined
    },
    fa: {
      steps: 'مراحل خرید',
      s1: 'سبد',
      s2: 'پرداخت',
      s3: 'پایان',
      payA: 'کارت به',
      payB: 'کارت.',
      payP: 'مبلغ کل را از اپ بانکی به کارت زیر واریز کنید و چهار رقم آخر کارت خود را وارد کنید تا پرداخت را تطبیق دهیم.',
      last4: 'چهار رقم آخر کارت شما',
      last4Hint: 'فقط همین چهار رقم ارسال می‌شود.',
      last4Err: 'چهار رقم آخر را وارد کنید.',
      ref: 'شماره پیگیری (اختیاری)',
      refHint: 'از رسید بانک.',
      safe: 'شماره کارت شما را هرگز نمی‌خواهیم و ذخیره نمی‌کنیم.',
      place: 'پرداخت کردم — ثبت سفارش',
      back: 'بازگشت به سبد',
      summary: 'خلاصه سفارش',
      sub: 'جمع جزء',
      fee: 'هزینه ارسال',
      free: 'رایگان',
      total: 'جمع کل',
      orderNo: 'سفارش VN-10522',
      doneA: 'سپاس از شما.',
      doneB: 'سفارش ثبت شد.',
      doneP: 'صبح روز ارسال گل‌ها را می‌چینیم و پیش از ارسال عکسشان را برایتان پیامک می‌کنیم.',
      track: 'پیگیری سفارش',
      keep: 'ادامه خرید',
      when: 'زمان ارسال',
      to: 'تحویل به',
      pay: 'پرداخت',
      card: 'کارت',
      labels: {
        order: 'سفارش ',
        cardToCard: 'کارت به کارت · ',
        cardMessage: 'متن کارت'
      },
      payLabels: {
        card: 'شماره کارت',
        amount: 'مبلغ',
        copy: 'کپی',
        copied: 'کپی شد'
      },
      caption: (step, total, label) => 'مرحله ' + step + ' از ' + total + ' · ' + label
    }
  }[S.lang];
}
