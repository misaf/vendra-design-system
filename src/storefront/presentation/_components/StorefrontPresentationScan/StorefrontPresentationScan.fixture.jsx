import React from 'react';
import {StorefrontPresentationScan} from './StorefrontPresentationScan.jsx';

const copy = {
  en: {
    title: 'Scan a tag',
    body: 'Point the camera at a design tag',
    unknown: 'Unknown design code',
    blocked: 'Camera access blocked'
  },
  fa: {
    title: 'اسکن برچسب',
    body: 'دوربین را به برچسب طرح بگیرید',
    unknown: 'کد طرح ناشناخته',
    blocked: 'دسترسی دوربین مسدود است'
  }
};
export function Fixture({lang}) {
  const [open, setOpen] = React.useState(false);
  const [warning, setWarning] = React.useState('none');
  const [closes, setCloses] = React.useState(0);
  return (
    <>
      <label>
        Warning
        <select value={warning} onChange={event => setWarning(event.target.value)}>
          {['none', 'unknown', 'blocked'].map(value => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <button type="button" onClick={() => setOpen(true)}>
        Open scan
      </button>
      <span data-test="closes">{closes}</span>
      <StorefrontPresentationScan
        open={open}
        labels={copy[lang]}
        videoId="vf-presentation-camera"
        message={warning === 'none' ? '' : copy[lang][warning]}
        onClose={() => {
          setCloses(value => value + 1);
          setOpen(false);
        }}
      />
    </>
  );
}
