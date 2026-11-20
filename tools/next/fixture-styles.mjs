// Compile styles for the standalone HTML fixtures served by Next dev.
import fs from 'node:fs';
import path from 'node:path';
import tailwind from '@tailwindcss/postcss';
import postcss from 'postcss';

async function tailwindCss(root) {
  const from = path.join(root, 'src/app/_styles/tailwind.css');
  const {css} = await postcss([tailwind({base: root, optimize: true})]).process(
    fs.readFileSync(from, 'utf8'),
    {from}
  );
  return css;
}

function customCss(root) {
  const styles = path.join(root, 'src/app/_styles');
  const entry = fs.readFileSync(path.join(styles, 'custom.css'), 'utf8');
  const css = entry.replace(
    /@import ["'](\.\.?\/[^"']+\.css)["']\s+layer\(vendra\.components\);/g,
    (_, source) => {
      const file = path.resolve(styles, source);
      const label = path.relative(root, file).split(path.sep).join('/');
      // Relative url()s are written from the source file; rebase them for the public fixture.
      const rebased = fs
        .readFileSync(file, 'utf8')
        .replace(/url\((['"]?)(\.\.?\/[^'")]+)\1\)/g, (match, quote, target) => {
          const runtime = path.join(root, 'public/_runtime');
          const moved = path.relative(runtime, path.resolve(path.dirname(file), target));
          return 'url(' + quote + moved.split(path.sep).join('/') + quote + ')';
        });
      return '\n/* Source: ' + label + ' */\n' + rebased;
    }
  );
  if (/@(?:apply|theme|source|import)\b/.test(css))
    throw new Error('Custom CSS must contain plain CSS only.');
  return '@layer vendra.components {\n' + css + '\n}\n';
}
export {customCss, tailwindCss};
