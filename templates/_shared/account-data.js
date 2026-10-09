// Local demo accounts. Persistence is per phone number; no authentication service is implied.
function vfAccountPhone() {
  try {
    return localStorage.getItem('vf-account-phone') || '';
  } catch {
    return '';
  }
}
// Accounts are keyed by the mobile in its stored form, so 0912…, +98 912… and ۰۹۱۲… are one account.
function vfAccountKey(phone) {
  return 'vf-account:' + (vfMobile(phone) || vfLatin(phone).replace(/\D/g, ''));
}
function vfAccountLoad(phone, lang = 'en') {
  try {
    const data = JSON.parse(localStorage.getItem(vfAccountKey(phone)) || 'null');
    if (data && Array.isArray(data.addresses) && Array.isArray(data.reminders) && data.profile) {
      data.reminders = data.reminders.map(vfNormalizeReminder);
      return data;
    }
  } catch {}
  return {
    profile: {
      name: '',
      email: '',
      locale: lang,
      sms: true
    },
    // A sample balance over the discount threshold (VF_STORE.wallet), so the balance discount can be tried.
    wallet: {
      balance: 120_000_000,
      history: [
        {id: 'W-SAMPLE-2', kind: 'topup', amount: 100_000_000, at: '2026-09-28T10:20:00.000Z'},
        {id: 'W-SAMPLE-1', kind: 'topup', amount: 20_000_000, at: '2026-09-02T08:05:00.000Z'}
      ]
    },
    addresses: [
      {
        id: 'home',
        label: {
          en: 'Home',
          fa: 'خانه'
        },
        line: {
          en: '12 Golha St, Azimiyeh',
          fa: 'عظیمیه، خیابان گل‌ها، پلاک ۱۲'
        },
        recipient: {
          en: 'Shirin Ahmadi',
          fa: 'شیرین احمدی'
        },
        phone: '09125649438',
        zone: 'central',
        location: {lat: 35.8398, lng: 50.9925},
        isDefault: true
      },
      {
        id: 'office',
        label: {
          en: 'Office',
          fa: 'محل کار'
        },
        line: {
          en: '40 Moazen Blvd, Gohardasht',
          fa: 'گوهردشت، بلوار موذن، پلاک ۴۰'
        },
        recipient: {
          en: 'Shirin Ahmadi',
          fa: 'شیرین احمدی'
        },
        phone: '09125649438',
        zone: 'central',
        location: {lat: 35.8162, lng: 50.9391},
        isDefault: false
      }
    ],
    reminders: [
      {
        id: 'mum',
        name: {
          en: 'Mum',
          fa: 'مامان'
        },
        occ: 'birthday',
        cal: 'j',
        m: 7,
        d: 9,
        before: 3,
        channel: 'sms',
        on: true
      },
      {
        id: 'mina',
        name: {
          en: 'Our anniversary',
          fa: 'سالگرد خودمان'
        },
        occ: 'anniversary',
        cal: 'g',
        m: 11,
        d: 12,
        before: 7,
        channel: 'wa',
        on: true
      },
      {
        id: 'sara',
        name: {
          en: 'Yalda at Grandma’s',
          fa: 'یلدا خانه مادربزرگ'
        },
        occ: 'yalda',
        cal: 'j',
        m: 9,
        d: 30,
        before: 7,
        channel: 'sms',
        on: false
      }
    ]
  };
}
function vfAccountSave(phone, data) {
  try {
    localStorage.setItem(vfAccountKey(phone), JSON.stringify(data));
  } catch {}
}
function vfAccountLogin(phone, lang) {
  phone = vfMobile(phone) || vfLatin(phone).replace(/\D/g, '');
  try {
    localStorage.setItem('vf-account-phone', phone);
  } catch {}
  const data = vfAccountLoad(phone, lang);
  vfAccountSave(phone, data);
  return data;
}
function vfAccountSignOut() {
  try {
    localStorage.removeItem('vf-account-phone');
  } catch {}
}
function vfAccountLocale() {
  const phone = vfAccountPhone();
  return phone ? vfAccountLoad(phone).profile.locale : null;
}
const VF_OCCASIONS = [
  {
    id: 'birthday',
    icon: 'cake',
    en: 'Birthday',
    fa: 'تولد'
  },
  {
    id: 'anniversary',
    icon: 'gem',
    en: 'Anniversary',
    fa: 'سالگرد ازدواج'
  },
  {
    id: 'mothers',
    icon: 'flower-2',
    en: 'Mother’s Day',
    fa: 'روز مادر',
    hijri: [6, 20]
  },
  {
    id: 'valentine',
    icon: 'heart',
    en: 'Valentine’s Day',
    fa: 'ولنتاین',
    fixed: {
      cal: 'g',
      m: 2,
      d: 14
    }
  },
  {
    id: 'nowruz',
    icon: 'sprout',
    en: 'Nowruz',
    fa: 'نوروز',
    fixed: {
      cal: 'j',
      m: 1,
      d: 1
    }
  },
  {
    id: 'yalda',
    icon: 'moon',
    en: 'Yalda night',
    fa: 'شب یلدا',
    fixed: {
      cal: 'j',
      m: 9,
      d: 30
    }
  },
  {
    id: 'other',
    icon: 'calendar-heart',
    en: 'Other occasion',
    fa: 'مناسبت دیگر'
  }
];
function vfNormalizeReminder(r) {
  if (r.date && !r.m) {
    const d = window.AG_DATES.fromIso(r.date);
    if (d)
      return {
        ...r,
        cal: 'g',
        m: d.getMonth() + 1,
        d: d.getDate()
      };
  }
  return r;
}
function vfReminderNext(r, today = new Date()) {
  r = vfNormalizeReminder(r);
  const D = window.AG_DATES,
    occasion = VF_OCCASIONS.find(o => o.id === r.occ);
  if (occasion && occasion.hijri) {
    const t = new Date(today);
    t.setHours(12, 0, 0, 0);
    const date = (VF_STORE.occasionDates.mothers || [])
      .map(D.fromIso)
      .filter(d => d && d >= t)
      .sort((a, b) => a - b)[0];
    if (date)
      return {
        date,
        days: D.daysBetween(t, date),
        published: true
      };
    return D.nextHijri(...occasion.hijri, t);
  }
  return D.nextYearly(
    {
      ...r,
      ...(occasion && occasion.fixed)
    },
    today
  );
}
// GET /api/sales/orders — sample orders shaped like the Vendra API (Order, OrderLine). Each line's
// metadata carries what the order needs beyond the API's fields, as strings: the product code
// (`token`), `size`, comma-separated `addons` and the handwritten `cardMessage`.
/** @type {[id: number, number: string, status: string, placedAt: string][]} */
const VF_SAMPLE_ORDER_ROWS = [
  [9001, 'VN-10522', 'out_for_delivery', '2026-10-04T09:30:00+03:30'],
  [9002, 'VN-10431', 'delivered', '2026-09-21T11:05:00+03:30'],
  [9003, 'VN-10302', 'delivered', '2026-09-02T16:40:00+03:30'],
  [9004, 'VB-TEST-1', 'cancelled', '2026-08-28T10:15:00+03:30']
];
const VF_API_ORDERS = VF_SAMPLE_ORDER_ROWS.map(([id, number, status, placedAt]) => ({
  id,
  number,
  status,
  currencyCode: 'IRT',
  itemsAmount: 8_450_000,
  deliveryAmount: 0,
  totalAmount: 8_450_000,
  paymentReference: '1234',
  cardMessage: null,
  placedAt,
  lines: [
    {
      id: id * 10 + 1,
      sellableType: 'product',
      sellableId: 101,
      name: 'VF-7K2M4Q',
      quantity: 1,
      unitAmount: 5_050_000,
      lineAmount: 5_050_000,
      metadata: {
        token: 'VF-7K2M4Q',
        size: 'classic',
        addons: 'card',
        cardMessage: 'Happy birthday, Shirin.'
      }
    },
    {
      id: id * 10 + 2,
      sellableType: 'product',
      sellableId: 103,
      name: 'VF-8RD5WN',
      quantity: 1,
      unitAmount: 3_400_000,
      lineAmount: 3_400_000,
      metadata: {token: 'VF-8RD5WN'}
    }
  ]
}));

// Order fields the API doesn't provide yet (templates/API.md, "Order detail"), keyed by Order.number:
// the delivery details, payment method and the customer's preferred language. The sample orders share them.
const VF_SAMPLE_ORDER_EXTRAS = {
  method: 'card',
  preferredLocale: 'fa',
  delivery: {
    name: 'Shirin Ahmadi',
    phone: '09125649438',
    sender: 'Shirin Ahmadi',
    senderPhone: '09125649438',
    address: '12 Golha St, Azimiyeh'
  }
};

// The storefront's bag line from an API OrderLine.
function vfLineFromApi(line) {
  return window.AG_COMMERCE.lineFromApi(line, {
    products: VF_PRODUCTS,
    sizes: VF_SIZES,
    addons: VF_ADDONS,
    placeholder: VF_PRODUCT_PLACEHOLDER,
    describe: vfLineDetail
  });
}

// The storefront's order object from an API Order plus its extras.
function vfOrderFromApi(order, extras = VF_SAMPLE_ORDER_EXTRAS) {
  return window.AG_COMMERCE.orderFromApi(order, {
    line: vfLineFromApi,
    delivery: {...VF_DELIVERY, ...extras.delivery},
    method: extras.method,
    preferredLocale: extras.preferredLocale
  });
}

function vfSampleOrders() {
  return VF_API_ORDERS.map(order => vfOrderFromApi(order));
}
