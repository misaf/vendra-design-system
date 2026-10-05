// Bilingual contact copy. Edit here, then run npm --prefix templates run build.
function vfCopy(S) {
  const fa = S.fa;
  return {
    en: {
      integrationError: 'Could not send your message. Your draft is saved; please try again.',
      emailLabel: 'Email (optional)',
      eb: 'Contact',
      hA: 'Visit the',
      hB: 'studio.',
      hP: 'Come and choose your stems in person, or message us — we usually reply within the hour.',
      wa: 'WhatsApp',
      call: 'Call',
      mapL: 'The studio on the map',
      directions: 'Get directions',
      directionsTo: 'Directions to the studio (opens in a new tab)',
      fA: 'Send a message.',
      name: 'Name',
      phone: 'Mobile',
      phoneHint: 'We reply by text or WhatsApp. Leave an email instead if you prefer.',
      phoneErr: 'Enter a mobile like 0912 345 6789, or leave an email instead.',
      emailErr: 'Enter an email like name@example.com.',
      topic: 'About',
      msg: 'Message',
      msgErr: 'Write a short message.',
      send: 'Send',
      okT: 'Message sent.',
      okP: 'We’ll reply by text or WhatsApp, usually within the hour during opening times.',
      topics: ['An order', 'Weddings & events', 'Corporate flowers', 'Something else'],
      labels: {
        instagram: 'Instagram',
        returnToForm: 'Return to form'
      },
      rowLabels: ['Address', 'Hours', 'Phone', 'WhatsApp', 'Instagram']
    },
    fa: {
      integrationError: 'ارسال پیام ناموفق بود. متن شما حفظ شده؛ دوباره تلاش کنید.',
      emailLabel: 'ایمیل (اختیاری)',
      eb: 'تماس',
      hA: 'به استودیو',
      hB: 'سر بزنید.',
      hP: 'حضوری بیایید و گل‌هایتان را انتخاب کنید، یا پیام بدهید — معمولاً ظرف یک ساعت پاسخ می‌دهیم.',
      wa: 'واتساپ',
      call: 'تماس',
      mapL: 'استودیو روی نقشه',
      directions: 'مسیریابی',
      directionsTo: 'مسیریابی تا استودیو (در زبانه تازه باز می‌شود)',
      fA: 'پیام بفرستید.',
      name: 'نام',
      phone: 'موبایل',
      phoneHint: 'با پیامک یا واتساپ پاسخ می‌دهیم. اگر ترجیح می‌دهید، به‌جایش ایمیل بگذارید.',
      phoneErr: 'شماره موبایل را مثل ۰۹۱۲۳۴۵۶۷۸۹ وارد کنید، یا به‌جایش ایمیل بگذارید.',
      emailErr: 'ایمیل را مثل name@example.com وارد کنید.',
      topic: 'موضوع',
      msg: 'پیام',
      msgErr: 'یک پیام کوتاه بنویسید.',
      send: 'ارسال',
      okT: 'پیام ارسال شد.',
      okP: 'معمولاً در ساعات کاری ظرف یک ساعت با پیامک یا واتساپ پاسخ می‌دهیم.',
      topics: ['یک سفارش', 'عروسی و مراسم', 'گل سازمانی', 'موضوع دیگر'],
      labels: {
        instagram: 'اینستاگرام',
        returnToForm: 'بازگشت به فرم'
      },
      rowLabels: ['آدرس', 'ساعت کاری', 'تلفن', 'واتساپ', 'اینستاگرام']
    }
  }[S.lang];
}
