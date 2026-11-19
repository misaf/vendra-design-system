import React from 'react';
import {StorefrontCheckoutNotices} from './StorefrontCheckoutNotices.jsx';

const copy = {
  en: {
    title: 'Review your delivery before trying again',
    review: 'Review delivery',
    error: 'Payment recovery could not be saved on this device',
    showReview: 'Show retry review',
    showError: 'Show storage error'
  },
  fa: {
    title: 'پیش از تلاش دوباره ارسال را بررسی کنید',
    review: 'بررسی ارسال',
    error: 'بازیابی پرداخت در این دستگاه ذخیره نشد',
    showReview: 'نمایش بررسی دوباره',
    showError: 'نمایش خطای ذخیره‌سازی'
  }
};

export function Fixture({lang}) {
  const t = copy[lang];
  const [review, setReview] = React.useState(true);
  const [error, setError] = React.useState(true);
  const [reviews, setReviews] = React.useState(0);
  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <StorefrontCheckoutNotices
        review={{
          visible: review,
          title: t.title,
          label: t.review,
          onReview: () => {
            setReviews(count => count + 1);
            setReview(false);
          }
        }}
        saveError={error ? t.error : ''}
      />
      <label>
        <input
          type="checkbox"
          checked={review}
          onChange={event => setReview(event.target.checked)}
        />
        {t.showReview}
      </label>
      <label>
        <input type="checkbox" checked={error} onChange={event => setError(event.target.checked)} />
        {t.showError}
      </label>
      <span data-test="reviews">{reviews}</span>
    </div>
  );
}
