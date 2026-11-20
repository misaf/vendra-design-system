// Where the storefront design system lives in the repository. Tools name it from here.
import path from 'node:path';

const repo = path.resolve(import.meta.dirname, '..');
// Repo-relative, with / separators.
const uiFolder = 'ui';
const componentsFolder = uiFolder + '/components';

const uiRoot = path.join(repo, uiFolder);

export {repo, componentsFolder, uiFolder, uiRoot};
