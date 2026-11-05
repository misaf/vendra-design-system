// Runtime import checks. Paths and diagnostics are repo-relative, with / separators.
const fs = require('node:fs');
const path = require('node:path');
const {parseSync} = require('rolldown/experimental');
const {layer, dependencyViolation} = require('./atomic.cjs');

// These are UI-local helpers, not a blanket allowance for _shared business modules.
// Their own imports are constrained too, so they cannot become service back doors.
const helperDependencies = {
  'apps/storefront/_shared/collection-carousel.jsx': new Set([
    'react',
    'components/organisms/Carousel/Carousel.jsx'
  ]),
  'apps/storefront/_shared/qr.js': new Set(['qrcode-generator'])
};
const uiLayer = file => /^apps\/storefront\/app\/(layouts|organisms|molecules)\//.exec(file)?.[1];
const protectedSource = file =>
  uiLayer(file) || file === 'apps/storefront/app/ds.js' || Object.hasOwn(helperDependencies, file);

function appDependencyViolation(source, target, relative) {
  if (!protectedSource(source)) return null;
  if (!relative) {
    const allowed =
      source === 'apps/storefront/_shared/qr.js'
        ? target === 'qrcode-generator'
        : source !== 'apps/storefront/app/ds.js' && target === 'react';
    return allowed ? null : `${source}: forbidden UI dependency ${target}`;
  }
  const from = uiLayer(source);
  let allowed;
  if (Object.hasOwn(helperDependencies, source)) {
    allowed = helperDependencies[source].has(target);
  } else if (source === 'apps/storefront/app/ds.js') {
    allowed = !!layer(target);
  } else if (from) {
    const to = uiLayer(target);
    allowed =
      target === 'react' ||
      (from === 'layouts'
        ? to === 'layouts'
        : target === 'apps/storefront/app/ds.js' ||
          Object.hasOwn(helperDependencies, target) ||
          to === 'molecules' ||
          (from === 'organisms' && to === 'organisms'));
  } else return null;
  return allowed ? null : `${source}: forbidden UI dependency ${target}`;
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

function runtimeSources(root) {
  const files = ['components', 'apps/storefront/app', 'apps/storefront/_shared'].flatMap(folder =>
    walk(path.join(root, folder))
  );
  const templates = path.join(root, 'apps/storefront');
  if (fs.existsSync(templates)) {
    for (const entry of fs.readdirSync(templates, {withFileTypes: true})) {
      if (entry.isDirectory() && entry.name.startsWith('storefront-'))
        files.push(...walk(path.join(templates, entry.name)));
    }
  }
  return files
    .filter(file => /\.(js|jsx)$/.test(file) && !/\.(fixture|spec)\.(js|jsx)$/.test(file))
    .map(file => path.relative(root, file).split(path.sep).join('/'))
    .sort();
}

function visit(node, callback) {
  if (!node || typeof node !== 'object') return;
  if (node.type) callback(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(child => visit(child, callback));
    else if (value && typeof value === 'object') visit(value, callback);
  }
}

function checkDependencies(root) {
  const files = runtimeSources(root);
  const graph = new Map(files.map(file => [file, new Set()]));
  const violations = [];
  for (const [source] of graph) {
    const {program, errors} = parseSync(source, fs.readFileSync(path.join(root, source), 'utf8'));
    if (errors.length) {
      violations.push(...errors.map(error => `${source}: parse error: ${error.message}`));
      continue;
    }
    visit(program, node => {
      if (
        ![
          'ImportDeclaration',
          'ExportNamedDeclaration',
          'ExportAllDeclaration',
          'ImportExpression'
        ].includes(node.type) ||
        !node.source
      )
        return;
      const specifier = node.source.value;
      if (typeof specifier !== 'string') {
        if (protectedSource(source))
          violations.push(`${source}: computed import cannot be checked in UI code`);
        return;
      }
      let target = specifier;
      if (specifier.startsWith('.')) {
        const base = path.posix.normalize(path.posix.join(path.posix.dirname(source), specifier));
        target = [base, base + '.js', base + '.jsx', base + '/index.js', base + '/index.jsx'].find(
          candidate =>
            fs.existsSync(path.join(root, candidate)) &&
            fs.statSync(path.join(root, candidate)).isFile()
        );
        if (!target) {
          violations.push(`${source}: missing relative dependency ${specifier}`);
          return;
        }
        if (/\.(js|jsx)$/.test(target)) {
          if (target.startsWith('../')) {
            violations.push(`${source}: dependency outside repository ${target}`);
          } else {
            if (!graph.has(target)) {
              graph.set(target, new Set());
              files.push(target);
            }
            graph.get(source).add(target);
          }
        }
        const violation = dependencyViolation(source, target);
        if (violation) violations.push(violation);
      }
      const violation = appDependencyViolation(source, target, specifier.startsWith('.'));
      if (violation) violations.push(violation);
    });
  }
  // A gray vertex is still on the current path; a black one is already fully checked.
  const colors = new Map();
  const stack = [];
  function visitDependencies(source) {
    if (colors.get(source) === 'gray') {
      violations.push(
        `Import cycle: ${[...stack.slice(stack.indexOf(source)), source].join(' -> ')}`
      );
      return;
    }
    if (colors.get(source) === 'black') return;
    colors.set(source, 'gray');
    stack.push(source);
    for (const target of graph.get(source)) visitDependencies(target);
    stack.pop();
    colors.set(source, 'black');
  }
  for (const file of files) visitDependencies(file);
  return {files, violations: [...new Set(violations)]};
}

module.exports = {checkDependencies};
