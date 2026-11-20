import React from 'react';
import {StorefrontMenu} from './StorefrontMenu.jsx';

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
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(lang);
  const [language, setLanguage] = React.useState(true);
  const [whatsapp, setWhatsapp] = React.useState(true);
  const [empty, setEmpty] = React.useState(false);
  const [closed, setClosed] = React.useState(0);
  const [changed, setChanged] = React.useState('');
  const [changes, setChanges] = React.useState(0);
  return (
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
          checked={whatsapp}
          onChange={event => setWhatsapp(event.target.checked)}
        />{' '}
        Show WhatsApp
      </label>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />{' '}
        Empty navigation
      </label>
      <button type="button" onClick={() => setOpen(true)}>
        {t.menu}
      </button>
      <StorefrontMenu
        open={open}
        onClose={() => {
          setOpen(false);
          setClosed(count => count + 1);
        }}
        title={t.title}
        closeLabel={t.close}
        navigationLabel={t.nav}
        navigation={
          empty
            ? []
            : [
                {href: '#shop', label: t.shop, current: true},
                {href: '#journal', label: t.journal}
              ]
        }
        language={
          language
            ? {
                value,
                label: t.language,
                options: [
                  {id: 'en', label: 'EN'},
                  {id: 'fa', label: 'فا'}
                ]
              }
            : undefined
        }
        onLanguageChange={value => {
          setValue(value);
          setChanged(value);
          setChanges(count => count + 1);
        }}
        whatsappHref={whatsapp ? 'https://wa.me/989120000000' : undefined}
        whatsappLabel={t.whatsapp}
      />
      <span data-test="closed">{closed}</span>
      <span data-test="changed">{changed}</span>
      <span data-test="changes">{changes}</span>
    </main>
  );
}
