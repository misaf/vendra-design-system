import React from 'react';
import {StorefrontContactDetails} from './StorefrontContactDetails.jsx';
import {loadLeaflet, TILES} from '../../../../e2e/fixtures/leaflet.js';
const copy = {
  en: {
    title: 'Studio details',
    address: 'Address',
    addressValue: '12 Garden Street, Karaj',
    hours: 'Hours',
    hoursValue: 'Daily, 9–18',
    open: 'Open now',
    closed: 'Closed now',
    detail: 'Visits by appointment.',
    phone: 'Call the studio',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    map: 'Studio map',
    marker: 'Open studio pin',
    studio: 'Vendra studio',
    directions: 'Get directions',
    failed: 'Map unavailable. Use the address and directions.'
  },
  fa: {
    title: 'اطلاعات استودیو',
    address: 'نشانی',
    addressValue: 'کرج، خیابان باغ، پلاک ۱۲',
    hours: 'ساعت کار',
    hoursValue: 'هر روز، ۹ تا ۱۸',
    open: 'اکنون باز است',
    closed: 'اکنون بسته است',
    detail: 'بازدید با هماهنگی قبلی.',
    phone: 'تماس با استودیو',
    whatsapp: 'واتساپ',
    instagram: 'اینستاگرام',
    map: 'نقشه استودیو',
    marker: 'باز کردن نشان استودیو',
    studio: 'استودیو وندرا',
    directions: 'مسیریابی',
    failed: 'نقشه در دسترس نیست. از نشانی و مسیریابی استفاده کنید.'
  }
};
const failToLoad = () => Promise.reject(new Error('Fixture map failure'));
export function Fixture({lang}) {
  const t = copy[lang];
  const [closed, setClosed] = React.useState(false);
  const [status, setStatus] = React.useState(true);
  const [whatsapp, setWhatsapp] = React.useState(true);
  const [instagram, setInstagram] = React.useState(true);
  const [directions, setDirections] = React.useState(true);
  const [showMap, setShowMap] = React.useState(true);
  const [broken, setBroken] = React.useState(false);
  const [failed, setFailed] = React.useState(0);
  const [selected, setSelected] = React.useState(0);
  const [empty, setEmpty] = React.useState(false);
  return (
    <main className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <h1>{t.title}</h1>
      <label>
        <input
          type="checkbox"
          checked={closed}
          onChange={event => setClosed(event.target.checked)}
        />{' '}
        Studio closed
      </label>
      <label>
        <input
          type="checkbox"
          checked={status}
          onChange={event => setStatus(event.target.checked)}
        />{' '}
        Show status and details
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
        <input
          type="checkbox"
          checked={instagram}
          onChange={event => setInstagram(event.target.checked)}
        />{' '}
        Show Instagram
      </label>
      <label>
        <input
          type="checkbox"
          checked={directions}
          onChange={event => setDirections(event.target.checked)}
        />{' '}
        Show directions
      </label>
      <label>
        <input
          type="checkbox"
          checked={showMap}
          onChange={event => setShowMap(event.target.checked)}
        />{' '}
        Show map
      </label>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />{' '}
        Empty places
      </label>
      <button type="button" onClick={() => setBroken(true)}>
        Fail map loader
      </button>
      {failed > 0 && <p>{t.failed}</p>}
      <StorefrontContactDetails
        key={String(broken)}
        rows={[
          {icon: 'map-pin', label: t.address, value: t.addressValue},
          {
            icon: 'clock',
            label: t.hours,
            value: t.hoursValue,
            status: status ? {open: !closed, text: closed ? t.closed : t.open} : undefined,
            details: status ? [t.detail] : []
          }
        ]}
        whatsapp={whatsapp ? {label: t.whatsapp, href: 'https://wa.me/989120000000'} : null}
        phone={{label: t.phone, href: 'tel:+989120000000'}}
        instagram={instagram ? {label: t.instagram, href: 'https://instagram.com/'} : null}
        map={{
          visible: showMap,
          label: t.map,
          places: empty
            ? []
            : [
                {
                  id: 'studio',
                  label: t.studio,
                  title: t.marker,
                  location: {lat: 35.8352, lng: 50.975},
                  onSelect: () => setSelected(count => count + 1)
                }
              ],
          loadLeaflet: broken ? failToLoad : loadLeaflet,
          tiles: TILES,
          center: [35.8327, 50.9654],
          zoom: 13,
          onFail: () => {
            setFailed(count => count + 1);
            setShowMap(false);
          }
        }}
        directions={
          directions
            ? {
                label: t.directions,
                links: [
                  {app: 'neshan', label: 'Neshan', href: 'https://neshan.org/'},
                  {app: 'balad', label: 'Balad', href: 'https://balad.ir/'}
                ]
              }
            : null
        }
      />
      <span data-test="failed">{failed}</span>
      <span data-test="selected">{selected}</span>
    </main>
  );
}
