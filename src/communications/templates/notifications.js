import {localeFor} from '../locale.js';
import {smsInfo} from './sms/encoding.js';
import sms from './sms/messages.js';
import whatsapp from './whatsapp/messages.js';

// Order & reminder notifications (SMS + WhatsApp), EN and FA.
// Language rule: every message uses the customer's ACCOUNT language (Profile → Account language, stored as customer.preferredLocale).
// The header language switch only changes what they're browsing; it never affects messages.
// Pass the customer record. Guests (no account) → the order's preferredLocale = page language at checkout. Neither → 'fa'.
// If they change the account language, messages from then on — including for open orders — use the new one.
export const VF_NOTIFY = (() => {
  const FA_D = '۰۱۲۳۴۵۶۷۸۹';
  const faDigits = s => String(s).replace(/\d/g, d => FA_D[d]);
  // Codes and links stay Latin in both languages so they can be typed, searched and tapped.
  const KEEP_LATIN = ['id', 'link', 'remLink', 'wa', 'items'];
  const when = {
    en: {
      received: 'Order placed (status: received)',
      paid: 'Card-to-card payment confirmed',
      ready: 'Bouquet finished, photo uploaded (status: ready)',
      onway: 'Courier picks up (status: out_for_delivery)',
      delivered: 'Courier marks delivered (status: delivered)',
      delayed: 'Staff pushes the delivery slot',
      cancelled: 'Order cancelled (status: cancelled)',
      reminder: 'Occasion reminder, N days before (set on the reminder)'
    },
    fa: {
      received: 'ثبت سفارش (وضعیت: received)',
      paid: 'تأیید پرداخت کارت‌به‌کارت',
      ready: 'آماده شدن دسته‌گل و ارسال عکس (وضعیت: ready)',
      onway: 'تحویل به پیک (وضعیت: out_for_delivery)',
      delivered: 'تحویل توسط پیک (وضعیت: delivered)',
      delayed: 'تغییر زمان ارسال توسط استودیو',
      cancelled: 'لغو سفارش (وضعیت: cancelled)',
      reminder: 'یادآور مناسبت، چند روز قبل (طبق تنظیم یادآور)'
    }
  };
  const T = Object.fromEntries(
    Object.entries(when).map(([lang, events]) => [
      lang,
      Object.fromEntries(
        Object.entries(events).map(([event, label]) => [
          event,
          {when: label, sms: sms[lang][event], wa: whatsapp[lang][event]}
        ])
      )
    ])
  );
  const EVENTS = [
    'received',
    'paid',
    'ready',
    'onway',
    'delivered',
    'delayed',
    'cancelled',
    'reminder'
  ];
  // Product codes identify what was ordered: [{code:'VF-7K2M4Q',qty:2},{code:'VF-3HX9TP'}] → 'VF-7K2M4Q x2, VF-3HX9TP'.
  // Plain 'x' keeps English SMS in GSM-7; Persian uses Persian digits for the quantity.
  // More than three products: the first two, then '+N more', so an SMS stays within 2 parts.
  const itemsText = (items, lang) => {
    const one = i => {
      const code = typeof i === 'string' ? i : i.code;
      const q = +(i && i.qty) || 1;
      return q > 1 ? code + (lang === 'fa' ? ' ×' + faDigits(q) : ' x' + q) : code;
    };
    const shown = items.length > 3 ? items.slice(0, 2) : items,
      more = items.length - shown.length;
    return (
      shown.map(one).join(lang === 'fa' ? '، ' : ', ') +
      (more ? (lang === 'fa' ? ' و ' + faDigits(more) + ' مورد دیگر' : ' +' + more + ' more') : '')
    );
  };
  const fill = (tpl, vars, lang) =>
    tpl.replace(/\{(\w+)\}/g, (m, k) => {
      const v = vars[k];
      if (v == null) return m;
      return lang === 'fa' && !KEEP_LATIN.includes(k) ? faDigits(v) : String(v);
    });
  // render('onway', customer, {id:'VN-10522',items:order.lines,recipient:'مینا',link:'…'}, 'sms', order) → {lang,text,sms}
  const render = (event, customer, vars, channel = 'sms', order) => {
    const lang = localeFor(customer, order);
    const t = T[lang][event];
    if (!t) throw new Error('Unknown notification event: ' + event);
    const v = {...vars};
    if (Array.isArray(v.items)) v.items = itemsText(v.items, lang);
    const text = fill(t[channel], v, lang);
    return {
      lang,
      dir: lang === 'fa' ? 'rtl' : 'ltr',
      event,
      channel,
      text,
      sms: channel === 'sms' ? smsInfo(text) : null
    };
  };
  return {
    templates: T,
    events: EVENTS,
    render,
    fill,
    itemsText,
    smsInfo,
    localeFor,
    faDigits
  };
})();
