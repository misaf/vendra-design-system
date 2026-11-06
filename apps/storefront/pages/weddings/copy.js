// Bilingual weddings copy. Edit here, then run npm --prefix apps/storefront run build.
// Formatting helpers keep delivery fees and tenant-specific store details current. Amounts are in
// Toman and shown in the store's active currency.
import {VF_MONEY} from '../../shared/domain/formatting.js';
export function vfCopy(S) {
  const m = v => VF_MONEY(v, S.lang === 'fa');
  return {
    en: {
      demoTitle: 'Demo preview complete',
      demoBody: 'Nothing was sent. This demo does not contact the studio or request a reply.',
      galleryTitle: 'Recent work placeholders',
      processTitle: 'How it works',
      steps: ['Tell us about your day', 'Choose a floral proposal', 'We arrange and deliver'],
      guests: 'Number of guests',
      integrationError: 'Could not send your message. Your draft is saved; please try again.',
      emailLabel: 'Email (optional)',
      eb: 'Weddings & events',
      hA: 'Flowers for',
      hB: 'your biggest day.',
      hP: 'Bridal bouquets, wedding cars, ceremony stands and table flowers — planned with you, arranged the morning of.',
      plan: 'Plan your flowers',
      ph: 'Wedding photo',
      fA: 'Tell us about the day.',
      fP: 'Share a few details and we’ll call within a day with ideas and a quote. Consultations are free.',
      name: 'Your name',
      nameErr: 'Enter your name.',
      phone: 'Mobile',
      phoneErr: 'Enter a valid mobile number.',
      type: 'Event',
      date: 'Date',
      budget: 'Budget',
      msg: 'Colours, venue, ideas',
      msgHint: 'Anything you already know helps.',
      send: 'Send inquiry',
      okT: 'Thank you — we’ve got it.',
      okP: 'We’ll call you within one working day. For anything urgent, message us on WhatsApp.',
      sv: [
        [
          'gem',
          'Bridal bouquet',
          'Hand-tied to your dress and season, with a matching buttonhole.',
          'From ' + m(6500000)
        ],
        [
          'car',
          'Wedding car',
          'Bonnet and door arrangements that hold at speed.',
          'From ' + m(9000000)
        ],
        [
          'flower-2',
          'Ceremony stands',
          'Floor-standing arrangements for the aisle and backdrop.',
          'From ' + m(12000000)
        ],
        [
          'sprout',
          'Table flowers',
          'Low centrepieces so guests can see each other.',
          'From ' + m(1800000) + ' a table'
        ]
      ],
      labels: {
        returnToForm: 'Return to form'
      },
      types: ['Wedding ceremony', 'Wedding reception', 'Engagement', 'Birthday', 'Corporate event'],
      budgets: [
        'Under ' + m(20000000),
        m(20000000) + ' to ' + m(50000000),
        'Over ' + m(50000000),
        'Not sure yet'
      ]
    },
    fa: {
      demoTitle: 'پیش‌نمایش آزمایشی کامل شد',
      demoBody:
        'پیامی ارسال نشد. این نسخهٔ نمایشی با استودیو تماس نمی‌گیرد و پاسخی دریافت نمی‌شود.',
      galleryTitle: 'جای تصاویر نمونه‌کار',
      processTitle: 'مراحل کار',
      steps: ['از روز مراسم بگویید', 'پیشنهاد گل‌آرایی را انتخاب کنید', 'گل‌آرایی و تحویل با ما'],
      guests: 'تعداد مهمان‌ها',
      integrationError: 'ارسال پیام ناموفق بود. متن شما حفظ شده؛ دوباره تلاش کنید.',
      emailLabel: 'ایمیل (اختیاری)',
      eb: 'عروسی و مراسم',
      hA: 'گل برای',
      hB: 'بزرگ‌ترین روزتان.',
      hP: 'دسته‌گل عروس، گل‌آرایی ماشین، استند مراسم و گل میز — با شما برنامه‌ریزی می‌شود و صبح همان روز چیده می‌شود.',
      plan: 'برنامه‌ریزی گل‌ها',
      ph: 'عکس عروسی',
      fA: 'از روز مراسم بگویید.',
      fP: 'چند جزئیات بنویسید؛ ظرف یک روز با ایده و قیمت تماس می‌گیریم. مشاوره رایگان است.',
      name: 'نام شما',
      nameErr: 'نام خود را وارد کنید.',
      phone: 'موبایل',
      phoneErr: 'شماره موبایل معتبر وارد کنید.',
      type: 'نوع مراسم',
      date: 'تاریخ',
      budget: 'بودجه',
      msg: 'رنگ‌ها، محل، ایده‌ها',
      msgHint: 'هر چه از الان می‌دانید کمک می‌کند.',
      send: 'ارسال درخواست',
      okT: 'ممنون — درخواست رسید.',
      okP: 'ظرف یک روز کاری تماس می‌گیریم. برای کارهای فوری در واتساپ پیام دهید.',
      sv: [
        ['gem', 'دسته‌گل عروس', 'هماهنگ با لباس و فصل، همراه با گل کت داماد.', 'از ' + m(6500000)],
        [
          'car',
          'گل‌آرایی ماشین',
          'گل‌آرایی کاپوت و درها که در حرکت محکم می‌ماند.',
          'از ' + m(9000000)
        ],
        ['flower-2', 'استند مراسم', 'گل‌آرایی ایستاده برای مسیر و پس‌زمینه.', 'از ' + m(12000000)],
        [
          'sprout',
          'گل میز',
          'گل‌آرایی کوتاه تا مهمان‌ها همدیگر را ببینند.',
          'از ' + m(1800000) + ' هر میز'
        ]
      ],
      labels: {
        returnToForm: 'بازگشت به فرم'
      },
      types: ['عقد', 'عروسی', 'نامزدی', 'تولد', 'مراسم شرکتی'],
      budgets: [
        'کمتر از ' + m(20000000),
        m(20000000) + ' تا ' + m(50000000),
        'بیش از ' + m(50000000),
        'هنوز نمی‌دانم'
      ]
    }
  }[S.lang];
}
