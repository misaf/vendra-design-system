// The storefront app: the click-through site, or one page on its own with ?page=<name>.
import React from 'react';
import {createRoot} from 'react-dom/client';
import './theme.js';

const pages = import.meta.glob('../storefront-*/Page.jsx', {eager: true});
const name = new URLSearchParams(location.search).get('page') || 'site';
const page = pages['../storefront-' + name + '/Page.jsx'] || pages['../storefront-site/Page.jsx'];
const Page = page.default;

createRoot(document.getElementById('root')).render(<Page {...page.defaults} />);
