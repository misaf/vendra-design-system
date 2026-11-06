// Assemble explicit source imports in cascade order into one runtime stylesheet.
const fs = require('node:fs');
const path = require('node:path');
function customCss(root) {
  const styles = path.join(root, 'shared', 'styles');
  const entry = fs.readFileSync(path.join(styles, 'custom.css'), 'utf8');
  const css = entry.replace(
    /@import ["'](\.\/[a-z-]+\.css|\.\.\/ui\/[a-z-]+\.css|\.\.\/\.\.\/pages\/[a-z-]+\/styles\.css)["'];/g,
    (_, source) => {
      const file = path.resolve(styles, source);
      const label = path.relative(root, file).split(path.sep).join('/');
      // Relative url()s are written from the source file; rebase them onto _runtime/custom.css.
      const rebased = fs
        .readFileSync(file, 'utf8')
        .replace(/url\((['"]?)(\.\.?\/[^'")]+)\1\)/g, (match, quote, target) => {
          const runtime = path.join(root, '_runtime');
          const moved = path.relative(runtime, path.resolve(path.dirname(file), target));
          return 'url(' + quote + moved.split(path.sep).join('/') + quote + ')';
        });
      return '\n/* Source: ' + label + ' */\n' + rebased;
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
