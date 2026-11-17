import React from 'react';
import {loadLeaflet, TILES} from '../../../e2e/fixtures/leaflet.js';
import {StorefrontBagLocation} from './StorefrontBagLocation.jsx';

const copy = {
  en: {
    pin: 'Delivery pin',
    move: 'Move the map to pin the address',
    pinned: 'Address pinned',
    pinError: 'Pin the address to continue',
    zone: 'Delivery zone',
    zoneName: 'Karaj',
    zoneStatus: 'Delivery is available here',
    locate: 'Use my location',
    locateError: 'Your location is unavailable',
    failed: 'The map is unavailable. Choose your delivery zone.',
    zoneHint: 'Select a zone and enter the full address',
    otherZone: 'Tehran',
    address: 'Full address',
    addressHint: 'Include the building and unit number',
    addressError: 'Enter the full address',
    fail: 'Simulate map load failure'
  },
  fa: {
    pin: 'نشان نشانی',
    move: 'نقشه را برای انتخاب نشانی حرکت دهید',
    pinned: 'نشانی انتخاب شد',
    pinError: 'نشانی را روی نقشه انتخاب کنید',
    zone: 'محدوده ارسال',
    zoneName: 'کرج',
    zoneStatus: 'ارسال به این محدوده انجام می‌شود',
    locate: 'استفاده از موقعیت من',
    locateError: 'موقعیت شما در دسترس نیست',
    failed: 'نقشه در دسترس نیست. محدوده ارسال را انتخاب کنید.',
    zoneHint: 'محدوده را انتخاب کنید و نشانی کامل را بنویسید',
    otherZone: 'تهران',
    address: 'نشانی کامل',
    addressHint: 'شماره ساختمان و واحد را بنویسید',
    addressError: 'نشانی کامل را وارد کنید',
    fail: 'شبیه‌سازی خطای بارگذاری نقشه'
  }
};
const failToLoad = () => Promise.reject(new Error('Fixture map load failure'));

export function Fixture({lang}) {
  const t = copy[lang];
  const [location, setLocation] = React.useState(null);
  const [address, setAddress] = React.useState('');
  const [zone, setZone] = React.useState('karaj');
  const [ready, setReady] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [locateError, setLocateError] = React.useState(false);
  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:max-w-form">
      <StorefrontBagLocation
        key={String(broken)}
        picker={{
          visible: !failed,
          label: t.pin,
          status: locateError ? t.locateError : location ? t.pinned : t.move,
          error: location ? undefined : t.pinError,
          value: location,
          onChange: setLocation,
          loadLeaflet: broken ? failToLoad : loadLeaflet,
          tiles: TILES,
          center: [35.8327, 50.9654],
          zoom: 13,
          locateLabel: t.locate,
          onLocateError: () => setLocateError(true),
          onReady: () => setReady(true),
          onFail: () => setFailed(true)
        }}
        zone={{label: t.zone, text: location ? t.zoneName : '', status: t.zoneStatus}}
        fallback={{
          visible: failed,
          message: t.failed,
          hint: t.zoneHint,
          value: zone,
          options: [
            {value: 'karaj', label: t.zoneName},
            {value: 'tehran', label: t.otherZone}
          ],
          onChange: setZone
        }}
        address={{
          value: address,
          onChange: setAddress,
          error: address ? undefined : t.addressError,
          label: t.address,
          hint: t.addressHint
        }}
      />
      <button type="button" onClick={() => setBroken(true)}>
        {t.fail}
      </button>
      <span data-test="map-ready">{String(ready)}</span>
      <span data-test="location">
        {location ? location.lat.toFixed(4) + ',' + location.lng.toFixed(4) : ''}
      </span>
      <span data-test="address">{address}</span>
      <span data-test="zone">{zone}</span>
    </div>
  );
}
