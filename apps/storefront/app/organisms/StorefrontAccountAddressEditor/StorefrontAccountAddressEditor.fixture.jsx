import React from 'react';
import {loadLeaflet, TILES} from '../../../e2e/fixtures/leaflet.js';
import {StorefrontAccountEditorDialog} from '../StorefrontAccountEditorDialog/StorefrontAccountEditorDialog.jsx';
import {StorefrontAccountAddressEditor} from './StorefrontAccountAddressEditor.jsx';

const copy = {
  en: {
    title: 'Edit address',
    label: 'Address label',
    zone: 'Delivery zone',
    karaj: 'Karaj',
    tehran: 'Tehran',
    pin: 'Address pin',
    move: 'Move the map to pin this address',
    pinned: 'Address pinned',
    pinError: 'Choose a pin',
    locate: 'Use my location',
    locateError: 'Your location is unavailable',
    failed: 'The map is unavailable. Enter the full address.',
    address: 'Full address',
    addressError: 'Enter the full address',
    recipient: 'Recipient',
    phone: 'Recipient phone',
    phoneError: 'Enter a phone number',
    save: 'Save address',
    cancel: 'Cancel',
    fail: 'Simulate map load failure'
  },
  fa: {
    title: 'ویرایش نشانی',
    label: 'عنوان نشانی',
    zone: 'محدوده ارسال',
    karaj: 'کرج',
    tehran: 'تهران',
    pin: 'نشان نشانی',
    move: 'نقشه را برای انتخاب نشانی حرکت دهید',
    pinned: 'نشانی انتخاب شد',
    pinError: 'نشانی را روی نقشه انتخاب کنید',
    locate: 'استفاده از موقعیت من',
    locateError: 'موقعیت شما در دسترس نیست',
    failed: 'نقشه در دسترس نیست. نشانی کامل را بنویسید.',
    address: 'نشانی کامل',
    addressError: 'نشانی کامل را وارد کنید',
    recipient: 'گیرنده',
    phone: 'تلفن گیرنده',
    phoneError: 'شماره تلفن را وارد کنید',
    save: 'ذخیره نشانی',
    cancel: 'انصراف',
    fail: 'شبیه‌سازی خطای بارگذاری نقشه'
  }
};
const failToLoad = () => Promise.reject(new Error('Fixture map load failure'));

export function Fixture({lang}) {
  const t = copy[lang];
  const [open, setOpen] = React.useState(true);
  const [draft, setDraft] = React.useState({
    label: '',
    zone: 'karaj',
    line: '',
    recipient: '',
    phone: ''
  });
  const [location, setLocation] = React.useState(null);
  const [broken, setBroken] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [locateError, setLocateError] = React.useState(false);
  const [saved, setSaved] = React.useState('');
  const set = field => value => setDraft(current => ({...current, [field]: value}));
  const problems = [
    ...(!draft.line ? [{target: 'vf-address-line', text: t.addressError}] : []),
    ...(!draft.phone ? [{target: 'vf-address-phone', text: t.phoneError}] : [])
  ];
  return (
    <>
      <span data-test="saved">{saved}</span>
      <span data-test="location">
        {location ? location.lat.toFixed(4) + ',' + location.lng.toFixed(4) : ''}
      </span>
      <StorefrontAccountEditorDialog
        open={open}
        title={t.title}
        saveError=""
        onClose={() => setOpen(false)}
        problems={problems}
        save={{
          label: t.save,
          onClick: () => {
            if (problems.length) return;
            setSaved(JSON.stringify(draft));
            setOpen(false);
          }
        }}
        cancelLabel={t.cancel}
      >
        <StorefrontAccountAddressEditor
          key={String(broken)}
          label={{label: t.label, value: draft.label, onChange: set('label')}}
          zone={{
            label: t.zone,
            value: draft.zone,
            onChange: set('zone'),
            options: [
              {value: 'karaj', label: t.karaj},
              {value: 'tehran', label: t.tehran}
            ]
          }}
          pin={{
            visible: !failed,
            failed,
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
            onFail: () => setFailed(true),
            failureText: t.failed
          }}
          address={{
            label: t.address,
            value: draft.line,
            onChange: set('line'),
            error: draft.line ? undefined : t.addressError
          }}
          recipient={{label: t.recipient, value: draft.recipient, onChange: set('recipient')}}
          phone={{
            label: t.phone,
            value: draft.phone,
            onChange: set('phone'),
            error: draft.phone ? undefined : t.phoneError
          }}
        />
        <button type="button" onClick={() => setBroken(true)}>
          {t.fail}
        </button>
      </StorefrontAccountEditorDialog>
    </>
  );
}
