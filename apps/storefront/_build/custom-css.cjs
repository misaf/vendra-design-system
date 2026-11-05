// Assemble explicit source imports in cascade order into one runtime stylesheet.
const fs = require('node:fs');
const path = require('node:path');
function customCss(root) {
  const shared = path.join(root, '_shared');
  const entry = fs.readFileSync(path.join(shared, 'custom.css'), 'utf8');
  const css = entry.replace(
    /@import ["'](\.\/[a-z-]+\.css|\.\.\/storefront-[a-z-]+\/styles\.css)["'];/g,
    (_, source) => {
      const file = path.resolve(shared, source);
      const label = path.relative(root, file).split(path.sep).join('/');
      return '\n/* Source: ' + label + ' */\n' + fs.readFileSync(file, 'utf8');
    }
  );
  if (/@(?:apply|theme|source|import)\b/.test(css))
    throw new Error('Custom CSS must contain plain CSS only.');
  // The page CSS joins the components' cascade layer: it was written to meet the ag-* classes on
  // specificity (contextual exceptions win, generic heading rules don't), which only holds inside
  // one layer. app/theme.js loads Tailwind first, so its utilities sit under both.
  return '@layer vendra.components {\n' + css + '\n}\n';
}
module.exports = {customCss};
