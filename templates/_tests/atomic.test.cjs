// The migration must not let a low-level component depend on page data or higher-level UI.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {spawnSync} = require('node:child_process');
const {parseSync} = require('rolldown/experimental');
const {levels, layer, dependencyViolation} = require('../_build/atomic.cjs');
const repo = path.resolve(__dirname, '../..');

assert.equal(
  dependencyViolation('components/atoms/Button/Button.jsx', 'components/atoms/Icon/Icon.jsx'),
  null
);
assert.equal(
  dependencyViolation('components/molecules/Search/Search.jsx', 'components/atoms/Input/Input.jsx'),
  null
);
assert.equal(
  dependencyViolation('components/atoms/Spinner/Spinner.jsx', 'components/utils/messages.js'),
  null
);
for (const [source, target] of [
  ['components/atoms/Button/Button.jsx', 'components/molecules/Search/Search.jsx'],
  ['components/molecules/Search/Search.jsx', 'components/organisms/Header/Header.jsx'],
  ['components/utils/messages.js', 'components/atoms/Spinner/Spinner.jsx'],
  ['components/atoms/Button/Button.jsx', 'components/Legacy/Legacy.jsx'],
  ['components/atoms/Button/Button.jsx', 'templates/_shared/catalog.js']
])
  assert.ok(dependencyViolation(source, target), `${source} must not depend on ${target}`);

const sources = fs
  .readdirSync(path.join(repo, 'components'), {recursive: true})
  .map(file => 'components/' + file.split(path.sep).join('/'));
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
  const folder = path.join(repo, 'components', level);
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

// Exercise the actual CLI in a disposable repo: scaffolding must work at the deeper path,
// publish its export/CSS, and reject ambiguous names without changing the real checkout.
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'vendra-atomic-'));
try {
  for (const file of [
    '.prettierrc.json',
    'templates/_build/new-component.cjs',
    'templates/_build/atomic.cjs',
    'templates/app/ds.js',
    'components/index.css',
    'components/utils/messages.d.ts'
  ]) {
    const target = path.join(temporary, file);
    fs.mkdirSync(path.dirname(target), {recursive: true});
    fs.copyFileSync(path.join(repo, file), target);
  }
  fs.symlinkSync(path.join(repo, 'node_modules'), path.join(temporary, 'node_modules'), 'dir');
  const generate = (...args) =>
    spawnSync(
      process.execPath,
      [path.join(temporary, 'templates/_build/new-component.cjs'), ...args],
      {encoding: 'utf8'}
    );
  assert.notEqual(generate('Sample').status, 0, 'a layer is required');
  assert.notEqual(generate('Sample', '--level', 'pages').status, 0, 'unknown layer is rejected');
  for (const level of levels) {
    const name = 'Sample' + level[0].toUpperCase() + level.slice(1);
    const result = generate(name, '--level', level, '--wording');
    assert.equal(result.status, 0, result.stderr);
    const base = path.join(temporary, 'components', level, name, name);
    for (const suffix of ['.jsx', '.d.ts', '.css', '.spec.mjs', '.fixture.jsx'])
      assert.ok(fs.existsSync(base + suffix), `${name}${suffix} generated`);
    assert.ok(fs.readFileSync(base + '.jsx', 'utf8').includes("from '../../utils/messages.js'"));
    assert.ok(
      fs
        .readFileSync(base + '.spec.mjs', 'utf8')
        .includes("from '../../../templates/_e2e/component-test.mjs'")
    );
    assert.ok(
      fs
        .readFileSync(path.join(temporary, 'templates/app/ds.js'), 'utf8')
        .includes(`../../components/${level}/${name}/${name}.jsx`)
    );
    assert.ok(
      fs
        .readFileSync(path.join(temporary, 'components/index.css'), 'utf8')
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
  assert.ok(!fs.existsSync(path.join(temporary, 'components/atoms/Unstyled/Unstyled.css')));
} finally {
  fs.rmSync(temporary, {recursive: true, force: true});
}
console.log('Passed: Atomic Design layer boundaries, unique names and component structure.');
