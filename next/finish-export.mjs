// Adapt the exported pages to the static host's root URLs and 404 fallback.
import {copyFile, readdir, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {VF_STORE} from '../domain/store-config.js';
import {vfServerRender} from '../shared/platform/environment.js';
import {precompress} from '../build/compress.mjs';
import {storefrontSitemap} from '../build/routes.mjs';

const out = join(import.meta.dirname, 'out');
const base = (process.env.VF_BASE_PATH || '') + '/';
const origin = process.env.VF_ORIGIN || '';
const lang = VF_STORE.languages[0];
await copyFile(join(out, lang, '_fallback', 'index.html'), join(out, '404.html'));

const destination = base + lang + '/';
await writeFile(
  join(out, 'index.html'),
  `<!doctype html>
<html lang="${lang}">
<meta charset="utf-8">
<title>Vendra Florist</title>
<script>
const target = new URL(${JSON.stringify(destination)}, location.href);
target.search = location.search;
target.hash = location.hash;
location.replace(target.href);
</script>
<a href="${destination}">Open the Vendra storefront</a>
</html>
`
);

vfServerRender({url: base, base, origin});
await writeFile(join(out, 'sitemap.xml'), storefrontSitemap(origin));
await writeFile(
  join(out, 'robots.txt'),
  'User-agent: *\nAllow: /\nSitemap: ' + origin + base + 'sitemap.xml\n'
);

const staticFiles = (await readdir(join(out, '_next', 'static'), {recursive: true})).filter(name =>
  /\.(js|css|woff2?)$/.test(name)
);
await copyFile(join(import.meta.dirname, 'sw.js'), join(out, 'sw.js'));
await writeFile(
  join(out, 'offline-manifest.json'),
  JSON.stringify([
    ...VF_STORE.languages.map(code => base + code + '/presentation/'),
    ...staticFiles.map(name => base + '_next/static/' + name)
  ])
);
await writeFile(join(out, '.nojekyll'), '');
await precompress(out);
