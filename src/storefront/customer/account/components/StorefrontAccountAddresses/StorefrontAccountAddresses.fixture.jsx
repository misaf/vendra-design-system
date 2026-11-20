import React from 'react';
import {StorefrontAccountAddresses} from './StorefrontAccountAddresses.jsx';
import {loadLeaflet, TILES} from '../../../../../../e2e/fixtures/leaflet.js';

const copy = {
  en: {
    title: 'Saved addresses',
    home: 'Home',
    office: 'Office',
    homeLine: '10 Garden Street',
    officeLine: '20 Rose Avenue',
    recipient: 'Mina',
    zone: 'Central zone',
    add: 'Add an address',
    failed: 'Map unavailable; use the address cards.',
    labels: {
      edit: 'Edit {name}',
      delete: 'Delete {name}',
      default: 'Primary address',
      makeDefault: 'Use as primary'
    }
  },
  fa: {
    title: 'نشانی‌های ذخیره‌شده',
    home: 'خانه',
    office: 'دفتر',
    homeLine: 'خیابان باغ ۱۰',
    officeLine: 'خیابان رز ۲۰',
    recipient: 'مینا',
    zone: 'منطقه مرکزی',
    add: 'افزودن نشانی',
    failed: 'نقشه در دسترس نیست؛ از کارت نشانی استفاده کنید.',
    labels: {
      edit: 'ویرایش {name}',
      delete: 'حذف {name}',
      default: 'نشانی اصلی',
      makeDefault: 'انتخاب به‌عنوان اصلی'
    }
  }
};
export function Fixture({lang}) {
  const t = copy[lang];
  const [empty, setEmpty] = React.useState(false);
  const [showMap, setShowMap] = React.useState(true);
  const [failed, setFailed] = React.useState(false);
  const [primary, setPrimary] = React.useState('home');
  const [action, setAction] = React.useState('');
  const records = [
    {id: 'home', label: t.home, line: t.homeLine, location: {lat: 35.8352, lng: 50.975}},
    {id: 'office', label: t.office, line: t.officeLine, location: {lat: 35.82, lng: 50.95}}
  ];
  return (
    <main>
      <h1>{t.title}</h1>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />{' '}
        Empty collection
      </label>
      <label>
        <input
          type="checkbox"
          checked={showMap}
          onChange={event => setShowMap(event.target.checked)}
        />{' '}
        Show map
      </label>
      {failed && <p>{t.failed}</p>}
      <StorefrontAccountAddresses
        map={{
          visible: showMap,
          label: t.title,
          places: empty
            ? []
            : records.map(record => ({
                ...record,
                title: record.label,
                onSelect: () => setAction('map:' + record.id)
              })),
          loadLeaflet,
          tiles: TILES,
          center: [35.8327, 50.9654],
          zoom: 13,
          onFail: () => {
            setFailed(true);
            setShowMap(false);
            setAction('map:failed');
          }
        }}
        addresses={
          empty
            ? []
            : records.map(record => ({
                ...record,
                recipient: t.recipient,
                phone: '09123456789',
                zone: t.zone,
                isDefault: primary === record.id,
                makeDefault: () => {
                  setPrimary(record.id);
                  setAction('default:' + record.id);
                },
                edit: () => setAction('edit:' + record.id),
                remove: () => setAction('delete:' + record.id)
              }))
        }
        labels={t.labels}
        add={{label: t.add, onClick: () => setAction('add')}}
      />
      <span data-test="action">{action}</span>
    </main>
  );
}
