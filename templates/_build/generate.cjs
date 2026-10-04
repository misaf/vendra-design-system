// Regenerate shared sections without touching page content.
// Run from anywhere: node /path/to/templates/_build/generate.cjs [--check]
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const shared = name => fs.readFileSync(path.join(root, '_shared', name), 'utf8').trimEnd();
const sharedLogic = ['store-config.js', 'delivery.js', 'catalog.js', 'translations/shell.js', 'translations/categories.js', 'translations/time.js', 'storefront.js']
  .map(name => '// Source: templates/_shared/' + name + '\n' + shared(name)).join('\n\n') + '\n';

function region(source, name, syntax = 'html') {
  const begin = syntax === 'html' ? '<!-- BEGIN ' + name + ' -->' : '// BEGIN ' + name;
  const end = syntax === 'html' ? '<!-- END ' + name + ' -->' : '// END ' + name;
  const start = source.indexOf(begin), finish = source.indexOf(end);
  if (start < 0 || finish < start || source.indexOf(begin, start + begin.length) >= 0) {
    throw new Error('Missing or duplicate region: ' + name);
  }
  return {start, end: finish + end.length, content: source.slice(start + begin.length, finish).replace(/^\n|\n$/g, '')};
}

function renderShell(source) {
  const metadata = source.match(/<!-- @template[^\n]*-->/);
  if (!metadata) throw new Error('Missing @template metadata');
  const body = region(source, 'PAGE CONTENT').content;
  const sticky = region(source, 'PAGE STICKY CONTENT').content;
  let layout = shared('layout.html');
  for (const [token, file] of [['DESKTOP_HEADER', 'header-desktop.html'], ['MOBILE_HEADER', 'header-mobile.html'], ['MOBILE_MENU', 'mobile-menu.html'], ['FOOTER', 'footer.html']]) {
    layout = layout.replace('<!-- ' + token + ' -->', shared(file));
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
    const logic = region(html, 'GENERATED SHARED LOGIC', 'js');
    html = html.slice(0, logic.start) + '// BEGIN GENERATED SHARED LOGIC\n' + sharedLogic + '// END GENERATED SHARED LOGIC' + html.slice(logic.end);
    const copyFile = folder + '/copy.js';
    if (folder !== 'storefront-site' && !fs.existsSync(path.join(root, copyFile))) {
      throw new Error('Missing page copy source: ' + copyFile);
    }
    if (fs.existsSync(path.join(root, copyFile))) {
      const generated = '// BEGIN GENERATED PAGE COPY\n// Source: templates/' + copyFile + '\n' + (['storefront-journal','storefront-post'].includes(folder) ? '// Source: templates/_shared/translations/journal-content.js\n' + shared('translations/journal-content.js') + '\n\n' : '') + fs.readFileSync(path.join(root, copyFile), 'utf8').trimEnd() + '\n// END GENERATED PAGE COPY\n\n';
      if (html.includes('// BEGIN GENERATED PAGE COPY')) {
        const copy = region(html, 'GENERATED PAGE COPY', 'js');
        html = html.slice(0, copy.start) + generated.trimEnd() + html.slice(copy.end);
      } else {
        html = html.replace('// PAGE LOGIC —', generated + '// PAGE LOGIC —');
      }
    }
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
