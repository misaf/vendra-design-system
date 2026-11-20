// Mirror the storefront's public asset paths into Next's public directory.
import {copyFile, cp, mkdir, rm, writeFile} from 'node:fs/promises';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {tenantSpecs} from '../build/tenants.mjs';
import theme from '../../src/design-system/tokens/tenant-theme.js';

const root = resolve(import.meta.dirname, '../..');
const publicDir = join(root, 'public');
const publicTenants = 'apps/storefront/design-system/tokens/tenants';
const tenantDir = join(publicDir, publicTenants);
// The browser resolves custom font URLs from the published theme's location.
const assetBase = '../'.repeat(publicTenants.split('/').length);
const fontsDir = join(publicDir, 'apps/storefront/design-system/assets/fonts');
const leafletPackage = dirname(fileURLToPath(import.meta.resolve('leaflet/package.json')));
const leafletDir = join(publicDir, 'apps/storefront/_vendor/leaflet');

// Keep tracked public assets and remove only files written by our preparation scripts.
const generatedPaths = [
  'apps',
  'ui',
  'guidelines',
  'communications',
  'e2e',
  '_runtime',
  '_fixture-chunks'
];
await Promise.all(
  generatedPaths.map(folder => rm(join(publicDir, folder), {recursive: true, force: true}))
);
await Promise.all([tenantDir, leafletDir].map(dir => mkdir(dir, {recursive: true})));
await Promise.all([
  cp(join(root, 'src/design-system/assets/fonts'), fontsDir, {recursive: true}),
  copyFile(join(leafletPackage, 'LICENSE'), join(leafletDir, 'LICENSE')),
  // The storefront and dev fixtures load the same browser assets on demand.
  ...['leaflet.js', 'leaflet.css'].map(file =>
    copyFile(join(leafletPackage, 'dist', file), join(leafletDir, file))
  ),
  ...Object.entries(tenantSpecs()).map(([slug, spec]) =>
    writeFile(join(tenantDir, slug + '.css'), theme.css(slug, spec, {assetBase}))
  )
]);
