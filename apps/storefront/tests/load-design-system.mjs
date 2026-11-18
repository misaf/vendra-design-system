import {mkdtemp, rm} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {rolldown} from 'rolldown';

const store = path.resolve(import.meta.dirname, '..');
const entry = path.join(import.meta.dirname, 'fixtures/design-system.js');
const external = [/^react(?:-dom|-aria-components)?(?:\/|$)/, /^@internationalized\//];

export async function loadDesignSystem() {
  const dir = await mkdtemp(path.resolve(store, '../../node_modules/.vendra-design-test-'));
  const file = path.join(dir, 'design-system.mjs');
  try {
    const bundle = await rolldown({
      input: entry,
      platform: 'node',
      external,
      checks: {moduleLevelDirective: false}
    });
    try {
      await bundle.write({file, format: 'es', inlineDynamicImports: true});
    } finally {
      await bundle.close();
    }
    return await import(pathToFileURL(file).href);
  } finally {
    await rm(dir, {force: true, recursive: true});
  }
}
