// Bilingual policy copy. Edit here, then run npm --prefix templates run build.
// Fees, cut-offs, time slots and store details come from the shared config, so the policies stay current.
// Each document is {title, intro, sections: [{title, paras: [...], items?: [...]}]}.
function vfCopy(S) {
  const fa = S.fa;
  const L = fa ? 'fa' : 'en';
  const m = v => VF_MONEY(v, fa);
  const n = v => fa ? VF_FA_DIGITS(v) : String(v);
  const zoneList = (names, sep) => names.map(id => vfZone(id)[L]).join(sep);
  const zones = VF_ZONES.map(z => fa
    ? z.fa + ': ' + m(z.fee) + '، ارسال همان روز برای سفارش تا ساعت ' + vfDeliveryCutoff(z, true)
    : z.en + ': ' + m(z.fee) + ', same day when you order by ' + vfDeliveryCutoff(z, false));
  const slots = VF_SLOTS.map(([a, b]) => vfSlotLabel(a, b, fa)).join(fa ? '، ' : ', ');
  const freeZones = zoneList(VF_FREE_DELIVERY_ZONES, fa ? ' و ' : ' and ');
  const codZones = zoneList(VF_STORE.paymentDemo.codZones, fa ? ' و ' : ' and ');
  const brand = VF_STORE.brand[L], address = VF_STORE.address[L], hours = VF_STORE.hours[L];
  // LRI keeps the + in front of the number inside Persian sentences.
  const phone = '\u2066' + VF_STORE.phoneLabel + '\u2069';
  const T = VF_SHELL[L].policies;
  return {
    en: {
      eb: 'Policies',
      policiesL: 'Policies',
      updated: 'Last updated 1 October 2026',
      toc: 'On this page',
      sampleT: 'Sample text',
      sampleP: 'Replace with the florist’s own policies, checked by a lawyer, before launch.',
      docs: {
        shipping: {
          title: T.shipping,
          intro: 'Where we deliver, what it costs and how your flowers reach the door.',
          sections: [
            {title: 'Where we deliver', paras: ['We deliver across Karaj, Alborz province and Tehran. Pick your area at checkout to see its fee:'], items: zones},
            {title: 'Free delivery', paras: ['Delivery is free in ' + freeZones + ' on orders over ' + m(VF_FREE_DELIVERY_THRESHOLD) + '. Promo discounts don’t count towards that total.']},
            {title: 'Days and times', paras: ['Choose any of the next ' + n(VF_DELIVERY_DAYS) + ' days and one of these time slots: ' + slots + '. Busy days such as Valentine’s Day or Mother’s Day can sell out; those days are greyed out at checkout.']},
            {title: 'The address and map pin', paras: ['Put the pin on the recipient’s front door and add the plaque, unit and floor in the address field. The courier uses both, and calls the recipient when they arrive.']},
            {title: 'If no one is home', paras: ['If the courier can’t reach the recipient, we call you. Where we can, we arrange a second delivery the same day. Flowers are never left with a neighbour or at the door without your say-so.']},
            {title: 'Delivery photo', paras: ['The courier takes a photo of the flowers at the door. You can see it on the order tracking page once the order is delivered.']},
            {title: 'Tracking', paras: ['We text you when your order is being arranged, when it leaves the studio and when it is delivered. You can follow it any time with your order number on the Track an order page.']},
            {title: 'Outside our area', paras: ['Fresh flowers don’t travel well, so we don’t send them outside the areas above. For somewhere else, message us and we’ll suggest a florist we trust.']}
          ]
        },
        returns: {
          title: T.returns,
          intro: 'Flowers are fresh and made to order, so returns work a little differently from other shops.',
          sections: [
            {title: 'If something is wrong', paras: ['If your order arrives damaged, wilted or different from what you ordered, send us a photo within 24 hours of delivery. We’ll replace it the same or next day, or refund you in full; you choose.']},
            {title: 'Fresh flowers', paras: ['We can’t take back fresh flowers because you’ve changed your mind. Every bouquet is handmade from the day’s stems, so colours and flowers can vary a little by season. If a stem is out of stock, we use one of the same or higher value in the same style.']},
            {title: 'Plants, vases and gift sets', paras: ['Unused plants, vases and gift sets in their original packaging can be returned to the studio within 3 days of delivery for a full refund.']},
            {title: 'Changing or cancelling an order', paras: ['You can cancel for free, or change the time, address or card message, until we start arranging (usually the morning of delivery). Call or message us on WhatsApp as early as you can.'], items: ['Before we start arranging: full refund.', 'After we’ve started arranging: we can still change the delivery time or address, but we can’t refund the flowers.', 'If the address was wrong or the recipient couldn’t be reached: a second delivery is charged at the zone’s delivery fee.']},
            {title: 'Refunds', paras: ['Refunds go back to the card you paid with, within 3 working days of our confirming them. We refund the delivery fee too when the problem was ours. A promo code discount is not paid out as cash.']},
            {title: 'How to reach us', paras: ['Call or WhatsApp ' + phone + ' (' + hours + '), or use the contact page. Have your order number ready.']}
          ]
        },
        privacy: {
          title: T.privacy,
          intro: 'What we keep about you and the people you send flowers to, and what we do with it.',
          sections: [
            {title: 'What we keep', paras: ['Only what we need to take and deliver your orders:'], items: ['Your name, mobile number and, if you give it, your email.', 'Recipients’ names, mobile numbers, addresses and map pins.', 'Your orders, card messages and delivery photos.', 'Addresses, saved products and occasion reminders you keep in your account.']},
            {title: 'What we don’t keep', paras: ['We never see or store your full card number. Online payments are handled by the bank’s payment page; for card-to-card transfers we only ask for the last four digits so we can match the payment.']},
            {title: 'Why we use it', paras: ['To arrange and deliver your orders, keep you updated about them, send the reminders you set up, and reply when you contact us.']},
            {title: 'Who sees it', paras: ['Our studio team, and the courier for your delivery (only the recipient’s name, mobile, address and pin). Payments go through our bank. We never sell or rent your details, and only share them with the authorities when the law requires it.']},
            {title: 'Messages from us', paras: ['Order updates are sent by text. Occasion reminders and news are only sent if you turn them on, and you can turn them off at any time in your account. Our email newsletter only goes to addresses that signed up in the site footer, and every email has an unsubscribe link.']},
            {title: 'On your device', paras: ['The site keeps your bag, saved products, language and sign-in in your browser’s storage so they’re there when you come back. This is needed for the shop to work, so it doesn’t need your permission.', 'Visit counts (which pages are opened and when an order is placed, with no names, numbers or addresses) are only collected if you choose “Allow visit counts” in the banner the first time you visit. You can change your choice at any time from “Cookie settings” in the site footer. We use no advertising trackers.']},
            {title: 'How long we keep it', paras: ['We keep order records for as long as the tax and accounting rules require. Everything else stays until you delete it or close your account.']},
            {title: 'Your choices', paras: ['You can see and change your details, addresses and reminders in your account, and ask us to delete your account at any time. Contact us with any question about your data.']}
          ]
        },
        terms: {
          title: T.terms,
          intro: 'The terms for using this site and ordering from ' + brand + '. By placing an order, you agree to them.',
          sections: [
            {title: 'Who we are', paras: [brand + ', ' + address + '. Call or WhatsApp us on ' + phone + '.']},
            {title: 'Orders', paras: ['Your order is confirmed once payment is received (or, for pay on delivery, once we confirm it by text). If we can’t fulfil an order, for example because a day sells out, we tell you straight away and refund you in full.']},
            {title: 'Prices and payment', paras: ['Prices are in Toman and include everything except delivery, which is shown at checkout before you pay. You can pay online, by card-to-card transfer, or on delivery in ' + codZones + '.']},
            {title: 'Promo codes', paras: ['One code per order. Some codes need a minimum order, and codes can’t be exchanged for cash or used on orders already placed. We may end a promotion at any time.']},
            {title: 'Flowers and photos', paras: ['Each arrangement is made by hand on the day, so it will look close to, but never exactly like, the photos. If a flower is unavailable, we replace it with one of the same or higher value in the same style.']},
            {title: 'Delivery', paras: ['Delivery is covered in the Shipping & delivery policy. Please make sure the recipient’s address, pin and mobile number are right; a second delivery caused by wrong details is charged again.']},
            {title: 'Your account', paras: ['You sign in with a code sent to your mobile, so keep your phone secure. You are responsible for orders placed from your account.']},
            {title: 'Fair use', paras: ['Don’t use the site to break the law, to send card messages that are abusive or threatening, or to interfere with how the site works. We may refuse orders that do.']},
            {title: 'Our photos and text', paras: ['The photos, designs and words on this site belong to ' + brand + '. Please ask before using them.']},
            {title: 'Our responsibility', paras: ['If something goes wrong with an order, our responsibility is limited to replacing it or refunding what you paid for it. This doesn’t affect your rights as a consumer under the law.']},
            {title: 'Changes and law', paras: ['We may update these terms; the date at the top shows the latest version, and the version in place when you ordered applies to that order. These terms are governed by the laws of the Islamic Republic of Iran.']}
          ]
        }
      }
    },
    fa: {
      eb: 'قوانین',
      policiesL: 'قوانین',
      updated: 'آخرین به‌روزرسانی ۹ مهر ۱۴۰۵',
      toc: 'در این صفحه',
      sampleT: 'متن نمونه',
      sampleP: 'پیش از راه‌اندازی، قوانین خود گل‌فروشی را که وکیل بررسی کرده جایگزین کنید.',
      docs: {
        shipping: {
          title: T.shipping,
          intro: 'کجا ارسال داریم، هزینه‌اش چقدر است و گل‌ها چطور به دستِ گیرنده می‌رسند.',
          sections: [
            {title: 'محدوده ارسال', paras: ['در کرج، استان البرز و تهران ارسال داریم. هنگام پرداخت، محدوده را انتخاب کنید تا هزینه‌اش را ببینید:'], items: zones},
            {title: 'ارسال رایگان', paras: ['ارسال در ' + freeZones + ' برای سفارش‌های بالای ' + m(VF_FREE_DELIVERY_THRESHOLD) + ' رایگان است. تخفیف کد تخفیف در این مبلغ حساب نمی‌شود.']},
            {title: 'روز و ساعت ارسال', paras: ['یکی از ' + n(VF_DELIVERY_DAYS) + ' روز آینده و یکی از این بازه‌ها را انتخاب کنید: ' + slots + '. روزهای شلوغ مثل ولنتاین یا روز مادر ممکن است پر شوند؛ این روزها هنگام پرداخت غیرفعال نمایش داده می‌شوند.']},
            {title: 'نشانی و پین نقشه', paras: ['پین را روی درِ ورودی گیرنده بگذارید و پلاک، واحد و طبقه را در نشانی بنویسید. پیک از هر دو استفاده می‌کند و هنگام رسیدن با گیرنده تماس می‌گیرد.']},
            {title: 'اگر کسی خانه نبود', paras: ['اگر پیک به گیرنده دسترسی پیدا نکند، با شما تماس می‌گیریم و در صورت امکان همان روز دوباره ارسال می‌کنیم. بدون اجازه شما گل را به همسایه نمی‌دهیم یا دمِ در نمی‌گذاریم.']},
            {title: 'عکس تحویل', paras: ['پیک هنگام تحویل از گل‌ها دمِ در عکس می‌گیرد. پس از تحویل، عکس را در صفحه پیگیری سفارش می‌بینید.']},
            {title: 'پیگیری', paras: ['وقتی سفارش در حال آماده‌سازی است، از استودیو خارج می‌شود و تحویل داده می‌شود، پیامک می‌فرستیم. هر زمان هم می‌توانید با شماره سفارش در صفحه پیگیری سفارش وضعیت را ببینید.']},
            {title: 'خارج از محدوده', paras: ['گل تازه سفر طولانی را تحمل نمی‌کند، پس خارج از محدوده‌های بالا ارسال نداریم. برای جای دیگر پیام بدهید تا یک گل‌فروشی مطمئن معرفی کنیم.']}
          ]
        },
        returns: {
          title: T.returns,
          intro: 'گل‌ها تازه‌اند و برای هر سفارش جداگانه چیده می‌شوند، پس بازگشت کالا کمی با فروشگاه‌های دیگر فرق دارد.',
          sections: [
            {title: 'اگر مشکلی بود', paras: ['اگر سفارش آسیب‌دیده، پژمرده یا متفاوت با سفارش شما رسید، تا ۲۴ ساعت پس از تحویل عکسش را برایمان بفرستید. همان روز یا روز بعد آن را عوض می‌کنیم یا کل مبلغ را برمی‌گردانیم؛ انتخاب با شماست.']},
            {title: 'گل تازه', paras: ['گل تازه را به دلیل تغییر نظر پس نمی‌گیریم. هر دسته‌گل با گل‌های همان روز دست‌ساز است، پس رنگ و نوع گل‌ها بسته به فصل کمی فرق می‌کند. اگر گلی تمام شده باشد، گلی هم‌ارزش یا گران‌تر در همان سبک جایگزین می‌کنیم.']},
            {title: 'گیاه، گلدان و ست هدیه', paras: ['گیاه، گلدان و ست هدیه استفاده‌نشده در بسته‌بندی اصلی را تا ۳ روز پس از تحویل می‌توانید به استودیو برگردانید و کل مبلغ را پس بگیرید.']},
            {title: 'تغییر یا لغو سفارش', paras: ['تا پیش از شروع چیدمان (معمولاً صبحِ روز ارسال) می‌توانید سفارش را رایگان لغو کنید یا ساعت، نشانی یا متن کارت را تغییر دهید. هرچه زودتر تماس بگیرید یا در واتساپ پیام بدهید.'], items: ['پیش از شروع چیدمان: بازپرداخت کامل.', 'پس از شروع چیدمان: ساعت یا نشانی ارسال را هنوز می‌شود تغییر داد، اما هزینه گل‌ها بازگردانده نمی‌شود.', 'اگر نشانی اشتباه بود یا گیرنده در دسترس نبود: ارسال دوباره با هزینه ارسال همان محدوده حساب می‌شود.']},
            {title: 'بازپرداخت', paras: ['مبلغ به همان کارتی که با آن پرداخت کرده‌اید، تا ۳ روز کاری پس از تأیید بازگردانده می‌شود. اگر مشکل از ما بوده، هزینه ارسال هم بازگردانده می‌شود. تخفیف کد تخفیف به‌صورت نقدی پرداخت نمی‌شود.']},
            {title: 'راه تماس', paras: ['با ' + phone + ' تماس بگیرید یا در واتساپ پیام بدهید (' + hours + ')، یا از صفحه تماس استفاده کنید. شماره سفارش را دمِ دست داشته باشید.']}
          ]
        },
        privacy: {
          title: T.privacy,
          intro: 'چه اطلاعاتی از شما و کسانی که برایشان گل می‌فرستید نگه می‌داریم و با آن چه می‌کنیم.',
          sections: [
            {title: 'چه چیزی نگه می‌داریم', paras: ['فقط آنچه برای ثبت و ارسال سفارش لازم است:'], items: ['نام، شماره موبایل و اگر بدهید، ایمیل شما.', 'نام، شماره موبایل، نشانی و پین نقشه گیرندگان.', 'سفارش‌ها، متن کارت‌ها و عکس‌های تحویل.', 'نشانی‌ها، محصولات ذخیره‌شده و یادآورهای مناسبتی که در حساب خود نگه می‌دارید.']},
            {title: 'چه چیزی نگه نمی‌داریم', paras: ['شماره کامل کارت شما را هرگز نمی‌بینیم و ذخیره نمی‌کنیم. پرداخت آنلاین در درگاه بانک انجام می‌شود و برای کارت به کارت فقط چهار رقم آخر را می‌پرسیم تا پرداخت را تطبیق دهیم.']},
            {title: 'چرا از آن استفاده می‌کنیم', paras: ['برای آماده‌سازی و ارسال سفارش، خبر دادن درباره وضعیت آن، فرستادن یادآورهایی که خودتان تنظیم کرده‌اید و پاسخ به پیام‌هایتان.']},
            {title: 'چه کسی آن را می‌بیند', paras: ['تیم استودیو و پیکِ همان سفارش (فقط نام، موبایل، نشانی و پین گیرنده). پرداخت‌ها از طریق بانک انجام می‌شود. اطلاعات شما را هرگز نمی‌فروشیم یا اجاره نمی‌دهیم و فقط در صورت الزام قانونی در اختیار مراجع قانونی می‌گذاریم.']},
            {title: 'پیام‌های ما', paras: ['خبرهای سفارش با پیامک فرستاده می‌شود. یادآورهای مناسبتی و خبرها فقط اگر خودتان روشنشان کنید فرستاده می‌شوند و هر زمان در حساب کاربری می‌توانید خاموششان کنید. خبرنامه ایمیلی فقط برای نشانی‌هایی فرستاده می‌شود که در پایین سایت عضو شده‌اند و در هر ایمیل پیوند لغو عضویت هست.']},
            {title: 'روی دستگاه شما', paras: ['سایت سبد خرید، محصولات ذخیره‌شده، زبان و ورود شما را در حافظه مرورگر نگه می‌دارد تا وقتی برگشتید سر جایشان باشند. این برای کار کردن فروشگاه لازم است و به اجازه شما نیاز ندارد.', 'آمار بازدید (کدام صفحه‌ها باز می‌شوند و چه زمانی سفارشی ثبت می‌شود، بدون نام، شماره یا نشانی) فقط وقتی جمع می‌شود که در اولین بازدید در پیام پایین صفحه «اجازه شمارش بازدید» را انتخاب کنید. هر زمان می‌توانید انتخابتان را از «تنظیمات کوکی» در پایین سایت تغییر دهید. از هیچ ردیاب تبلیغاتی استفاده نمی‌کنیم.']},
            {title: 'تا کی نگه می‌داریم', paras: ['سوابق سفارش را تا زمانی که قوانین مالیاتی و حسابداری لازم می‌داند نگه می‌داریم. بقیه اطلاعات تا وقتی که خودتان پاکشان کنید یا حساب را ببندید می‌ماند.']},
            {title: 'اختیار با شماست', paras: ['اطلاعات، نشانی‌ها و یادآورهایتان را در حساب کاربری می‌بینید و تغییر می‌دهید و هر زمان می‌توانید حذف حساب را از ما بخواهید. برای هر پرسشی درباره اطلاعاتتان با ما تماس بگیرید.']}
          ]
        },
        terms: {
          title: T.terms,
          intro: 'شرایط استفاده از این سایت و سفارش از ' + brand + '. با ثبت سفارش، این شرایط را می‌پذیرید.',
          sections: [
            {title: 'ما که هستیم', paras: [brand + '، ' + address + '. شماره تماس و واتساپ: ' + phone + '.']},
            {title: 'سفارش', paras: ['سفارش شما پس از دریافت پرداخت (یا برای پرداخت در محل، پس از تأیید ما با پیامک) قطعی می‌شود. اگر نتوانیم سفارشی را انجام دهیم، مثلاً چون ظرفیت آن روز پر شده، فوراً خبر می‌دهیم و کل مبلغ را برمی‌گردانیم.']},
            {title: 'قیمت و پرداخت', paras: ['قیمت‌ها به تومان است و همه‌چیز جز هزینه ارسال را شامل می‌شود؛ هزینه ارسال پیش از پرداخت نمایش داده می‌شود. می‌توانید آنلاین، کارت به کارت، یا در ' + codZones + ' هنگام تحویل پرداخت کنید.']},
            {title: 'کد تخفیف', paras: ['در هر سفارش یک کد. بعضی کدها حداقل مبلغ سفارش دارند. کد تخفیف قابل تبدیل به پول نقد نیست و برای سفارش‌های ثبت‌شده استفاده نمی‌شود. ممکن است هر زمان طرحی را تمام کنیم.']},
            {title: 'گل‌ها و عکس‌ها', paras: ['هر چیدمان همان روز با دست ساخته می‌شود، پس به عکس‌ها نزدیک است اما هیچ‌وقت دقیقاً یکی نیست. اگر گلی موجود نباشد، گلی هم‌ارزش یا گران‌تر در همان سبک جایگزین می‌کنیم.']},
            {title: 'ارسال', paras: ['جزئیات ارسال در قوانین ارسال و تحویل آمده است. لطفاً از درستی نشانی، پین و موبایل گیرنده مطمئن شوید؛ ارسال دوباره به دلیل اطلاعات نادرست دوباره حساب می‌شود.']},
            {title: 'حساب کاربری', paras: ['ورود با کدی است که به موبایلتان فرستاده می‌شود، پس از گوشی خود محافظت کنید. مسئولیت سفارش‌هایی که از حساب شما ثبت می‌شود با شماست.']},
            {title: 'استفاده درست', paras: ['از سایت برای کار غیرقانونی، فرستادن کارت با متن توهین‌آمیز یا تهدیدآمیز، یا اخلال در کار سایت استفاده نکنید. ممکن است چنین سفارش‌هایی را نپذیریم.']},
            {title: 'عکس‌ها و متن‌های ما', paras: ['عکس‌ها، طرح‌ها و متن‌های این سایت متعلق به ' + brand + ' است. پیش از استفاده از ما اجازه بگیرید.']},
            {title: 'مسئولیت ما', paras: ['اگر در سفارشی مشکلی پیش بیاید، مسئولیت ما به تعویض آن یا بازگرداندن مبلغ پرداختی همان سفارش محدود است. این بند حقوق قانونی شما به‌عنوان مصرف‌کننده را محدود نمی‌کند.']},
            {title: 'تغییرات و قانون حاکم', paras: ['ممکن است این شرایط را به‌روز کنیم؛ تاریخ بالای صفحه آخرین نسخه را نشان می‌دهد و برای هر سفارش، نسخه‌ای معتبر است که هنگام ثبت آن برقرار بوده. این شرایط تابع قوانین جمهوری اسلامی ایران است.']}
          ]
        }
      }
    }
  }[S.lang];
}
