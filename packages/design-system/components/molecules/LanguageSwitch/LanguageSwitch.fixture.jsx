import React from 'react';
import {LanguageSwitch} from './LanguageSwitch.jsx';

export function Fixture() {
  const [language, setLanguage] = React.useState('en');
  return (
    <div>
      <LanguageSwitch value={language} onChange={setLanguage} />
      <output data-test="language">{language}</output>
    </div>
  );
}
