// Order & reminder notifications (SMS + WhatsApp), EN and FA.
// Language rule: every message uses the customer's ACCOUNT language (Profile → Account language, stored as customer.preferredLocale).
// The header language switch only changes what they're browsing; it never affects messages.
// Pass the customer record. Guests (no account) → the order's preferredLocale = page language at checkout. Neither → 'fa'.
// If they change the account language, messages from then on — including for open orders — use the new one.
(() => {
  const FA_D = '۰۱۲۳۴۵۶۷۸۹';
  const faDigits = s => String(s).replace(/\d/g, d => FA_D[d]);
  // Codes and links stay Latin in both languages so they can be typed, searched and tapped.
  const KEEP_LATIN = ['id', 'link', 'remLink', 'wa', 'items'];
  const T = {
    en: {
      received: {
        when: 'Order placed (status: received)',
        sms: 'Vendra: Thanks {first}! Order {id} ({items}) is confirmed for {date}, {slot}. Track it: {link}',
        wa: '*Order confirmed*\nThanks {first}! Order {id} is booked for {date}, {slot}.\nProducts: {items}\nTrack it: {link}'
      },
      paid: {
        when: 'Card-to-card payment confirmed',
        sms: 'Vendra: Payment of {amount} for order {id} received. We will start arranging your flowers soon.',
        wa: '*Payment received*\n{amount} for order {id}. We will start arranging your flowers soon.'
      },
      ready: {
        when: 'Bouquet finished, photo uploaded (status: ready)',
        sms: 'Vendra: {first}, order {id} ({items}) is ready. See the photo before it leaves: {link}',
        wa: '*Your flowers are ready*\nOrder {id}: {items}\nHere is how they look before they leave the studio: {link}'
      },
      onway: {
        when: 'Courier picks up (status: out_for_delivery)',
        sms: 'Vendra: Order {id} ({items}) is on its way to {recipient}. The courier will call before arriving. {link}',
        wa: '*On its way*\nOrder {id} ({items}) has left the studio for {recipient}. The courier will call before arriving.\nTrack it: {link}'
      },
      delivered: {
        when: 'Courier marks delivered (status: delivered)',
        sms: 'Vendra: Delivered to {recipient} at {time}. Thank you! Save the date for next year: {remLink}',
        wa: '*Delivered*\nYour flowers reached {recipient} at {time}. Thank you for choosing Vendra.\nSave the date for next year: {remLink}'
      },
      delayed: {
        when: 'Staff pushes the delivery slot',
        sms: 'Vendra: Sorry {first}, order {id} is running late. New time: {slot}. Questions? WhatsApp {wa}',
        wa: '*Running late*\nSorry {first}, order {id} will arrive later than planned.\nNew time: {slot}\nQuestions? Reply here.'
      },
      cancelled: {
        when: 'Order cancelled (status: cancelled)',
        sms: 'Vendra: Order {id} was cancelled. Any payment is refunded within 3 working days. Questions? WhatsApp {wa}',
        wa: '*Order cancelled*\nOrder {id} was cancelled. Any payment is refunded within 3 working days.\nQuestions? Reply here.'
      },
      reminder: {
        when: 'Occasion reminder, N days before (set on the reminder)',
        sms: "Vendra: {name}'s {occasion} is on {date}. Order by 18:00 the day before for same-day delivery: {link} Reply STOP to opt out",
        wa: "*{occasion} coming up*\n{name}'s {occasion} is on {date}. Order by 18:00 the day before for same-day delivery.\n{link}\nReply STOP to opt out."
      }
    },
    fa: {
      received: {
        when: 'ثبت سفارش (وضعیت: received)',
        sms: 'وندرا: {first} عزیز، سفارش {id} ({items}) ثبت شد. ارسال: {date}، {slot}. پیگیری: {link}',
        wa: '*سفارش ثبت شد*\n{first} عزیز، سفارش {id} برای {date}، {slot} ثبت شد.\nمحصولات: {items}\nپیگیری: {link}'
      },
      paid: {
        when: 'تأیید پرداخت کارت‌به‌کارت',
        sms: 'وندرا: پرداخت {amount} برای سفارش {id} تأیید شد. به‌زودی چیدن گل‌ها را شروع می‌کنیم.',
        wa: '*پرداخت تأیید شد*\n{amount} برای سفارش {id}. به‌زودی چیدن گل‌ها را شروع می‌کنیم.'
      },
      ready: {
        when: 'آماده شدن دسته‌گل و ارسال عکس (وضعیت: ready)',
        sms: 'وندرا: {first} عزیز، سفارش {id} ({items}) آماده است. عکس را قبل از ارسال ببینید: {link}',
        wa: '*گل‌هایتان آماده است*\nسفارش {id}: {items}\nعکس دسته‌گل را قبل از ارسال ببینید: {link}'
      },
      onway: {
        when: 'تحویل به پیک (وضعیت: out_for_delivery)',
        sms: 'وندرا: سفارش {id} ({items}) در راه {recipient} است. پیک قبل از رسیدن تماس می‌گیرد. {link}',
        wa: '*در راه است*\nسفارش {id} ({items}) از استودیو برای {recipient} ارسال شد. پیک قبل از رسیدن تماس می‌گیرد.\nپیگیری: {link}'
      },
      delivered: {
        when: 'تحویل توسط پیک (وضعیت: delivered)',
        sms: 'وندرا: ساعت {time} به {recipient} تحویل شد. ممنونیم! یادآور سال بعد: {remLink}',
        wa: '*تحویل شد*\nگل‌ها ساعت {time} به {recipient} رسید. ممنون که وندرا را انتخاب کردید.\nیادآور برای سال بعد: {remLink}'
      },
      delayed: {
        when: 'تغییر زمان ارسال توسط استودیو',
        sms: 'وندرا: {first} عزیز، پوزش می‌خواهیم؛ سفارش {id} دیرتر می‌رسد. زمان جدید: {slot}. سؤال: واتساپ {wa}',
        wa: '*کمی تأخیر داریم*\n{first} عزیز، پوزش می‌خواهیم؛ سفارش {id} دیرتر از برنامه می‌رسد.\nزمان جدید: {slot}\nسؤالی دارید؟ همین‌جا بنویسید.'
      },
      cancelled: {
        when: 'لغو سفارش (وضعیت: cancelled)',
        sms: 'وندرا: سفارش {id} لغو شد. هر مبلغی پرداخت کرده باشید تا ۳ روز کاری برمی‌گردد. سؤال: واتساپ {wa}',
        wa: '*سفارش لغو شد*\nسفارش {id} لغو شد. هر مبلغی پرداخت کرده باشید تا ۳ روز کاری برمی‌گردد.\nسؤالی دارید؟ همین‌جا بنویسید.'
      },
      reminder: {
        when: 'یادآور مناسبت، چند روز قبل (طبق تنظیم یادآور)',
        sms: 'وندرا: {occasion} {name} {date} است. تا ساعت ۱۸ روز قبل سفارش دهید تا همان روز برسد: {link}\nلغو۱۱',
        wa: '*{occasion} نزدیک است*\n{occasion} {name} {date} است. تا ساعت ۱۸ روز قبل سفارش دهید تا همان روز برسد.\n{link}\nبرای لغو، «لغو» بفرستید.'
      }
    }
  };
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
  // GSM-7 basic set (no curly quotes, dashes or emoji) → 160 chars / 153 per part. Anything else → UCS-2: 70 / 67.
  const GSM =
    /^[A-Za-z0-9 \n\r@£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ!"#¤%&'()*+,\-./:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\\\[~\]|€]*$/;
  const smsInfo = text => {
    const gsm = GSM.test(text);
    const n = [...text].length + (gsm ? (text.match(/[\^{}\\\[~\]|€]/g) || []).length : 0);
    const one = gsm ? 160 : 70,
      part = gsm ? 153 : 67;
    return {
      encoding: gsm ? 'GSM-7' : 'UCS-2',
      chars: n,
      parts: n <= one ? 1 : Math.ceil(n / part),
      limit: one
    };
  };
  const ok = l => l === 'en' || l === 'fa';
  const localeFor = (customer, order) =>
    ok(customer && customer.preferredLocale)
      ? customer.preferredLocale
      : ok(order && order.preferredLocale)
        ? order.preferredLocale
        : 'fa';
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
  window.VF_NOTIFY = {
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
