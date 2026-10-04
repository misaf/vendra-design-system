// Bilingual faq copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  const m = S.m;
  return {
    en: {
      eyebrow: 'Here to help',
      titleA: 'Answers,',
      titleB: 'with care.',
      intro: 'A few things to know before sending a little joy. From choosing your flowers to keeping them fresh.',
      helpTitle: 'Still wondering?',
      helpBody: 'Tell us what you have in mind. Our studio can help with a bouquet, a delivery question or flowers for a special day.',
      whatsapp: 'WhatsApp us',
      contactUs: 'Contact us',
      sample: 'Sample FAQ for this storefront template. Confirm delivery, payment and service details with the florist before launch.',
      groups: [['delivery', 'Ordering & delivery', [['zones', 'Where do you deliver?', 'We deliver across Karaj, Alborz province and Tehran. Delivery costs ' + m(VF_ZONES[0].fee) + ' in central Karaj, ' + m(VF_ZONES[1].fee) + ' in outer Karaj, ' + m(VF_ZONES[2].fee) + ' in Alborz and ' + m(VF_ZONES[3].fee) + ' in Tehran. Delivery is free in central and outer Karaj for orders of ' + m(VF_FREE_DELIVERY_THRESHOLD) + ' or more. Your bag shows the fee for your selected zone.'], ['same-day', 'Can my flowers arrive today?', 'Same-day delivery is available before the cut-off for your zone: ' + vfDeliveryCutoff(VF_ZONES[0], false) + ' in central Karaj, ' + vfDeliveryCutoff(VF_ZONES[1], false) + ' in outer Karaj, ' + vfDeliveryCutoff(VF_ZONES[2], false) + ' in Alborz and ' + vfDeliveryCutoff(VF_ZONES[3], false) + ' in Tehran. Message the studio to check availability for an urgent order.'], ['time', 'Can I choose a delivery time?', 'Choose your delivery zone and an available time window in your bag. If you need flowers for a specific moment, contact the studio before ordering.']]], ['orders', 'Payment & order help', [['payment', 'How do I pay?', 'Checkout shows the total and the studio’s bank details for a card-to-card transfer. After transferring, enter only the last four digits of your card and, optionally, your bank tracking number. Never send your full card number, PIN or banking password.'], ['changes', 'Can I change my order?', 'Contact the studio as soon as possible with your order number and the change you need. The team will confirm what is possible before the flowers are arranged or dispatched.'], ['problem', 'What if something arrives wrong or damaged?', 'Contact the studio with your order number and a clear photo of the flowers. The team will review the problem and help with the next step.']]], ['flowers', 'Flowers & gifting', [['seasonal', 'Will my bouquet look exactly like the photo?', 'Flowers vary with the season. If a particular flower or colour is essential, check with the studio before ordering so the team can confirm availability.'], ['gift', 'Can I include a gift message?', 'Yes. Add your message in the card field in your bag and check the recipient’s name, mobile number and delivery address before continuing.'], ['care', 'How do I keep my flowers fresh?', 'Trim the stems at an angle and change the water every two days. Keep the flowers away from direct sun, heat and ripening fruit. For a flower box or plant, ask the studio for care instructions specific to your arrangement.']]]]
    },
    fa: {
      eyebrow: 'کنار شما هستیم',
      titleA: 'پرسش‌های شما،',
      titleB: 'پاسخ‌های ما.',
      intro: 'چند نکته پیش از فرستادن یک خوشحالی کوچک؛ از انتخاب گل تا تازه نگه داشتن آن.',
      helpTitle: 'هنوز پرسشی دارید؟',
      helpBody: 'از چیزی که در ذهن دارید بگویید. برای انتخاب دسته‌گل، پرسش درباره ارسال یا گل‌های یک روز ویژه، استودیو کنار شماست.',
      whatsapp: 'پیام در واتساپ',
      contactUs: 'تماس با ما',
      sample: 'پرسش‌های متداول نمونه برای این قالب فروشگاه. پیش از راه‌اندازی، جزئیات ارسال، پرداخت و خدمات را با گل‌فروشی تأیید کنید.',
      groups: [['delivery', 'سفارش و ارسال', [['zones', 'به کدام مناطق ارسال دارید؟', 'در کرج، استان البرز و تهران ارسال داریم. هزینه ارسال در مرکز کرج ' + m(VF_ZONES[0].fee) + '، حومه کرج ' + m(VF_ZONES[1].fee) + '، استان البرز ' + m(VF_ZONES[2].fee) + ' و تهران ' + m(VF_ZONES[3].fee) + ' است. برای سفارش‌های ' + m(VF_FREE_DELIVERY_THRESHOLD) + ' و بیشتر، ارسال در مرکز و حومه کرج رایگان است. هزینه محدوده انتخابی شما در سبد نمایش داده می‌شود.'], ['same-day', 'آیا گل‌ها امروز می‌رسند؟', 'ارسال همان روز با ثبت سفارش پیش از ساعت پایانی هر محدوده امکان‌پذیر است: مرکز کرج ⁨۱۸:۰۰⁩، حومه کرج ⁨۱۶:۰۰⁩، استان البرز ⁨۱۴:۰۰⁩ و تهران ⁨۱۲:۰۰⁩. برای سفارش فوری، موجودی و امکان ارسال را از استودیو بپرسید.'], ['time', 'می‌توانم زمان تحویل را انتخاب کنم؟', 'محدوده ارسال و یکی از بازه‌های زمانی موجود را در سبد انتخاب کنید. اگر گل‌ها را برای ساعت مشخصی نیاز دارید، پیش از سفارش با استودیو تماس بگیرید.']]], ['orders', 'پرداخت و پیگیری سفارش', [['payment', 'چگونه پرداخت کنم؟', 'در صفحه پرداخت، مبلغ کل و اطلاعات بانکی استودیو برای واریز کارت به کارت نمایش داده می‌شود. پس از واریز، فقط چهار رقم آخر کارت خود و در صورت تمایل شماره پیگیری بانک را وارد کنید. شماره کامل کارت، رمز کارت یا رمز بانک را ارسال نکنید.'], ['changes', 'می‌توانم سفارش را تغییر دهم؟', 'هرچه زودتر شماره سفارش و تغییر موردنظر را به استودیو اطلاع دهید. تیم پیش از چیدن یا ارسال گل‌ها، امکان انجام تغییر را تأیید می‌کند.'], ['problem', 'اگر سفارش اشتباه یا آسیب‌دیده رسید چه کنم؟', 'شماره سفارش و عکس واضح گل‌ها را برای استودیو بفرستید. تیم مشکل را بررسی می‌کند و برای مرحله بعد راهنمایی‌تان می‌کند.']]], ['flowers', 'گل‌ها و هدیه', [['seasonal', 'آیا دسته‌گل دقیقاً شبیه عکس خواهد بود؟', 'گل‌ها با فصل تغییر می‌کنند. اگر گل یا رنگ مشخصی برایتان ضروری است، پیش از سفارش از استودیو بپرسید تا موجودی را تأیید کند.'], ['gift', 'می‌توانم پیام هدیه اضافه کنم؟', 'بله. پیام خود را در بخش متن کارت در سبد بنویسید و پیش از ادامه، نام گیرنده، شماره موبایل و آدرس تحویل را بررسی کنید.'], ['care', 'چگونه گل‌ها را تازه نگه دارم؟', 'ساقه‌ها را مورب کوتاه کنید و هر دو روز آب را عوض کنید. گل‌ها را دور از آفتاب مستقیم، گرما و میوه رسیده نگه دارید. برای باکس گل یا گیاه، روش نگهداری مخصوص آن را از استودیو بپرسید.']]]]
    }
  }[S.lang];
}
