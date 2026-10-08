// Bilingual account copy.
function vfCopy(S) {
  const n = S.n;
  const C = {
    en: {
      hello: 'Hello, Shirin',
      accA: 'Your',
      accB: 'account.',
      signOut: 'Sign out',
      tabs: ['Orders', 'Balance', 'Saved', 'Addresses', 'Reminders', 'Profile'],
      // The account balance tab. {percent}, {from}, {left}, {min}, {max} and {amount} are filled in.
      balance: {
        title: 'Your balance',
        eligible:
          'Your balance is {from} or more, so you get {percent}% off products when you pay from it.',
        progress:
          'Keep a balance of {from} or more and get {percent}% off products when you pay from it. {left} to go.',
        topUp: 'Top up',
        quick: 'Quick amounts',
        amount: 'Amount (Toman)',
        amountHint: 'From {min} to {max}.',
        pay: 'Top up {amount}',
        processing: 'Processing demo payment…',
        done: '{amount} added to your balance.',
        errors: {
          empty: 'Enter an amount.',
          min: 'The smallest top-up is {min}.',
          max: 'The largest top-up is {max}.'
        },
        history: 'History',
        noHistory: 'No top-ups or payments yet.',
        kinds: {topup: 'Top-up', order: 'Order {id}'},
        demo: 'Template preview: no money is transferred.'
      },
      mapL: 'Your saved addresses on the map',
      unsave: 'Remove from saved',
      savedEmptyA: 'Nothing saved',
      savedEmptyB: '— yet.',
      savedEmptyP: 'Tap the heart on any bouquet to keep it here.',
      browse: 'Browse the shop',
      addAddr: 'Add an address',
      remP: 'We’ll remind you a few days before, so there’s time to order.',
      name: 'Name',
      nameV: 'Shirin Ahmadi',
      phone: 'Mobile',
      phoneHint: 'You sign in with this number.',
      email: 'Email (optional)',
      emailHint: 'For receipts and reminders.',
      alang: 'Account language',
      alangHint: 'Texts, emails and receipts use this language.',
      sms: 'Text me about my orders',
      saveP: 'Save changes',
      langOptions: [
        {
          value: 'fa',
          label: 'فارسی'
        },
        {
          value: 'en',
          label: 'English'
        }
      ],
      labels: {
        onItsWay: 'On its way',
        delivered: 'Delivered',
        viewOrder: 'View order',
        trackOrder: 'Track order'
      },
      addrLabels: {
        edit: 'Edit {name}',
        delete: 'Delete {name}',
        default: 'Default',
        makeDefault: 'Make default'
      },
      remLabels: {
        paused: 'Paused',
        sendFlowers: 'Send flowers',
        reminderFor: 'Reminder for {name}',
        edit: 'Edit',
        delete: 'Delete'
      },
      itemCount: value => value + (value > 1 ? ' items' : ' item')
    },
    fa: {
      hello: 'سلام، شیرین',
      accA: 'حساب',
      accB: 'شما.',
      signOut: 'خروج',
      tabs: ['سفارش‌ها', 'کیف پول', 'ذخیره‌ها', 'آدرس‌ها', 'یادآورها', 'پروفایل'],
      balance: {
        title: 'موجودی شما',
        eligible:
          'موجودی شما {from} یا بیشتر است؛ پس وقتی از کیف پول پرداخت کنید، {percent}٪ تخفیف محصولات می‌گیرید.',
        progress:
          'با موجودی {from} یا بیشتر، هنگام پرداخت از کیف پول {percent}٪ تخفیف محصولات بگیرید. {left} مانده است.',
        topUp: 'افزایش موجودی',
        quick: 'مبلغ‌های آماده',
        amount: 'مبلغ (تومان)',
        amountHint: 'از {min} تا {max}.',
        pay: 'افزایش موجودی {amount}',
        processing: 'در حال انجام پرداخت نمونه…',
        done: '{amount} به موجودی شما اضافه شد.',
        errors: {
          empty: 'مبلغ را وارد کنید.',
          min: 'کمترین مبلغ افزایش موجودی {min} است.',
          max: 'بیشترین مبلغ افزایش موجودی {max} است.'
        },
        history: 'تاریخچه',
        noHistory: 'هنوز افزایش موجودی یا پرداختی ثبت نشده است.',
        kinds: {topup: 'افزایش موجودی', order: 'سفارش {id}'},
        demo: 'پیش‌نمایش قالب: پولی منتقل نمی‌شود.'
      },
      mapL: 'نشانی‌های ذخیره‌شده روی نقشه',
      unsave: 'حذف از ذخیره‌ها',
      savedEmptyA: 'چیزی ذخیره نشده',
      savedEmptyB: '— فعلاً.',
      savedEmptyP: 'روی قلب هر دسته‌گل بزنید تا این‌جا بماند.',
      browse: 'رفتن به فروشگاه',
      addAddr: 'افزودن آدرس',
      remP: 'چند روز قبل یادآوری می‌کنیم تا برای سفارش وقت داشته باشید.',
      name: 'نام',
      nameV: 'شیرین احمدی',
      phone: 'موبایل',
      phoneHint: 'با این شماره وارد می‌شوید.',
      email: 'ایمیل (اختیاری)',
      emailHint: 'برای رسید و یادآوری.',
      alang: 'زبان حساب',
      alangHint: 'پیامک، ایمیل و رسید به این زبان ارسال می‌شود.',
      sms: 'درباره سفارش‌هایم پیامک بفرست',
      saveP: 'ذخیره تغییرات',
      langOptions: [
        {
          value: 'fa',
          label: 'فارسی'
        },
        {
          value: 'en',
          label: 'English'
        }
      ],
      labels: {
        onItsWay: 'در راه',
        delivered: 'تحویل شد',
        viewOrder: 'مشاهده سفارش',
        trackOrder: 'پیگیری سفارش'
      },
      addrLabels: {
        edit: 'ویرایش {name}',
        delete: 'حذف {name}',
        default: 'پیش‌فرض',
        makeDefault: 'پیش‌فرض کن'
      },
      remLabels: {
        paused: 'متوقف',
        sendFlowers: 'ارسال گل',
        reminderFor: 'یادآور برای {name}',
        edit: 'ویرایش',
        delete: 'حذف'
      },
      itemCount: value => n(value) + ' قلم'
    }
  }[S.lang];
  return {
    ...C,
    editor: {
      ...VF_PIN_COPY[S.lang],
      ...{
        en: {
          save: 'Save',
          cancel: 'Cancel',
          label: 'Label',
          zone: 'Delivery zone',
          address: 'Address',
          pin: 'Location on the map',
          pinError: 'Place the pin on the address.',
          mapFailed: 'The map didn’t load. The written address is enough for now.',
          recipient: 'Recipient',
          phone: 'Phone',
          editAddress: 'Edit address',
          addReminder: 'Add a reminder',
          editReminder: 'Edit reminder',
          reminderName: 'Who is it for?',
          occasion: 'Occasion',
          date: 'Date',
          before: 'Remind me',
          via: 'Send by',
          sms: 'Text message',
          wa: 'WhatsApp',
          required: 'Please fill this in',
          addressError: 'Enter an address with at least 6 characters',
          phoneError: 'Enter a valid mobile number',
          emailError: 'Enter a valid email address',
          saved: 'Changes saved',
          deleted: 'Removed',
          empty: 'No reminders yet',
          coming: 'Coming up',
          day: 'Day',
          month: 'Month',
          jalali: 'Shamsi',
          gregorian: 'Gregorian',
          fixed: 'This occasion has a fixed date.',
          movable: 'Uses the studio’s published date, otherwise an estimated date.',
          beforeOptions: {
            1: '1 day before',
            3: '3 days before',
            7: '1 week before'
          },
          inDays: 'days away'
        },
        fa: {
          save: 'ذخیره',
          cancel: 'انصراف',
          label: 'عنوان',
          zone: 'محدوده ارسال',
          address: 'نشانی',
          pin: 'موقعیت روی نقشه',
          pinError: 'سوزن را روی نشانی بگذارید.',
          mapFailed: 'نقشه بارگذاری نشد؛ فعلاً نشانی نوشته‌شده کافی است.',
          recipient: 'گیرنده',
          phone: 'تلفن',
          editAddress: 'ویرایش نشانی',
          addReminder: 'افزودن یادآور',
          editReminder: 'ویرایش یادآور',
          reminderName: 'برای چه کسی؟',
          occasion: 'مناسبت',
          date: 'تاریخ',
          before: 'یادآوری',
          via: 'روش ارسال',
          sms: 'پیامک',
          wa: 'واتس‌اپ',
          required: 'این قسمت را کامل کنید',
          addressError: 'نشانی حداقل ۶ حرف داشته باشد',
          phoneError: 'شماره موبایل معتبر وارد کنید',
          emailError: 'ایمیل معتبر وارد کنید',
          saved: 'تغییرات ذخیره شد',
          deleted: 'حذف شد',
          empty: 'هنوز یادآوری ندارید',
          coming: 'به‌زودی',
          day: 'روز',
          month: 'ماه',
          jalali: 'شمسی',
          gregorian: 'میلادی',
          fixed: 'تاریخ این مناسبت ثابت است.',
          movable: 'از تاریخ منتشرشده استودیو و در غیر این صورت تاریخ تخمینی استفاده می‌شود.',
          beforeOptions: {
            1: '۱ روز قبل',
            3: '۳ روز قبل',
            7: '۱ هفته قبل'
          },
          inDays: 'روز دیگر'
        }
      }[S.lang]
    },
    status: {
      onTheWay: [C.labels.onItsWay, 'accent'],
      delivered: [C.labels.delivered, 'success']
    }
  };
}
