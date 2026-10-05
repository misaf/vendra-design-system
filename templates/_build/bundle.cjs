// _ds_bundle.js is compiled by the Claude Design self-check, not by this build. Its header
// records a sha256 (first 12 hex) of every source it compiled, so drift is exact, not mtime-based.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

function sources(repo, folder) {
  return fs.readdirSync(path.join(repo, folder), {withFileTypes: true}).flatMap(entry => {
    const relative = folder + '/' + entry.name;
    if (entry.isDirectory()) return sources(repo, relative);
    return /\.(js|jsx)$/.test(entry.name) ? [relative] : [];
  });
}

function staleBundleSources(repo = path.resolve(__dirname, '../..')) {
  const bundle = path.join(repo, '_ds_bundle.js');
  const header = fs.readFileSync(bundle, 'utf8').split('\n', 1)[0].match(/^\/\* @ds-bundle: (.*) \*\/$/);
  if (!header) return ['_ds_bundle.js has no @ds-bundle header'];
  const recorded = JSON.parse(header[1]).sourceHashes || {};
  const hash = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(repo, file))).digest('hex').slice(0, 12);
  const changed = Object.entries(recorded).filter(([file, sum]) => !fs.existsSync(path.join(repo, file)) || hash(file) !== sum).map(([file]) => file);
  const added = sources(repo, 'components').filter(file => !(file in recorded));
  return [...changed, ...added].sort();
}

function bundleMessage(stale) {
  return '_ds_bundle.js is stale for ' + stale.length + ' source file(s): ' + stale.join(', ') + '. Run the Claude Design self-check (check_design_system) to recompile it.';
}

module.exports = {staleBundleSources, bundleMessage};
