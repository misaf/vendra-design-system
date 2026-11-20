// Renders one storefront UI fixture (the `Fixture` export beside the component in app/ or components/storefront/) inside VendraProvider with the storefront's styles, in the page language:
// ?component=StorefrontCheckoutMethods&lang=fa.
import React from 'react';
import {createRoot} from 'react-dom/client';
import {VendraProvider} from '../../src/design-system/components/VendraProvider/VendraProvider.jsx';

import fixtures from 'fixtures:storefront';
const query = new URLSearchParams(location.search);
const name = query.get('component');
const lang = query.get('lang') === 'fa' ? 'fa' : 'en';
document.documentElement.lang = lang;
document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
const load = Object.entries(fixtures).find(([file]) =>
  ['.jsx', '.tsx'].some(ext => file.endsWith('/' + name + '/' + name + '.fixture' + ext))
)?.[1];
if (!load) throw new Error('No storefront fixture for ' + name);
load().then(({Fixture}) =>
  createRoot(document.getElementById('root')).render(
    <VendraProvider locale={lang === 'fa' ? 'fa-IR' : 'en-US'}>
      <Fixture lang={lang} />
    </VendraProvider>
  )
);
