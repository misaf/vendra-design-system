// Where the @vendra/design-system package lives in the repository. Tools name it from here.
import path from 'node:path';

const repo = path.resolve(import.meta.dirname, '..');
// Repo-relative, with / separators.
const packageFolder = 'packages/design-system';
const componentsFolder = packageFolder + '/components';

const packageRoot = path.join(repo, packageFolder);

export {repo, packageFolder, componentsFolder, packageRoot};
