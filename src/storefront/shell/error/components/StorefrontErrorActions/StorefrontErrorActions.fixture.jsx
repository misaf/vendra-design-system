import React from 'react';
import {StorefrontErrorActions} from './StorefrontErrorActions.jsx';
const copy = {
  en: {
    retry: 'Try again',
    home: 'Return home',
    phone: 'Call',
    alternateRetry: 'Retry loading this page',
    alternateHome: 'Visit the storefront',
    alternatePhone: 'Contact the studio'
  },
  fa: {
    retry: 'تلاش دوباره',
    home: 'بازگشت به خانه',
    phone: 'تماس',
    alternateRetry: 'بارگذاری دوباره این صفحه',
    alternateHome: 'دیدن فروشگاه',
    alternatePhone: 'تماس با استودیو'
  }
};
export function Fixture({lang}) {
  const [alternate, setAlternate] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  const t = copy[lang];
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={alternate}
          onChange={event => setAlternate(event.target.checked)}
        />
        Alternate actions
      </label>
      <span data-test="events" style={{overflowWrap: 'anywhere'}}>
        {JSON.stringify(events)}
      </span>
      <main>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>
          <StorefrontErrorActions
            retryLabel={alternate ? t.alternateRetry : t.retry}
            onRetry={() =>
              setEvents(current => [...current, alternate ? 'alternate-retry' : 'retry'])
            }
            homeLabel={alternate ? t.alternateHome : t.home}
            homeHref={alternate ? '#storefront' : '#home'}
            phoneLabel={
              <>
                {alternate ? t.alternatePhone : t.phone} <bdi dir="ltr">+1 555 123 4567</bdi>
              </>
            }
            phoneHref={alternate ? 'tel:+15557654321' : 'tel:+15551234567'}
          />
        </div>
      </main>
    </>
  );
}
