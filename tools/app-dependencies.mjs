// Runtime import checks. Paths and diagnostics are repo-relative, with / separators.
import fs from 'node:fs';
import path from 'node:path';
import {parseSync} from 'rolldown/experimental';
import {uiFolder} from './paths.mjs';

// Source ownership and its allowed dependencies.
const platform = 'src/platform/browser/';
const platformCore = new Set(['environment.js', 'runtime.js'].map(file => platform + file));
const storefront = 'src/storefront/';
const shell = storefront + 'shell/';
const laravel = 'src/platform/server/laravel/';
const isResourceDecoder = file =>
  /^src\/storefront\/(catalog|cart|orders)\/laravel\/[^/]+\.js$/.test(file);
const gallery = uiFolder + '/gallery/';
const cardCompatibility = gallery + 'card-runtime.js';
const isReusableUi = file => file.startsWith(uiFolder + '/') && !file.startsWith(gallery);
const isStorefrontUi = file => file.startsWith(shell + 'components/');
const isPresentational = file =>
  file.startsWith(storefront) &&
  (isStorefrontUi(file)
    ? file.slice((shell + 'components/').length).includes('/')
    : file.includes('/components/'));
const isUiHelper = file => file.startsWith(shell + 'ui/');
const isDomain = file =>
  file === shell + 'shell.js' ||
  isResourceDecoder(file) ||
  (file.startsWith(storefront) &&
    !file.startsWith(shell) &&
    /^[^/]+\/(?!use[A-Z])[^/]+\.js$/.test(file.slice(storefront.length)));
const isService = file =>
  (file.startsWith(platform) && !platformCore.has(file)) ||
  file.startsWith('src/platform/tenant/') ||
  (file.startsWith(shell) && /^[^/]+\.js$/.test(file.slice(shell.length)) && !isDomain(file));

function appDependencyViolation(source, target, local) {
  if (isReusableUi(source)) {
    const allowed = local
      ? isReusableUi(target)
      : ['react', 'react-dom', 'react-aria-components', '@internationalized/date'].includes(target);
    return allowed ? null : `${source}: forbidden reusable UI dependency ${target}`;
  }
  if (isStorefrontUi(source) && local && target.startsWith('src/app/'))
    return `${source}: shared storefront UI imports a route module: ${target}`;
  if (
    source.startsWith(laravel) &&
    local &&
    !target.startsWith(laravel) &&
    target !== 'src/platform/server/laravel-http.ts' &&
    !isResourceDecoder(target) &&
    target !== storefront + 'cart/review.js' &&
    source !== laravel + 'for-storefront.ts'
  )
    return `${source}: Laravel adapter imports outside ${laravel.slice(0, -1)}: ${target}`;
  if (isPresentational(source) || isUiHelper(source)) {
    const allowed = local
      ? isReusableUi(target) ||
        isUiHelper(target) ||
        (isPresentational(source) ? isPresentational(target) : isDomain(target))
      : target === 'react' || (isUiHelper(source) && target === 'qrcode-generator');
    return allowed ? null : `${source}: forbidden UI dependency ${target}`;
  }
  if (platformCore.has(source))
    return local && platformCore.has(target)
      ? null
      : `${source}: forbidden platform dependency ${target}`;
  if (isDomain(source) || isService(source)) {
    const service = isService(source);
    const allowed = local
      ? isDomain(target) ||
        platformCore.has(target) ||
        (service && isService(target)) ||
        target.startsWith(uiFolder + '/utils/') ||
        target.startsWith('.generated/')
      : service &&
        (['react', 'react-aria-components'].includes(target) ||
          (source === platform + 'integrations/leaflet.js' && target === 'leaflet'));
    return allowed
      ? null
      : `${source}: forbidden ${service ? 'services' : 'domain'} dependency ${target}`;
  }
  return null;
}

// Only the gallery compatibility layer sets design-system globals for its demonstration pages.
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

const moduleExtensions = ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.mts'];
const isRuntimeModule = file =>
  moduleExtensions.some(extension => file.endsWith(extension)) &&
  !/\.(?:fixture|spec|test|d)\.[^.]+$/.test(file);

function runtimeSources(root) {
  return walk(path.join(root, 'src'))
    .map(file => path.relative(root, file).split(path.sep).join('/'))
    .filter(file => !file.startsWith(gallery))
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
    if (/^src\/storefront\/[^/]+\.[^.]+$/.test(source))
      violations.push(source + ': storefront module outside a capability folder');
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
          isDomain(source) ||
          isService(source) ||
          isUiHelper(source) ||
          platformCore.has(source)
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
