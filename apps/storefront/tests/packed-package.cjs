// Exercise the real publish payload without registry installs or lifecycle scripts. Consumers
// live under the peer app's node_modules so React 18 and the React-19 job keep their own peers.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const repo = path.resolve(__dirname, '../../..');

function filesUnder(folder, prefix = '') {
  return fs.readdirSync(folder, {withFileTypes: true}).flatMap(entry => {
    const name = prefix + entry.name;
    return entry.isDirectory() ? filesUnder(path.join(folder, entry.name), name + '/') : [name];
  });
}

function createPackedConsumer(peers = repo) {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'vendra-pack-'));
  let app;
  const cleanup = () => {
    if (app) fs.rmSync(app, {recursive: true, force: true});
    fs.rmSync(temporary, {recursive: true, force: true});
  };
  try {
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const [packed] = JSON.parse(
      execFileSync(
        npm,
        [
          'pack',
          '--ignore-scripts',
          '--offline',
          '--json',
          '--cache',
          path.join(temporary, 'cache'),
          '--pack-destination',
          temporary
        ],
        {cwd: repo, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024}
      )
    );
    app = fs.realpathSync(fs.mkdtempSync(path.join(peers, 'node_modules/.vendra-packed-test-')));
    fs.writeFileSync(
      path.join(app, 'package.json'),
      JSON.stringify({name: 'vendra-packed-consumer', private: true, type: 'module'})
    );
    const manifest = JSON.parse(fs.readFileSync(path.join(repo, 'package.json'), 'utf8'));
    const installed = path.join(app, 'node_modules', manifest.name);
    fs.mkdirSync(installed, {recursive: true});
    execFileSync('tar', [
      '-xzf',
      path.join(temporary, packed.filename),
      '--strip-components',
      '1',
      '-C',
      installed
    ]);
    const files = new Set(packed.files.map(file => file.path));
    for (const file of files) {
      assert.ok(
        file.startsWith('dist/') ||
          /^(package\.json|readme(?:\..*)?|licen[cs]e(?:\..*)?)$/i.test(file),
        file + ' leaks source or tooling into the package'
      );
      assert.ok(
        fs.readFileSync(path.join(installed, file)).equals(fs.readFileSync(path.join(repo, file))),
        file + ' packed bytes differ from the checkout'
      );
    }
    for (const file of filesUnder(path.join(repo, 'dist')))
      assert.ok(files.has('dist/' + file), 'dist/' + file + ' missing from npm payload');
    return {app, installed, manifest, files, cleanup};
  } catch (error) {
    cleanup();
    throw error;
  }
}

module.exports = {createPackedConsumer};
