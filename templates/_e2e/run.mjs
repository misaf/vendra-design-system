// Keep the usual local/update command complete while CI can run the two suites separately.
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const cwd = fileURLToPath(new URL('../', import.meta.url));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const targets = ['build', 'dev'].includes(process.env.E2E_TARGET)
  ? [process.env.E2E_TARGET]
  : ['build', 'dev'];
let status = 0;
for (const target of targets) {
  const result = spawnSync(
    npm,
    ['run', `test:e2e:${target}`, '--', '--pass-with-no-tests', ...process.argv.slice(2)],
    {
      cwd,
      stdio: 'inherit'
    }
  );
  if (result.error) throw result.error;
  status ||= result.status ?? 1;
  if (result.signal) break;
}
process.exit(status);
