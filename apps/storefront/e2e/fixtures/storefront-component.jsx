// Renders one storefront UI fixture (app/<molecules|organisms|layouts>/<Name>/<Name>.fixture.jsx, its
// `Fixture` export) inside VendraProvider with the storefront's styles, in the page language:
// ?component=StorefrontCheckoutMethods&lang=fa.
import React from 'react';
import {createRoot} from 'react-dom/client';
import {VendraProvider} from '../../app/ds.js';

import fixtures from 'fixtures:storefront';
const query = new URLSearchParams(location.search);
const name = query.get('component');
const lang = query.get('lang') === 'fa' ? 'fa' : 'en';
document.documentElement.lang = lang;
document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
const load = Object.entries(fixtures).find(([file]) =>
  file.endsWith('/' + name + '/' + name + '.fixture.jsx')
)?.[1];
if (!load) throw new Error('No storefront fixture for ' + name);
load().then(({Fixture}) =>
  createRoot(document.getElementById('root')).render(
    <VendraProvider locale={lang === 'fa' ? 'fa-IR' : 'en-US'}>
      <Fixture lang={lang} />
    </VendraProvider>
  )
);
