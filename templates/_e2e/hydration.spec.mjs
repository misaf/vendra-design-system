import {test, expect} from '@playwright/test';
import {createRequire} from 'node:module';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {ROOT, openSite} from './helpers.mjs';
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

// The storefront picks its phone, tablet or desktop layout in CSS, so the first paint is already the
// final layout: the header variant, its height and the bottom bar never change once the app has
// loaded, and none of the shell's boxes shifts. (Text inside them may still move when a web font
// swaps in, e.g. the centred brand; that is not a layout change.)
const SHELL_BOXES =
  '.vf-shell-header, .vf-shell-header > *, .vf-shell-bottom-bar, .vf-shell-bottom-bar > *';
for (const lang of ['en', 'fa'])
  for (const width of [320, 375, 768, 1024, 1280])
    test(`the storefront's first paint matches its loaded layout at ${width}px (${lang})`, async ({
      page
    }) => {
      await page.addInitScript(SHELL_BOXES => {
        window.__shellShifts = [];
        new PerformanceObserver(list => {
          for (const entry of list.getEntries())
            for (const source of entry.sources || [])
              if (source.node?.matches?.(SHELL_BOXES))
                window.__shellShifts.push(source.node.className);
        }).observe({type: 'layout-shift', buffered: true});
        // The shell as the browser first lays it out, read as soon as the header exists.
        window.__shellLayout = () => {
          const header = document.querySelector('.vf-shell-header');
          const bar = document.querySelector('.vf-shell-bottom-bar');
          return {
            header: header.offsetHeight,
            variants: [...header.children]
              .filter(c => c.offsetHeight)
              .map(c => c.className.split(' ')[0]),
            tabs: !!bar?.querySelector('.ag-tabbar')?.offsetHeight
          };
        };
        new MutationObserver((_, observer) => {
          if (!document.querySelector('.vf-shell-header')) return;
          observer.disconnect();
          window.__firstLayout = window.__shellLayout();
        }).observe(document, {childList: true, subtree: true});
      }, SHELL_BOXES);
      await page.setViewportSize({width, height: 900});
      await openSite(page, 'home', lang);
      const [first, loaded, shifts] = await page.evaluate(() => [
        window.__firstLayout,
        window.__shellLayout(),
        window.__shellShifts
      ]);
      expect(first).toEqual(loaded);
      expect(loaded.variants).toEqual([
        width >= 1024 ? 'vf-shell-desktop-header' : 'vf-shell-mobile-header'
      ]);
      expect(loaded.tabs).toBe(width < 768);
      expect(shifts).toEqual([]);
    });
