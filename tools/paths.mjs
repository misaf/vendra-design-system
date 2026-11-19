// Where the storefront design system lives in the repository. Tools name it from here.
import path from 'node:path';

const repo = path.resolve(import.meta.dirname, '..');
// Repo-relative, with / separators.
const designSystemFolder = 'apps/storefront/design-system';
const componentsFolder = designSystemFolder + '/components';

const designSystemRoot = path.join(repo, designSystemFolder);

export {repo, designSystemFolder, componentsFolder, designSystemRoot};
