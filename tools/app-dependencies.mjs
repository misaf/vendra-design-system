// Runtime import checks. Paths and diagnostics are repo-relative, with / separators.
import fs from 'node:fs';
import {isBuiltin} from 'node:module';
import path from 'node:path';
import {parseSync} from 'rolldown/experimental';
import {layer, dependencyViolation} from './atomic.mjs';
import {componentsFolder} from './paths.mjs';

// apps/storefront/shared/ is split by role, and each folder may import only the folders listed here
// (its own included). The app's i18n/ modules share the domain rules. A JS module loose in
// shared/ itself, or in a folder not listed, fails: place it by what it does.
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
  if (file.startsWith('apps/storefront/i18n/')) return 'translations';
  const folder = /^apps\/storefront\/shared\/([^/]+)\//.exec(file)?.[1];
  return folder && Object.hasOwn(sharedRules, folder) ? folder : null;
};
const isShared = file =>
  file.startsWith('apps/storefront/shared/') || file.startsWith('apps/storefront/i18n/');
const uiLayer = file =>
  /^apps\/storefront\/(?:shell|features\/[^/]+)\/(layouts|organisms|molecules)\//.exec(file)?.[1];
const protectedSource = file =>
  uiLayer(file) || file === 'apps/storefront/shell/ds.js' || isShared(file);

const misplacedShared = file =>
  `${file}: shared module outside the ${Object.keys(sharedRules).join('/, ')}/ folders`;

function sharedDependencyViolation(source, target, relative) {
  const from = sharedFolder(source);
  if (!from) return misplacedShared(source);
  const rules = sharedRules[from];
  let allowed;
  if (!relative) allowed = rules.packages.includes(target);
  else if (isShared(target)) allowed = rules.folders.includes(sharedFolder(target));
  // Domain and services use the design system's pure helpers; UI helpers may compose its components.
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
    const allowed = source !== 'apps/storefront/shell/ds.js' && target === 'react';
    return allowed ? null : `${source}: forbidden UI dependency ${target}`;
  }
  const from = uiLayer(source);
  let allowed;
  if (source === 'apps/storefront/shell/ds.js') {
    allowed = !!layer(target);
  } else {
    const to = uiLayer(target);
    allowed =
      target === 'react' ||
      (from === 'layouts'
        ? to === 'layouts'
        : target === 'apps/storefront/shell/ds.js' ||
          sharedFolder(target) === 'ui' ||
          to === 'molecules' ||
          (from === 'organisms' && to === 'organisms'));
  }
  return allowed ? null : `${source}: forbidden UI dependency ${target}`;
}

// Shared dependencies are imported, never hung on window: the storefront runtime is vfRuntime
// (apps/storefront/shared/platform/runtime.js). Only the guideline cards' compatibility layer,
// guidelines/card-runtime.js (outside the checked folders), sets the design system's AG_* helpers and
// window.VendraDesignSystem for the cards' classic scripts.
const cardCompatibility = 'guidelines/card-runtime.js';
const globalObjects = ['window', 'globalThis', 'self'];
const forbiddenGlobal = name => /^(VF_|AG_)/.test(name) || name === 'VendraDesignSystem';
function globalAccess(node) {
  if (!/MemberExpression$/.test(node.type)) return null;
  const object = node.object;
  if (object?.type !== 'Identifier' || !globalObjects.includes(object.name)) return null;
  const property = node.property;
  const name =
    !node.computed && property?.type === 'Identifier'
      ? property.name
      : typeof property?.value === 'string'
        ? property.value
        : property?.type === 'Literal' && typeof property.value === 'string'
          ? property.value
          : null;
  return name && forbiddenGlobal(name) ? object.name + '.' + name : null;
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory, {withFileTypes: true})
    .filter(entry => entry.name !== 'node_modules')
    .flatMap(entry => {
      const file = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(file) : [file];
    });
}

function runtimeSources(root) {
  return [
    componentsFolder,
    'apps/storefront/shell',
    'apps/storefront/features',
    'apps/storefront/shared',
    'apps/storefront/i18n',
    'apps/storefront/communications'
  ]
    .flatMap(folder => walk(path.join(root, folder)))
    .filter(file => /\.(js|jsx)$/.test(file) && !/\.(fixture|spec)\.(js|jsx)$/.test(file))
    .map(file => path.relative(root, file).split(path.sep).join('/'))
    .sort();
}

const packageRoots = ['packages/ui', 'packages/vendra-api'];
const workspaceSources = [
  'apps/storefront/app',
  'apps/storefront/server',
  'apps/storefront/i18n',
  'apps/storefront/features',
  'apps/storefront/shell',
  'apps/storefront/shared',
  'apps/storefront/design-system',
  'apps/storefront/communications',
  ...packageRoots
];
const moduleExtensions = /\.[cm]?[jt]sx?$/;

function workspaceViolations(root) {
  const violations = [];
  const manifests = new Map(
    packageRoots.flatMap(folder => {
      const file = path.join(root, folder, 'package.json');
      return fs.existsSync(file) ? [[folder, JSON.parse(fs.readFileSync(file, 'utf8'))]] : [];
    })
  );
  const files = workspaceSources
    .flatMap(folder => walk(path.join(root, folder)))
    .filter(file => moduleExtensions.test(file));
  for (const file of files) {
    const source = path.relative(root, file).split(path.sep).join('/');
    const owner = packageRoots.find(folder => source.startsWith(folder + '/'));
    const manifest = manifests.get(owner);
    const {program, errors} = parseSync(source, fs.readFileSync(file, 'utf8'));
    for (const error of errors) violations.push(`${source}: parse error: ${error.message}`);
    const check = specifier => {
      const target = specifier?.value;
      if (typeof target !== 'string') {
        if (owner) violations.push(`${source}: computed import crosses an unchecked boundary`);
        return;
      }
      const local = target.startsWith('.')
        ? path.posix.normalize(path.posix.join(path.posix.dirname(source), target))
        : target.startsWith('@storefront/')
          ? path.posix.join('apps/storefront', target.slice('@storefront/'.length))
          : null;
      if (local !== null) {
        if (
          owner
            ? !local.startsWith(owner + '/')
            : packageRoots.some(folder => local === folder || local.startsWith(folder + '/'))
        )
          violations.push(
            `${source}: use workspace package exports instead of importing ${target}`
          );
        return;
      }
      if (!owner) return;
      const name = target
        .split('/')
        .slice(0, target.startsWith('@') ? 2 : 1)
        .join('/');
      if (
        ['next', 'server-only', 'client-only'].includes(name) ||
        (owner === 'packages/vendra-api' && ['react', 'react-dom', '@vendra/ui'].includes(name)) ||
        (!isBuiltin(target) &&
          !Object.hasOwn(manifest?.dependencies || {}, name) &&
          !Object.hasOwn(manifest?.peerDependencies || {}, name))
      )
        violations.push(`${source}: forbidden package dependency ${target}`);
    };
    visit(program, node => {
      if (
        [
          'ImportDeclaration',
          'ExportNamedDeclaration',
          'ExportAllDeclaration',
          'ImportExpression'
        ].includes(node.type) &&
        node.source
      )
        check(node.source);
      if (node.type === 'TSImportType') check(node.source);
      if (node.type === 'CallExpression' && node.callee?.name === 'require')
        check(node.arguments[0]);
      if (node.type === 'TSExternalModuleReference') check(node.expression);
    });
  }
  return violations;
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
  const violations = workspaceViolations(root);
  for (const [source] of graph) {
    if (isShared(source) && !sharedFolder(source)) violations.push(misplacedShared(source));
    const {program, errors} = parseSync(source, fs.readFileSync(path.join(root, source), 'utf8'));
    if (errors.length) {
      violations.push(...errors.map(error => `${source}: parse error: ${error.message}`));
      continue;
    }
    visit(program, node => {
      const global = source !== cardCompatibility && globalAccess(node);
      if (global)
        violations.push(`${source}: reads or sets the global ${global}; import it instead`);
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

export {checkDependencies};
