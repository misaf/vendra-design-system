// The migration must not let a low-level component depend on page data or higher-level UI.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {spawnSync} = require('node:child_process');
const {parseSync} = require('rolldown/experimental');
const {levels, layer, dependencyViolation} = require('../../../tools/atomic.cjs');
const repo = path.resolve(__dirname, '../../..');

assert.equal(
  dependencyViolation(
    'packages/design-system/components/atoms/Button/Button.jsx',
    'packages/design-system/components/atoms/Icon/Icon.jsx'
  ),
  null
);
assert.equal(
  dependencyViolation(
    'packages/design-system/components/molecules/Search/Search.jsx',
    'packages/design-system/components/atoms/Input/Input.jsx'
  ),
  null
);
assert.equal(
  dependencyViolation(
    'packages/design-system/components/atoms/Spinner/Spinner.jsx',
    'packages/design-system/components/utils/messages.js'
  ),
  null
);
for (const [source, target] of [
  [
    'packages/design-system/components/atoms/Button/Button.jsx',
    'packages/design-system/components/molecules/Search/Search.jsx'
  ],
  [
    'packages/design-system/components/molecules/Search/Search.jsx',
    'packages/design-system/components/organisms/Header/Header.jsx'
  ],
  [
    'packages/design-system/components/utils/messages.js',
    'packages/design-system/components/atoms/Spinner/Spinner.jsx'
  ],
  [
    'packages/design-system/components/atoms/Button/Button.jsx',
    'packages/design-system/components/Legacy/Legacy.jsx'
  ],
  [
    'packages/design-system/components/atoms/Button/Button.jsx',
    'apps/storefront/shared/domain/catalog.js'
  ]
])
  assert.ok(dependencyViolation(source, target), `${source} must not depend on ${target}`);

const sources = fs
  .readdirSync(path.join(repo, 'packages/design-system/components'), {recursive: true})
  .map(file => 'packages/design-system/components/' + file.split(path.sep).join('/'));
const violations = [];
for (const source of sources.filter(
  file => /\.(js|jsx)$/.test(file) && !file.endsWith('.fixture.jsx') && layer(file)
)) {
  const {program} = parseSync(source, fs.readFileSync(path.join(repo, source), 'utf8'));
  for (const node of program.body) {
    if (
      !['ImportDeclaration', 'ExportNamedDeclaration', 'ExportAllDeclaration'].includes(node.type)
    )
      continue;
    const specifier = node.source?.value;
    if (!specifier?.startsWith('.')) continue;
    const target = path.posix.normalize(path.posix.join(path.posix.dirname(source), specifier));
    if (!fs.existsSync(path.join(repo, target))) violations.push(`${source}: missing ${target}`);
    const violation = dependencyViolation(source, target);
    if (violation) violations.push(violation);
  }
}
// Fixture lookup and package exports use component names, so duplicate names are ambiguous.
const names = new Set();
for (const source of sources.filter(
  file => file.endsWith('.jsx') && !file.endsWith('.fixture.jsx')
)) {
  const name = path.posix.basename(source, '.jsx');
  assert.ok(!names.has(name), `Duplicate component name: ${name}`);
  names.add(name);
}
for (const level of levels) {
  const folder = path.join(repo, 'packages/design-system/components', level);
  if (!fs.existsSync(folder)) continue;
  for (const entry of fs.readdirSync(folder, {withFileTypes: true})) {
    if (!entry.isDirectory()) continue;
    assert.ok(
      fs.existsSync(path.join(folder, entry.name, entry.name + '.jsx')),
      `${level}/${entry.name} needs its named component`
    );
  }
}
assert.deepEqual(violations, [], 'Atomic Design dependency violations');

// Storefront UI: a spec and its fixture come together (app/<layer>/<Name>/<Name>.spec.mjs and
// <Name>.fixture.jsx, run by the storefront-components project). Every new organism has them; the
// organisms that predate this rule are listed in organisms-without-specs.json, which only shrinks.
const appUi = path.join(repo, 'apps/storefront/app');
const grandfathered = new Set(require('./organisms-without-specs.json'));
for (const level of ['molecules', 'organisms', 'layouts']) {
  for (const name of fs.readdirSync(path.join(appUi, level))) {
    const base = path.join(appUi, level, name, name);
    const spec = fs.existsSync(base + '.spec.mjs');
    const fixture = fs.existsSync(base + '.fixture.jsx');
    assert.equal(
      spec,
      fixture,
      `${level}/${name}: a spec needs its fixture and a fixture its spec`
    );
    if (level !== 'organisms') continue;
    if (spec)
      assert.ok(
        !grandfathered.has(name),
        `${name} has a spec now: remove it from organisms-without-specs.json`
      );
    else
      assert.ok(
        grandfathered.has(name),
        `organisms/${name} needs ${name}.spec.mjs and ${name}.fixture.jsx`
      );
  }
}
for (const name of grandfathered)
  assert.ok(
    fs.existsSync(path.join(appUi, 'organisms', name)),
    `organisms-without-specs.json lists ${name}, which no longer exists`
  );

// Exercise the actual CLI in a disposable repo: scaffolding must work at the deeper path,
// publish its export/CSS, and reject ambiguous names without changing the real checkout.
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'vendra-atomic-'));
try {
  for (const file of [
    '.prettierrc.json',
    'tools/new-component.cjs',
    'tools/atomic.cjs',
    'tools/paths.cjs',
    'apps/storefront/app/ds.js',
    'packages/design-system/components/index.css',
    'packages/design-system/components/utils/messages.d.ts'
  ]) {
    const target = path.join(temporary, file);
    fs.mkdirSync(path.dirname(target), {recursive: true});
    fs.copyFileSync(path.join(repo, file), target);
  }
  fs.symlinkSync(path.join(repo, 'node_modules'), path.join(temporary, 'node_modules'), 'dir');
  const generate = (...args) =>
    spawnSync(process.execPath, [path.join(temporary, 'tools/new-component.cjs'), ...args], {
      encoding: 'utf8'
    });
  assert.notEqual(generate('Sample').status, 0, 'a layer is required');
  assert.notEqual(generate('Sample', '--level', 'pages').status, 0, 'unknown layer is rejected');
  for (const level of levels) {
    const name = 'Sample' + level[0].toUpperCase() + level.slice(1);
    const result = generate(name, '--level', level, '--wording');
    assert.equal(result.status, 0, result.stderr);
    const base = path.join(temporary, 'packages/design-system/components', level, name, name);
    for (const suffix of ['.jsx', '.d.ts', '.css', '.spec.mjs', '.fixture.jsx'])
      assert.ok(fs.existsSync(base + suffix), `${name}${suffix} generated`);
    assert.ok(fs.readFileSync(base + '.jsx', 'utf8').includes("from '../../utils/messages.js'"));
    assert.ok(
      fs
        .readFileSync(base + '.spec.mjs', 'utf8')
        .includes("from '../../../../../apps/storefront/e2e/component-test.mjs'")
    );
    assert.ok(
      fs
        .readFileSync(path.join(temporary, 'apps/storefront/app/ds.js'), 'utf8')
        .includes(`../../../packages/design-system/components/${level}/${name}/${name}.jsx`)
    );
    assert.ok(
      fs
        .readFileSync(path.join(temporary, 'packages/design-system/components/index.css'), 'utf8')
        .includes(`${level}/${name}/${name}.css`)
    );
  }
  assert.notEqual(
    generate('SampleAtoms', '--level', 'molecules').status,
    0,
    'names are unique across layers'
  );
  const noCss = generate('Unstyled', '--level', 'atoms', '--no-css');
  assert.equal(noCss.status, 0, noCss.stderr);
  assert.ok(
    !fs.existsSync(
      path.join(temporary, 'packages/design-system/components/atoms/Unstyled/Unstyled.css')
    )
  );
} finally {
  fs.rmSync(temporary, {recursive: true, force: true});
}
console.log(
  'Passed: Atomic Design layer boundaries, unique names, component structure and storefront organism specs.'
);
