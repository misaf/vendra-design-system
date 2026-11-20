// Mirror the storefront's public asset paths into Next's public directory.
import {cp, mkdir, rm, writeFile} from 'node:fs/promises';
import {dirname, join, resolve} from 'node:path';
import {tenantSpecs} from '../tools/tenants.mjs';
import theme from '../ui/tokens/tenant-theme.js';

const root = resolve(import.meta.dirname, '..');
const publicDir = join(root, 'public');
const publicTenants = 'apps/storefront/design-system/tokens/tenants';
const tenantDir = join(publicDir, publicTenants);
// The browser resolves custom font URLs from the published theme's location.
const assetBase = '../'.repeat(publicTenants.split('/').length);
const assets = {
  assets: 'assets',
  'ui/assets/fonts': 'apps/storefront/design-system/assets/fonts',
  '_vendor/leaflet': 'apps/storefront/_vendor/leaflet'
};

await rm(publicDir, {recursive: true, force: true});
await mkdir(tenantDir, {recursive: true});
await Promise.all([
  ...Object.entries(assets).map(async ([source, destination]) => {
    const target = join(publicDir, destination);
    await mkdir(dirname(target), {recursive: true});
    await cp(join(root, source), target, {recursive: true});
  }),
  ...Object.entries(tenantSpecs()).map(([slug, spec]) =>
    writeFile(join(tenantDir, slug + '.css'), theme.css(slug, spec, {assetBase}))
  )
]);
