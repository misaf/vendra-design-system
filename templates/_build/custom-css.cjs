// Assemble explicit source imports in cascade order into one runtime stylesheet.
const fs = require('node:fs');
const path = require('node:path');
function customCss(root) {
  const shared = path.join(root, '_shared');
  const entry = fs.readFileSync(path.join(shared, 'custom.css'), 'utf8');
  const css = entry.replace(/@import "(\.\/[a-z-]+\.css|\.\.\/storefront-[a-z-]+\/styles\.css)";/g, (_, source) => {
    const file = path.resolve(shared, source);
    const label = path.relative(root, file).split(path.sep).join('/');
    return '\n/* Source: ' + label + ' */\n' + fs.readFileSync(file, 'utf8');
  });
  if (/@(?:apply|theme|source|import)\b/.test(css)) throw new Error('Custom CSS must contain plain CSS only.');
  return css;
}
module.exports = {customCss};
