// Runtime import checks. Paths and diagnostics are repo-relative, with / separators.
import fs from 'node:fs';
import path from 'node:path';
import {parseSync} from 'rolldown/experimental';
import {uiFolder} from './paths.mjs';

// shared/ is split by role, and each folder may import only the folders listed here
// (its own included). A JS module loose in
// shared/ itself, or in a folder not listed, fails: place it by what it does.
//   platform/  where the storefront runs: address, asset base, clock (no browser at import time)
//   src/storefront/  business rules, sample data and feature copy
//   services/  browser services: routing, SEO, focus/lifecycle, page state, offline, API, analytics
//   ui/        storefront UI helpers the app UI layers may use; never services or persistence
//   styles/    the storefront's CSS entry points (no modules)
const sharedRules = {
  platform: {folders: ['platform'], packages: []},
  domain: {folders: ['domain', 'platform'], packages: [], runtime: true},
  services: {
    folders: ['services', 'domain', 'platform'],
    packages: ['react', 'react-aria-components'],
    runtime: true
  },
  ui: {folders: ['ui', 'domain'], packages: ['react', 'qrcode-generator']},
  styles: {folders: [], packages: []}
};
const sharedFolder = file => {
  if (/^src\/storefront\/[^/]+\//.test(file)) return 'domain';
  const folder = /^shared\/([^/]+)\//.exec(file)?.[1];
  return folder && Object.hasOwn(sharedRules, folder) ? folder : null;
};
const isShared = file => ['shared/', 'src/storefront/'].some(prefix => file.startsWith(prefix));
const isReusableUi = file => file.startsWith(uiFolder + '/');
const isStorefrontUi = file => file.startsWith('components/storefront/');
const isPresentational = file =>
  /^components\/storefront\/[^/]+\//.test(file) ||
  (/^app\/(?!_components\/)/.test(file) && file.includes('/_components/'));

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
  else if (isReusableUi(target))
    allowed = from === 'ui' || (from !== 'styles' && target.startsWith(uiFolder + '/utils/'));
  // Generated data (tenant slugs) the build writes for the store's rules.
  else allowed = !!rules.runtime && target.startsWith('_runtime/');
  return allowed
    ? null
    : `${source}: forbidden ${from === 'ui' ? 'UI' : from} dependency ${target}`;
}

function appDependencyViolation(source, target, local) {
  if (isShared(source)) return sharedDependencyViolation(source, target, local);
  if (isReusableUi(source)) {
    const allowed = local
      ? isReusableUi(target)
      : ['react', 'react-dom', 'react-aria-components', '@internationalized/date'].includes(target);
    return allowed ? null : `${source}: forbidden reusable UI dependency ${target}`;
  }
  if (isStorefrontUi(source) && local && target.startsWith('app/'))
    return `${source}: shared storefront UI imports a route module: ${target}`;
  if (source.startsWith('server/vendra/') && local && !target.startsWith('server/vendra/')) {
    if (source !== 'server/vendra/for-storefront.ts')
      return `${source}: Laravel adapter imports outside server/vendra: ${target}`;
  }
  if (!isPresentational(source)) return null;
  const allowed = local
    ? isReusableUi(target) || sharedFolder(target) === 'ui' || isPresentational(target)
    : target === 'react';
  return allowed ? null : `${source}: forbidden UI dependency ${target}`;
}

// Shared dependencies are imported, never hung on window: the storefront runtime is vfRuntime
// (shared/platform/runtime.js). Only the guideline cards' compatibility layer,
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

const runtimeRoots = [
  'app',
  'components',
  uiFolder,
  'src/storefront',
  'session',
  'shared',
  'server',
  'src/communications'
];
const moduleExtensions = ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.mts'];
const isRuntimeModule = file =>
  moduleExtensions.some(extension => file.endsWith(extension)) &&
  !/\.(?:fixture|spec|test|d)\.[^.]+$/.test(file);

function runtimeSources(root) {
  return runtimeRoots
    .flatMap(folder => walk(path.join(root, folder)))
    .map(file => path.relative(root, file).split(path.sep).join('/'))
    .filter(file => isRuntimeModule(file) || (isReusableUi(file) && file.endsWith('.d.ts')))
    .sort();
}

function localDependency(source, specifier) {
  if (specifier.startsWith('.'))
    return path.posix.normalize(path.posix.join(path.posix.dirname(source), specifier));
  if (specifier.startsWith('@storefront/'))
    return path.posix.normalize(specifier.slice('@storefront/'.length));
  return null;
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
      const global = source !== cardCompatibility && globalAccess(node);
      if (global)
        violations.push(`${source}: reads or sets the global ${global}; import it instead`);
      const reference =
        node.type === 'TSImportType'
          ? node.source
          : node.type === 'CallExpression' && node.callee?.name === 'require'
            ? node.arguments[0]
            : node.type === 'TSExternalModuleReference'
              ? node.expression
              : [
                    'ImportDeclaration',
                    'ExportNamedDeclaration',
                    'ExportAllDeclaration',
                    'ImportExpression'
                  ].includes(node.type)
                ? node.source
                : null;
      if (!reference) return;
      const specifier = reference.value;
      if (typeof specifier !== 'string') {
        if (
          isReusableUi(source) ||
          isStorefrontUi(source) ||
          isPresentational(source) ||
          isShared(source)
        )
          violations.push(`${source}: computed import cannot be checked in UI code`);
        return;
      }
      const base = localDependency(source, specifier);
      let target = specifier;
      if (base !== null) {
        if (base === '..' || base.startsWith('../')) {
          violations.push(`${source}: dependency outside repository ${base}`);
          return;
        }
        const candidates = [
          base,
          ...moduleExtensions.flatMap(ext => [base + ext, base + '/index' + ext]),
          ...(base.endsWith('.js') ? [base.slice(0, -3) + '.d.ts'] : [])
        ];
        target = candidates.find(candidate => {
          const file = path.join(root, candidate);
          return fs.existsSync(file) && fs.statSync(file).isFile();
        });
        if (!target) {
          violations.push(`${source}: missing relative dependency ${specifier}`);
          return;
        }
        if (isRuntimeModule(target)) {
          if (!graph.has(target)) {
            graph.set(target, new Set());
            files.push(target);
          }
          if (!node.importKind || node.importKind !== 'type') {
            if (node.type !== 'TSImportType') graph.get(source).add(target);
          }
        }
      }
      const violation = appDependencyViolation(source, target, base !== null);
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
