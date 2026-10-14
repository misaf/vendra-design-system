import React from 'react';
import {useLocale} from 'react-aria-components';

// The components' built-in wording (accessible names and small labels) in each language. A
// component uses its props first, then this catalog in the current language, then English. The
// language is React Aria's locale: VendraProvider (or any I18nProvider) sets it, otherwise it is
// the browser's. VendraProvider's `messages` add languages or change wording, in the same shape.
// {name} is replaced by the component.
export const MESSAGES = {
  en: {
    AddressCard: {
      edit: 'Edit {name}',
      delete: 'Delete {name}',
      default: 'Default',
      makeDefault: 'Set as default'
    },
    Alert: {close: 'Dismiss'},
    AnnouncementBar: {close: 'Dismiss'},
    Breadcrumb: {label: 'Breadcrumb'},
    Carousel: {previous: 'Previous', next: 'Next'},
    DatePicker: {
      calendar: 'Calendar',
      jalali: 'Shamsi',
      gregorian: 'Gregorian',
      year: 'Year',
      month: 'Month',
      day: 'Day',
      open: 'Choose a date',
      previous: 'Previous month',
      next: 'Next month',
      equivalent: 'That’s {date}'
    },
    Dialog: {close: 'Close'},
    FilterBar: {label: 'Active filters', remove: 'Remove {label}', clearAll: 'Clear all'},
    OrderTimeline: {done: 'done'},
    Pagination: {
      label: 'Pages',
      previous: 'Previous page',
      next: 'Next page',
      page: 'Page {page}'
    },
    LanguageSwitch: {label: 'Language'},
    LineItem: {remove: 'Remove', unavailable: 'No longer available'},
    PaymentCard: {
      card: 'Card number',
      holder: 'Card holder',
      bank: 'Bank',
      amount: 'Amount',
      copy: 'Copy',
      copied: 'Copied'
    },
    ProductCard: {placeholder: 'Bouquet photo', favorite: 'Save'},
    QuantityInput: {value: 'Quantity', dec: 'Decrease', inc: 'Increase'},
    RangeSlider: {label: 'Value', min: 'Minimum', max: 'Maximum'},
    ReminderRow: {
      paused: 'Paused',
      sendFlowers: 'Send flowers',
      reminderFor: 'Reminder for {name}',
      edit: 'Edit reminder for {name}',
      delete: 'Delete reminder for {name}'
    },
    PaymentStatus: {
      bank: 'the bank',
      redirecting: {
        title: 'Taking you to the bank',
        body: 'Pay on {gateway}’s page and you’ll come back here. Keep this tab open.'
      },
      verifying: {
        title: 'Checking your payment',
        body: 'We’re confirming your payment with the bank. This takes a few seconds: don’t refresh or pay again.'
      },
      paid: {title: 'Payment received', body: 'The bank has confirmed your payment.'},
      cancelled: {
        title: 'Payment cancelled',
        body: 'You cancelled at the bank, so nothing was taken. Your bag is still here.'
      },
      failed: {
        title: 'The payment didn’t go through',
        body: 'The bank didn’t take the payment. If money left your account, the bank returns it within 72 hours.'
      },
      pending: {
        title: 'Your payment isn’t confirmed yet',
        body: 'The bank hasn’t confirmed it yet. Please don’t pay again: if money left your account, we confirm your order or the bank returns it within 72 hours.'
      },
      goToBank: 'Go to the bank’s page',
      retry: 'Pay again',
      otherMethod: 'Choose another method',
      checkAgain: 'Check again',
      support: 'Call us',
      amount: 'Amount',
      order: 'Order',
      reference: 'Bank reference'
    },
    Price: {was: 'Was', now: 'Now'},
    ResendCode: {
      wait: 'You can ask for a new code in {time}.',
      ready: 'You can ask for a new code now.',
      resend: 'Send a new code'
    },
    SearchField: {clear: 'Clear search'},
    SectionHeader: {previous: 'Previous', next: 'Next'},
    Spinner: {label: 'Loading'},
    StockStatus: {
      in: 'In stock',
      low: 'Only {count} left',
      soon: 'Back soon',
      soonOn: 'Back on {date}',
      out: 'Sold out'
    },
    Toast: {close: 'Dismiss'},
    TrustSeal: {enamad: 'eNamad trust seal', samandehi: 'Samandehi registration'}
  },
  fa: {
    AddressCard: {
      edit: 'ویرایش {name}',
      delete: 'حذف {name}',
      default: 'پیش‌فرض',
      makeDefault: 'پیش‌فرض کن'
    },
    Alert: {close: 'بستن'},
    AnnouncementBar: {close: 'بستن'},
    Breadcrumb: {label: 'مسیر صفحه'},
    Carousel: {previous: 'قبلی', next: 'بعدی'},
    DatePicker: {
      calendar: 'تقویم',
      jalali: 'شمسی',
      gregorian: 'میلادی',
      year: 'سال',
      month: 'ماه',
      day: 'روز',
      open: 'انتخاب از تقویم',
      previous: 'ماه قبل',
      next: 'ماه بعد',
      equivalent: 'برابر با {date}'
    },
    Dialog: {close: 'بستن'},
    FilterBar: {label: 'فیلترهای فعال', remove: 'حذف {label}', clearAll: 'پاک کردن همه'},
    OrderTimeline: {done: 'انجام شد'},
    Pagination: {
      label: 'صفحه‌ها',
      previous: 'صفحهٔ قبل',
      next: 'صفحهٔ بعد',
      page: 'صفحهٔ {page}'
    },
    LanguageSwitch: {label: 'زبان'},
    LineItem: {remove: 'حذف', unavailable: 'دیگر موجود نیست'},
    PaymentCard: {
      card: 'شماره کارت',
      holder: 'به نام',
      bank: 'بانک',
      amount: 'مبلغ',
      copy: 'کپی',
      copied: 'کپی شد'
    },
    ProductCard: {placeholder: 'عکس دسته‌گل', favorite: 'ذخیره'},
    QuantityInput: {value: 'تعداد', dec: 'کم کردن', inc: 'افزودن'},
    RangeSlider: {label: 'مقدار', min: 'حداقل', max: 'حداکثر'},
    ReminderRow: {
      paused: 'متوقف',
      sendFlowers: 'ارسال گل',
      reminderFor: 'یادآور برای {name}',
      edit: 'ویرایش یادآور {name}',
      delete: 'حذف یادآور {name}'
    },
    PaymentStatus: {
      bank: 'بانک',
      redirecting: {
        title: 'در حال انتقال به درگاه بانک',
        body: 'پرداخت را در صفحه {gateway} انجام دهید تا به همین‌جا برگردید. این صفحه را نبندید.'
      },
      verifying: {
        title: 'در حال بررسی پرداخت',
        body: 'در حال تأیید پرداخت با بانک هستیم. چند لحظه صبر کنید؛ صفحه را تازه نکنید و دوباره پرداخت نکنید.'
      },
      paid: {title: 'پرداخت انجام شد', body: 'بانک پرداخت شما را تأیید کرد.'},
      cancelled: {
        title: 'پرداخت لغو شد',
        body: 'پرداخت را در درگاه لغو کردید و مبلغی کسر نشد. سبد خرید شما سر جایش است.'
      },
      failed: {
        title: 'پرداخت انجام نشد',
        body: 'بانک پرداخت را نپذیرفت. اگر مبلغی از حساب شما کسر شده، حداکثر تا ۷۲ ساعت به حسابتان برمی‌گردد.'
      },
      pending: {
        title: 'پرداخت شما هنوز تأیید نشده',
        body: 'بانک هنوز پرداخت را تأیید نکرده است. لطفاً دوباره پرداخت نکنید: اگر مبلغی کسر شده، یا سفارش شما تأیید می‌شود یا بانک حداکثر تا ۷۲ ساعت آن را برمی‌گرداند.'
      },
      goToBank: 'رفتن به درگاه بانک',
      retry: 'پرداخت دوباره',
      otherMethod: 'انتخاب روش دیگر',
      checkAgain: 'بررسی دوباره',
      support: 'تماس با ما',
      amount: 'مبلغ',
      order: 'سفارش',
      reference: 'کد پیگیری بانک'
    },
    Price: {was: 'قیمت قبلی', now: 'قیمت فعلی'},
    ResendCode: {
      wait: 'تا {time} دیگر می‌توانید کد تازه بخواهید.',
      ready: 'اکنون می‌توانید کد تازه بخواهید.',
      resend: 'ارسال کد تازه'
    },
    SearchField: {clear: 'پاک کردن جستجو'},
    SectionHeader: {previous: 'قبلی', next: 'بعدی'},
    Spinner: {label: 'در حال بارگذاری'},
    StockStatus: {
      in: 'موجود',
      low: 'فقط {count} عدد مانده',
      soon: 'به‌زودی موجود می‌شود',
      soonOn: 'موجود از {date}',
      out: 'ناموجود'
    },
    Toast: {close: 'بستن'},
    TrustSeal: {enamad: 'نماد اعتماد الکترونیکی', samandehi: 'نشان ساماندهی'}
  }
};

// Extra or changed wording from VendraProvider, by language then component.
export const MessagesContext = React.createContext(null);

// The language part of a locale: 'fa-IR' → 'fa'.
export const localeLanguage = locale =>
  String(locale || 'en')
    .split('-')[0]
    .toLowerCase();

// A component's wording: the given props (undefined ones skipped), then the catalog in the current
// language (or `locale`, for components that follow the page's lang), then English.
export function useMessages(component, props, locale) {
  const current = useLocale().locale;
  const custom = React.useContext(MessagesContext);
  const language = localeLanguage(locale || current);
  const text = {
    ...MESSAGES.en[component],
    ...(custom && custom.en && custom.en[component]),
    ...(MESSAGES[language] && MESSAGES[language][component]),
    ...(custom && custom[language] && custom[language][component])
  };
  for (const key in props) if (props[key] !== undefined) text[key] = props[key];
  return text;
}
