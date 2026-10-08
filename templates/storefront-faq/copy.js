// Bilingual faq copy. Edit here, then run npm --prefix templates run build.
// The questions are sample responses shaped like the Vendra API (FaqCategory, Faq). Answers can use
// {fee:<zone>}, {cutoff:<zone>} and {freeDeliveryFrom}, filled from the delivery rules (vfStoreText).

// GET /api/content/faq-categories
const VF_API_FAQ_CATEGORIES = [
  {
    id: 1,
    name: {en: 'Ordering & delivery', fa: 'سفارش و ارسال'},
    slug: {en: 'delivery', fa: 'سفارش-و-ارسال'},
    description: {},
    position: 1,
    active: true
  },
  {
    id: 2,
    name: {en: 'Payment & order help', fa: 'پرداخت و پیگیری سفارش'},
    slug: {en: 'orders', fa: 'پرداخت-و-پیگیری-سفارش'},
    description: {},
    position: 2,
    active: true
  },
  {
    id: 3,
    name: {en: 'Flowers & gifting', fa: 'گل‌ها و هدیه'},
    slug: {en: 'flowers', fa: 'گل‌ها-و-هدیه'},
    description: {},
    position: 3,
    active: true
  }
];

// GET /api/content/faqs
const VF_API_FAQS = [
  [
    1,
    'zones',
    1,
    'Where do you deliver?',
    'We deliver across Karaj, Alborz province and Tehran. Delivery costs {fee:central} in central Karaj, {fee:outer} in outer Karaj, {fee:alborz} in Alborz and {fee:tehran} in Tehran. Delivery is free in central and outer Karaj for orders of {freeDeliveryFrom} or more. Your bag shows the fee for your selected zone.',
    'به کدام مناطق ارسال دارید؟',
    'در کرج، استان البرز و تهران ارسال داریم. هزینه ارسال در مرکز کرج {fee:central}، حومه کرج {fee:outer}، استان البرز {fee:alborz} و تهران {fee:tehran} است. برای سفارش‌های {freeDeliveryFrom} و بیشتر، ارسال در مرکز و حومه کرج رایگان است. هزینه محدوده انتخابی شما در سبد نمایش داده می‌شود.'
  ],
  [
    2,
    'same-day',
    1,
    'Can my flowers arrive today?',
    'Same-day delivery is available before the cut-off for your zone: {cutoff:central} in central Karaj, {cutoff:outer} in outer Karaj, {cutoff:alborz} in Alborz and {cutoff:tehran} in Tehran. Message the studio to check availability for an urgent order.',
    'آیا گل‌ها امروز می‌رسند؟',
    'ارسال همان روز با ثبت سفارش پیش از ساعت پایانی هر محدوده امکان‌پذیر است: مرکز کرج {cutoff:central}، حومه کرج {cutoff:outer}، استان البرز {cutoff:alborz} و تهران {cutoff:tehran}. برای سفارش فوری، موجودی و امکان ارسال را از استودیو بپرسید.'
  ],
  [
    3,
    'time',
    1,
    'Can I choose a delivery time?',
    'Choose your delivery zone and an available time window in your bag. If you need flowers for a specific moment, contact the studio before ordering.',
    'می‌توانم زمان تحویل را انتخاب کنم؟',
    'محدوده ارسال و یکی از بازه‌های زمانی موجود را در سبد انتخاب کنید. اگر گل‌ها را برای ساعت مشخصی نیاز دارید، پیش از سفارش با استودیو تماس بگیرید.'
  ],
  [
    4,
    'payment',
    2,
    'How do I pay?',
    'Checkout shows the total and the studio’s bank details for a card-to-card transfer. After transferring, enter only the last four digits of your card and, optionally, your bank tracking number. Never send your full card number, PIN or banking password.',
    'چگونه پرداخت کنم؟',
    'در صفحه پرداخت، مبلغ کل و اطلاعات بانکی استودیو برای واریز کارت به کارت نمایش داده می‌شود. پس از واریز، فقط چهار رقم آخر کارت خود و در صورت تمایل شماره پیگیری بانک را وارد کنید. شماره کامل کارت، رمز کارت یا رمز بانک را ارسال نکنید.'
  ],
  [
    5,
    'changes',
    2,
    'Can I change my order?',
    'Contact the studio as soon as possible with your order number and the change you need. The team will confirm what is possible before the flowers are arranged or dispatched.',
    'می‌توانم سفارش را تغییر دهم؟',
    'هرچه زودتر شماره سفارش و تغییر موردنظر را به استودیو اطلاع دهید. تیم پیش از چیدن یا ارسال گل‌ها، امکان انجام تغییر را تأیید می‌کند.'
  ],
  [
    6,
    'problem',
    2,
    'What if something arrives wrong or damaged?',
    'Contact the studio with your order number and a clear photo of the flowers. The team will review the problem and help with the next step.',
    'اگر سفارش اشتباه یا آسیب‌دیده رسید چه کنم؟',
    'شماره سفارش و عکس واضح گل‌ها را برای استودیو بفرستید. تیم مشکل را بررسی می‌کند و برای مرحله بعد راهنمایی‌تان می‌کند.'
  ],
  [
    7,
    'seasonal',
    3,
    'Will my bouquet look exactly like the photo?',
    'Flowers vary with the season. If a particular flower or colour is essential, check with the studio before ordering so the team can confirm availability.',
    'آیا دسته‌گل دقیقاً شبیه عکس خواهد بود؟',
    'گل‌ها با فصل تغییر می‌کنند. اگر گل یا رنگ مشخصی برایتان ضروری است، پیش از سفارش از استودیو بپرسید تا موجودی را تأیید کند.'
  ],
  [
    8,
    'gift',
    3,
    'Can I include a gift message?',
    'Yes. Add your message in the card field in your bag and check the recipient’s name, mobile number and delivery address before continuing.',
    'می‌توانم پیام هدیه اضافه کنم؟',
    'بله. پیام خود را در بخش متن کارت در سبد بنویسید و پیش از ادامه، نام گیرنده، شماره موبایل و آدرس تحویل را بررسی کنید.'
  ],
  [
    9,
    'care',
    3,
    'How do I keep my flowers fresh?',
    'Trim the stems at an angle and change the water every two days. Keep the flowers away from direct sun, heat and ripening fruit. For a flower box or plant, ask the studio for care instructions specific to your arrangement.',
    'چگونه گل‌ها را تازه نگه دارم؟',
    'ساقه‌ها را مورب کوتاه کنید و هر دو روز آب را عوض کنید. گل‌ها را دور از آفتاب مستقیم، گرما و میوه رسیده نگه دارید. برای باکس گل یا گیاه، روش نگهداری مخصوص آن را از استودیو بپرسید.'
  ]
].map(([id, slug, categoryId, questionEn, answerEn, questionFa, answerFa], index) => ({
  id,
  name: {en: questionEn, fa: questionFa},
  description: {en: answerEn, fa: answerFa},
  slug: {en: slug, fa: questionFa.replace(/[؟?]/g, '').trim().replace(/\s+/g, '-')},
  position: index + 1,
  active: true,
  faqCategory: {id: categoryId, type: 'FaqCategory', label: null},
  multimedia: []
}));

// FAQ groups for the page: each active category with its active questions, in position order, as
// [slug, title, [[slug, question, answer]]], answers with delivery values filled in.
function vfFaqGroups(lang, money) {
  const byPosition = (a, b) => a.position - b.position;
  return VF_API_FAQ_CATEGORIES.filter(category => category.active)
    .sort(byPosition)
    .map(category => [
      category.slug.en,
      category.name[lang],
      VF_API_FAQS.filter(faq => faq.active && faq.faqCategory.id === category.id)
        .sort(byPosition)
        .map(faq => [
          faq.slug.en,
          faq.name[lang],
          vfStoreText(faq.description[lang], money, lang === 'fa')
        ])
    ])
    .filter(group => group[2].length);
}

function vfCopy(S) {
  const copy = {
    en: {
      eyebrow: 'Here to help',
      titleA: 'Answers,',
      titleB: 'with care.',
      intro:
        'A few things to know before sending a little joy. From choosing your flowers to keeping them fresh.',
      helpTitle: 'Still wondering?',
      helpBody:
        'Tell us what you have in mind. Our studio can help with a bouquet, a delivery question or flowers for a special day.',
      whatsapp: 'WhatsApp us',
      contactUs: 'Contact us',
      sample:
        'Sample FAQ for this storefront template. Confirm delivery, payment and service details with the florist before launch.'
    },
    fa: {
      eyebrow: 'کنار شما هستیم',
      titleA: 'پرسش‌های شما،',
      titleB: 'پاسخ‌های ما.',
      intro: 'چند نکته پیش از فرستادن یک خوشحالی کوچک؛ از انتخاب گل تا تازه نگه داشتن آن.',
      helpTitle: 'هنوز پرسشی دارید؟',
      helpBody:
        'از چیزی که در ذهن دارید بگویید. برای انتخاب دسته‌گل، پرسش درباره ارسال یا گل‌های یک روز ویژه، استودیو کنار شماست.',
      whatsapp: 'پیام در واتساپ',
      contactUs: 'تماس با ما',
      sample:
        'پرسش‌های متداول نمونه برای این قالب فروشگاه. پیش از راه‌اندازی، جزئیات ارسال، پرداخت و خدمات را با گل‌فروشی تأیید کنید.'
    }
  }[S.lang];
  return {...copy, groups: vfFaqGroups(S.lang, S.m)};
}
