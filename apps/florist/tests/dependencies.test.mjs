// Lock React and its shared context dependencies to one installation.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const repo = path.resolve(import.meta.dirname, '../../..');
const readJson = file => JSON.parse(fs.readFileSync(path.join(repo, file), 'utf8'));
const storefront = readJson('apps/florist/package.json');
const pins = {...storefront.dependencies, ...storefront.devDependencies};

// These must resolve to one instance at runtime, whoever declares them.
const singletons = [
  'react',
  'react-dom',
  'react-aria-components',
  '@internationalized/date',
  '@types/react'
];
const lock = readJson('package-lock.json');
for (const name of singletons) {
  const version = pins[name];
  assert.match(version, /^\d+\.\d+\.\d+$/, name + ' should be pinned exactly');

  // The lockfile installs it once, hoisted to the root, at the pinned version.
  const copies = Object.keys(lock.packages).filter(
    key => key === 'node_modules/' + name || key.endsWith('/node_modules/' + name)
  );
  assert.deepEqual(copies, ['node_modules/' + name], name + ' is installed more than once');
  assert.equal(lock.packages['node_modules/' + name].version, version, name + ' lockfile version');

  // And node_modules agrees (catches a stale install after a manifest change).
  const installed = path.join(repo, 'node_modules', name, 'package.json');
  if (fs.existsSync(installed))
    assert.equal(
      JSON.parse(fs.readFileSync(installed, 'utf8')).version,
      version,
      name + ' installed version (run npm ci)'
    );
  assert.ok(
    !fs.existsSync(path.join(repo, 'apps/florist/node_modules', name)),
    name + ' has a second copy under the storefront (run npm ci)'
  );
}
