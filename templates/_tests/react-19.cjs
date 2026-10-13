// The package under React 19, as a tenant app on it would install it. The workspace pins React
// 18.3.1 (the oldest the peer range promises a test for), so this installs React 19 with its types
// in a scratch app, then runs package.test.cjs there (import, server render, wording, themes) and
// type-checks dist's declarations against React 19's types. Needs the network: npm install.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {execFileSync} = require('node:child_process');

const REACT = '19.3.0';
const TYPES = '19.3.0';
const repo = path.resolve(__dirname, '../..');
const workspace = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(repo, 'package.json'), 'utf8'));
const app = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'vendra-react-19-')));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const run = (command, args, options = {}) =>
  execFileSync(command, args, {stdio: 'inherit', ...options});

try {
  fs.writeFileSync(
    path.join(app, 'package.json'),
    JSON.stringify(
      {
        private: true,
        dependencies: {
          react: REACT,
          'react-dom': REACT,
          'react-aria-components': workspace.dependencies['react-aria-components'],
          '@internationalized/date': workspace.dependencies['@internationalized/date']
        },
        devDependencies: {
          '@types/react': TYPES,
          typescript: workspace.devDependencies.typescript
        }
      },
      null,
      2
    )
  );
  run(npm, ['install', '--no-audit', '--no-fund', '--ignore-scripts', '--loglevel=error'], {
    cwd: app
  });
  const installed = JSON.parse(
    fs.readFileSync(path.join(app, 'node_modules/react/package.json'), 'utf8')
  );
  assert.equal(installed.version, REACT);
  for (const peer of ['react', 'react-dom'])
    assert.ok(
      manifest.peerDependencies[peer].startsWith('>=18'),
      peer + ' peer range should admit React 19'
    );

  // Import, server render, wording and themes, resolving React from the React 19 app.
  run(process.execPath, [path.join(__dirname, 'package.test.cjs')], {
    env: {...process.env, VENDRA_PACKAGE_APP: app}
  });

  // dist's declarations as a strict TypeScript app on React 19's types compiles them.
  const types = path.join(app, 'node_modules', manifest.name);
  fs.mkdirSync(types, {recursive: true});
  fs.cpSync(path.join(repo, 'dist'), path.join(types, 'dist'), {recursive: true});
  fs.copyFileSync(path.join(repo, 'package.json'), path.join(types, 'package.json'));
  fs.writeFileSync(
    path.join(app, 'app.tsx'),
    "import {Button, ProductCard, VendraProvider} from '" +
      manifest.name +
      '\';\nexport const App = () => (\n  <VendraProvider locale="fa-IR">\n    <Button>خرید</Button>\n' +
      '    <ProductCard name="VF-9FA2KE" price="۲٬۲۰۰٬۰۰۰ تومان" />\n  </VendraProvider>\n);\n'
  );
  fs.writeFileSync(
    path.join(app, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        noEmit: true,
        strict: true,
        target: 'es2023',
        module: 'nodenext',
        moduleResolution: 'nodenext',
        jsx: 'react-jsx',
        lib: ['es2023', 'dom', 'dom.iterable'],
        types: []
      },
      include: ['app.tsx', 'node_modules/' + manifest.name + '/dist/**/*.d.ts']
    })
  );
  run(path.join(app, 'node_modules/.bin/tsc'), ['-p', app]);
  console.log(
    'Passed: the package imports, server-renders and type-checks on React ' + REACT + '.'
  );
} finally {
  fs.rmSync(app, {recursive: true, force: true});
}
