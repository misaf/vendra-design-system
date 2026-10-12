// A storefront page's copy and logic as one classic script, for running in a vm context that already
// holds the shared logic: module imports (React, the runtime, copy, journal content) are dropped
// and exports become plain declarations, as the browser sees them once imported.
const fs = require('node:fs');
const path = require('node:path');
const templates = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(templates, file), 'utf8');
const strip = code =>
  code.replace(/^import [^;]*;\n/gm, '').replace(/^export (const|function|class|let) /gm, '$1 ');

// The page base class the browser builds in app/runtime.jsx.
const vfPageLine = 'const VFPage = vfPageClass(DCLogic);';

function pageScript(folder) {
  const parts = [vfPageLine];
  if (['storefront-journal', 'storefront-post'].includes(folder))
    parts.push(read('_shared/translations/journal-content.js'));
  if (fs.existsSync(path.join(templates, folder, 'copy.js'))) parts.push(read(folder + '/copy.js'));
  parts.push(read(folder + '/logic.js'));
  return parts.map(strip).join('\n\n');
}

module.exports = {pageScript, strip};
