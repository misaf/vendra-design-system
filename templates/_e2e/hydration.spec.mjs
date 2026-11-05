import {test, expect} from '@playwright/test';
import {createRequire} from 'node:module';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {ROOT} from './helpers.mjs';
import {componentNames, componentSamples} from './fixtures/component-samples.js';

// The package renders on the server, then the app hydrates it in the browser. Any difference
// between the two (an id, a locale-dependent label, a date) makes React throw the server HTML
// away or log a mismatch. Both sides use dist/, and the same props.
const FIXTURE = '/templates/_e2e/fixtures/hydration.html';
const require = createRequire(path.join(ROOT, 'package.json'));
const React = require('react');
const {renderToString} = require('react-dom/server');

test.beforeEach(({}, info) => test.skip(info.project.name !== 'desktop', 'viewport plays no part'));

for (const lang of ['en', 'fa'])
  test(`every component hydrates its server HTML (${lang})`, async ({page}) => {
    const ds = await import(pathToFileURL(path.join(ROOT, 'dist/index.js')).href);
    const html = renderToString(componentSamples(ds, React, lang));
    for (const name of componentNames(ds)) expect(html).toContain(`data-component="${name}"`);
    await page.goto(FIXTURE);
    await page.waitForFunction(() => window.hydrationReady);
    const problems = await page.evaluate(
      ([html, lang]) => window.hydrateSamples(html, lang),
      [html, lang]
    );
    expect(problems).toEqual([]);
    await expect(page.locator('[data-component=Price]')).toContainText('۴۹۰٬۰۰۰ تومان');
  });
