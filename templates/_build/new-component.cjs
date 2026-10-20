// npm run new:component -- <Name> --level atoms|molecules|organisms [--wording] [--no-css]
// Starts components/<Name>/ with every file the repo expects (CLAUDE.md rule 3), so the guards in
// npm test pass from the first build: the component, its declarations, CSS (added to
// components/index.css), README with its Usage section, fixture and spec, and with --wording its
// built-in English and Persian wording (messages.js, typed in utils/messages.d.ts). It also
// re-exports the component for the storefront (app/ds.js). What it can't know is left as TODO.
const fs = require('node:fs');
const path = require('node:path');
const {levels} = require('./atomic.cjs');

const repo = path.resolve(__dirname, '../..');
const args = process.argv.slice(2);
const name = args.find(arg => !arg.startsWith('--'));
const wording = args.includes('--wording');
const css = !args.includes('--no-css');
const level = args[args.indexOf('--level') + 1];

const fail = message => {
  console.error(message);
  process.exit(1);
};
if (!name || !/^[A-Z][A-Za-z0-9]+$/.test(name))
  fail(
    'Usage: npm run new:component -- <Name> --level atoms|molecules|organisms [--wording] [--no-css]'
  );
if (!args.includes('--level') || !levels.includes(level))
  fail('--level is required: atoms, molecules or organisms. See ATOMIC-DESIGN.md.');
const existing = fs.readdirSync(path.join(repo, 'components'), {recursive: true});
if (existing.some(file => path.basename(file) === name + '.jsx'))
  fail('A component named ' + name + ' already exists');
const componentPath = `components/${level}/${name}`;
const folder = path.join(repo, componentPath);

const className = 'ag-' + name.replace(/(?<!^)([A-Z])/g, '-$1').toLowerCase();
const files = {};

files[name + '.jsx'] = `import React from 'react';
import {cx} from '../../utils/cx.js';
${
  wording
    ? `import {usePageLocale} from '../../utils/locale.js';
import {useMessages} from '../../utils/messages.js';
import {messages} from './messages.js';
`
    : ''
}
// TODO: what ${name} is for, and what a reader of this file needs to know that the code doesn't say.
export function ${name}({${wording ? 'label, ' : ''}children, className, style}) {
${
  wording
    ? `  // Its wording follows the page's lang (pages can mix languages), then VendraProvider's.
  const {locale, ref} = usePageLocale();
  const text = useMessages('${name}', messages, {label}, locale);
  return (
    <div ref={ref} className={cx('${className}', className)} style={style} aria-label={text.label}>
      {children}
    </div>
  );`
    : `  return (
    <div className={cx('${className}', className)} style={style}>
      {children}
    </div>
  );`
}
}
`;

files[name + '.d.ts'] = `export interface ${name}Props {
${wording ? `  /** Its accessible name. Default: the built-in wording in the page's language */\n  label?: string;\n` : ''}  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
/** TODO: one line on what ${name} is. */
export declare function ${name}(props: ${name}Props): JSX.Element;
`;

if (css)
  files[name + '.css'] =
    `/* ${name}: TODO what its parts look like. Colours from tokens, logical sides (start/end). */
.${className} {
  display: flex;
  gap: var(--space-2);
}
`;

if (wording) {
  files['messages.js'] =
    `// ${name}'s built-in wording (accessible names and small labels), read with useMessages.
export const messages = {
  en: {label: 'TODO'},
  fa: {label: 'TODO'}
};
`;
  files['messages.d.ts'] = `import type {ComponentMessages} from '../../utils/messages.js';
/** ${name}'s built-in wording in English and Persian. */
export declare const messages: {en: ComponentMessages['${name}']; fa: ComponentMessages['${name}']};
`;
}

files['README.md'] = `# ${name}

TODO: what it is and where it appears, in a sentence or two.

\`\`\`jsx
<${name}>…</${name}>
\`\`\`

- TODO: its props, its behaviour in Persian (RTL, digits) and for screen readers.

## Usage

**Use when:** TODO.

**Don’t use when:** TODO.
`;

files[name + '.fixture.jsx'] = `import React from 'react';
import {${name}} from './${name}.jsx';

// The states the spec needs; <output data-test=…> elements show what callbacks report.
export function Fixture() {
  return <${name} className="example">TODO</${name}>;
}
`;

files[name + '.spec.mjs'] = `import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

// TODO: its role and name, keyboard use, wording in both languages and its main props.
test('renders', async ({page}) => {
  await openComponent(page, '${name}');
  await expect(page.locator('.example')).toBeVisible();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, '${name}');
});
`;

fs.mkdirSync(folder, {recursive: true});
for (const [file, text] of Object.entries(files)) fs.writeFileSync(path.join(folder, file), text);

// Insert `line` into the sorted run of lines matching `pattern` in `file`.
const insertSorted = (file, pattern, line) => {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const run = lines.map((text, index) => (pattern.test(text) ? index : -1)).filter(i => i >= 0);
  if (!run.length) fail('nothing like ' + pattern + ' in ' + file);
  const at = run.find(index => lines[index].localeCompare(line) > 0) ?? run[run.length - 1] + 1;
  lines.splice(at, 0, line);
  fs.writeFileSync(file, lines.join('\n'));
};
insertSorted(
  path.join(repo, 'templates/app/ds.js'),
  /^export \* from '\.\.\/\.\.\/components\//,
  `export * from '../../${componentPath}/${name}.jsx';`
);
if (css)
  fs.appendFileSync(
    path.join(repo, 'components/index.css'),
    `@import url('${level}/${name}/${name}.css');\n`
  );
if (wording) {
  const types = path.join(repo, 'components/utils/messages.d.ts');
  const text = fs.readFileSync(types, 'utf8');
  const marker = 'export interface ComponentMessages {\n';
  if (!text.includes(marker)) fail('ComponentMessages not found in ' + types);
  fs.writeFileSync(types, text.replace(marker, marker + `  ${name}: {label: string};\n`));
}

// Prettier's layout from the start, so the build's copy in dist/ matches the formatted sources.
require('node:child_process').execFileSync(
  process.execPath,
  [
    require.resolve('prettier/bin/prettier.cjs'),
    '--log-level=warn',
    '--write',
    folder,
    path.join(repo, 'templates/app/ds.js'),
    path.join(repo, 'components/utils/messages.d.ts')
  ],
  {stdio: 'inherit'}
);

console.log(`Created ${componentPath}/ (${Object.keys(files).join(', ')}).
Added it to templates/app/ds.js${css ? ', components/index.css' : ''}${
  wording ? ' and the ComponentMessages type' : ''
}.

Next:
  1. Fill in the TODOs; use it in a storefront template (npm test fails on a component no page or
     component uses), and add it to a guideline card in guidelines/components/.
  2. npm --prefix templates run format && npm --prefix templates run build
  3. npm --prefix templates run check && npm --prefix templates test
  4. npx playwright test -c templates/_e2e/playwright.config.mjs ../${componentPath}
     then the whole test:e2e (CLAUDE.md rule 5).`);
