// Bilingual track copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  return {
    en: {
      paymentMethods: {
        card: 'Card to card',
        online: 'Online payment',
        cod: 'Pay on delivery',
        wa: 'WhatsApp confirmation'
      },
      orderNo: 'Order VN-10522',
      progress: 'Order progress',
      doneL: 'done',
      photoPh: 'Delivery photo',
      photoAlt: 'The flowers at the door, photographed on delivery',
      photoCap: 'Your courier took this photo at the door.',
      ask: 'Ask about this order',
      again: 'Order again',
      summary: 'Order summary',
      sub: 'Subtotal',
      fee: 'Delivery',
      total: 'Total',
      steps: ['Order received', 'Payment confirmed', 'Being arranged', 'On its way', 'Delivered'],
      times: ['09:12', '09:40', '11:05', '15:30', ''],
      h: {
        received: ['Order', 'received.', 'We’ve got it. We’ll confirm your payment shortly.'],
        preparing: ['Being', 'arranged.', 'Your flowers are being hand-tied in the studio now.'],
        onTheWay: ['On its', 'way.', 'The courier left the studio at 15:30. Delivery between 12:00 and 16:00.'],
        delivered: ['Delivered,', 'with love.', 'Mina received the flowers at 15:52.'],
        cancelled: ['Order', 'cancelled.', 'Your refund was sent to the card you paid from. It can take up to three working days.']
      },
      rows: [['map-pin', 'Deliver to', 'Mina · 12 Golha St, Azimiyeh · Karaj central'], ['calendar', 'Delivery', 'Fri 9 Oct, 12:00–16:00'], ['user', 'Recipient', 'Mina · 0912 000 0000'], ['quote', 'Card message', '“Happy birthday, Shirin.”'], ['banknote', 'Payment', 'Card to card · •••• 5437']],
      labels: {
        order: 'Order ',
        deliverTo: 'Deliver to',
        delivery: 'Delivery',
        recipient: 'Recipient',
        cardMessage: 'Card message',
        noMessage: 'No message',
        payment: 'Payment',
        cardToCard: 'Card to card',
        browseTheShop: 'Browse the shop',
        free: 'Free'
      },
      pending: {
        title: 'Payment being confirmed',
        card: 'We’re matching your transfer from the card ending {last4}, usually within an hour. We’ll text {phone} once it’s confirmed and start arranging your flowers.',
        wa: 'Confirm the order on WhatsApp so we can start arranging your flowers.'
      },
      lookup: {
        titleA: 'Track an',
        titleB: 'order.',
        intro: 'Enter your order number and the mobile used for the order — yours or the recipient’s.',
        id: 'Order number',
        idHint: 'From your confirmation text, e.g. VN-10522.',
        phone: 'Mobile number',
        submit: 'Find my order',
        idErr: 'Enter the order number.',
        phoneErr: 'Enter an 11-digit mobile number starting with 09.',
        failed: 'We couldn’t find an order with that number and mobile. Check both, or ask us on WhatsApp.',
        another: 'Track another order'
      }
    },
    fa: {
      paymentMethods: {
        card: 'کارت به کارت',
        online: 'پرداخت آنلاین',
        cod: 'پرداخت هنگام تحویل',
        wa: 'تأیید در واتساپ'
      },
      orderNo: 'سفارش VN-10522',
      progress: 'وضعیت سفارش',
      doneL: 'انجام شد',
      photoPh: 'عکس تحویل',
      photoAlt: 'گل‌ها دمِ در، عکسِ لحظه تحویل',
      photoCap: 'پیک این عکس را هنگام تحویل دمِ در گرفته است.',
      ask: 'پرسش درباره این سفارش',
      again: 'سفارش دوباره',
      summary: 'خلاصه سفارش',
      sub: 'جمع جزء',
      fee: 'هزینه ارسال',
      total: 'جمع کل',
      steps: ['سفارش ثبت شد', 'پرداخت تأیید شد', 'در حال چیدن', 'در راه', 'تحویل شد'],
      times: ['۰۹:۱۲', '۰۹:۴۰', '۱۱:۰۵', '۱۵:۳۰', ''],
      h: {
        received: ['سفارش', 'ثبت شد.', 'سفارش شما رسید. به‌زودی پرداخت را تأیید می‌کنیم.'],
        preparing: ['در حال', 'چیدن.', 'گل‌های شما همین حالا در استودیو با دست بسته می‌شوند.'],
        onTheWay: ['سفارش', 'در راه است.', 'پیک ساعت \u2068۱۵:۳۰\u2069 از استودیو راه افتاد. تحویل بین \u2068۱۲:۰۰\u2069 تا \u2068۱۶:۰۰\u2069.'],
        delivered: ['تحویل شد،', 'با عشق.', 'مینا گل‌ها را ساعت \u2068۱۵:۵۲\u2069 تحویل گرفت.'],
        cancelled: ['سفارش', 'لغو شد.', 'مبلغ به کارتی که از آن پرداخت کردید برگشت داده شد. ممکن است تا سه روز کاری طول بکشد.']
      },
      rows: [['map-pin', 'تحویل به', 'مینا · عظیمیه، خیابان گل‌ها، پلاک ۱۲ · مرکز کرج'], ['calendar', 'زمان ارسال', 'جمعه ۱۷ مهر، \u2068۱۲:۰۰\u2069 تا \u2068۱۶:۰۰\u2069'], ['user', 'گیرنده', 'مینا · ۰۹۱۲ ۰۰۰ ۰۰۰۰'], ['quote', 'متن کارت', '«تولدت مبارک، شیرین.»'], ['banknote', 'پرداخت', 'کارت به کارت · •••• ۵۴۳۷']],
      labels: {
        order: 'سفارش ',
        deliverTo: 'تحویل به',
        delivery: 'زمان ارسال',
        recipient: 'گیرنده',
        cardMessage: 'متن کارت',
        noMessage: 'بدون پیام',
        payment: 'پرداخت',
        cardToCard: 'کارت به کارت',
        browseTheShop: 'رفتن به فروشگاه',
        free: 'رایگان'
      },
      pending: {
        title: 'در حال تأیید پرداخت',
        card: 'واریز از کارتِ با پایانِ {last4} را بررسی می‌کنیم؛ معمولاً تا یک ساعت. پس از تأیید به {phone} پیامک می‌دهیم و چیدن گل‌ها را شروع می‌کنیم.',
        wa: 'سفارش را در واتساپ تأیید کنید تا چیدن گل‌ها را شروع کنیم.'
      },
      lookup: {
        titleA: 'پیگیری',
        titleB: 'سفارش.',
        intro: 'شماره سفارش و موبایلی را که برای سفارش ثبت شد وارد کنید؛ موبایل خودتان یا گیرنده.',
        id: 'شماره سفارش',
        idHint: 'از پیامک تأیید سفارش، مثلاً VN-10522.',
        phone: 'شماره موبایل',
        submit: 'پیدا کردن سفارش',
        idErr: 'شماره سفارش را وارد کنید.',
        phoneErr: 'شماره موبایل ۱۱ رقمی با ۰۹ وارد کنید.',
        failed: 'سفارشی با این شماره و موبایل پیدا نشد. هر دو را بررسی کنید یا در واتساپ از ما بپرسید.',
        another: 'پیگیری سفارش دیگر'
      }
    }
  }[S.lang];
}
