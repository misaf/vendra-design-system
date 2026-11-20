// The migration must not let a low-level component depend on page data or higher-level UI.
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {parseSync} from 'rolldown/experimental';
import {routeFolders} from './page-script.mjs';
import {levels, layer, dependencyViolation} from '../tools/atomic.mjs';
import organismsWithoutSpecs from './organisms-without-specs.json' with {type: 'json'};

const repo = path.resolve(import.meta.dirname, '..');

assert.equal(
  dependencyViolation(
    'components/ui/patterns/atoms/Chip/Chip.jsx',
    'components/ui/components/Icon/Icon.jsx'
  ),
  null
);
assert.equal(
  dependencyViolation(
    'components/ui/patterns/molecules/Search/Search.jsx',
    'components/ui/components/Input/Input.jsx'
  ),
  null
);
assert.equal(
  dependencyViolation(
    'components/ui/patterns/atoms/Chip/Chip.jsx',
    'components/ui/patterns/utils/messages.js'
  ),
  null
);
for (const [source, target] of [
  ['components/ui/patterns/atoms/Chip/Chip.jsx', 'components/ui/components/Dialog/Dialog.jsx'],
  ['components/ui/components/Input/Input.jsx', 'domain/commerce.js'],
  [
    'components/ui/patterns/atoms/Chip/Chip.jsx',
    'components/ui/patterns/molecules/Search/Search.jsx'
  ],
  [
    'components/ui/patterns/molecules/Search/Search.jsx',
    'components/ui/patterns/organisms/Header/Header.jsx'
  ],
  ['components/ui/patterns/utils/messages.js', 'components/ui/components/Spinner/Spinner.jsx'],
  ['components/ui/patterns/atoms/Chip/Chip.jsx', 'components/ui/patterns/Legacy/Legacy.jsx'],
  ['components/ui/patterns/atoms/Chip/Chip.jsx', 'domain/catalog.js']
])
  assert.ok(dependencyViolation(source, target), `${source} must not depend on ${target}`);

const sources = fs
  .readdirSync(path.join(repo, 'components/ui/patterns'), {recursive: true})
  .map(file => 'components/ui/patterns/' + file.split(path.sep).join('/'));
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
  const folder = path.join(repo, 'components/ui/patterns', level);
  if (!fs.existsSync(folder)) continue;
  for (const entry of fs.readdirSync(folder, {withFileTypes: true})) {
    if (!entry.isDirectory()) continue;
    assert.ok(
      fs.existsSync(path.join(folder, entry.name, entry.name + '.jsx')) ||
        fs.existsSync(path.join(repo, 'components/ui/components', entry.name, entry.name + '.jsx')),
      `${level}/${entry.name} needs its named component`
    );
  }
}
assert.deepEqual(violations, [], 'Atomic Design dependency violations');

// Preserve browser fixture coverage as route components move next to their routes.
const uiRoots = [
  ...Object.values(routeFolders).map(folder => path.join(repo, folder, '_components')),
  path.join(repo, 'components/storefront')
];
const grandfathered = new Set(organismsWithoutSpecs);
for (const folder of uiRoots) {
  if (!fs.existsSync(folder)) continue;
  for (const name of fs.readdirSync(folder)) {
    const base = path.join(folder, name, name);
    const spec = fs.existsSync(base + '.spec.mjs');
    const fixture = fs.existsSync(base + '.fixture.jsx');
    assert.equal(spec, fixture, name + ': a spec needs its fixture and vice versa');
    if (spec) assert.ok(!grandfathered.has(name), name + ' has a spec now');
    else if (grandfathered.has(name))
      assert.ok(grandfathered.delete(name), name + ' needs a browser fixture and spec');
  }
}
assert.deepEqual([...grandfathered], [], 'organisms-without-specs.json lists missing components');

// Exercise the actual CLI in a disposable repo: scaffolding must work at the deeper path,
// publish its export/CSS, and reject ambiguous names without changing the real checkout.
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'vendra-atomic-'));
try {
  for (const file of [
    '.prettierrc.json',
    'tools/new-component.mjs',
    'tools/atomic.mjs',
    'tools/paths.mjs',
    'components/ui/index.js',
    'components/ui/patterns/index.css',
    'components/ui/components/Button/Button.jsx',
    'components/ui/components/utils/messages.d.ts'
  ]) {
    const target = path.join(temporary, file);
    fs.mkdirSync(path.dirname(target), {recursive: true});
    fs.copyFileSync(path.join(repo, file), target);
  }
  fs.symlinkSync(path.join(repo, 'node_modules'), path.join(temporary, 'node_modules'), 'dir');
  const generate = (...args) =>
    spawnSync(process.execPath, [path.join(temporary, 'tools/new-component.mjs'), ...args], {
      encoding: 'utf8'
    });
  assert.notEqual(generate('Sample').status, 0, 'a layer is required');
  assert.notEqual(generate('Sample', '--level', 'pages').status, 0, 'unknown layer is rejected');
  for (const level of levels) {
    const name = 'Sample' + level[0].toUpperCase() + level.slice(1);
    const result = generate(name, '--level', level, '--wording');
    assert.equal(result.status, 0, result.stderr);
    const base = path.join(temporary, 'components/ui/patterns', level, name, name);
    for (const suffix of ['.jsx', '.d.ts', '.css', '.spec.mjs', '.fixture.jsx'])
      assert.ok(fs.existsSync(base + suffix), `${name}${suffix} generated`);
    assert.ok(fs.readFileSync(base + '.jsx', 'utf8').includes("from '../../utils/messages.js'"));
    assert.ok(
      fs
        .readFileSync(base + '.spec.mjs', 'utf8')
        .includes("from '../../../../../e2e/component-test.mjs'")
    );
    assert.ok(
      fs
        .readFileSync(path.join(temporary, 'components/ui/index.js'), 'utf8')
        .includes(`./patterns/${level}/${name}/${name}.jsx`)
    );
    assert.ok(
      fs
        .readFileSync(path.join(temporary, 'components/ui/patterns/index.css'), 'utf8')
        .includes(`${level}/${name}/${name}.css`)
    );
  }
  assert.notEqual(
    generate('SampleAtoms', '--level', 'molecules').status,
    0,
    'names are unique across layers'
  );
  assert.notEqual(
    generate('Button', '--level', 'atoms').status,
    0,
    'names are unique across the storefront and shared UI'
  );
  const noCss = generate('Unstyled', '--level', 'atoms', '--no-css');
  assert.equal(noCss.status, 0, noCss.stderr);
  assert.ok(
    !fs.existsSync(path.join(temporary, 'components/ui/patterns/atoms/Unstyled/Unstyled.css'))
  );
} finally {
  fs.rmSync(temporary, {recursive: true, force: true});
}
console.log(
  'Passed: Atomic Design layer boundaries, unique names, component structure and storefront organism specs.'
);
