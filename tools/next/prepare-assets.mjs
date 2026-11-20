// Clear generated public files and write the storefront's tenant stylesheets.
import {mkdir, rm, writeFile} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {tenantSpecs} from '../build/tenants.mjs';
import theme from '../../src/design-system/tokens/tenant-theme.js';

const root = resolve(import.meta.dirname, '../..');
const publicDir = join(root, 'public');
const publicTenants = 'apps/storefront/design-system/tokens/tenants';
const tenantDir = join(publicDir, publicTenants);
// The browser resolves custom font URLs from the published theme's location.
const assetBase = '../'.repeat(publicTenants.split('/').length);

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
await mkdir(tenantDir, {recursive: true});
await Promise.all(
  Object.entries(tenantSpecs()).map(([slug, spec]) =>
    writeFile(join(tenantDir, slug + '.css'), theme.css(slug, spec, {assetBase}))
  )
);
