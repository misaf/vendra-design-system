// The storefront app: the click-through site, or one page on its own with ?page=<name>.
import React from 'react';
import {createRoot} from 'react-dom/client';
import './theme.js';
import './runtime.js';
import {PageError} from './PageError.jsx';
import {loadPage} from './pages.js';

// A deploy replaced the files this tab expects: reload once to get the new ones (at most once a
// minute, so a file that is really missing shows PageError instead of reloading forever).
window.addEventListener('vite:preloadError', event => {
  try {
    const last = Number(sessionStorage.getItem('vf-reloaded-at')) || 0;
    if (Date.now() - last < 60000) return;
    sessionStorage.setItem('vf-reloaded-at', String(Date.now()));
  } catch {
    return;
  }
  event.preventDefault();
  location.reload();
});

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
