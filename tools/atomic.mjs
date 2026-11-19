// Shared by the component generator and architecture checks. Paths are repo-relative, with /.
import {componentsFolder, uiFolder} from './paths.mjs';

const levels = ['atoms', 'molecules', 'organisms'];

function layer(file) {
  if (!file.startsWith(componentsFolder + '/')) return null;
  const parts = file.slice(componentsFolder.length).split('/');
  if (parts[1] === 'utils' || parts[1] === 'VendraProvider') return 'foundation';
  return levels.includes(parts[1]) ? parts[1] : null;
}

function dependencyViolation(source, target) {
  if (source.startsWith(uiFolder + '/'))
    return target.startsWith(uiFolder + '/')
      ? null
      : `${source} imports outside shared UI: ${target}`;
  const from = layer(source);
  if (!from) return null; // Existing flat components migrate one batch at a time.
  // Legacy fixture and storefront paths forward to the corresponding workspace implementation.
  const local = source
    .slice(componentsFolder.length + 1)
    .replace(/^(atoms|molecules|organisms)\//, '');
  if (target === `${uiFolder}/components/${local}`) return null;
  const to = layer(target);
  if (!to) return `${source} imports outside the migrated design system: ${target}`;
  if (levels.indexOf(to) > levels.indexOf(from))
    return `${source} (${from}) imports a higher layer: ${target} (${to})`;
  return null;
}

export {levels, layer, dependencyViolation};
