// Regenerate shared sections without touching page content.
// Run from anywhere: node /path/to/templates/_build/generate.cjs [--check]
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const shared = name => fs.readFileSync(path.join(root, '_shared', name), 'utf8').trimEnd();
const sharedLogicFiles = [
  'store-config.js',
  'delivery.js',
  'location.js',
  'promotions.js',
  'catalog.js',
  'translations/shell.js',
  'translations/categories.js',
  'translations/time.js',
  'translations/location.js',
  'account-data.js',
  'wallet.js',
  'payments.js',
  'integrations/api.js',
  'integrations/analytics.js',
  'formatting.js',
  'routing.js',
  'page-lifecycle.js',
  'navigation.js'
];

// The tenant list the storefront accepts in ?tenant= and offers in each page's Theme setting.
const tenantSlugs = require('./tenants.cjs').tenantSlugs();
const tenantList = '// Source: tokens/tenants/*.json (generated)\nconst VF_TENANT_SLUGS = ' + JSON.stringify(tenantSlugs) + ';';

function sourceCode(file) {
  return '// Source: templates/' + file + '\n' + fs.readFileSync(path.join(root, file), 'utf8').trimEnd();
}

function renderSharedLogic() {
  return [tenantList, ...sharedLogicFiles.map(file => sourceCode('_shared/' + file))].join('\n\n') + '\n';
}

const sharedLogic = renderSharedLogic();

function region(source, name, syntax = 'html') {
  const begin = syntax === 'html' ? '<!-- BEGIN ' + name + ' -->' : '// BEGIN ' + name;
  const end = syntax === 'html' ? '<!-- END ' + name + ' -->' : '// END ' + name;
  const start = source.indexOf(begin), finish = source.indexOf(end);
  if (start < 0 || finish < start || source.indexOf(begin, start + begin.length) >= 0) {
    throw new Error('Missing or duplicate region: ' + name);
  }
  return {start, end: finish + end.length, content: source.slice(start + begin.length, finish).replace(/^\n|\n$/g, '')};
}

function replaceScriptRegion(html, name, code) {
  const bounds = region(html, name, 'js');
  const generated = '// BEGIN ' + name + '\n' + code.trimEnd() + '\n// END ' + name;
  return html.slice(0, bounds.start) + generated + html.slice(bounds.end);
}

function renderPageCopy(html, folder) {
  const file = folder + '/copy.js';
  if (!fs.existsSync(path.join(root, file))) {
    if (folder === 'storefront-site') return html;
    throw new Error('Missing page copy source: ' + file);
  }
  if (!html.includes('// BEGIN GENERATED PAGE COPY')) {
    throw new Error('Missing generated page copy region: ' + folder);
  }
  const sources = [];
  if (['storefront-journal', 'storefront-post'].includes(folder)) {
    sources.push('_shared/translations/journal-content.js');
  }
  sources.push(file);
  return replaceScriptRegion(html, 'GENERATED PAGE COPY', sources.map(sourceCode).join('\n\n'));
}

function renderPageLogic(html, folder) {
  const file = folder + '/logic.js';
  if (!fs.existsSync(path.join(root, file))) throw new Error('Missing page logic source: ' + file);
  return replaceScriptRegion(html, 'GENERATED PAGE LOGIC', sourceCode(file));
}

// Keep the editor's Theme choices in step with tokens/tenants/.
function renderTenantProp(html, folder) {
  const prop = /(tenant&quot;:\{&quot;editor&quot;:&quot;enum&quot;,&quot;options&quot;:)\[[^\]]*\](,&quot;default&quot;:&quot;default&quot;,&quot;tsType&quot;:&quot;)[^&]*(&quot;)/;
  if (!prop.test(html)) throw new Error('Missing tenant prop in ' + folder);
  const options = ['default', ...tenantSlugs];
  return html.replace(prop, (_, start, middle, end) => start + '[' + options.map(o => '&quot;' + o + '&quot;').join(',') + ']' + middle + options.map(o => "'" + o + "'").join(' | ') + end);
}

function renderShell(source) {
  const metadata = source.match(/<!-- @template[^\n]*-->/);
  if (!metadata) throw new Error('Missing @template metadata');
  const body = region(source, 'PAGE CONTENT').content;
  const sticky = region(source, 'PAGE STICKY CONTENT').content;
  let layout = shared('layout.html');
  for (const [token, file] of [['DESKTOP_HEADER', 'header-desktop.html'], ['MOBILE_HEADER', 'header-mobile.html'], ['MOBILE_MENU', 'mobile-menu.html'], ['FOOTER', 'footer.html'], ['CONSENT', 'consent.html']]) {
    layout = layout.replaceAll('<!-- ' + token + ' -->', shared(file));
  }
  const editable = (name, content) => '<!-- END GENERATED SHELL -->\n<!-- BEGIN ' + name + ' -->\n' + content + '\n<!-- END ' + name + ' -->\n<!-- BEGIN GENERATED SHELL -->';
  layout = layout.replace('<!-- PAGE_CONTENT -->', editable('PAGE CONTENT', body));
  layout = layout.replace('<!-- STICKY_CONTENT -->', editable('PAGE STICKY CONTENT', sticky));
  return metadata[0] + '\n<!-- BEGIN GENERATED SHELL -->\n' + layout + '\n<!-- END GENERATED SHELL -->';
}

function outputs() {
  const result = new Map();
  const folders = fs.readdirSync(root).filter(name => name.startsWith('storefront-')).sort();
  for (const folder of folders) {
    const files = fs.readdirSync(path.join(root, folder)).filter(name => name.endsWith('.dc.html'));
    if (files.length !== 1) throw new Error('Expected one template in ' + folder);
    const filename = path.join(root, folder, files[0]);
    let html = fs.readFileSync(filename, 'utf8');
    html = replaceScriptRegion(html, 'GENERATED SHARED LOGIC', sharedLogic);
    html = renderPageCopy(html, folder);
    html = renderPageLogic(html, folder);
    html = renderTenantProp(html, folder);
    if (folder !== 'storefront-site') {
      html = html.replace(/<x-dc>\n[\s\S]*?\n<\/x-dc>/, () => '<x-dc>\n' + renderShell(html) + '\n</x-dc>');
    }
    result.set(filename, html);
  }
  return result;
}

function generate(check = false) {
  // Read and validate all pages before writing any output.
  const result = outputs(), stale = [];
  for (const [filename, content] of result) {
    if (fs.existsSync(filename) && fs.readFileSync(filename, 'utf8') === content) continue;
    stale.push(path.relative(root, filename));
    if (!check) fs.writeFileSync(filename, content);
  }
  if (check && stale.length) throw new Error('Generated files are stale. Run node templates/_build/generate.cjs:\n' + stale.join('\n'));
  return stale.length;
}

module.exports = {sharedLogic, outputs, generate};
if (require.main === module) {
  try {
    const check = process.argv.includes('--check');
    const count = generate(check);
    console.log(check ? 'All generated sections are current.' : 'Updated ' + count + ' generated files; page content preserved.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
