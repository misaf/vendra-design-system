// Mirror the storefront's public asset paths into Next's public directory.
import {cp, mkdir, readdir, rm} from 'node:fs/promises';
import {dirname, join, resolve} from 'node:path';

const root = resolve(import.meta.dirname, '../../..');
const publicDir = resolve(import.meta.dirname, '..', 'public');
const tenants = 'packages/ui/tokens/tenants';
const themes = (await readdir(join(root, tenants)))
  .filter(name => name.endsWith('.css'))
  .map(name => join(tenants, name));
const publicTenants = 'apps/storefront/design-system/tokens/tenants';

await rm(publicDir, {recursive: true, force: true});
await Promise.all(
  ['assets', 'packages/ui/assets/fonts', 'apps/storefront/_vendor/leaflet', ...themes].map(
    async path => {
      const publicPath = path
        .replace(tenants, publicTenants)
        .replace('packages/ui/assets/fonts', 'apps/storefront/design-system/assets/fonts');
      const target = join(publicDir, publicPath);
      await mkdir(dirname(target), {recursive: true});
      await cp(join(root, path), target, {recursive: true});
    }
  )
);
