import React from 'react';
import {BrandLogo} from './BrandLogo.jsx';
export function Fixture({lang}) {
  const [source, setSource] = React.useState('normal');
  const [context, setContext] = React.useState('header');
  const [alternateName, setAlternateName] = React.useState(false);
  const name =
    lang === 'en'
      ? alternateName
        ? 'Vendra studio'
        : 'Vendra flowers'
      : alternateName
        ? 'استودیو وندرا'
        : 'گل وندرا';
  const images = {
    normal: {
      src: lang === 'fa' ? '/assets/logo-horizontal-fa.png' : '/assets/logo-horizontal.png',
      width: 440,
      height: 72
    },
    alternate: {src: '/assets/logo-stacked.png', width: 160, height: 160},
    failed: {src: '/assets/fixture-logo-failure.png', width: 440, height: 72}
  };
  return (
    <>
      <label>
        Logo source
        <select value={source} onChange={event => setSource(event.target.value)}>
          {['normal', 'alternate', 'absent', 'failed'].map(value => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label>
        Context
        <select value={context} onChange={event => setContext(event.target.value)}>
          {['header', 'mobile', 'footer'].map(value => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={alternateName}
          onChange={event => setAlternateName(event.target.checked)}
        />
        Alternate name
      </label>
      <main>
        <a
          href="#home"
          className={
            context === 'footer'
              ? 'vf-shell-footer-brand'
              : context === 'mobile'
                ? 'vf-shell-mobile-brand'
                : 'vf-shell-brand'
          }
        >
          <BrandLogo image={images[source]} name={name} />
        </a>
      </main>
    </>
  );
}
