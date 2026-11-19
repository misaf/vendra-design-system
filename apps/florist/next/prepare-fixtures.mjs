// Serve the existing fixture documents and their compiled React entrypoints from Next dev.
import {copyFile, mkdir, readdir, readFile, writeFile} from 'node:fs/promises';
import {dirname, join, normalize, resolve} from 'node:path';
import {rolldown} from 'rolldown';

const root = resolve(import.meta.dirname, '../../..');
const publicDir = resolve(import.meta.dirname, '..', 'public');
const app = 'apps/florist';
const ui = 'packages/ui';
const designSystem = 'apps/florist/design-system';
const componentDirs = {
  'design-system': [designSystem + '/components'],
  storefront: [app + '/shell', app + '/features']
};

async function list(dir, suffix) {
  return (await readdir(join(root, dir), {recursive: true}))
    .filter(file => file.endsWith(suffix))
    .map(file => join(dir, file));
}

async function copy(file) {
  const to = join(publicDir, file);
  await mkdir(dirname(to), {recursive: true});
  await copyFile(join(root, file), to);
}

const entries = new Set([app + '/communications/email-templates.js']);
for (const dir of [
  'guidelines',
  designSystem + '/components',
  app + '/e2e/fixtures',
  app + '/communications'
]) {
  for (const file of await list(dir, '.html')) {
    let html = await readFile(join(root, file), 'utf8');
    for (const match of html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>/g)) {
      const src = match[1];
      if (/^(https?:|\/\/)/.test(src)) continue;
      const path = src.startsWith('/') ? src.slice(1) : normalize(join(dirname(file), src));
      if (match[0].includes('type="module"')) {
        entries.add(path);
        html = html.replace(match[0], match[0].replace(/\.jsx(?=")/, '.js'));
      } else {
        await copy(path);
      }
    }
    const to = join(publicDir, file);
    await mkdir(dirname(to), {recursive: true});
    await writeFile(to, html);
  }
}

await Promise.all(
  [
    designSystem + '/styles.css',
    ui + '/styles.css',
    ui + '/tokens.css',
    ...(await list(ui + '/tokens', '.css')),
    ...(await list(ui + '/components', '.css')),
    ...(await list(ui + '/assets/fonts', '.woff2')),
    ...(await list(designSystem + '/components', '.css')),
    app + '/_runtime/tailwind.css',
    app + '/_runtime/custom.css'
  ].map(copy)
);

const fixtures = Object.fromEntries(
  await Promise.all(
    Object.entries(componentDirs).map(async ([group, directories]) => [
      '\0fixtures:' + group,
      (await Promise.all(directories.map(dir => list(dir, '.fixture.jsx')))).flat()
    ])
  )
);
const bundle = await rolldown({
  checks: {moduleLevelDirective: false},
  input: Object.fromEntries(
    [...entries].map(file => [file.replace(/\.jsx?$/, ''), join(root, file)])
  ),
  platform: 'browser',
  transform: {define: {'process.env.NODE_ENV': '"development"'}},
  plugins: [
    {
      name: 'component-fixtures',
      resolveId(id) {
        if (id.startsWith('fixtures:')) return '\0' + id;
      },
      load(id) {
        if (!Object.hasOwn(fixtures, id)) return;
        return (
          'export default {' +
          fixtures[id]
            .map(
              file =>
                JSON.stringify(file) + ': () => import(' + JSON.stringify(join(root, file)) + ')'
            )
            .join(',') +
          '}'
        );
      }
    }
  ]
});
try {
  await bundle.write({
    dir: publicDir,
    format: 'esm',
    chunkFileNames: '_fixture-chunks/[name]-[hash].js'
  });
} finally {
  await bundle.close();
}
