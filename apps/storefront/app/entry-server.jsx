// The storefront rendered to HTML for one address, at build time (build/vite.config.mjs prerenders
// every public route with it). It runs in Node: no window and no storage, so pages render what a
// first-time visitor sees, and app/main.jsx hydrates that markup for such a visitor.
import React from 'react';
import {renderToPipeableStream} from 'react-dom/server';
import {vfServerPage, vfServerRender} from '../shared/platform/environment.js';
import {vfPageBrandHtml, vfPageHead} from '../shared/services/page-lifecycle.js';
import {vfReadRoute} from '../shared/services/routing.js';
import {VF_SEO} from '../shared/services/seo.js';
import {vfLocale} from '../shared/domain/store-config.js';
import {loadPage} from './pages.js';

const ENTITIES = {amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' '};

// The text of the first <h1> inside <main>, as the browser's innerText reads it (page-lifecycle.js
// titles the page with it): a line break is a space, and runs of space become one.
export function mainHeading(html) {
  const main = html.indexOf('<main');
  const heading = /<h1\b[^>]*>([\s\S]*?)<\/h1>/.exec(main < 0 ? '' : html.slice(main));
  if (!heading) return '';
  return heading[1]
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&(#x?[\da-f]+|\w+);/gi, (entity, name) =>
      name[0] === '#'
        ? String.fromCodePoint(
            name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : +name.slice(1)
          )
        : (ENTITIES[name] ?? entity)
    )
    .replace(/\s+/g, ' ')
    .trim();
}

// Renders the click-through site at `url` (the address's path, with the build's base) once every
// lazy page has loaded, at `time` (milliseconds: what vfNow returns). Returns the markup for #root,
// the <head> tags (VF_SEO.headHtml), the page's language and direction and the view it showed.
export async function render(url, {base = '/', origin = '', time = Date.now()} = {}) {
  vfServerRender({url, base, origin, time});
  try {
    const route = vfReadRoute(url);
    const site = await loadPage('site');
    // The site shows a route once its page's code is in; load it first, as the browser does.
    await loadPage(route.view);
    const html = await new Promise((resolve, reject) => {
      // The stream's destination, as React writes to it: chunks in, then the end.
      let markup = '';
      const decoder = new TextDecoder();
      const sink = {
        write(chunk) {
          markup += typeof chunk === 'string' ? chunk : decoder.decode(chunk, {stream: true});
          return true;
        },
        end() {
          resolve(markup + decoder.decode());
        },
        on() {},
        once() {},
        emit() {}
      };
      const Site = site.default;
      const stream = renderToPipeableStream(<Site {...site.defaults} />, {
        onAllReady() {
          stream.pipe(/** @type {any} */ (sink));
        },
        onShellError: reject,
        onError: reject
      });
    });
    const page = vfServerPage();
    if (!page) throw new Error('No storefront page rendered at ' + url);
    const locale = vfLocale(page.props.lang);
    const lang = locale.code;
    return {
      html,
      head: VF_SEO.headHtml(vfPageHead(page, mainHeading(html))) + '\n' + vfPageBrandHtml(page),
      lang,
      dir: locale.dir,
      view: page._vfPage
    };
  } finally {
    vfServerRender(null);
  }
}
