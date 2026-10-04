// Bilingual weddings copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  return {
    en: {
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
      sv: [['gem', 'Bridal bouquet', 'Hand-tied to your dress and season, with a matching buttonhole.', 'From 6,500,000 Toman'], ['car', 'Wedding car', 'Bonnet and door arrangements that hold at speed.', 'From 9,000,000 Toman'], ['flower-2', 'Ceremony stands', 'Floor-standing arrangements for the aisle and backdrop.', 'From 12,000,000 Toman'], ['sprout', 'Table flowers', 'Low centrepieces so guests can see each other.', 'From 1,800,000 Toman a table']],
      labels: {
        returnToForm: 'Return to form'
      },
      types: ['Wedding ceremony', 'Wedding reception', 'Engagement', 'Birthday', 'Corporate event'],
      budgets: ['Under 20M Toman', '20–50M Toman', 'Over 50M Toman', 'Not sure yet']
    },
    fa: {
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
      sv: [['gem', 'دسته‌گل عروس', 'هماهنگ با لباس و فصل، همراه با گل کت داماد.', 'از ۶٬۵۰۰٬۰۰۰ تومان'], ['car', 'گل‌آرایی ماشین', 'گل‌آرایی کاپوت و درها که در حرکت محکم می‌ماند.', 'از ۹٬۰۰۰٬۰۰۰ تومان'], ['flower-2', 'استند مراسم', 'گل‌آرایی ایستاده برای مسیر و پس‌زمینه.', 'از ۱۲٬۰۰۰٬۰۰۰ تومان'], ['sprout', 'گل میز', 'گل‌آرایی کوتاه تا مهمان‌ها همدیگر را ببینند.', 'از ۱٬۸۰۰٬۰۰۰ تومان هر میز']],
      labels: {
        returnToForm: 'بازگشت به فرم'
      },
      types: ['عقد', 'عروسی', 'نامزدی', 'تولد', 'مراسم شرکتی'],
      budgets: ['کمتر از ۲۰ میلیون', '۲۰ تا ۵۰ میلیون', 'بیش از ۵۰ میلیون', 'هنوز نمی‌دانم']
    }
  }[S.lang];
}
