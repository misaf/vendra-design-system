// Compile the shared React views for the Next.js static export and the server-rendering tests.
import {rolldown} from 'rolldown';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import theme from '../shared/domain/tenant-theme.js';

const templates = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(templates, '../..');

// Only preload the brand font that the current page uses.
export function tenantFontUrls(tenant, lang, base = '/') {
  if (!tenant || tenant === 'default') return [];
  const spec = JSON.parse(
    fs.readFileSync(
      path.join(root, 'apps/storefront/design-system/tokens/tenants', tenant + '.json'),
      'utf8'
    )
  );
  return theme.fontPreloads(spec, lang, base);
}

// Builds the server entry (app/entry-server.jsx) for Node into `outDir` and imports it.
export async function buildServer({outDir}) {
  const bundle = await rolldown({
    checks: {moduleLevelDirective: false},
    input: path.join(templates, 'app/entry-server.jsx'),
    platform: 'node',
    external: [/^react(?:-dom|-aria-components)?(?:\/|$)/, /^@internationalized\//]
  });
  try {
    await bundle.write({
      dir: outDir,
      format: 'es',
      entryFileNames: 'entry-server.mjs',
      chunkFileNames: '[name]-[hash].mjs'
    });
  } finally {
    await bundle.close();
  }
  return import(pathToFileURL(path.join(outDir, 'entry-server.mjs')).href);
}
