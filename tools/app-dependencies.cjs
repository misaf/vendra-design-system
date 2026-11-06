// Runtime import checks. Paths and diagnostics are repo-relative, with / separators.
const fs = require('node:fs');
const path = require('node:path');
const {parseSync} = require('rolldown/experimental');
const {layer, dependencyViolation} = require('./atomic.cjs');
const {componentsFolder} = require('./paths.cjs');

// apps/storefront/_shared/ is split by role, and each folder may import only the folders listed here
// (its own included). translations/ sits beside domain/ and shares its rules. A JS module loose in
// _shared/ itself, or in a folder not listed, fails: place it by what it does.
//   platform/  where the storefront runs: address, asset base, clock (no browser at import time)
//   domain/    pure store rules and sample data
//   services/  browser services: routing, SEO, focus/lifecycle, page state, offline, API, analytics
//   ui/        storefront UI helpers the app UI layers may use; never services or persistence
//   styles/    the storefront's CSS entry points (no modules)
const sharedRules = {
  platform: {folders: ['platform'], packages: []},
  domain: {folders: ['domain', 'translations', 'platform'], packages: [], runtime: true},
  translations: {folders: ['domain', 'translations', 'platform'], packages: []},
  services: {
    folders: ['services', 'domain', 'translations', 'platform'],
    packages: ['react', 'react-aria-components'],
    runtime: true
  },
  ui: {folders: ['ui', 'domain', 'translations'], packages: ['react', 'qrcode-generator']},
  styles: {folders: [], packages: []}
};
const sharedFolder = file => {
  const folder = /^apps\/storefront\/_shared\/([^/]+)\//.exec(file)?.[1];
  return folder && Object.hasOwn(sharedRules, folder) ? folder : null;
};
const isShared = file => file.startsWith('apps/storefront/_shared/');
const uiLayer = file => /^apps\/storefront\/app\/(layouts|organisms|molecules)\//.exec(file)?.[1];
const protectedSource = file =>
  uiLayer(file) || file === 'apps/storefront/app/ds.js' || isShared(file);

const misplacedShared = file =>
  `${file}: shared module outside the ${Object.keys(sharedRules).join('/, ')}/ folders`;

function sharedDependencyViolation(source, target, relative) {
  const from = sharedFolder(source);
  if (!from) return misplacedShared(source);
  const rules = sharedRules[from];
  let allowed;
  if (!relative) allowed = rules.packages.includes(target);
  else if (isShared(target)) allowed = rules.folders.includes(sharedFolder(target));
  // Domain and services use the package's pure helpers; UI helpers may compose its components.
  else if (target.startsWith(componentsFolder + '/'))
    allowed =
      from === 'ui' || (from !== 'styles' && target.startsWith(componentsFolder + '/utils/'));
  // Generated data (tenant slugs) the build writes for the store's rules.
  else allowed = !!rules.runtime && target.startsWith('apps/storefront/_runtime/');
  return allowed
    ? null
    : `${source}: forbidden ${from === 'ui' ? 'UI' : from} dependency ${target}`;
}

function appDependencyViolation(source, target, relative) {
  if (!protectedSource(source)) return null;
  if (isShared(source)) return sharedDependencyViolation(source, target, relative);
  if (!relative) {
    const allowed = source !== 'apps/storefront/app/ds.js' && target === 'react';
    return allowed ? null : `${source}: forbidden UI dependency ${target}`;
  }
  const from = uiLayer(source);
  let allowed;
  if (source === 'apps/storefront/app/ds.js') {
    allowed = !!layer(target);
  } else {
    const to = uiLayer(target);
    allowed =
      target === 'react' ||
      (from === 'layouts'
        ? to === 'layouts'
        : target === 'apps/storefront/app/ds.js' ||
          sharedFolder(target) === 'ui' ||
          to === 'molecules' ||
          (from === 'organisms' && to === 'organisms'));
  }
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
  const files = [componentsFolder, 'apps/storefront/app', 'apps/storefront/_shared'].flatMap(
    folder => walk(path.join(root, folder))
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
    if (isShared(source) && !sharedFolder(source)) violations.push(misplacedShared(source));
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
