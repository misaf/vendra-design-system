// Bilingual account copy.
function vfCopy(S) {
  const fa = S.fa,
    m = S.m,
    n = S.n;
  const C = {
    en: {
      hello: 'Hello, Shirin',
      accA: 'Your',
      accB: 'account.',
      signOut: 'Sign out',
      tabs: ['Orders', 'Addresses', 'Reminders', 'Profile'],
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
      langOptions: [{
        value: 'fa',
        label: 'فارسی'
      }, {
        value: 'en',
        label: 'English'
      }],
      labels: {
        onItsWay: 'On its way',
        delivered: 'Delivered',
        mum: 'Mum',
        value24: '24',
        oct: 'Oct',
        birthday: 'Birthday',
        value3DaysBefore: '3 days before',
        mina: 'Mina',
        value2: '2',
        nov: 'Nov',
        anniversary: 'Anniversary',
        value5DaysBefore: '5 days before',
        sara: 'Sara',
        value18: '18',
        jan: 'Jan',
        home: 'Home',
        value12GolhaStAzimiyeh: '12 Golha St, Azimiyeh',
        shirinAhmadi: 'Shirin Ahmadi',
        karajCentral: 'Karaj central',
        office: 'Office',
        value40MoazenBlvdGohardasht: '40 Moazen Blvd, Gohardasht',
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
      tabs: ['سفارش‌ها', 'آدرس‌ها', 'یادآورها', 'پروفایل'],
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
      langOptions: [{
        value: 'fa',
        label: 'فارسی'
      }, {
        value: 'en',
        label: 'English'
      }],
      labels: {
        onItsWay: 'در راه',
        delivered: 'تحویل شد',
        mum: 'مامان',
        value24: '۲۴',
        oct: 'مهر',
        birthday: 'تولد',
        value3DaysBefore: '۳ روز قبل',
        mina: 'مینا',
        value2: '۲',
        nov: 'آذر',
        anniversary: 'سالگرد',
        value5DaysBefore: '۵ روز قبل',
        sara: 'سارا',
        value18: '۱۸',
        jan: 'دی',
        home: 'خانه',
        value12GolhaStAzimiyeh: 'عظیمیه، خیابان گل‌ها، پلاک ۱۲',
        shirinAhmadi: 'شیرین احمدی',
        karajCentral: 'مرکز کرج',
        office: 'محل کار',
        value40MoazenBlvdGohardasht: 'گوهردشت، بلوار موذن، پلاک ۴۰',
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
    orders: [['VN-10522', 4, 'onTheWay', 8380000, '9 Oct', '۱۷ مهر'], ['VN-10431', 1, 'delivered', 2880000, '14 Sep', '۲۳ شهریور'], ['VN-10302', 2, 'delivered', 5300000, '2 Aug', '۱۱ مرداد']],
    status: {
      onTheWay: [C.labels.onItsWay, 'accent'],
      delivered: [C.labels.delivered, 'sage']
    },
    reminders: [['mum', C.labels.mum, C.labels.value24, C.labels.oct, C.labels.birthday, 'cake', C.labels.value3DaysBefore, 'sms', true], ['mina', C.labels.mina, C.labels.value2, C.labels.nov, C.labels.anniversary, 'heart', C.labels.value5DaysBefore, 'wa', false], ['sara', C.labels.sara, C.labels.value18, C.labels.jan, C.labels.birthday, 'cake', C.labels.value3DaysBefore, 'sms', false]],
    addresses: [['home', C.labels.home, C.labels.value12GolhaStAzimiyeh, C.labels.shirinAhmadi, C.labels.karajCentral], ['office', C.labels.office, C.labels.value40MoazenBlvdGohardasht, C.labels.shirinAhmadi, C.labels.karajCentral]]
  };
}
