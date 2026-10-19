// Runs the browser tests on a remote Linux server, inside the same Playwright image as CI, so
// its screenshots match the -linux.png baselines. Optional: test:e2e keeps running locally.
//
//   VENDRA_E2E_HOST=user@server npm --prefix templates run test:e2e:remote -- [playwright args]
//
// VENDRA_E2E_HOST  ssh destination (required; an alias from ~/.ssh/config works)
// VENDRA_E2E_DIR   checkout folder on the server (default: vendra-e2e in the remote home)
// E2E_WORKERS      Playwright workers on the server (default: 8)
// E2E_TARGET=build runs test:e2e:build instead.
//
// The checkout is synced with rsync (ignored files stay local), node_modules lives in a Docker
// volume and is reinstalled only when package-lock.json changes. Afterwards the report,
// test-results and any -linux.png baselines written by --update-snapshots come back here.
import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const host = process.env.VENDRA_E2E_HOST;
const remoteDir = process.env.VENDRA_E2E_DIR || 'vendra-e2e';
const workers = process.env.E2E_WORKERS || '8';
const target = process.env.E2E_TARGET === 'build' ? 'test:e2e:build' : 'test:e2e';
const playwrightVersion = JSON.parse(
  readFileSync(new URL('../../node_modules/@playwright/test/package.json', import.meta.url))
).version;
const image = `mcr.microsoft.com/playwright:v${playwrightVersion}-noble`;

if (!host) {
  console.error('Set VENDRA_E2E_HOST to the server, for example VENDRA_E2E_HOST=me@build-box.');
  process.exit(2);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {stdio: 'inherit', ...options});
  if (result.error) throw result.error;
  return result.status ?? 1;
}

function shellQuote(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

const e2eDir = 'templates/_e2e';
const upload = run('rsync', [
  '-az',
  '--delete',
  '--exclude=.git',
  '--filter=:- .gitignore',
  root,
  `${host}:${remoteDir}/`
]);
if (upload !== 0) process.exit(upload);

const playwrightArgs = process.argv.slice(2).map(shellQuote).join(' ');
// Runs as root in the container; the files it writes are handed back to the ssh user.
const inContainer = [
  'set -e',
  'lock=$(sha256sum package-lock.json | cut -c1-64)',
  'if [ "$(cat node_modules/.lock-hash 2>/dev/null)" != "$lock" ]; then npm ci && echo "$lock" > node_modules/.lock-hash; fi',
  'status=0',
  `npm --prefix templates run ${target} -- ${playwrightArgs} || status=$?`,
  `chown -R "$OWNER" ${e2eDir}`,
  'exit $status'
].join('\n');
const onServer = [
  `cd ${shellQuote(remoteDir)}`,
  `docker run --rm --ipc=host -e CI=true -e HOME=/root -e E2E_WORKERS=${shellQuote(workers)} \\`,
  '  -e OWNER="$(id -u):$(id -g)" -v "$PWD":/work -v vendra-e2e-node-modules:/work/node_modules \\',
  `  -w /work ${image} sh -c ${shellQuote(inContainer)}`
].join('\n');
const status = run('ssh', [host, 'bash -s'], {
  input: onServer,
  stdio: ['pipe', 'inherit', 'inherit']
});

const download = (from, to, extra = []) =>
  run('rsync', ['-az', ...extra, `${host}:${remoteDir}/${from}`, `${root}${to}`]);
download(`${e2eDir}/__screenshots__/`, `${e2eDir}/__screenshots__/`, [
  '--include=*-linux.png',
  '--exclude=*'
]);
download(`${e2eDir}/playwright-report/`, `${e2eDir}/playwright-report/`, ['--delete']);
download(`${e2eDir}/test-results/`, `${e2eDir}/test-results/`, ['--delete']);
console.log(`\nReport: ${e2eDir}/playwright-report/index.html (exit ${status})`);
process.exit(status);
