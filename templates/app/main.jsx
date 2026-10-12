// The storefront app: the click-through site, or one page on its own with ?page=<name>.
import React from 'react';
import {createRoot} from 'react-dom/client';
import './theme.js';
import './runtime.js';
import {PageError} from './PageError.jsx';
import {loadPage, reloadOnStaleFiles} from './pages.js';

reloadOnStaleFiles();

const name = new URLSearchParams(location.search).get('page') || 'site';
const root = createRoot(document.getElementById('root'));

(loadPage(name) || loadPage('site')).then(
  page => {
    const Page = page.default;
    root.render(<Page {...page.defaults} />);
  },
  error => {
    console.error(error);
    root.render(<PageError />);
  }
);
