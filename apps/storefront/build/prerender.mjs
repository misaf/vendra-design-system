// The storefront's pages prerendered at build time (npm run build:app, from vite.config.mjs): the
// app's page at each of its addresses (apps/storefront/app/en/shop/boxes/index.html), so a static host
// serves every link directly, with the page's markup in #root and its <head> tags (title,
// description, og:*, twitter:*, canonical, hreflang, robots) in the source, for search engines and
// link previews. The browser then hydrates that markup (app/main.jsx). The host's 404 page for
// addresses no file has (an order to track, a mistyped link) is the prerendered not-found page; it
// stays hidden until the app has read the address.
// VF_ORIGIN (https://shop.example) makes canonical and preview URLs absolute; without it they start
// at the site root.
import {build} from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {storefrontRoutes} from './routes.mjs';
import {VF_STORE} from '../shared/domain/store-config.js';
import {VF_TENANT_SLUGS} from '../_runtime/tenant-slugs.js';

const templates = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(templates, '../..');
const theme = createRequire(import.meta.url)('../shared/domain/tenant-theme.js');

// The tenant's brand-font file for a page in `lang`, as <link rel="preload"> tags: only the
// current language's script, so the other file downloads only if the page uses it.
export function tenantFontPreloads(tenant, lang, base = '/') {
  if (!tenant) return '';
  const spec = JSON.parse(
    fs.readFileSync(
      path.join(root, 'packages/design-system/tokens/tenants', tenant + '.json'),
      'utf8'
    )
  );
  return theme
    .fontPreloads(spec, lang, base)
    .map(href => `<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin>\n`)
    .join('');
}

// Builds the server entry (app/entry-server.jsx) for Node into `outDir` and imports it.
export async function buildServer({base = '/', outDir}) {
  await build({
    configFile: false,
    root,
    base,
    logLevel: 'warn',
    publicDir: false,
    build: {
      ssr: path.join(templates, 'app/entry-server.jsx'),
      outDir,
      emptyOutDir: true,
      rollupOptions: {output: {entryFileNames: 'entry-server.mjs'}}
    }
  });
  // No cache-busting query: the page chunks import this same entry module, and share its state.
  return import(pathToFileURL(path.join(outDir, 'entry-server.mjs')).href);
}

// The page at `address` (en/shop/boxes/, under the app) as HTML: `shell` (the app's index.html)
// with the rendered page's language, <head> tags and markup. data-vf-path and data-vf-time tell the
// browser which address it is and the moment it rendered at; the 404 page has neither.
export async function prerenderedPage(
  server,
  shell,
  address,
  {base = '/', origin = '', notFound = false} = {}
) {
  const url = base + 'apps/storefront/app/' + address;
  const time = Date.now();
  const rendered = await server.render(url, {base, origin, time});
  if (!rendered.html.includes('<h1')) throw new Error('No heading prerendered at ' + url);
  const tenant = VF_STORE.tenant !== 'default' ? VF_STORE.tenant : null;
  let html = shell
    .replace(
      '<html lang="en">',
      () => `<html lang="${rendered.lang}" dir="${rendered.dir}" data-lang="${rendered.lang}">`
    )
    .replace(/<title>[^<]*<\/title>/, () =>
      notFound
        ? // The host's 404 page answers many addresses: it names none of them as its own.
          rendered.head.replace(/\n<(link rel="canonical"|meta property="og:url")[^>]*>/g, '')
        : rendered.head
    )
    .replace(
      '<div id="root"></div>',
      () =>
        `<div id="root"${notFound ? '' : ` data-vf-path="${url}" data-vf-time="${time}"`}>` +
        rendered.html +
        '</div>'
    );
  // The store's own theme is in the page from the start, so nothing waits for it (app/theme.js).
  if (tenant)
    html = html.replace(
      '</head>',
      () =>
        tenantFontPreloads(tenant, rendered.lang, base) +
        `<link id="vf-tenant-css" rel="stylesheet" href="${base}packages/design-system/tokens/tenants/${tenant}.css">\n</head>`
    );
  // A preview of another tenant (?tenant=clay) hides the page before its first paint, until
  // app/theme.js has loaded that theme (at most 2s), so the store's colours never flash.
  const others = VF_TENANT_SLUGS.filter(slug => slug !== tenant);
  if (others.length)
    html = html.replace(
      '</head>',
      () =>
        '<style id="vf-tenant-wait">html[data-vf-tenant-loading] body{visibility:hidden}</style>\n' +
        '<script>(() => {const root = document.documentElement;' +
        `if (${JSON.stringify(others)}.includes(new URLSearchParams(location.search).get('tenant'))) {` +
        "root.setAttribute('data-vf-tenant-loading', '');" +
        "setTimeout(() => root.removeAttribute('data-vf-tenant-loading'), 2000);}})();</script>\n</head>"
    );
  if (notFound)
    html = html.replace(
      '</head>',
      () =>
        '<style>html[data-vf-routing] #root{visibility:hidden}</style>\n' +
        '<script>document.documentElement.setAttribute("data-vf-routing", "");' +
        'setTimeout(() => document.documentElement.removeAttribute("data-vf-routing"), 3000);' +
        '</script>\n</head>'
    );
  return html;
}

// Writes every route's page and the root 404.html into the client build at `outDir`. The plain
// apps/storefront/app/index.html stays as it is, the entry for standalone previews (?page=<name>).
export async function prerender(outDir, base) {
  const server = await buildServer({
    base,
    outDir: path.join(root, 'node_modules/.vite/storefront-server')
  });
  const origin = (process.env.VF_ORIGIN || '').replace(/\/$/, '');
  const app = path.join(outDir, 'apps/storefront/app');
  const shell = fs.readFileSync(path.join(app, 'index.html'), 'utf8');
  for (const route of storefrontRoutes()) {
    fs.mkdirSync(path.join(app, route.path), {recursive: true});
    fs.writeFileSync(
      path.join(app, route.path, 'index.html'),
      await prerenderedPage(server, shell, route.path, {base, origin})
    );
  }
  fs.writeFileSync(
    path.join(outDir, '404.html'),
    await prerenderedPage(server, shell, VF_STORE.languages[0] + '/404/', {
      base,
      origin,
      notFound: true
    })
  );
}
