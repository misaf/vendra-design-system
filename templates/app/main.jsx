// The storefront app: the click-through site, or one page on its own with ?page=<name>.
import React from 'react';
import {createRoot} from 'react-dom/client';
import './theme.js';
import './runtime.js';
import {loadPage} from './pages.js';

const name = new URLSearchParams(location.search).get('page') || 'site';

(loadPage(name) || loadPage('site')).then(page => {
  const Page = page.default;
  createRoot(document.getElementById('root')).render(<Page {...page.defaults} />);
});
