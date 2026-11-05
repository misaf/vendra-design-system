// Keep the usual local/update command complete while CI can run the two suites separately.
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {projectsForTarget} from './playwright.config.mjs';

const cwd = fileURLToPath(new URL('../', import.meta.url));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const targets = ['build', 'dev'].includes(process.env.E2E_TARGET)
  ? [process.env.E2E_TARGET]
  : ['build', 'dev'];
const args = [];
const requested = [];
const input = process.argv.slice(2);
for (let index = 0; index < input.length; index++) {
  const arg = input[index];
  if (arg === '--') {
    args.push(...input.slice(index));
    break;
  }
  if (arg !== '--project' && !arg.startsWith('--project=')) {
    args.push(arg);
    continue;
  }
  const names = arg.startsWith('--project=') ? [arg.slice('--project='.length)] : [];
  // Playwright accepts repeated flags and multiple names after either flag form.
  while (index + 1 < input.length && !input[index + 1].startsWith('-')) names.push(input[++index]);
  if (!names.length || names.some(name => !name)) {
    console.error('--project requires a project name');
    process.exit(1);
  }
  requested.push(...names);
}

const suites = targets.map(target => ({
  target,
  projects: projectsForTarget(target === 'build').map(project => project.name)
}));
const patterns = requested.map(
  name =>
    new RegExp(
      '^' +
        name
          .split('*')
          .map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
          .join('.*') +
        '$',
      'i'
    )
);
const available = [...new Set(suites.flatMap(suite => suite.projects))];
// Reject typos across the selected suites rather than silently skipping every run.
const unknown = requested.filter(
  (name, index) => !name.includes('*') && !available.some(project => patterns[index].test(project))
);
if (
  unknown.length ||
  (requested.length && !available.some(project => patterns.some(pattern => pattern.test(project))))
) {
  console.error(
    `Project(s) ${unknown.length ? unknown.join(', ') : requested.join(', ')} not found. Available projects: ${available.join(', ')}`
  );
  process.exit(1);
}

let status = 0;
for (const {target, projects} of suites) {
  const selected = projects.filter(project => patterns.some(pattern => pattern.test(project)));
  if (requested.length && !selected.length) continue;
  const projectArgs = requested.length ? selected.map(project => `--project=${project}`) : [];
  const result = spawnSync(
    npm,
    ['run', `test:e2e:${target}`, '--', '--pass-with-no-tests', ...projectArgs, ...args],
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
