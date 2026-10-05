// Bilingual checkout copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  const result = {
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
      sheba: 'Sheba',
      shebaInfo: 'About Sheba',
      shebaTip: 'Iranian IBAN',
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
      sheba: 'شبا',
      shebaInfo: 'درباره شبا',
      shebaTip: 'شماره حساب بین‌بانکی',
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
  return {
    ...result,
    migration: {
      "en": {
        "actions": {
          "online": "Simulate online payment",
          "cod": "Confirm demo order",
          "wa": "Confirm demo order"
        },
        "descriptions": {
          "online": "Try the online payment flow using a simulated result.",
          "cod": "Payment would be collected on delivery. Confirm this sample order.",
          "wa": "Open WhatsApp to review the prepared message, or confirm the sample order here."
        },
        "choose": "Choose a payment method",
        "methods": {
          "card": "Card-to-card transfer",
          "online": "Online card demo",
          "cod": "Pay on delivery",
          "wa": "Confirm on WhatsApp"
        },
        "codOff": "Available for Karaj delivery only.",
        "demo": "Template preview: no money is transferred and no messages are sent.",
        "processing": "Processing demo payment…",
        "failed": "Demo payment failed",
        "failureBody": "Your bag is preserved. Retry or choose another payment method.",
        "retry": "Try again",
        "other": "Choose another method",
        "openWa": "Open order in WhatsApp",
        "statuses": {
          "card": "Awaiting transfer check",
          "online": "Demo paid",
          "cod": "Pay on delivery",
          "wa": "Awaiting WhatsApp confirmation"
        }
      },
      "fa": {
        "actions": {
          "online": "شبیه‌سازی پرداخت آنلاین",
          "cod": "تأیید سفارش نمونه",
          "wa": "تأیید سفارش نمونه"
        },
        "descriptions": {
          "online": "روند پرداخت آنلاین را با نتیجه شبیه‌سازی‌شده امتحان کنید.",
          "cod": "مبلغ هنگام تحویل دریافت می‌شود. این سفارش نمونه را تأیید کنید.",
          "wa": "واتساپ را برای مشاهده پیام آماده باز کنید یا سفارش نمونه را اینجا تأیید کنید."
        },
        "choose": "انتخاب روش پرداخت",
        "methods": {
          "card": "کارت به کارت",
          "online": "نمونه پرداخت آنلاین",
          "cod": "پرداخت در محل",
          "wa": "تأیید در واتس‌اپ"
        },
        "codOff": "فقط برای ارسال در کرج در دسترس است.",
        "demo": "پیش‌نمایش قالب: پولی منتقل و پیامی ارسال نمی‌شود.",
        "processing": "در حال انجام پرداخت نمونه…",
        "failed": "پرداخت نمونه ناموفق بود",
        "failureBody": "سبد شما حفظ شده است. دوباره تلاش یا روش دیگری انتخاب کنید.",
        "retry": "تلاش دوباره",
        "other": "انتخاب روش دیگر",
        "openWa": "باز کردن سفارش در واتس‌اپ",
        "statuses": {
          "card": "در انتظار بررسی واریز",
          "online": "پرداخت نمونه انجام شد",
          "cod": "پرداخت در محل",
          "wa": "در انتظار تأیید واتس‌اپ"
        }
      }
    }[S.lang]
  };
}
