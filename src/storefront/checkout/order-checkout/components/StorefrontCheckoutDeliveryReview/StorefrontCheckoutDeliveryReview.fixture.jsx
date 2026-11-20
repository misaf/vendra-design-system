import React from 'react';
import {StorefrontCheckoutDeliveryReview} from './StorefrontCheckoutDeliveryReview.jsx';

const copy = {
  en: {
    title: 'Delivery details',
    edit: 'Edit delivery',
    recipient: 'Recipient',
    name: 'Mina',
    updatedName: 'Sam',
    address: 'Address',
    line: '12 Rose Street, unit 3',
    updatedLine: '25 Garden Street, building 2, unit 10',
    phone: 'Phone',
    time: 'Delivery time',
    slot: 'Tomorrow, 10:00–13:00',
    update: 'Use updated delivery details'
  },
  fa: {
    title: 'جزئیات ارسال',
    edit: 'ویرایش ارسال',
    recipient: 'گیرنده',
    name: 'مینا',
    updatedName: 'سام',
    address: 'نشانی',
    line: 'خیابان گل، پلاک ۱۲، واحد ۳',
    updatedLine: 'خیابان باغ، پلاک ۲۵، ساختمان ۲، واحد ۱۰',
    phone: 'تلفن',
    time: 'زمان ارسال',
    slot: 'فردا، ۱۰ تا ۱۳',
    update: 'نمایش جزئیات به‌روز ارسال'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [updated, setUpdated] = React.useState(false);
  const [action, setAction] = React.useState('');
  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <StorefrontCheckoutDeliveryReview
        labels={{title: t.title, edit: t.edit}}
        edit={{
          href: '/__fixture-delivery',
          onClick: event => {
            event.preventDefault();
            setAction('edit');
          }
        }}
        rows={[
          {icon: 'user', label: t.recipient, value: updated ? t.updatedName : t.name},
          {icon: 'map-pin', label: t.address, value: updated ? t.updatedLine : t.line},
          {icon: 'phone', label: t.phone, value: <bdi dir="ltr">09121112233</bdi>},
          {icon: 'clock', label: t.time, value: t.slot}
        ]}
      />
      <button type="button" onClick={() => setUpdated(true)}>
        {t.update}
      </button>
      <span data-test="action">{action}</span>
    </div>
  );
}
