import React from 'react';
import {StorefrontHeader} from './StorefrontHeader.jsx';

const copy = {
  en: {
    brand: 'Vendra',
    title: 'Main menu',
    menu: 'Open menu',
    close: 'Close menu',
    nav: 'Main navigation',
    shop: 'Shop',
    journal: 'Journal',
    search: 'Search',
    account: 'Account',
    bag: 'Bag',
    language: 'Language',
    whatsapp: 'Order on WhatsApp'
  },
  fa: {
    brand: 'وندرا',
    title: 'منوی اصلی',
    menu: 'باز کردن منو',
    close: 'بستن منو',
    nav: 'پیمایش اصلی',
    shop: 'فروشگاه',
    journal: 'مجله',
    search: 'جستجو',
    account: 'حساب',
    bag: 'سبد',
    language: 'زبان',
    whatsapp: 'سفارش در واتساپ'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [value, setValue] = React.useState(lang);
  const [language, setLanguage] = React.useState(true);
  const [assets, setAssets] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const [count, setCount] = React.useState(true);
  const [opened, setOpened] = React.useState(0);
  const [changed, setChanged] = React.useState('');
  const [changes, setChanges] = React.useState(0);
  const change = value => {
    setValue(value);
    setChanged(value);
    setChanges(count => count + 1);
  };
  const alternative = value === 'en' ? 'fa' : 'en';
  const image = {
    src: '/assets/categories/bouquets.webp',
    width: 40,
    height: 40,
    alt: {en: 'Vendra logo', fa: 'نشان وندرا'}
  };
  return (
    <>
      <StorefrontHeader
        brand={t.brand}
        brandAssets={
          assets
            ? {logo: image, logoMark: {...image, alt: {en: 'Vendra mark', fa: 'نماد وندرا'}}}
            : undefined
        }
        lang={lang}
        homeHref="#home"
        navigation={
          empty
            ? []
            : [
                {id: 'shop', href: '#shop', label: t.shop, current: true},
                {id: 'journal', href: '#journal', label: t.journal}
              ]
        }
        searchHref="#search"
        searchLabel={t.search}
        accountHref="#account"
        accountLabel={t.account}
        bagHref="#bag"
        bagLabel={count ? (lang === 'fa' ? 'سبد، ۳ کالا' : 'Bag, 3 items') : t.bag}
        bagCount={count ? (lang === 'fa' ? '۳' : '3') : 0}
        language={
          language
            ? {
                value,
                label: t.language,
                options: [
                  {id: 'en', label: 'EN'},
                  {id: 'fa', label: 'فا'}
                ],
                alternative: {
                  lang: alternative,
                  name: alternative === 'fa' ? 'فا، فارسی' : 'EN, English',
                  label: alternative === 'fa' ? 'فا' : 'EN'
                }
              }
            : undefined
        }
        onLanguageChange={change}
        onPickAlternativeLanguage={() => change(alternative)}
        menuLabel={t.menu}
        onOpenMenu={() => setOpened(count => count + 1)}
      />
      <main>
        <h1>{t.brand}</h1>
        <label>
          <input
            type="checkbox"
            checked={language}
            onChange={event => setLanguage(event.target.checked)}
          />{' '}
          Show language
        </label>
        <label>
          <input
            type="checkbox"
            checked={assets}
            onChange={event => setAssets(event.target.checked)}
          />{' '}
          Show brand images
        </label>
        <label>
          <input
            type="checkbox"
            checked={empty}
            onChange={event => setEmpty(event.target.checked)}
          />{' '}
          Empty navigation
        </label>
        <label>
          <input
            type="checkbox"
            checked={count}
            onChange={event => setCount(event.target.checked)}
          />{' '}
          Show bag count
        </label>
        <span data-test="opened">{opened}</span>
        <span data-test="changed">{changed}</span>
        <span data-test="changes">{changes}</span>
      </main>
    </>
  );
}
