// Keep the gallery and fixture URLs stable while source files live with their owners.
const gallery = 'src/design-system/gallery';
const communicationsPreviews = 'src/communications/previews';
const emailTemplates = 'src/communications/templates/email/email-templates.js';
const folders = [
  [gallery, 'guidelines'],
  ['src/design-system', 'ui'],
  [communicationsPreviews, 'communications'],
  ['.generated', '_runtime'],
  ['public/assets', 'assets']
];

function translate(file, paths) {
  for (const [from, to] of paths)
    if (file.startsWith(from + '/')) return to + file.slice(from.length);
  return file;
}

function fixtureOutput(file) {
  if (file === emailTemplates) return 'communications/email-templates.js';
  return translate(file, folders);
}

function fixtureSource(url) {
  if (url === 'communications/email-templates.js') return emailTemplates;
  return translate(
    url,
    folders.map(([source, output]) => [output, source])
  );
}

export {communicationsPreviews, emailTemplates, fixtureOutput, fixtureSource, gallery};
