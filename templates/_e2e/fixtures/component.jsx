// Renders one component's fixture (components/<Name>/<Name>.fixture.jsx, its `Fixture` export)
// inside VendraProvider, in the page language: ?component=FilterBar&lang=fa.
import React from 'react';
import {createRoot} from 'react-dom/client';
import {VendraProvider} from '../../../components/VendraProvider/VendraProvider.jsx';

const fixtures = import.meta.glob('../../../components/*/*.fixture.jsx');
const query = new URLSearchParams(location.search);
const name = query.get('component');
const lang = query.get('lang') === 'fa' ? 'fa' : 'en';
document.documentElement.lang = lang;
document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
const load = fixtures['../../../components/' + name + '/' + name + '.fixture.jsx'];
if (!load) throw new Error('No fixture for ' + name);
load().then(({Fixture}) =>
  createRoot(document.getElementById('root')).render(
    <VendraProvider locale={lang === 'fa' ? 'fa-IR' : 'en-US'}>
      <Fixture lang={lang} />
    </VendraProvider>
  )
);
