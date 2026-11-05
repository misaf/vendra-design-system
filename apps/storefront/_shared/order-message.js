// The same order details the customer reviews, ready for an explicit WhatsApp handoff.
import {vfCardMessages, vfLineToken} from './catalog.js';
import {vfDeliveryWhen} from './translations/time.js';
import {vfZone} from './delivery.js';
import {VF_MONEY, VF_FA_DIGITS} from './formatting.js';

export function vfOrderMessage(lines, delivery, total, lang, {deliveryPending = false} = {}) {
  const fa = lang === 'fa';
  const text = fa
    ? {
        title: 'سلام، می‌خواهم این سفارش را تأیید کنم:',
        to: 'گیرنده',
        phone: 'موبایل گیرنده',
        address: 'نشانی',
        when: 'زمان ارسال',
        from: 'فرستنده',
        senderPhone: 'موبایل فرستنده',
        card: 'پیام کارت',
        total: 'جمع کل',
        pin: 'موقعیت ارسال'
      }
    : {
        title: 'Hello, I’d like to confirm this order:',
        to: 'Recipient',
        phone: 'Recipient phone',
        address: 'Address',
        when: 'Delivery window',
        from: 'Sender',
        senderPhone: 'Sender phone',
        card: 'Card message',
        total: 'Total',
        pin: 'Delivery pin'
      };
  const rows = [
    [text.to, delivery.name],
    [text.phone, delivery.phone],
    [text.address, delivery.address && vfZone(delivery.zone)[lang] + ' · ' + delivery.address],
    [text.pin, delivery.location && `${delivery.location.lat}, ${delivery.location.lng}`],
    [text.when, delivery.date && vfDeliveryWhen(delivery, fa)],
    [text.from, delivery.sender],
    [text.senderPhone, delivery.senderPhone],
    [text.card, vfCardMessages(lines, delivery, lang)],
    [
      deliveryPending ? (fa ? 'جمع کالاها پیش از ارسال' : 'Total before delivery') : text.total,
      VF_MONEY(total, fa)
    ],
    ...(deliveryPending
      ? [
          [
            fa ? 'هزینه ارسال' : 'Delivery fee',
            fa ? 'پس از تعیین نشانی محاسبه می‌شود' : 'Calculated after the delivery address is set'
          ]
        ]
      : [])
  ];
  return [
    text.title,
    ...lines.map(
      line => `${vfLineToken(line)}, ${line[lang][1]} × ${fa ? VF_FA_DIGITS(line.qty) : line.qty}`
    ),
    ...rows.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`)
  ].join('\n');
}
