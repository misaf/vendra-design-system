import React from 'react';
import {StorefrontFooter} from './StorefrontFooter.jsx';
const copy = {
  en: {
    brand: 'Vendra',
    tagline: 'Flowers for the everyday.',
    social: 'Social links',
    shop: 'Shop',
    help: 'Help',
    bouquets: 'Bouquets',
    orchids: 'Orchids',
    policy: 'Privacy policy',
    cookies: 'Cookie settings',
    visit: 'Visit us',
    address: '12 Garden Street, Karaj',
    find: 'Entrance beside the garden.',
    directions: 'Get directions',
    hours: 'Daily, 9–18',
    copyright: '© Vendra',
    before: 'Built by'
  },
  fa: {
    brand: 'وندرا',
    tagline: 'گل برای هر روز.',
    social: 'شبکه‌های اجتماعی',
    shop: 'فروشگاه',
    help: 'راهنما',
    bouquets: 'دسته‌گل',
    orchids: 'ارکیده',
    policy: 'سیاست حریم خصوصی',
    cookies: 'تنظیمات کوکی',
    visit: 'به ما سر بزنید',
    address: 'کرج، خیابان باغ، پلاک ۱۲',
    find: 'ورودی کنار باغ است.',
    directions: 'مسیریابی',
    hours: 'هر روز، ۹ تا ۱۸',
    copyright: '© وندرا',
    before: 'ساخته‌شده توسط'
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [optional, setOptional] = React.useState(true);
  const [empty, setEmpty] = React.useState(false);
  const [images, setImages] = React.useState(false);
  const [opened, setOpened] = React.useState(0);
  const directions = [
    {app: 'neshan', href: 'https://neshan.org/', label: 'Neshan'},
    {app: 'balad', href: 'https://balad.ir/', label: 'Balad'},
    {app: 'maps', href: 'https://maps.example.com/', label: 'Maps'}
  ];
  return (
    <>
      <main>
        <h1>{t.brand}</h1>
        <label>
          <input
            type="checkbox"
            checked={optional}
            onChange={event => setOptional(event.target.checked)}
          />{' '}
          Show optional content
        </label>
        <label>
          <input
            type="checkbox"
            checked={empty}
            onChange={event => setEmpty(event.target.checked)}
          />{' '}
          Empty collections
        </label>
        <label>
          <input
            type="checkbox"
            checked={images}
            onChange={event => setImages(event.target.checked)}
          />{' '}
          Show brand image
        </label>
        <span data-test="opened">{opened}</span>
      </main>
      <StorefrontFooter
        homeHref="#home"
        brand={t.brand}
        lang={lang}
        brandAssets={
          images
            ? {
                logoOnDark: {
                  src: '/assets/categories/bouquets.webp',
                  width: 40,
                  height: 40,
                  alt: {en: 'Vendra on dark', fa: 'نشان وندرا روی تیره'}
                }
              }
            : undefined
        }
        tagline={t.tagline}
        socialLabel={t.social}
        socialLinks={
          empty
            ? []
            : [
                {
                  icon: 'instagram',
                  label: 'Instagram',
                  href: 'https://instagram.com/',
                  target: '_blank'
                },
                {
                  icon: 'message-circle',
                  label: 'WhatsApp',
                  href: 'https://wa.me/989120000000',
                  target: '_blank'
                }
              ]
        }
        visitLabel={t.visit}
        address={t.address}
        findUs={optional ? t.find : ''}
        directionsLinks={optional ? (lang === 'fa' ? directions : [...directions].reverse()) : []}
        directionsLabel={t.directions}
        hours={t.hours}
        phoneHref="tel:+989120000000"
        phoneLabel="+98 912 000 0000"
        emailHref="mailto:hello@example.com"
        email={optional ? 'hello@example.com' : ''}
        seals={optional ? [{kind: 'enamad', href: 'https://seal.example.com/'}] : []}
        copyright={t.copyright}
        credit={
          optional
            ? {before: t.before, name: 'Studio', url: 'https://studio.example.com/'}
            : undefined
        }
        groups={
          empty
            ? []
            : [
                {
                  id: 'shop',
                  title: t.shop,
                  links: [
                    {href: '#bouquets', label: t.bouquets, current: 'page'},
                    {href: '#orchids', label: t.orchids}
                  ]
                },
                {id: 'help', title: t.help, links: [{href: '#privacy', label: t.policy}]}
              ]
        }
        consentSettingsLabel={t.cookies}
        onOpenConsent={() => setOpened(count => count + 1)}
      />
    </>
  );
}
