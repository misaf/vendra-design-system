// Shared by the component generator and architecture checks. Paths are repo-relative, with /.
import {componentsFolder, uiFolder} from './paths.mjs';

const levels = ['atoms', 'molecules', 'organisms'];

function layer(file) {
  if (!file.startsWith(componentsFolder + '/')) return null;
  const parts = file.slice(componentsFolder.length).split('/');
  if (parts[1] === 'utils') return 'foundation';
  return levels.includes(parts[1]) ? parts[1] : null;
}

function dependencyViolation(source, target) {
  if (source.startsWith(uiFolder + '/'))
    return target.startsWith(uiFolder + '/')
      ? null
      : `${source} imports outside shared UI: ${target}`;
  const from = layer(source);
  if (!from) return null; // Existing flat components migrate one batch at a time.
  // These storefront controls use pure digit, phone and map-coordinate rules.
  if (from !== 'foundation' && target === 'apps/florist/shared/domain/commerce.js') return null;
  const uiComponents = uiFolder + '/components/';
  let to = layer(target);
  if (target.startsWith(uiComponents)) {
    const component = target.slice(uiComponents.length).split('/')[0];
    if (component === 'utils' || component === 'VendraProvider') to = 'foundation';
    else if (component === 'Dialog' || component === 'DatePicker') to = 'organisms';
    else to = 'atoms';
  }
  if (!to) return `${source} imports outside the migrated design system: ${target}`;
  if (levels.indexOf(to) > levels.indexOf(from))
    return `${source} (${from}) imports a higher layer: ${target} (${to})`;
  return null;
}

export {levels, layer, dependencyViolation};
