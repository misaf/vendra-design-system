// Shared by the component generator and architecture checks. Paths are repo-relative, with /.
const levels = ['atoms', 'molecules', 'organisms'];

function layer(file) {
  const parts = file.split('/');
  if (parts[0] !== 'components') return null;
  if (parts[1] === 'utils' || parts[1] === 'VendraProvider') return 'foundation';
  return levels.includes(parts[1]) ? parts[1] : null;
}

function dependencyViolation(source, target) {
  const from = layer(source);
  if (!from) return null; // Existing flat components migrate one batch at a time.
  const to = layer(target);
  if (!to) return `${source} imports outside the migrated design system: ${target}`;
  if (levels.indexOf(to) > levels.indexOf(from))
    return `${source} (${from}) imports a higher layer: ${target} (${to})`;
  return null;
}

module.exports = {levels, layer, dependencyViolation};
