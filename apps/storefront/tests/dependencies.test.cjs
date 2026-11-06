// One copy of each shared dependency across the npm workspace. The package (devDependencies, to
// build and test against its peers) and the storefront both pin React and React Aria; if one
// manifest is bumped without the other, npm nests a second copy under that workspace and hooks and
// shared context (RouterProvider, I18nProvider) break. So every package pinned by more than one
// manifest must have the same exact version everywhere, and the lockfile (what `npm ci` installs)
// and node_modules must hold a single copy of each, at that version.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const repo = path.resolve(__dirname, '../../..');
const readJson = file => JSON.parse(fs.readFileSync(path.join(repo, file), 'utf8'));
const root = readJson('package.json');

// The workspace manifests, from the root's "workspaces" globs (only "dir/*" forms are used).
const manifests = {'package.json': root};
for (const pattern of root.workspaces) {
  assert.match(pattern, /^[\w.-]+\/\*$/, 'unsupported workspace pattern ' + pattern);
  const parent = pattern.slice(0, -2);
  for (const entry of fs.readdirSync(path.join(repo, parent), {withFileTypes: true})) {
    const file = parent + '/' + entry.name + '/package.json';
    if (entry.isDirectory() && fs.existsSync(path.join(repo, file)))
      manifests[file] = readJson(file);
  }
}
assert.ok(
  manifests['packages/design-system/package.json'] && manifests['apps/storefront/package.json'],
  'the package and the storefront are workspaces'
);

// name -> {manifest file: pinned version}
const pins = new Map();
for (const [file, manifest] of Object.entries(manifests))
  for (const field of ['dependencies', 'devDependencies', 'optionalDependencies'])
    for (const [name, version] of Object.entries(manifest[field] || {})) {
      if (!pins.has(name)) pins.set(name, {});
      const declared = pins.get(name);
      assert.ok(!(file in declared), name + ' is declared twice in ' + file);
      declared[file] = version;
    }

// These must resolve to one instance at runtime, whoever declares them.
const singletons = [
  'react',
  'react-dom',
  'react-aria-components',
  '@internationalized/date',
  '@types/react'
];
for (const name of singletons) assert.ok(pins.has(name), name + ' is pinned by a workspace');
const shared = [...pins].filter(([, declared]) => Object.keys(declared).length > 1);
assert.ok(
  shared.some(([name]) => name === 'react'),
  'react is pinned by both the package and the storefront'
);
const checked = new Set([...singletons, ...shared.map(([name]) => name)]);

const lock = readJson('package-lock.json');
for (const name of checked) {
  const declared = pins.get(name);
  const versions = new Set(Object.values(declared));
  assert.equal(
    versions.size,
    1,
    name + ' has different versions across manifests: ' + JSON.stringify(declared)
  );
  const [version] = versions;
  assert.match(version, /^\d+\.\d+\.\d+$/, name + ' should be pinned exactly, not ' + version);

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
  for (const file of Object.keys(manifests).filter(file => file !== 'package.json'))
    assert.ok(
      !fs.existsSync(path.join(repo, path.dirname(file), 'node_modules', name)),
      name + ' has a second copy under ' + path.dirname(file) + '/node_modules (run npm ci)'
    );
}

// The package's caret peer ranges start at the version its own devDependencies test with.
const pkg = manifests['packages/design-system/package.json'];
for (const [name, range] of Object.entries(pkg.peerDependencies || {}))
  if (range.startsWith('^'))
    assert.equal(
      range,
      '^' + pkg.devDependencies[name],
      name + ' peer range should start at the tested version'
    );

console.log('dependencies: ' + checked.size + ' shared packages pinned once, installed once');
