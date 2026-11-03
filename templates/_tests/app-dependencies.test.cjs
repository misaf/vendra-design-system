// Exercise real filesystem graphs, not just the current list of allowed imports.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {checkDependencies} = require('../_build/app-dependencies.cjs');
const repo = path.resolve(__dirname, '../..');
const ui = 'templates/app/organisms/Card/Card.jsx';
const service = 'templates/_shared/integrations/api.js';
const bridge = 'templates/app/ds.js';
const carousel = 'templates/_shared/collection-carousel.jsx';
const qr = 'templates/_shared/qr.js';
const component = 'components/organisms/Carousel/Carousel.jsx';
const cases = [];
function check(name, sources, expected) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vendra-app-dependencies-'));
  try {
    for (const [file, code] of Object.entries(sources)) {
      const target = path.join(root, file);
      fs.mkdirSync(path.dirname(target), {recursive: true});
      fs.writeFileSync(target, code);
    }
    const {violations} = checkDependencies(root);
    if (expected)
      assert.ok(
        violations.some(message => expected.test(message)),
        `${name}: ${violations}`
      );
    else assert.deepEqual(violations, [], name);
    cases.push(name);
  } finally {
    fs.rmSync(root, {recursive: true, force: true});
  }
}
const allowed = {
  [ui]: `import React from 'react'; import * as DS from '../../ds.js';
    import {CollectionCarousel} from '../../../_shared/collection-carousel.jsx';
    import {vfQrPath} from '../../../_shared/qr.js';
    import {Label} from '../../molecules/Label';`,
  [bridge]: `export {Carousel} from '../../components/organisms/Carousel/Carousel.jsx';`,
  [component]: 'export const Carousel = () => null;',
  [carousel]: `import React from 'react'; export {Carousel as CollectionCarousel} from '../../components/organisms/Carousel/Carousel.jsx';`,
  [qr]: `import qrcode from 'qrcode-generator'; export const vfQrPath = qrcode;`,
  'templates/app/molecules/Label/index.jsx': `export const Label = () => null;`,
  'templates/app/layouts/Panel/Panel.jsx': `import React from 'react'; export const Panel = ({children}) => children;`
};
check('UI helpers, bridge, lower layer and index resolution', allowed);
for (const [name, statement] of [
  ['static service import', `import '../../../_shared/integrations/api.js';`],
  ['named service re-export', `export {save} from '../../../_shared/integrations/api.js';`],
  ['star service re-export', `export * from '../../../_shared/integrations/api.js';`],
  [
    'nested dynamic service import',
    `async function load(){return import('../../../_shared/integrations/api.js')}`
  ]
])
  check(
    name,
    {[ui]: statement, [service]: 'export const save = () => {};'},
    /forbidden UI dependency/
  );
check(
  'business import through allowed helper',
  {...allowed, [qr]: `import './integrations/api.js';`, [service]: ''},
  /forbidden UI dependency/
);
check(
  'business re-export through bridge',
  {...allowed, [bridge]: `export * from '../_shared/integrations/api.js';`, [service]: ''},
  /forbidden UI dependency/
);
check(
  'package cannot import storefront services',
  {
    ...allowed,
    [component]: `import '../../../templates/_shared/integrations/api.js';`,
    [service]: ''
  },
  /outside the migrated design system/
);
check(
  'layout cannot own content organisms',
  {...allowed, 'templates/app/layouts/Panel/Panel.jsx': `import '../../organisms/Card/Card.jsx';`},
  /forbidden UI dependency/
);
check(
  'molecule cannot import organism',
  {
    ...allowed,
    'templates/app/molecules/Label/index.jsx': `import '../../organisms/Card/Card.jsx';`
  },
  /forbidden UI dependency/
);
check(
  'UI cannot import page coordinator',
  {[ui]: `import '../../Shell.jsx';`, 'templates/app/Shell.jsx': ''},
  /forbidden UI dependency/
);
check(
  'UI cannot use undeclared external package',
  {[ui]: `import 'business-sdk';`},
  /forbidden UI dependency/
);
check(
  'UI cannot bypass policy with absolute URL',
  {[ui]: `import '/templates/_shared/integrations/api.js';`},
  /forbidden UI dependency/
);
check(
  'computed UI imports fail closed',
  {[ui]: `const load = name => import(name);`},
  /computed import/
);
for (const statement of [
  `import './missing.js';`,
  `export * from './missing.js';`,
  `export {x} from './missing.js';`,
  `const load = () => import('./missing.js');`
])
  check(
    'missing target: ' + statement,
    {'templates/_shared/a.js': statement},
    /missing relative dependency/
  );
check(
  'directory without module entry is missing',
  {'templates/_shared/a.js': `import './folder';`, 'templates/_shared/folder/other.js': ''},
  /missing relative dependency/
);
check('extensionless module resolution', {
  'templates/_shared/a.js': `import './b';`,
  'templates/_shared/b.js': ''
});
check('diamond is acyclic', {
  'templates/_shared/a.js': `import './b.js'; import './c.js';`,
  'templates/_shared/b.js': `export * from './d.js';`,
  'templates/_shared/c.js': `export * from './d.js';`,
  'templates/_shared/d.js': ''
});
check(
  'cycle includes re-export and nested dynamic import',
  {
    'templates/_shared/a.js': `export * from './b.js';`,
    'templates/_shared/b.js': `const load = () => import('./c.js');`,
    'templates/_shared/c.js': `import './a.js';`
  },
  /Import cycle: .*a.js -> .*b.js -> .*c.js -> .*a.js/
);
check('self-cycle', {'templates/_shared/a.js': `import './a.js';`}, /Import cycle:/);
check(
  'referenced generated data is scanned for cycles',
  {
    'templates/_shared/a.js': `import '../_runtime/data.js';`,
    'templates/_runtime/data.js': `import '../_shared/a.js';`
  },
  /Import cycle:/
);
check(
  'referenced module outside initial roots is checked for missing imports',
  {
    'templates/_shared/a.js': `import '../other/data.js';`,
    'templates/other/data.js': `import './missing.js';`
  },
  /missing relative dependency/
);
check(
  'bare specifier cannot impersonate the relative bridge',
  {[ui]: `import 'templates/app/ds.js';`},
  /forbidden UI dependency/
);
check(
  'UI cycle between otherwise allowed organisms',
  {
    [ui]: `import '../Other/Other.jsx';`,
    'templates/app/organisms/Other/Other.jsx': `export * from '../Card/Card.jsx';`
  },
  /Import cycle:/
);
check(
  'molecule cannot import layout',
  {
    'templates/app/molecules/Label/Label.jsx': `import '../../layouts/Panel/Panel.jsx';`,
    'templates/app/layouts/Panel/Panel.jsx': ''
  },
  /forbidden UI dependency/
);
check('literal dynamic imports contribute valid graph edges', {
  'templates/_shared/a.js': `const load = () => import('./b.js');`,
  'templates/_shared/b.js': ''
});
check('parse errors fail', {'templates/_shared/a.js': 'const = ;'}, /parse error/);

const result = checkDependencies(repo);
assert.ok(result.files.length > 0, 'runtime sources were discovered');
assert.deepEqual(result.violations, [], 'Runtime import graph and app UI boundary violations');
console.log(
  `Passed: ${result.files.length} runtime modules and ${cases.length} dependency guard scenarios.`
);
