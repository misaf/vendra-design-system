// Local demo accounts. Persistence is per phone number; no authentication service is implied.
import {mobile as vfMobile} from '../../design-system/utils/input.js';
import {vfLatin} from '../pricing/formatting.js';
import {VF_STORE} from '../store/store-config.js';
import {vfNow, vfStoredValue} from '../../platform/browser/environment.js';
import {dates} from '../../design-system/utils/dates.js';
export function vfAccountPhone() {
  try {
    return vfStoredValue('vf-account-phone') || '';
  } catch {
    return '';
  }
}
export function vfCustomerId() {
  return vfMobile(vfAccountPhone()) || 'guest';
}
// Accounts are keyed by the mobile in its stored form, so 0912…, +98 912… and ۰۹۱۲… are one account.
export function vfAccountKey(phone) {
  return 'vf-account:' + (vfMobile(phone) || vfLatin(phone).replace(/\D/g, ''));
}
export function vfAccountLoad(phone, lang = 'en') {
  try {
    const data = JSON.parse(vfStoredValue(vfAccountKey(phone)) || 'null');
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
export function vfAccountSave(phone, data) {
  try {
    localStorage.setItem(vfAccountKey(phone), JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}
// Apply one account operation to the latest persisted record, preserving unrelated updates.
export function vfAccountUpdate(phone, change, lang = 'en') {
  const next = change(vfAccountLoad(phone, lang));
  return next && vfAccountSave(phone, next) ? next : null;
}
// Whether a mobile already has a stored account (a returning customer) before signing in.
export function vfAccountExists(phone) {
  try {
    return !!vfStoredValue(vfAccountKey(phone));
  } catch {
    return false;
  }
}
export function vfAccountLogin(phone, lang) {
  phone = vfMobile(phone) || vfLatin(phone).replace(/\D/g, '');
  try {
    localStorage.setItem('vf-account-phone', phone);
  } catch {}
  const data = vfAccountLoad(phone, lang);
  vfAccountSave(phone, data);
  return data;
}
// Every key a storage area holds; a storage that can't be listed yields none.
function vfStorageKeys(storage) {
  const keys = [];
  for (let index = 0; index < (storage.length || 0); index++) keys.push(storage.key(index));
  return keys;
}
// Personal data that sign-out removes from this browser, so a shared or family device keeps
// nothing of the customer or their recipients: every stored account (profile, addresses with
// recipients' names and mobiles, reminders, wallet), the signed-in customers' payment recovery
// records, the saved-items id cache and the newsletter email. A guest's own records stay.
export const VF_PRIVATE_LOCAL_KEYS = [
  'vf-account-phone',
  'vf-newsletter',
  'vendra-saved-map',
  'vendra-saved-map-owner'
];
export function vfPrivateLocalKey(key) {
  return VF_PRIVATE_LOCAL_KEYS.includes(key) || key.startsWith('vf-account:');
}
export function vfPrivateSessionKey(key) {
  return key.startsWith('vf-online-payment:') && key !== 'vf-online-payment:guest';
}
export function vfAccountSignOut() {
  const phone = vfAccountPhone();
  try {
    const keys = [...VF_PRIVATE_LOCAL_KEYS, ...vfStorageKeys(localStorage)];
    if (phone) keys.push(vfAccountKey(phone));
    keys.filter(vfPrivateLocalKey).forEach(key => localStorage.removeItem(key));
  } catch {}
  vfClearPrivateSession(phone);
}
// This tab's signed-in payment recovery records. Each open tab runs it when it sees the sign-out,
// since session storage belongs to one tab.
export function vfClearPrivateSession(phone = '') {
  try {
    const keys = vfStorageKeys(sessionStorage);
    if (phone) keys.push('vf-online-payment:' + (vfMobile(phone) || phone));
    keys.filter(vfPrivateSessionKey).forEach(key => sessionStorage.removeItem(key));
  } catch {}
}
export function vfAccountLocale() {
  const phone = vfAccountPhone();
  return phone ? vfAccountLoad(phone).profile.locale : null;
}
export const VF_OCCASIONS = [
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
export function vfNormalizeReminder(r) {
  if (r.date && !r.m) {
    const d = dates.fromIso(r.date);
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
export function vfReminderNext(r, today = vfNow()) {
  r = vfNormalizeReminder(r);
  const D = dates,
    occasion = VF_OCCASIONS.find(o => o.id === r.occ);
  if (occasion && occasion.hijri) {
    const t = new Date(today);
    t.setHours(12, 0, 0, 0);
    const date = (VF_STORE.occasionDates.mothers || [])
      .map(D.fromIso)
      .filter(d => d && d >= t)
      .sort((a, b) => a.getTime() - b.getTime())[0];
    if (date)
      return {
        date,
        days: D.daysBetween(t, date),
        published: true
      };
    const [month, day] = occasion.hijri;
    return D.nextHijri(month, day, t);
  }
  return D.nextYearly(
    {
      ...r,
      ...(occasion && occasion.fixed)
    },
    today
  );
}
