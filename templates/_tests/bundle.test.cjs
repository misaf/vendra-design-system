// Run with: node templates/_tests/bundle.test.cjs
// Compiles a temporary fixture repo; the real bundle is covered by npm run check.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const {componentsBundle} = require('../_build/components.cjs');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'vendra-bundle-'));
const write = (file, text) => { fs.mkdirSync(path.dirname(path.join(temp, file)), {recursive: true}); fs.writeFileSync(path.join(temp, file), text); };
const load = (code, React = {createElement: (type, props, ...children) => ({type, props, children})}) => {
  const context = {React};
  context.window = context;
  vm.createContext(context);
  vm.runInContext(code, context);
  return context.VendraDesignSystem_4ae5a2;
};
try {
  // Alphabetically Badge comes before Icon, but it imports Icon, so Icon must compile first.
  write('components/core/Badge.jsx', "import React from 'react';\nimport { Icon as Glyph } from './Icon.jsx';\nexport function Badge({children}){return <span className=\"ag-badge\"><Glyph name=\"x\"/>{children}</span>;}\n");
  write('components/core/Icon.jsx', "import React from 'react';\nexport const ICON_SIZE = 16;\nexport function Icon({name}){return <i data-name={name}/>;}\n");
  write('components/core/core.card.html', '<p>cards are not compiled</p>');
  write('components/utils/format.js', 'window.AG_FMT = {ok: true};\n');
  const code = componentsBundle(temp);
  assert.equal(componentsBundle(temp), code, 'output is repeatable');
  assert.ok(code.indexOf('// components/core/Icon.jsx') < code.indexOf('// components/core/Badge.jsx'), 'dependencies compile first');
  assert.ok(!code.includes('core.card.html'), 'cards are not compiled');
  assert.ok(!/^\s*(import|export)\b/m.test(code), 'no module syntax is left for the browser');
  const ds = load(code);
  assert.equal(ds.__errors.length, 0);
  assert.deepEqual(Object.keys(ds).filter(k => k !== '__errors').sort(), ['Badge', 'ICON_SIZE', 'Icon']);
  assert.equal(ds.Badge({children: 'New'}).children[0].type, ds.Icon, 'renamed imports resolve to the shared component');

  // One broken source is reported, and the rest still load.
  write('components/core/Broken.jsx', "import React from 'react';\nexport const Broken = missing.value;\n");
  const partial = load(componentsBundle(temp));
  assert.deepEqual([...partial.__errors].map(e => e.path), ['components/core/Broken.jsx']);
  assert.ok(partial.Badge && partial.Icon);
  fs.rmSync(path.join(temp, 'components/core/Broken.jsx'));

  const refused = (file, source, pattern) => { write(file, source); assert.throws(() => componentsBundle(temp), pattern); fs.rmSync(path.join(temp, file)); };
  refused('components/core/Dup.jsx', 'export const Icon = 1;\n', /Icon is exported by both/);
  refused('components/core/Def.jsx', 'export default 1;\n', /default and re-exports/);
  refused('components/core/Pkg.jsx', "import x from 'lodash';\nexport const Pkg = x;\n", /only relative imports/);
  refused('components/core/Gone.jsx', "import { Nope } from './Nope.jsx';\nexport const Gone = Nope;\n", /imports missing components\/core\/Nope\.jsx/);
  console.log('Passed component bundle: dependency order, renamed imports, error isolation, repeatable output and refused module forms.');
} finally {
  fs.rmSync(temp, {recursive: true, force: true});
}
