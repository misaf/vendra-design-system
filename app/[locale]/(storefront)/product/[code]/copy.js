// Bilingual product copy. Edit here, then run npm run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
import {
  VF_ZONES,
  vfDeliveryCutoff,
  vfDeliveryHint
} from '../../../../../src/storefront/delivery/delivery.js';
import {vfPlural} from '../../../../../src/storefront/store/store-config.js';
import {
  VF_PRODUCT_DETAILS,
  vfProductImage,
  vfProductImages
} from '../../../../../src/storefront/catalog/catalog.js';
import {VF_CATEGORY_COPY} from '../../../../../src/storefront/catalog/categories.js';
import {VF_SHELL} from '../../../../../src/storefront/shell/shell.js';
import {vfRouteUrl} from '../../../../../shared/services/routing.js';
import {
  vfBreadcrumbData,
  vfOfferPrice,
  vfProductData
} from '../../../../../shared/services/structured-data.js';

export function vfProductHead(product, L) {
  const url = vfRouteUrl({lang: L, view: 'product', id: product.id});
  const photo = vfProductImage(product, L);
  const description = VF_PRODUCT_DETAILS[product.id][L === 'fa' ? 1 : 0];
  return {
    image: {src: photo.src, alt: photo.alt, width: photo.width, height: photo.height},
    description: description,
    type: 'product',
    price: vfOfferPrice(product.price),
    structuredData: [
      vfProductData({
        product,
        lang: L,
        url,
        images: vfProductImages(product, L).map(image => image.src),
        description: description,
        category: VF_CATEGORY_COPY[L][product.cat]
      }),
      vfBreadcrumbData([
        {name: VF_SHELL[L].shop, url: vfRouteUrl({lang: L, view: 'shop'})},
        {
          name: VF_CATEGORY_COPY[L][product.cat],
          url: vfRouteUrl({lang: L, view: 'shop', cat: product.cat})
        },
        {name: product.id, url}
      ])
    ]
  };
}

export function vfCopy(S) {
  const m = S.m;
  return {
    en: {
      stockInBag: 'Stock already in bag',
      crumbs: 'Breadcrumb',
      cat: 'Flower boxes',
      photo: 'Product photo',
      badge: 'New',
      sub: 'Roses · lisianthus · satin',
      desc: 'Ivory garden roses and lisianthus in a linen-wrapped box, tied with satin. We write every card by hand.',
      size: 'Size',
      extras: 'Add a little more',
      recentEb: 'Still deciding?',
      saveDesign: 'Save this design',
      recentA: 'Recently',
      recentB: 'viewed.',
      recentCount: count => S.n(count) + vfPlural(count, {one: ' design', other: ' designs'}),
      recentPrev: 'Previous recently viewed products',
      recentNext: 'More recently viewed products',
      ship:
        'Same-day delivery in Karaj if you order by ' + vfDeliveryCutoff(VF_ZONES[0], false) + '.',
      decrease: 'Fewer',
      increase: 'More',
      quantity: 'Quantity',
      priceEach: 'Price per item',
      priceBeforeExtras: 'Per item, before extras',
      selectionTotal: count =>
        'Total · ' + S.n(count) + vfPlural(count, {one: ' item', other: ' items'}),
      totalDelivery: 'Delivery calculated at checkout.',
      totalWithExtras: 'Selected extras included. Delivery calculated at checkout.',
      add: 'Add to bag',
      added: 'Added to your bag',
      viewBag: 'View bag',
      checkout: 'View bag and check out',
      keepShopping: 'Keep shopping',
      bagSubtotal: 'Bag subtotal · {count} items',
      savedTitle: 'Saved to your list',
      unsavedTitle: 'Removed from your list',
      copyCode: 'Copy product code',
      askWa: 'Ask about this design on WhatsApp',
      waAsk: 'Hello, I have a question about the {kind} with code {code}.',
      codeCopied: 'Product code {code} copied',
      copyFailed: 'Couldn’t copy. The code is selected, so you can copy it yourself.',
      viewSaved: 'View saved',
      dismiss: 'Dismiss',
      photos: 'Product photos',
      fullScreen: 'View full screen',
      slide: (i, n) => 'Photo ' + i + ' of ' + n,
      care: 'Care',
      careT:
        'Trim the stems at an angle and change the water every two days. Keep away from direct sun and fruit.',
      del: 'Delivery',
      delT:
        'Karaj central ' +
        m(VF_ZONES[0].fee) +
        ', ' +
        vfDeliveryHint(VF_ZONES[0], false) +
        '. Tehran ' +
        m(VF_ZONES[3].fee) +
        ', ' +
        vfDeliveryHint(VF_ZONES[3], false) +
        '.',
      labels: {
        vendraFlowers: 'Vendra flowers',
        chooseYourDeliveryWindowAtCheckout: 'Choose your delivery window at checkout.',
        base: 'Base'
      }
    },
    fa: {
      stockInBag: 'موجودی در سبد شماست',
      crumbs: 'مسیر صفحه',
      cat: 'باکس گل',
      photo: 'عکس محصول',
      badge: 'جدید',
      sub: 'رز، لیسیانتوس، ساتن',
      desc: 'رز باغی عاجی و لیسیانتوس در باکسی با روکش کتان، بسته با روبان ساتن. همه کارت‌ها را با دست می‌نویسیم.',
      size: 'اندازه',
      extras: 'کمی بیشتر',
      recentEb: 'هنوز انتخاب نکرده‌اید؟',
      saveDesign: 'ذخیره این طرح',
      recentA: 'اخیراً',
      recentB: 'دیده‌اید.',
      recentCount: count => S.n(count) + ' طرح',
      recentPrev: 'محصولات دیده‌شده قبلی',
      recentNext: 'محصولات دیده‌شده بیشتر',
      ship: 'ارسال همان روز در کرج برای سفارش تا ساعت ' + vfDeliveryCutoff(VF_ZONES[0], true) + '.',
      decrease: 'کمتر',
      increase: 'بیشتر',
      quantity: 'تعداد',
      priceEach: 'قیمت هر عدد',
      priceBeforeExtras: 'هر عدد، بدون اقلام اضافه',
      selectionTotal: count => 'جمع ' + S.n(count) + ' عدد',
      totalDelivery: 'هزینه ارسال هنگام ثبت سفارش محاسبه می‌شود.',
      totalWithExtras: 'با اقلام اضافه انتخاب‌شده. هزینه ارسال هنگام ثبت سفارش محاسبه می‌شود.',
      add: 'افزودن به سبد',
      added: 'به سبد شما اضافه شد',
      viewBag: 'مشاهده سبد',
      checkout: 'مشاهده سبد و پرداخت',
      keepShopping: 'ادامه خرید',
      bagSubtotal: 'جمع سبد، {count} مورد',
      savedTitle: 'به فهرست شما اضافه شد',
      unsavedTitle: 'از فهرست شما حذف شد',
      copyCode: 'کپی کد محصول',
      askWa: 'پرسش درباره این طرح در واتس‌اپ',
      waAsk: 'سلام، درباره {kind} با کد {code} سؤال دارم.',
      codeCopied: 'کد محصول {code} کپی شد',
      copyFailed: 'کپی نشد. کد انتخاب شده است و می‌توانید خودتان کپی کنید.',
      viewSaved: 'مشاهده ذخیره‌ها',
      dismiss: 'بستن',
      photos: 'عکس‌های محصول',
      fullScreen: 'نمایش تمام‌صفحه',
      slide: (i, n) => 'عکس ' + S.n(i) + ' از ' + S.n(n),
      care: 'نگهداری',
      careT:
        'ساقه‌ها را مورب کوتاه کنید و هر دو روز آب را عوض کنید. دور از آفتاب مستقیم و میوه نگه دارید.',
      del: 'ارسال',
      delT:
        'مرکز کرج ' +
        m(VF_ZONES[0].fee) +
        '، ' +
        vfDeliveryHint(VF_ZONES[0], true) +
        '. تهران ' +
        m(VF_ZONES[3].fee) +
        '، ' +
        vfDeliveryHint(VF_ZONES[3], true) +
        '.',
      labels: {
        vendraFlowers: 'گل‌های وندرا',
        chooseYourDeliveryWindowAtCheckout: 'زمان ارسال هنگام ثبت سفارش انتخاب می‌شود.',
        base: 'پایه'
      }
    }
  }[S.lang];
}
