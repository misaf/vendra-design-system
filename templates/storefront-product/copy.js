// Bilingual product copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  const m = S.m;
  return {
    en: {
      crumbs: 'Breadcrumb',
      cat: 'Flower boxes',
      photo: 'Product photo',
      badge: 'New',
      sub: 'Roses · lisianthus · satin',
      name: 'Ivory ribbon box',
      desc: 'Ivory garden roses and lisianthus in a linen-wrapped box, tied with satin. We write every card by hand.',
      size: 'Size',
      extras: 'Add a little more',
      recentEb: 'Still deciding?',
      saveDesign: 'Save this design',
      recentA: 'Recently',
      recentB: 'viewed.',
      ship: 'Same-day delivery in Karaj if you order by ' + vfDeliveryCutoff(VF_ZONES[0], false) + '.',
      dec: 'Fewer',
      inc: 'More',
      add: 'Add to bag',
      added: 'Added to bag',
      viewBag: 'View bag',
      dismiss: 'Dismiss',
      photos: 'Product photos',
      slide: (i, n) => 'Photo ' + i + ' of ' + n,
      care: 'Care',
      careT: 'Trim the stems at an angle and change the water every two days. Keep away from direct sun and fruit.',
      del: 'Delivery',
      delT: 'Karaj central ' + m(VF_ZONES[0].fee) + ', ' + vfDeliveryHint(VF_ZONES[0], false) + '. Tehran ' + m(VF_ZONES[3].fee) + ', ' + vfDeliveryHint(VF_ZONES[3], false) + '.',
      labels: {
        vendraFlowers: 'Vendra flowers',
        chooseYourDeliveryWindowAtCheckout: 'Choose your delivery window at checkout.',
        base: 'Base'
      }
    },
    fa: {
      crumbs: 'مسیر صفحه',
      cat: 'باکس گل',
      photo: 'عکس محصول',
      badge: 'جدید',
      sub: 'رز · لیسیانتوس · ساتن',
      name: 'باکس روبان عاجی',
      desc: 'رز باغی عاجی و لیسیانتوس در باکسی با روکش کتان، بسته با روبان ساتن. همه کارت‌ها را با دست می‌نویسیم.',
      size: 'اندازه',
      extras: 'کمی بیشتر',
      recentEb: 'هنوز انتخاب نکرده‌اید؟',
      saveDesign: 'ذخیره این طرح',
      recentA: 'اخیراً',
      recentB: 'دیده‌اید.',
      ship: 'ارسال همان روز در کرج برای سفارش تا ساعت ' + vfDeliveryCutoff(VF_ZONES[0], true) + '.',
      dec: 'کمتر',
      inc: 'بیشتر',
      add: 'افزودن به سبد',
      added: 'به سبد اضافه شد',
      viewBag: 'مشاهده سبد',
      dismiss: 'بستن',
      photos: 'عکس‌های محصول',
      slide: (i, n) => 'عکس ' + S.n(i) + ' از ' + S.n(n),
      care: 'نگهداری',
      careT: 'ساقه‌ها را مورب کوتاه کنید و هر دو روز آب را عوض کنید. دور از آفتاب مستقیم و میوه نگه دارید.',
      del: 'ارسال',
      delT: 'مرکز کرج ' + m(VF_ZONES[0].fee) + '، ' + vfDeliveryHint(VF_ZONES[0], true) + '. تهران ' + m(VF_ZONES[3].fee) + '، ' + vfDeliveryHint(VF_ZONES[3], true) + '.',
      labels: {
        vendraFlowers: 'گل‌های وندرا',
        chooseYourDeliveryWindowAtCheckout: 'زمان ارسال هنگام ثبت سفارش انتخاب می‌شود.',
        base: 'پایه'
      }
    }
  }[S.lang];
}
