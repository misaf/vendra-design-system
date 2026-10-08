// Compile components/**/*.{js,jsx} into templates/_runtime/components.js, the browser
// bundle that cards and storefront pages load after React. Each source runs in its own
// try/catch, so one broken file is reported in __errors instead of blanking the page.
// Imports between sources resolve through a shared scope; React is the page's global.
const fs = require('node:fs');
const path = require('node:path');
const {transformSync, parseSync} = require('rolldown/experimental');

const NAMESPACE = 'VendraDesignSystem';
// Older globals the storefront templates still read: window name → export.
const ALIASES = {AG_COMMERCE: 'commerce', AG_DATES: 'dates', AG_FORMAT: 'format'};
const repo = path.resolve(__dirname, '../..');
const target = path.join(repo, 'templates/_runtime/components.js');
const helpersTarget = path.join(repo, 'templates/_runtime/helpers.js');

function sources(repo, folder = 'components') {
  return fs
    .readdirSync(path.join(repo, folder), {withFileTypes: true})
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    .flatMap(entry => {
      const relative = folder + '/' + entry.name;
      if (entry.isDirectory()) return sources(repo, relative);
      return /\.(js|jsx)$/.test(entry.name) ? [relative] : [];
    });
}

// One source → {code, exports, deps}. Imports become reads from the shared scope.
function compile(repo, file) {
  const source = fs.readFileSync(path.join(repo, file), 'utf8');
  const {code, errors} = transformSync(file, source, {jsx: {runtime: 'classic'}});
  if (errors.length) throw new Error(file + ': ' + errors.map(e => e.message).join('; '));
  const {program} = parseSync(file, code);
  const edits = [],
    exports = [],
    deps = [];
  for (const node of program.body) {
    if (node.type === 'ImportDeclaration') {
      const from = node.source.value;
      if (from === 'react') {
        if (node.specifiers.some(s => s.type !== 'ImportDefaultSpecifier'))
          throw new Error(file + ': import React as a default (React.useState), not by name');
        edits.push([node.start, node.end, '']);
        continue;
      }
      if (!from.startsWith('.'))
        throw new Error(file + ': only relative imports and react are supported (' + from + ')');
      deps.push(path.posix.normalize(path.posix.join(path.posix.dirname(file), from)));
      const names = node.specifiers.map(s => {
        if (s.type !== 'ImportSpecifier')
          throw new Error(file + ': use named imports between components (' + from + ')');
        return s.imported.name === s.local.name
          ? s.local.name
          : s.imported.name + ': ' + s.local.name;
      });
      edits.push([
        node.start,
        node.end,
        names.length ? 'const { ' + names.join(', ') + ' } = __ds_scope;' : ''
      ]);
    } else if (node.type === 'ExportNamedDeclaration') {
      if (!node.declaration)
        throw new Error(
          file + ': export declarations directly (export function X), not export { X }'
        );
      const d = node.declaration;
      if (d.type === 'VariableDeclaration') exports.push(...d.declarations.map(v => v.id.name));
      else exports.push(d.id.name);
      edits.push([node.start, d.start, '']);
    } else if (node.type === 'ExportDefaultDeclaration' || node.type === 'ExportAllDeclaration') {
      throw new Error(file + ': default and re-exports are not supported');
    }
  }
  let out = code;
  for (const [start, end, text] of edits.sort((a, b) => b[0] - a[0]))
    out = out.slice(0, start) + text + out.slice(end);
  out = out.replace(/^\s*\n/, '').replace(/\s+$/, '');
  if (exports.length) out += '\nObject.assign(__ds_scope, { ' + exports.join(', ') + ' });';
  return {code: out, exports, deps};
}

// Dependencies first; otherwise alphabetical, so output is stable.
function ordered(compiled) {
  const done = new Set(),
    order = [];
  const visit = (file, trail) => {
    if (done.has(file)) return;
    if (trail.includes(file)) throw new Error('Circular import: ' + [...trail, file].join(' → '));
    if (!compiled.has(file)) throw new Error((trail.at(-1) || '?') + ' imports missing ' + file);
    for (const dep of compiled.get(file).deps) visit(dep, [...trail, file]);
    done.add(file);
    order.push(file);
  };
  for (const file of compiled.keys()) visit(file, []);
  return order;
}

const compileAll = root => new Map(sources(root).map(file => [file, compile(root, file)]));
const prelude =
  '(() => {\n' +
  'const __ds_ns = (window.' +
  NAMESPACE +
  ' = window.' +
  NAMESPACE +
  ' || {});\n' +
  'const __ds_scope = {};\n';
const aliasLines = names =>
  Object.entries(ALIASES)
    .filter(([, name]) => names.includes(name))
    .map(
      ([alias, name]) => '__ds_ns.' + name + ' = window.' + alias + ' = __ds_scope.' + name + ';\n'
    )
    .join('');

function componentsBundle(root = repo) {
  const compiled = compileAll(root);
  const order = ordered(compiled);
  const seen = new Map();
  for (const file of order)
    for (const name of compiled.get(file).exports) {
      if (seen.has(name))
        throw new Error(name + ' is exported by both ' + seen.get(name) + ' and ' + file);
      seen.set(name, file);
    }
  const sections = order.map(
    file =>
      '// ' +
      file +
      '\ntry { (() => {\n' +
      compiled.get(file).code +
      '\n})(); } catch (e) { __ds_ns.__errors.push({ path: ' +
      JSON.stringify(file) +
      ', error: String((e && e.message) || e) }); }'
  );
  return (
    '// GENERATED from components/**/*.{js,jsx} by npm --prefix templates run build. Edit the sources, not this file.\n' +
    prelude +
    '__ds_ns.__errors = __ds_ns.__errors || [];\n\n' +
    sections.join('\n\n') +
    '\n\n' +
    [...seen.keys()]
      .filter(name => !Object.values(ALIASES).includes(name))
      .map(name => '__ds_ns.' + name + ' = __ds_scope.' + name + ';\n')
      .join('') +
    aliasLines([...seen.keys()]) +
    '})();\n'
  );
}

// The helpers behind ALIASES as one classic script. The bundle loads asynchronously after
// React, so storefront pages load this first; the shared logic calls it on first render.
function helpersScript(root = repo) {
  const helpers = [...compileAll(root)].filter(([, c]) =>
    c.exports.some(name => Object.values(ALIASES).includes(name))
  );
  for (const [file, c] of helpers)
    if (c.deps.length)
      throw new Error(file + ': helpers load before the bundle, so they cannot import other files');
  return (
    '// GENERATED from ' +
    helpers.map(([file]) => file).join(', ') +
    ' by npm --prefix templates run build. Edit the sources, not this file.\n' +
    prelude +
    helpers.map(([file, c]) => '// ' + file + '\n(() => {\n' + c.code + '\n})();\n').join('\n') +
    aliasLines(helpers.flatMap(([, c]) => c.exports)) +
    '})();\n'
  );
}

module.exports = {
  componentsBundle,
  helpersScript,
  compile,
  sources,
  ordered,
  target,
  helpersTarget,
  NAMESPACE
};
