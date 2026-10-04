// Bilingual policy copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  const fa = S.fa,
    m = S.m,
    n = S.n;
  return {
    en: {
      eb: 'Policies',
      updated: 'Last updated 1 October 2026',
      toc: 'On this page',
      sampleT: 'Sample text',
      sampleP: 'Replace with the florist’s own policy before launch.',
      docs: {
        shipping: ['Shipping & delivery', [['Delivery zones', 'We deliver across Karaj, Alborz province and Tehran. Fees are shown at checkout for your zone.'], ['Same-day delivery', 'Order before the cut-off for your zone (' + vfDeliveryCutoff(VF_ZONES[0], false) + ' in central Karaj) and we deliver the same day, within the time slot you choose.'], ['Other provinces', 'Houseplants can be sent by post in 3–5 days. Fresh flowers can’t travel that far.'], ['If no one is home', 'The courier will call the recipient. If we can’t reach them, we’ll call you and arrange a second delivery the same day where possible.']]],
        returns: ['Returns & refunds', [['Fresh flowers', 'Fresh flowers can’t be returned. If anything arrives damaged or wrong, send us a photo within 24 hours and we’ll replace it.'], ['Plants and gift sets', 'Unused plants and gift sets can be returned to the studio within 3 days.'], ['Refunds', 'Refunds go back to the card you paid from within 3 working days.'], ['Cancelling an order', 'Cancel free of charge until we start arranging — usually the morning of delivery.']]],
        privacy: ['Privacy', [['What we keep', 'Your name, mobile number, addresses, orders and reminders. Never your card number.'], ['Why', 'To deliver your orders, send updates and the reminders you ask for.'], ['Who sees it', 'Only our studio team and the courier for your delivery.'], ['Your choices', 'Change your details or delete your account at any time from your account page.']]]
      }
    },
    fa: {
      eb: 'قوانین',
      updated: 'آخرین به‌روزرسانی ۹ مهر ۱۴۰۵',
      toc: 'در این صفحه',
      sampleT: 'متن نمونه',
      sampleP: 'پیش از راه‌اندازی، متن قوانین خود گل‌فروشی را جایگزین کنید.',
      docs: {
        shipping: ['ارسال و تحویل', [['محدوده ارسال', 'در کرج، استان البرز و تهران ارسال داریم. هزینه هر محدوده هنگام پرداخت نمایش داده می‌شود.'], ['ارسال همان روز', 'اگر پیش از ساعت پایانی محدوده خود (' + vfDeliveryCutoff(VF_ZONES[0], true) + ' در مرکز کرج) سفارش دهید، همان روز در بازه زمانی انتخابی شما ارسال می‌کنیم.'], ['سایر استان‌ها', 'گیاهان آپارتمانی با پست در ۳ تا ۵ روز ارسال می‌شوند. گل تازه این مسیر را تحمل نمی‌کند.'], ['اگر کسی خانه نبود', 'پیک با گیرنده تماس می‌گیرد. اگر در دسترس نبود، با شما تماس می‌گیریم و در صورت امکان همان روز دوباره ارسال می‌کنیم.']]],
        returns: ['بازگشت و بازپرداخت', [['گل تازه', 'گل تازه قابل بازگشت نیست. اگر سفارش آسیب‌دیده یا اشتباه رسید، تا ۲۴ ساعت عکس بفرستید تا جایگزین کنیم.'], ['گیاه و ست هدیه', 'گیاه و ست هدیه استفاده‌نشده را تا ۳ روز می‌توانید به استودیو برگردانید.'], ['بازپرداخت', 'مبلغ ظرف ۳ روز کاری به کارتی که از آن پرداخت کردید برمی‌گردد.'], ['لغو سفارش', 'تا پیش از شروع چیدن — معمولاً صبح روز ارسال — لغو رایگان است.']]],
        privacy: ['حریم خصوصی', [['چه چیزی نگه می‌داریم', 'نام، شماره موبایل، آدرس‌ها، سفارش‌ها و یادآورها. هرگز شماره کارت شما را نه.'], ['چرا', 'برای ارسال سفارش، اطلاع‌رسانی و یادآورهایی که خودتان می‌خواهید.'], ['چه کسی می‌بیند', 'فقط تیم استودیو و پیک سفارش شما.'], ['انتخاب شما', 'هر زمان از صفحه حساب، اطلاعات خود را تغییر دهید یا حساب را حذف کنید.']]]
      }
    }
  }[S.lang];
}
