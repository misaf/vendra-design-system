// Exercise real filesystem graphs, not just the current list of allowed imports.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {checkDependencies} from '../tools/app-dependencies.mjs';
const repo = path.resolve(import.meta.dirname, '..');
const ui = 'src/storefront/shell/components/Card/Card.jsx';
const service = 'src/platform/browser/integrations/api.js';
const inventory = 'src/design-system/index.js';
const carousel = 'src/storefront/shell/ui/collection-carousel.jsx';
const qr = 'src/storefront/shell/ui/qr.js';
const component = 'src/design-system/components/Carousel/Carousel.jsx';
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
  [ui]: `import React from 'react'; import {Carousel} from '@storefront/src/design-system/components/Carousel/Carousel.jsx';
    import {CollectionCarousel} from '@storefront/src/storefront/shell/ui/collection-carousel.jsx';
    import {vfQrPath} from '@storefront/src/storefront/shell/ui/qr.js';
    import {Label} from '../Label';`,
  [inventory]: `export {Carousel} from './components/Carousel/Carousel.jsx';`,
  [component]: 'export const Carousel = () => null;',
  [carousel]: `import React from 'react'; export {Carousel as CollectionCarousel} from '@storefront/src/design-system/components/Carousel/Carousel.jsx';`,
  [qr]: `import qrcode from 'qrcode-generator'; export const vfQrPath = qrcode;`,
  'src/storefront/shell/components/Label/index.jsx': `export const Label = () => null;`,
  'src/storefront/shell/components/Panel/Panel.jsx': `import React from 'react'; export const Panel = ({children}) => children;`
};
check('shared UI, direct imports and index resolution', allowed);
for (const [name, statement] of [
  ['static service import', `import '@storefront/src/platform/browser/integrations/api.js';`],
  [
    'named service re-export',
    `export {save} from '@storefront/src/platform/browser/integrations/api.js';`
  ],
  [
    'star service re-export',
    `export * from '@storefront/src/platform/browser/integrations/api.js';`
  ],
  [
    'nested dynamic service import',
    `async function load(){return import('@storefront/src/platform/browser/integrations/api.js')}`
  ]
])
  check(
    name,
    {[ui]: statement, [service]: 'export const save = () => {};'},
    /forbidden UI dependency/
  );
check(
  'business import through allowed helper',
  {
    ...allowed,
    [qr]: `import '@storefront/src/platform/browser/integrations/api.js';`,
    [service]: ''
  },
  /forbidden UI dependency/
);
check(
  'business re-export through UI inventory',
  {
    ...allowed,
    [inventory]: `export * from '@storefront/src/platform/browser/integrations/api.js';`,
    [service]: ''
  },
  /forbidden reusable UI dependency/
);
check(
  'design system cannot import storefront services',
  {
    ...allowed,
    [component]: `import '@storefront/src/platform/browser/integrations/api.js';`,
    [service]: ''
  },
  /forbidden reusable UI dependency/
);
const routeComponent = 'src/storefront/example/components/Receipt/Receipt.jsx';
check('route components can compose shared storefront UI', {
  [routeComponent]: "export {Label} from '@storefront/src/storefront/shell/components/Label';",
  'src/storefront/shell/components/Label/index.jsx': 'export const Label = () => null;'
});
for (const source of [ui, 'src/storefront/shell/components/Shell.jsx']) {
  check(
    'shared storefront UI cannot import route internals',
    {
      [source]: `export * from '@storefront/src/app/page.tsx';`,
      'src/app/page.tsx': ''
    },
    /shared storefront UI imports a route module/
  );
}
check(
  'ownership checks use the normalized alias target',
  {
    [component]: "import '@storefront/src/design-system/../storefront/catalog/commerce.js';",
    'src/storefront/catalog/commerce.js': ''
  },
  /forbidden reusable UI dependency src\/storefront\/catalog\/commerce\.js/
);
check(
  'reusable UI declarations cannot import commerce types',
  {
    'src/design-system/components/Carousel/Carousel.d.ts':
      "import type {Stock} from '@storefront/src/storefront/catalog/commerce.js'; export type Props = {stock: Stock};",
    'src/storefront/catalog/commerce.d.ts': "export type Stock = 'in' | 'out';"
  },
  /forbidden reusable UI dependency src\/storefront\/catalog\/commerce\.d\.ts/
);
check(
  'reusable UI cannot import storefront UI',
  {
    [component]: `import '@storefront/${ui}';`,
    [ui]: ''
  },
  /forbidden reusable UI dependency/
);
const icon = 'src/design-system/components/Icon/Icon.jsx';
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
    'src/storefront/example/components/Receipt.jsx': `import '@storefront/src/platform/browser/integrations/api.js';`
  },
  /forbidden UI dependency/
);
check(
  'UI cannot import page coordinator',
  {[ui]: `import '../Shell.jsx';`, 'src/storefront/shell/components/Shell.jsx': ''},
  /forbidden UI dependency/
);
check(
  'UI cannot use undeclared external package',
  {[ui]: `import 'business-sdk';`},
  /forbidden UI dependency/
);
check(
  'UI cannot bypass policy with absolute URL',
  {[ui]: `import '/src/platform/browser/integrations/api.js';`},
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
    {'src/storefront/catalog/a.js': statement},
    /missing relative dependency/
  );
check(
  'directory without module entry is missing',
  {
    'src/storefront/catalog/a.js': `import './folder';`,
    'src/storefront/catalog/folder/other.js': ''
  },
  /missing relative dependency/
);
check('extensionless module resolution', {
  'src/storefront/catalog/a.js': `import './b';`,
  'src/storefront/catalog/b.js': ''
});
check('diamond is acyclic', {
  'src/storefront/catalog/a.js': `import './b.js'; import './c.js';`,
  'src/storefront/catalog/b.js': `export * from './d.js';`,
  'src/storefront/catalog/c.js': `export * from './d.js';`,
  'src/storefront/catalog/d.js': ''
});
check(
  'cycle includes re-export and nested dynamic import',
  {
    'src/storefront/catalog/a.js': `export * from './b.js';`,
    'src/storefront/catalog/b.js': `const load = () => import('./c.js');`,
    'src/storefront/catalog/c.js': `import './a.js';`
  },
  /Import cycle: .*a.js -> .*b.js -> .*c.js -> .*a.js/
);
check('self-cycle', {'src/storefront/catalog/a.js': `import './a.js';`}, /Import cycle:/);
check(
  'referenced generated data is scanned for cycles',
  {
    'src/storefront/catalog/a.js': `import '@storefront/.generated/data.js';`,
    '.generated/data.js': `import '../src/storefront/catalog/a.js';`
  },
  /Import cycle:/
);
check(
  'referenced module outside initial roots is checked for missing imports',
  {
    'src/storefront/catalog/a.js': `import '@storefront/other/data.js';`,
    'other/data.js': `import './missing.js';`
  },
  /missing relative dependency/
);
check(
  'bare specifier cannot impersonate the relative bridge',
  {[ui]: `import 'src/storefront/shell/components/ds.js';`},
  /forbidden UI dependency/
);
check(
  'UI cycle between otherwise allowed storefront components',
  {
    [ui]: `import '../Other/Other.jsx';`,
    'src/storefront/shell/components/Other/Other.jsx': `export * from '../Card/Card.jsx';`
  },
  /Import cycle:/
);
check('literal dynamic imports contribute valid graph edges', {
  'src/storefront/catalog/a.js': `const load = () => import('./b.js');`,
  'src/storefront/catalog/b.js': ''
});
const domain = 'src/storefront/catalog/catalog.js';
const environment = 'src/platform/browser/environment.js';
check('shared folders follow their allowed directions', {
  [environment]: 'export const vfNow = () => 0;',
  [domain]: `import '@storefront/src/platform/browser/environment.js'; import '@storefront/src/storefront/shell/shell.js';
    import './commerce.js'; import '@storefront/.generated/tenant-slugs.js';`,
  'src/storefront/shell/shell.js': '',
  'src/storefront/catalog/commerce.js': '',
  '.generated/tenant-slugs.js': '',
  [service]: `import React from 'react'; import '@storefront/src/storefront/catalog/catalog.js';`,
  [qr]: `import qrcode from 'qrcode-generator'; import '@storefront/src/storefront/catalog/catalog.js';`
});
for (const [name, sources, expected] of [
  [
    'domain cannot import services',
    {[domain]: `import '@storefront/src/platform/browser/integrations/api.js';`, [service]: ''},
    /forbidden domain dependency/
  ],
  [
    'domain cannot import packages',
    {[domain]: `import React from 'react';`},
    /forbidden domain dependency react/
  ],
  [
    'domain cannot import app UI',
    {[domain]: `import '@storefront/src/design-system/index.js';`, [inventory]: ''},
    /forbidden domain dependency/
  ],
  [
    'domain cannot import package components',
    {
      [domain]: `import '@storefront/src/design-system/components/Carousel/Carousel.jsx';`,
      [component]: ''
    },
    /forbidden domain dependency/
  ],
  [
    'platform cannot import domain',
    {[environment]: `import '@storefront/src/storefront/catalog/catalog.js';`, [domain]: ''},
    /forbidden platform dependency/
  ],
  [
    'services cannot import UI helpers',
    {[service]: `import '@storefront/src/storefront/shell/ui/qr.js';`, [qr]: ''},
    /forbidden services dependency/
  ],
  [
    'UI helpers cannot import platform state',
    {[carousel]: `import '@storefront/src/platform/browser/environment.js';`, [environment]: ''},
    /forbidden UI dependency/
  ],
  [
    'app UI cannot import domain modules directly',
    {[ui]: `import '@storefront/src/storefront/catalog/catalog.js';`, [domain]: ''},
    /forbidden UI dependency/
  ],
  [
    'loose shared module must be placed in a folder',
    {'src/storefront/helper.js': ''},
    /storefront module outside/
  ]
])
  check(name, sources, expected);
check('parse errors fail', {'src/storefront/catalog/a.js': 'const = ;'}, /parse error/);

check('UI can import React and its local modules', {
  'src/design-system/components/index.tsx':
    "import type {ReactNode} from 'react'; export * from './tokens';",
  'src/design-system/components/tokens.ts': 'export const size = 12;'
});
check(
  'framework types stay in the app',
  {'src/design-system/components/types.ts': "export type M = import('next').Metadata;"},
  /forbidden reusable UI dependency next/
);
check('the Laravel adapter can use feature-owned resource decoders', {
  'src/platform/server/laravel/index.mjs':
    "export {decode} from '../../../storefront/orders/laravel/order-line.js';",
  'src/storefront/orders/laravel/order-line.js': 'export const decode = value => value;'
});
check(
  'the Laravel adapter cannot reach into storefront routing',
  {
    'src/platform/server/laravel/index.ts':
      "export * from '@storefront/src/app/_routing/route-page';",
    'src/app/_routing/route-page.ts': ''
  },
  /Laravel adapter imports outside src\/platform\/server\/laravel/
);
check('route pages import shared UI directly', {
  'src/app/page.tsx': "export * from '../design-system/components/Button';",
  'src/design-system/components/Button.tsx': ''
});

// Shared dependencies are imported: no module reads or sets window.VF_* / window.AG_* (or the cards'
// window.VendraDesignSystem), only src/design-system/gallery/card-runtime.js, the cards' compatibility layer.
for (const [name, file, code] of [
  ['page reads the API global', 'src/storefront/catalog/home/useHome.js', 'window.VF_API.live;'],
  ['service sets a global', service, 'window.VF_TRACK = {};'],
  ['component reads a helper global', component, 'export const x = window.AG_FORMAT;'],
  [
    'computed global name',
    'src/storefront/shell/components/main.jsx',
    "globalThis['VF_TENANT'] = 'x';"
  ],
  ['communications global', 'src/communications/a.js', 'self.VF_NOTIFY = {};'],
  ['cards namespace', 'src/storefront/shell/components/theme.js', 'window.VendraDesignSystem;']
])
  check(name, {[file]: code}, /reads or sets the global/);
check('card compatibility layer and other window names are allowed', {
  'src/storefront/shell/components/main.jsx': `import '@storefront/src/design-system/gallery/card-runtime.js';
    window.__vfRuntime = {}; window.L; const VF_API = 1;`,
  'src/design-system/gallery/card-runtime.js':
    'window.VendraDesignSystem = {}; window.AG_DATES = {};'
});

const result = checkDependencies(repo);
assert.ok(result.files.length > 0, 'runtime sources were discovered');
assert.deepEqual(result.violations, [], 'Runtime import graph and app UI boundary violations');
console.log(
  `Passed: ${result.files.length} runtime modules and ${cases.length} dependency guard scenarios.`
);
