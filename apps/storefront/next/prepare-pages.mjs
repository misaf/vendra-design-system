// Build the existing React page views once for Next's App Router to export with their initial HTML.
import {mkdir, mkdtemp, rm, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {buildServer} from '../build/prerender.mjs';
import {storefrontRoutes} from '../build/routes.mjs';
import {VF_STORE} from '../shared/domain/store-config.js';

const output = join(import.meta.dirname, '_generated');
const base = (process.env.VF_BASE_PATH || '') + '/';
await mkdir(output, {recursive: true});
const serverDir = await mkdtemp(join(output, 'server-'));

try {
  const server = await buildServer({base, outDir: serverDir});
  const pages = {};
  for (const {path} of storefrontRoutes()) {
    const {html, tags, brandLinks} = await server.render(base + 'apps/storefront/app/' + path, {
      base,
      origin: process.env.VF_ORIGIN || ''
    });
    if (!html.includes('<h1')) throw new Error('No heading prerendered at ' + path);
    pages[path] = {html, tags, brandLinks};
  }
  const fallback = await server.render(
    base + 'apps/storefront/app/' + VF_STORE.languages[0] + '/404/',
    {
      base,
      origin: process.env.VF_ORIGIN || ''
    }
  );
  await writeFile(join(output, 'pages.json'), JSON.stringify({pages, fallback: fallback.html}));
} finally {
  await rm(serverDir, {recursive: true, force: true});
}
