// Where the @vendra/design-system package lives in the repository. Tools name it from here.
const path = require('node:path');

const repo = path.resolve(__dirname, '..');
// Repo-relative, with / separators.
const packageFolder = 'packages/design-system';
const componentsFolder = packageFolder + '/components';

module.exports = {
  repo,
  packageFolder,
  componentsFolder,
  packageRoot: path.join(repo, packageFolder)
};
