// Exercise real filesystem graphs, not just the current list of allowed imports.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {checkDependencies} from '../tools/app-dependencies.mjs';
const repo = path.resolve(import.meta.dirname, '..');
const ui = 'components/storefront/Card/Card.jsx';
const service = 'shared/services/integrations/api.js';
const inventory = 'ui/index.js';
const carousel = 'shared/ui/collection-carousel.jsx';
const qr = 'shared/ui/qr.js';
const component = 'ui/components/Carousel/Carousel.jsx';
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
  [ui]: `import React from 'react'; import {Carousel} from '../../../ui/components/Carousel/Carousel.jsx';
    import {CollectionCarousel} from '../../../shared/ui/collection-carousel.jsx';
    import {vfQrPath} from '../../../shared/ui/qr.js';
    import {Label} from '../Label';`,
  [inventory]: `export {Carousel} from './components/Carousel/Carousel.jsx';`,
  [component]: 'export const Carousel = () => null;',
  [carousel]: `import React from 'react'; export {Carousel as CollectionCarousel} from '../../ui/components/Carousel/Carousel.jsx';`,
  [qr]: `import qrcode from 'qrcode-generator'; export const vfQrPath = qrcode;`,
  'components/storefront/Label/index.jsx': `export const Label = () => null;`,
  'components/storefront/Panel/Panel.jsx': `import React from 'react'; export const Panel = ({children}) => children;`
};
check('shared UI, direct imports and index resolution', allowed);
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
  'business re-export through UI inventory',
  {
    ...allowed,
    [inventory]: `export * from '../shared/services/integrations/api.js';`,
    [service]: ''
  },
  /forbidden reusable UI dependency/
);
check(
  'design system cannot import storefront services',
  {
    ...allowed,
    [component]: `import '../../../shared/services/integrations/api.js';`,
    [service]: ''
  },
  /forbidden reusable UI dependency/
);
const routeComponent = 'app/[locale]/example/_components/Receipt/Receipt.jsx';
check('route components can compose shared storefront UI', {
  [routeComponent]: "export {Label} from '@storefront/components/storefront/Label';",
  'components/storefront/Label/index.jsx': 'export const Label = () => null;'
});
for (const source of [ui, 'components/storefront/Shell.jsx']) {
  check(
    'shared storefront UI cannot import route internals',
    {
      [source]: `export * from '@storefront/${routeComponent}';`,
      [routeComponent]: ''
    },
    /shared storefront UI imports a route module/
  );
}
check(
  'ownership checks use the normalized alias target',
  {
    [component]: "import '@storefront/ui/../domain/commerce.js';",
    'domain/commerce.js': ''
  },
  /forbidden reusable UI dependency domain\/commerce\.js/
);
check(
  'reusable UI declarations cannot import commerce types',
  {
    'ui/components/Carousel/Carousel.d.ts':
      "import type {Stock} from '../../../domain/commerce.js'; export type Props = {stock: Stock};",
    'domain/commerce.d.ts': "export type Stock = 'in' | 'out';"
  },
  /forbidden reusable UI dependency domain\/commerce\.d\.ts/
);
check(
  'reusable UI cannot import storefront UI',
  {
    [component]: `import '@storefront/${ui}';`,
    [ui]: ''
  },
  /forbidden reusable UI dependency/
);
const icon = 'ui/components/Icon/Icon.jsx';
check('reusable components can compose each other', {
  [component]: "import '../Icon/Icon.jsx';",
  [icon]: ''
});
check(
  'cycles between reusable components are rejected',
  {
    [component]: "import '../Icon/Icon.jsx';",
    [icon]: "export * from '../Carousel/Carousel.jsx';"
  },
  /Import cycle:/
);
check(
  'route components cannot import integration services',
  {
    [service]: '',
    'app/[locale]/example/_components/Receipt.jsx': `import '../../../../shared/services/integrations/api.js';`
  },
  /forbidden UI dependency/
);
check(
  'UI cannot import page coordinator',
  {[ui]: `import '../Shell.jsx';`, 'components/storefront/Shell.jsx': ''},
  /forbidden UI dependency/
);
check(
  'UI cannot use undeclared external package',
  {[ui]: `import 'business-sdk';`},
  /forbidden UI dependency/
);
check(
  'UI cannot bypass policy with absolute URL',
  {[ui]: `import '/shared/services/integrations/api.js';`},
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
  check('missing target: ' + statement, {'domain/a.js': statement}, /missing relative dependency/);
check(
  'directory without module entry is missing',
  {
    'domain/a.js': `import './folder';`,
    'domain/folder/other.js': ''
  },
  /missing relative dependency/
);
check('extensionless module resolution', {
  'domain/a.js': `import './b';`,
  'domain/b.js': ''
});
check('diamond is acyclic', {
  'domain/a.js': `import './b.js'; import './c.js';`,
  'domain/b.js': `export * from './d.js';`,
  'domain/c.js': `export * from './d.js';`,
  'domain/d.js': ''
});
check(
  'cycle includes re-export and nested dynamic import',
  {
    'domain/a.js': `export * from './b.js';`,
    'domain/b.js': `const load = () => import('./c.js');`,
    'domain/c.js': `import './a.js';`
  },
  /Import cycle: .*a.js -> .*b.js -> .*c.js -> .*a.js/
);
check('self-cycle', {'domain/a.js': `import './a.js';`}, /Import cycle:/);
check(
  'referenced generated data is scanned for cycles',
  {
    'domain/a.js': `import '../_runtime/data.js';`,
    '_runtime/data.js': `import '../domain/a.js';`
  },
  /Import cycle:/
);
check(
  'referenced module outside initial roots is checked for missing imports',
  {
    'domain/a.js': `import '../other/data.js';`,
    'other/data.js': `import './missing.js';`
  },
  /missing relative dependency/
);
check(
  'bare specifier cannot impersonate the relative bridge',
  {[ui]: `import 'components/storefront/ds.js';`},
  /forbidden UI dependency/
);
check(
  'UI cycle between otherwise allowed storefront components',
  {
    [ui]: `import '../Other/Other.jsx';`,
    'components/storefront/Other/Other.jsx': `export * from '../Card/Card.jsx';`
  },
  /Import cycle:/
);
check('literal dynamic imports contribute valid graph edges', {
  'domain/a.js': `const load = () => import('./b.js');`,
  'domain/b.js': ''
});
const domain = 'domain/catalog.js';
const environment = 'shared/platform/environment.js';
check('shared folders follow their allowed directions', {
  [environment]: 'export const vfNow = () => 0;',
  [domain]: `import '../shared/platform/environment.js'; import '../i18n/shell.js';
    import './commerce.js'; import '../_runtime/tenant-slugs.js';`,
  'i18n/shell.js': '',
  'domain/commerce.js': '',
  '_runtime/tenant-slugs.js': '',
  [service]: `import React from 'react'; import '../../../domain/catalog.js';`,
  [qr]: `import qrcode from 'qrcode-generator'; import '../../domain/catalog.js';`
});
for (const [name, sources, expected] of [
  [
    'domain cannot import services',
    {[domain]: `import '../shared/services/integrations/api.js';`, [service]: ''},
    /forbidden domain dependency/
  ],
  [
    'domain cannot import packages',
    {[domain]: `import React from 'react';`},
    /forbidden domain dependency react/
  ],
  [
    'domain cannot import app UI',
    {[domain]: `import '../ui/index.js';`, [inventory]: ''},
    /forbidden domain dependency/
  ],
  [
    'domain cannot import package components',
    {
      [domain]: `import '../ui/components/Carousel/Carousel.jsx';`,
      [component]: ''
    },
    /forbidden domain dependency/
  ],
  [
    'platform cannot import domain',
    {[environment]: `import '../../domain/catalog.js';`, [domain]: ''},
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
    {[ui]: `import '../../../domain/catalog.js';`, [domain]: ''},
    /forbidden UI dependency/
  ],
  [
    'loose shared module must be placed in a folder',
    {'shared/helper.js': ''},
    /shared module outside/
  ],
  ['unknown shared folder fails', {'shared/misc/helper.js': ''}, /shared module outside/]
])
  check(name, sources, expected);
check('parse errors fail', {'domain/a.js': 'const = ;'}, /parse error/);

check('UI can import React and its local modules', {
  'ui/components/index.tsx': "import type {ReactNode} from 'react'; export * from './tokens';",
  'ui/components/tokens.ts': 'export const size = 12;'
});
check(
  'framework types stay in the app',
  {'ui/components/types.ts': "export type M = import('next').Metadata;"},
  /forbidden reusable UI dependency next/
);
check(
  'the Laravel adapter cannot reach into storefront routing',
  {
    'server/vendra/index.ts': "export * from '@storefront/server/route-page';",
    'server/route-page.ts': ''
  },
  /Laravel adapter imports outside server\/vendra/
);
check('route pages import shared UI directly', {
  'app/page.tsx': "export * from '../ui/components/Button';",
  'ui/components/Button.tsx': ''
});

// Shared dependencies are imported: no module reads or sets window.VF_* / window.AG_* (or the cards'
// window.VendraDesignSystem), only guidelines/card-runtime.js, the cards' compatibility layer.
for (const [name, file, code] of [
  ['page reads the API global', 'app/[locale]/(storefront)/useHome.js', 'window.VF_API.live;'],
  ['service sets a global', service, 'window.VF_TRACK = {};'],
  ['component reads a helper global', component, 'export const x = window.AG_FORMAT;'],
  ['computed global name', 'components/storefront/main.jsx', "globalThis['VF_TENANT'] = 'x';"],
  ['communications global', 'communications/a.js', 'self.VF_NOTIFY = {};'],
  ['cards namespace', 'components/storefront/theme.js', 'window.VendraDesignSystem;']
])
  check(name, {[file]: code}, /reads or sets the global/);
check('card compatibility layer and other window names are allowed', {
  'components/storefront/main.jsx': `import '../../guidelines/card-runtime.js';
    window.__vfRuntime = {}; window.L; const VF_API = 1;`,
  'guidelines/card-runtime.js': 'window.VendraDesignSystem = {}; window.AG_DATES = {};'
});

const result = checkDependencies(repo);
assert.ok(result.files.length > 0, 'runtime sources were discovered');
assert.deepEqual(result.violations, [], 'Runtime import graph and app UI boundary violations');
console.log(
  `Passed: ${result.files.length} runtime modules and ${cases.length} dependency guard scenarios.`
);
