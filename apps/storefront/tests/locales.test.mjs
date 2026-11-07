// The configured languages (utils/locales.js LOCALES) in one place: every component's built-in
// wording covers each of them with the same keys as English, and the locale helpers look languages
// up instead of comparing with 'en' / 'fa'.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {
  LOCALES,
  localeConfig,
  plural
} from '../../../packages/design-system/components/utils/locales.js';
import {format} from '../../../packages/design-system/components/utils/format.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const components = path.join(root, 'packages/design-system/components');

// Each language's settings are complete and keyed by their own code.
for (const [code, locale] of Object.entries(LOCALES)) {
  assert.equal(locale.code, code, code + ' is keyed by its code');
  for (const key of ['tag', 'label', 'dir', 'digits', 'calendar', 'font'])
    assert.ok(locale[key], code + ' sets ' + key);
  assert.ok(['ltr', 'rtl'].includes(locale.dir), code + ' has a writing direction');
  assert.doesNotThrow(() => new Intl.NumberFormat(locale.tag), code + ' has a valid tag');
}
assert.deepEqual(Object.keys(LOCALES), ['en', 'fa'], 'English and Persian stay the defaults');

// Lookups: a region or unknown language resolves, and a tenant table adds a language.
assert.equal(localeConfig('fa-IR').dir, 'rtl');
assert.equal(localeConfig('en-GB').code, 'en');
assert.equal(localeConfig('xx').code, 'en', 'an unknown language falls back to English');
const withArabic = {
  ...LOCALES,
  ar: {
    code: 'ar',
    tag: 'ar-AE',
    label: 'ع',
    dir: 'rtl',
    digits: 'arab',
    calendar: 'gregory',
    font: 'arabic'
  }
};
assert.equal(localeConfig('ar-AE', withArabic).dir, 'rtl', 'a tenant locale is looked up');
assert.equal(localeConfig('ar').code, 'en', 'a language is offered only when configured');

// Plurals follow Intl.PluralRules, not `count === 1`.
const designs = {one: ' design', other: ' designs'};
assert.equal(plural(1, designs), ' design');
assert.equal(plural(0, designs), ' designs');
assert.equal(plural(2, designs), ' designs');
assert.equal(plural(3, {one: 'x', few: 'few', other: 'many'}, 'ar-AE', withArabic), 'few');
assert.equal(plural(3, designs, 'ar-AE', withArabic), ' designs', 'a missing form uses other');

// Formatting still knows English and Persian, and formats other languages by their own code.
assert.equal(format.number(1234, 'en'), '1,234');
assert.equal(format.number(1234, 'fa'), '۱٬۲۳۴');
assert.equal(
  format.number(5, 'ar'),
  new Intl.NumberFormat('ar').format(5),
  'ar formats by its code'
);
assert.equal(format.money(1000, {lang: 'fa'}), '۱٬۰۰۰ تومان');
assert.equal(
  format.money(1000, {
    lang: 'ar',
    currencies: {IRT: {rate: 1, decimals: 0, symbol: '', en: 'Toman', fa: 'تومان', ar: 'تومان'}}
  }),
  new Intl.NumberFormat('ar').format(1000) + ' تومان',
  'a currency names itself in any language it lists'
);

// Every component's messages.js covers every configured language with English's keys.
function shape(value, at = '') {
  if (value === null || typeof value !== 'object') return [at];
  return Object.keys(value)
    .sort()
    .flatMap(key => shape(value[key], at + '.' + key));
}
const files = fs
  .readdirSync(components, {recursive: true})
  .map(file => file.split(path.sep).join('/'))
  .filter(file => file.endsWith('/messages.js') && !file.startsWith('utils/'));
assert.ok(files.length > 20, 'found the components’ messages.js files');
for (const file of files) {
  const {messages} = await import(pathToFileURL(path.join(components, file)).href);
  assert.ok(messages && messages.en, file + ' exports messages with English');
  for (const code of Object.keys(LOCALES)) {
    assert.ok(messages[code], file + ' covers ' + code);
    assert.deepEqual(
      shape(messages[code]),
      shape(messages.en),
      file + ' ' + code + ' wording has the same keys as English'
    );
  }
}
console.log(
  'Passed: ' +
    files.length +
    ' components’ wording covers ' +
    Object.keys(LOCALES).join(', ') +
    '; locale lookups, plurals and formatting follow LOCALES.'
);
