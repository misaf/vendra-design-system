// Bilingual checkout copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
import {vfFeatures} from '../_shared/store-config.js';
export function vfCopy(S) {
  const result = {
    en: {
      steps: 'Checkout steps',
      s1: 'Bag',
      s2: 'Delivery',
      s3: 'Payment',
      s4: 'Done',
      doneStep: '(completed)',
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
      back: 'Back to delivery',
      summary: 'Order summary',
      deliveryReview: 'Delivery review',
      editDelivery: 'Edit delivery details',
      address: 'Address',
      sub: 'Subtotal',
      fee: 'Delivery',
      free: 'Free',
      total: 'Total',
      orderNo: 'Order VN-10522',
      doneA: 'Thank you.',
      doneB: 'It’s in.',
      doneP:
        'We’ll arrange your flowers on the morning of delivery and text you a photo before they leave the studio.',
      track: 'Track order',
      keep: 'Keep browsing',
      accountTitle: 'Save your details for next time',
      accountBody:
        'Sign in with {phone} to keep this order with your addresses' +
        (vfFeatures().reminders ? ' and occasion reminders.' : '.'),
      accountCta: 'Sign in',
      when: 'Delivery',
      to: 'Deliver to',
      pay: 'Payment',
      card: 'Card',
      labels: {
        order: 'Order ',
        cardToCard: 'Card to card · ',
        cardMessage: 'Card message',
        from: 'From'
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
      s2: 'ارسال',
      s3: 'پرداخت',
      s4: 'پایان',
      doneStep: '(انجام شد)',
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
      back: 'بازگشت به ارسال',
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
      accountTitle: 'مشخصاتتان را برای دفعه بعد نگه دارید',
      accountBody:
        'با {phone} وارد شوید تا این سفارش کنار آدرس‌ها' +
        (vfFeatures().reminders ? ' و یادآورهای مناسبت‌هایتان بماند.' : 'یتان بماند.'),
      accountCta: 'ورود',
      when: 'زمان ارسال',
      deliveryReview: 'مرور اطلاعات ارسال',
      editDelivery: 'ویرایش اطلاعات ارسال',
      address: 'نشانی',
      to: 'تحویل به',
      pay: 'پرداخت',
      card: 'کارت',
      labels: {
        order: 'سفارش ',
        cardToCard: 'کارت به کارت · ',
        cardMessage: 'متن کارت',
        from: 'فرستنده'
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
      en: {
        actions: {
          wallet: 'Pay from balance',
          online: 'Continue to the bank',
          cod: 'Confirm demo order',
          whatsapp: 'Confirm demo order'
        },
        descriptions: {
          wallet: 'The total comes out of your account balance. There’s nothing else to pay.',
          online:
            'You pay on the bank’s page and come back here. In this preview the bank is simulated.',
          cod: 'Payment would be collected on delivery. Confirm this sample order.',
          whatsapp:
            'Open WhatsApp to review the prepared message, or confirm the sample order here.'
        },
        choose: 'Choose a payment method',
        methods: {
          wallet: 'Account balance',
          card: 'Card-to-card transfer',
          online: 'Online card demo',
          cod: 'Pay on delivery',
          whatsapp: 'Confirm on WhatsApp'
        },
        codOff: 'Only for delivery in {zones}.',
        noMethod:
          'None of our payment methods reaches this order: pay on delivery doesn’t cover this address. Call or WhatsApp us and we’ll take it by phone, or change the delivery address.',
        wallet: {
          signIn: 'Sign in to pay from your account balance.',
          balance: 'Balance {balance}.',
          discount: 'Balance {balance}: {percent}% off products.',
          short: 'Balance {balance}. Top up {left} more to pay from it.',
          topUp: 'Top up your balance',
          after: 'Balance after this order: {balance}.',
          hint: 'Top up {gap} and pay from your balance to get {percent}% off the products: {saving} off this order.',
          left: 'Balance left'
        },
        demo: 'Template preview: no money is transferred and no messages are sent.',
        processing: 'Sending your order…',
        failed: 'Your order couldn’t be sent',
        failureBody: 'Your bag is preserved. Retry or choose another payment method.',
        retry: 'Try again',
        other: 'Choose another method',
        openWa: 'Open order in WhatsApp',
        statuses: {
          wallet: 'Paid from balance',
          card: 'Awaiting transfer check',
          online: 'Paid online',
          cod: 'Pay on delivery',
          whatsapp: 'Awaiting WhatsApp confirmation'
        }
      },
      fa: {
        actions: {
          wallet: 'پرداخت از کیف پول',
          online: 'رفتن به درگاه بانک',
          cod: 'تأیید سفارش نمونه',
          whatsapp: 'تأیید سفارش نمونه'
        },
        descriptions: {
          wallet: 'مبلغ کل از موجودی کیف پول شما کم می‌شود و پرداخت دیگری لازم نیست.',
          online:
            'پرداخت را در صفحه بانک انجام می‌دهید و به همین‌جا برمی‌گردید. در این پیش‌نمایش، بانک شبیه‌سازی شده است.',
          cod: 'مبلغ هنگام تحویل دریافت می‌شود. این سفارش نمونه را تأیید کنید.',
          whatsapp: 'واتساپ را برای مشاهده پیام آماده باز کنید یا سفارش نمونه را اینجا تأیید کنید.'
        },
        choose: 'انتخاب روش پرداخت',
        methods: {
          wallet: 'کیف پول',
          card: 'کارت به کارت',
          online: 'نمونه پرداخت آنلاین',
          cod: 'پرداخت در محل',
          whatsapp: 'تأیید در واتس‌اپ'
        },
        codOff: 'فقط برای ارسال در {zones}.',
        noMethod:
          'هیچ‌کدام از روش‌های پرداخت ما برای این سفارش در دسترس نیست: پرداخت در محل به این نشانی نمی‌رسد. با ما تماس بگیرید یا در واتساپ پیام دهید تا سفارش را تلفنی ثبت کنیم، یا نشانی تحویل را تغییر دهید.',
        wallet: {
          signIn: 'برای پرداخت از کیف پول وارد حساب شوید.',
          balance: 'موجودی {balance}.',
          discount: 'موجودی {balance}: {percent}٪ تخفیف محصولات.',
          short: 'موجودی {balance}. برای پرداخت از کیف پول {left} دیگر افزایش موجودی دهید.',
          topUp: 'افزایش موجودی',
          after: 'موجودی پس از این سفارش: {balance}.',
          hint: 'با افزایش موجودی به اندازه {gap} و پرداخت از کیف پول، {percent}٪ تخفیف محصولات می‌گیرید: {saving} کمتر برای این سفارش.',
          left: 'موجودی باقی‌مانده'
        },
        demo: 'پیش‌نمایش قالب: پولی منتقل و پیامی ارسال نمی‌شود.',
        processing: 'در حال ثبت سفارش…',
        failed: 'سفارش شما ثبت نشد',
        failureBody: 'سبد شما حفظ شده است. دوباره تلاش یا روش دیگری انتخاب کنید.',
        retry: 'تلاش دوباره',
        other: 'انتخاب روش دیگر',
        openWa: 'باز کردن سفارش در واتس‌اپ',
        statuses: {
          wallet: 'پرداخت از کیف پول',
          card: 'در انتظار بررسی واریز',
          online: 'پرداخت آنلاین انجام شد',
          cod: 'پرداخت در محل',
          whatsapp: 'در انتظار تأیید واتس‌اپ'
        }
      }
    }[S.lang]
  };
}
