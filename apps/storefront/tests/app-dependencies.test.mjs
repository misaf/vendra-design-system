// Exercise real filesystem graphs, not just the current list of allowed imports.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {checkDependencies} from '../../../tools/app-dependencies.mjs';
const repo = path.resolve(import.meta.dirname, '../../..');
const ui = 'apps/storefront/shell/organisms/Card/Card.jsx';
const service = 'apps/storefront/shared/services/integrations/api.js';
const bridge = 'apps/storefront/shell/ds.js';
const carousel = 'apps/storefront/shared/ui/collection-carousel.jsx';
const qr = 'apps/storefront/shared/ui/qr.js';
const component = 'apps/storefront/design-system/components/organisms/Carousel/Carousel.jsx';
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
    import {CollectionCarousel} from '../../../shared/ui/collection-carousel.jsx';
    import {vfQrPath} from '../../../shared/ui/qr.js';
    import {Label} from '../../molecules/Label';`,
  [bridge]: `export {Carousel} from '../design-system/components/organisms/Carousel/Carousel.jsx';`,
  [component]: 'export const Carousel = () => null;',
  [carousel]: `import React from 'react'; export {Carousel as CollectionCarousel} from '../../design-system/components/organisms/Carousel/Carousel.jsx';`,
  [qr]: `import qrcode from 'qrcode-generator'; export const vfQrPath = qrcode;`,
  'apps/storefront/shell/molecules/Label/index.jsx': `export const Label = () => null;`,
  'apps/storefront/shell/layouts/Panel/Panel.jsx': `import React from 'react'; export const Panel = ({children}) => children;`
};
check('UI helpers, bridge, lower layer and index resolution', allowed);
for (const [name, statement] of [
  ['static service import', `import '../../../shared/services/integrations/api.js';`],
  ['named service re-export', `export {save} from '../../../shared/services/integrations/api.js';`],
  ['star service re-export', `export * from '../../../shared/services/integrations/api.js';`],
  [
    'nested dynamic service import',
    `async function load(){return import('../../../shared/services/integrations/api.js')}`
  ]
])
  check(
    name,
    {[ui]: statement, [service]: 'export const save = () => {};'},
    /forbidden UI dependency/
  );
check(
  'business import through allowed helper',
  {...allowed, [qr]: `import '../services/integrations/api.js';`, [service]: ''},
  /forbidden UI dependency/
);
check(
  'business re-export through bridge',
  {...allowed, [bridge]: `export * from '../shared/services/integrations/api.js';`, [service]: ''},
  /forbidden UI dependency/
);
check(
  'design system cannot import storefront services',
  {
    ...allowed,
    [component]: `import '../../../../shared/services/integrations/api.js';`,
    [service]: ''
  },
  /outside the migrated design system/
);
check(
  'layout cannot own content organisms',
  {
    ...allowed,
    'apps/storefront/features/example/layouts/Panel/Panel.jsx': `import '../../../../shell/organisms/Card/Card.jsx';`
  },
  /forbidden UI dependency/
);
check(
  'molecule cannot import organism',
  {
    ...allowed,
    'apps/storefront/shell/molecules/Label/index.jsx': `import '../../organisms/Card/Card.jsx';`
  },
  /forbidden UI dependency/
);
check(
  'UI cannot import page coordinator',
  {[ui]: `import '../../Shell.jsx';`, 'apps/storefront/shell/Shell.jsx': ''},
  /forbidden UI dependency/
);
check(
  'UI cannot use undeclared external package',
  {[ui]: `import 'business-sdk';`},
  /forbidden UI dependency/
);
check(
  'UI cannot bypass policy with absolute URL',
  {[ui]: `import '/apps/storefront/shared/services/integrations/api.js';`},
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
    {'apps/storefront/shared/domain/a.js': statement},
    /missing relative dependency/
  );
check(
  'directory without module entry is missing',
  {
    'apps/storefront/shared/domain/a.js': `import './folder';`,
    'apps/storefront/shared/domain/folder/other.js': ''
  },
  /missing relative dependency/
);
check('extensionless module resolution', {
  'apps/storefront/shared/domain/a.js': `import './b';`,
  'apps/storefront/shared/domain/b.js': ''
});
check('diamond is acyclic', {
  'apps/storefront/shared/domain/a.js': `import './b.js'; import './c.js';`,
  'apps/storefront/shared/domain/b.js': `export * from './d.js';`,
  'apps/storefront/shared/domain/c.js': `export * from './d.js';`,
  'apps/storefront/shared/domain/d.js': ''
});
check(
  'cycle includes re-export and nested dynamic import',
  {
    'apps/storefront/shared/domain/a.js': `export * from './b.js';`,
    'apps/storefront/shared/domain/b.js': `const load = () => import('./c.js');`,
    'apps/storefront/shared/domain/c.js': `import './a.js';`
  },
  /Import cycle: .*a.js -> .*b.js -> .*c.js -> .*a.js/
);
check('self-cycle', {'apps/storefront/shared/domain/a.js': `import './a.js';`}, /Import cycle:/);
check(
  'referenced generated data is scanned for cycles',
  {
    'apps/storefront/shared/domain/a.js': `import '../../_runtime/data.js';`,
    'apps/storefront/_runtime/data.js': `import '../shared/domain/a.js';`
  },
  /Import cycle:/
);
check(
  'referenced module outside initial roots is checked for missing imports',
  {
    'apps/storefront/shared/domain/a.js': `import '../../other/data.js';`,
    'apps/storefront/other/data.js': `import './missing.js';`
  },
  /missing relative dependency/
);
check(
  'bare specifier cannot impersonate the relative bridge',
  {[ui]: `import 'apps/storefront/shell/ds.js';`},
  /forbidden UI dependency/
);
check(
  'UI cycle between otherwise allowed organisms',
  {
    [ui]: `import '../Other/Other.jsx';`,
    'apps/storefront/shell/organisms/Other/Other.jsx': `export * from '../Card/Card.jsx';`
  },
  /Import cycle:/
);
check(
  'molecule cannot import layout',
  {
    'apps/storefront/shell/molecules/Label/Label.jsx': `import '../../layouts/Panel/Panel.jsx';`,
    'apps/storefront/shell/layouts/Panel/Panel.jsx': ''
  },
  /forbidden UI dependency/
);
check('literal dynamic imports contribute valid graph edges', {
  'apps/storefront/shared/domain/a.js': `const load = () => import('./b.js');`,
  'apps/storefront/shared/domain/b.js': ''
});
const domain = 'apps/storefront/shared/domain/catalog.js';
const environment = 'apps/storefront/shared/platform/environment.js';
check('shared folders follow their allowed directions', {
  [environment]: 'export const vfNow = () => 0;',
  [domain]: `import '../platform/environment.js'; import '../../i18n/shell.js';
    import '../../design-system/components/utils/commerce.js'; import '../../_runtime/tenant-slugs.js';`,
  'apps/storefront/i18n/shell.js': '',
  'apps/storefront/design-system/components/utils/commerce.js': '',
  'apps/storefront/_runtime/tenant-slugs.js': '',
  [service]: `import React from 'react'; import '../../domain/catalog.js';`,
  [qr]: `import qrcode from 'qrcode-generator'; import '../domain/catalog.js';`
});
for (const [name, sources, expected] of [
  [
    'domain cannot import services',
    {[domain]: `import '../services/integrations/api.js';`, [service]: ''},
    /forbidden domain dependency/
  ],
  [
    'domain cannot import packages',
    {[domain]: `import React from 'react';`},
    /forbidden domain dependency react/
  ],
  [
    'domain cannot import app UI',
    {[domain]: `import '../../shell/ds.js';`, [bridge]: ''},
    /forbidden domain dependency/
  ],
  [
    'domain cannot import package components',
    {
      [domain]: `import '../../design-system/components/organisms/Carousel/Carousel.jsx';`,
      [component]: ''
    },
    /forbidden domain dependency/
  ],
  [
    'platform cannot import domain',
    {[environment]: `import '../domain/catalog.js';`, [domain]: ''},
    /forbidden platform dependency/
  ],
  [
    'services cannot import UI helpers',
    {[service]: `import '../../ui/qr.js';`, [qr]: ''},
    /forbidden services dependency/
  ],
  [
    'UI helpers cannot import platform state',
    {[carousel]: `import '../platform/environment.js';`, [environment]: ''},
    /forbidden UI dependency/
  ],
  [
    'app UI cannot import domain modules directly',
    {[ui]: `import '../../../shared/domain/catalog.js';`, [domain]: ''},
    /forbidden UI dependency/
  ],
  [
    'loose shared module must be placed in a folder',
    {'apps/storefront/shared/helper.js': ''},
    /shared module outside/
  ],
  [
    'unknown shared folder fails',
    {'apps/storefront/shared/misc/helper.js': ''},
    /shared module outside/
  ]
])
  check(name, sources, expected);
check('parse errors fail', {'apps/storefront/shared/domain/a.js': 'const = ;'}, /parse error/);

const uiManifest = {
  'packages/ui/package.json': JSON.stringify({peerDependencies: {react: '^19.0.0'}})
};
check('UI can import its React peer and local modules', {
  ...uiManifest,
  'packages/ui/src/index.tsx': "import type {ReactNode} from 'react'; export * from './tokens';",
  'packages/ui/src/tokens.ts': 'export const size = 12;'
});
check(
  'framework types stay in the app',
  {...uiManifest, 'packages/ui/src/index.ts': "export type M = import('next').Metadata;"},
  /forbidden package dependency next/
);
check(
  'the API package cannot reach into the storefront',
  {'packages/vendra-api/src/index.ts': "export * from '@storefront/server/route-page';"},
  /use workspace package exports/
);
check(
  'storefront code cannot bypass package exports',
  {'apps/storefront/app/page.tsx': "export * from '../../../packages/ui/src/index';"},
  /use workspace package exports/
);

// Shared dependencies are imported: no module reads or sets window.VF_* / window.AG_* (or the cards'
// window.VendraDesignSystem), only guidelines/card-runtime.js, the cards' compatibility layer.
for (const [name, file, code] of [
  ['page reads the API global', 'apps/storefront/features/home/useHome.js', 'window.VF_API.live;'],
  ['service sets a global', service, 'window.VF_TRACK = {};'],
  ['component reads a helper global', component, 'export const x = window.AG_FORMAT;'],
  ['computed global name', 'apps/storefront/shell/main.jsx', "globalThis['VF_TENANT'] = 'x';"],
  ['communications global', 'apps/storefront/communications/a.js', 'self.VF_NOTIFY = {};'],
  ['cards namespace', 'apps/storefront/shell/theme.js', 'window.VendraDesignSystem;']
])
  check(name, {[file]: code}, /reads or sets the global/);
check('card compatibility layer and other window names are allowed', {
  'apps/storefront/shell/main.jsx': `import '../../../guidelines/card-runtime.js';
    window.__vfRuntime = {}; window.L; const VF_API = 1;`,
  'guidelines/card-runtime.js': 'window.VendraDesignSystem = {}; window.AG_DATES = {};'
});

const result = checkDependencies(repo);
assert.ok(result.files.length > 0, 'runtime sources were discovered');
assert.deepEqual(result.violations, [], 'Runtime import graph and app UI boundary violations');
console.log(
  `Passed: ${result.files.length} runtime modules and ${cases.length} dependency guard scenarios.`
);
