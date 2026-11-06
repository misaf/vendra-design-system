import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';

test.beforeEach(({}, info) => test.skip(info.project.name !== 'desktop', 'viewport plays no part'));

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
        // The complete shell's initial layout. Prerendered HTML can expose the header while
        // the parser is still reading the content and bottom bar that follow it.
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
        const recordFirstLayout = () => {
          if (
            document.readyState === 'loading' ||
            !document.querySelector('.vf-shell-header') ||
            !document.querySelector('.vf-shell-bottom-bar')
          )
            return;
          observer.disconnect();
          document.removeEventListener('DOMContentLoaded', recordFirstLayout);
          window.__firstLayout = window.__shellLayout();
        };
        const observer = new MutationObserver(recordFirstLayout);
        observer.observe(document, {childList: true, subtree: true});
        document.addEventListener('DOMContentLoaded', recordFirstLayout, {once: true});
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
