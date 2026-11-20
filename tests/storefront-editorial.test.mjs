import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

// The sample sitemap lists every indexed address the build writes a page for.
import('../tools/build/routes.mjs').then(({storefrontSitemap}) => {
  assert.equal(
    read('deployment/sitemap.xml'),
    storefrontSitemap('https://example.test'),
    'deployment/sitemap.xml is stale: regenerate it from build/routes.mjs'
  );
  console.log('Passed the sitemap sample against the storefront routes.');
});
// Each sitemap entry names the same page in every language (hreflang, x-default English) and
// articles carry their publication date as lastmod, which matches the date each article shows.
Promise.all([
  import('../tools/build/routes.mjs'),
  import('../src/storefront/content/journal-content.js')
]).then(([{storefrontSitemap}, {VF_POSTS}]) => {
  const sitemap = storefrontSitemap('https://shop.example');
  const entries = sitemap.match(/<url>[\s\S]*?<\/url>/g);
  for (const entry of entries) {
    const loc = entry.match(/<loc>([^<]+)<\/loc>/)[1];
    const alternates = Object.fromEntries(
      [...entry.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map(match => match.slice(1))
    );
    assert.deepEqual(Object.keys(alternates), ['en', 'fa', 'x-default'], loc + ' alternates');
    assert.ok(Object.values(alternates).includes(loc), loc + ' lists itself as an alternate');
    assert.equal(alternates['x-default'], alternates.en, loc + ' x-default is English');
    assert.equal(alternates.fa, alternates.en.replace('/en/', '/fa/'));
  }
  const months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
  for (const post of VF_POSTS) {
    const [day, month, year] = post.en[3].split(' ');
    assert.equal(
      post.publishedAt,
      year + '-' + String(months.indexOf(month) + 1).padStart(2, '0') + '-' + day.padStart(2, '0'),
      post.id + ' publishedAt matches its shown date'
    );
    for (const lang of ['en', 'fa'])
      assert.ok(
        sitemap.includes(
          '<loc>https://shop.example/' +
            lang +
            '/journal/' +
            post.id +
            '/</loc>\n  <lastmod>' +
            post.publishedAt +
            '</lastmod>'
        ),
        post.id + ' has its lastmod in ' + lang
      );
  }
  console.log('Passed sitemap hreflang alternates and article lastmod.');
});
// Every listed article carries its own text (#197): no post borrows another's words or the post
// page's copy, and retired articles redirect, in the router and on the server, to listed posts.
Promise.all([
  import('../src/storefront/content/journal-content.js'),
  import('../src/storefront/content/journal-moved.js'),
  import('../src/storefront/shell/routing.js')
]).then(([{VF_POSTS}, {VF_POST_MOVED}, {vfReadRoute}]) => {
  const ids = VF_POSTS.map(post => post.id);
  assert.equal(new Set(ids).size, ids.length, 'post ids are unique');
  for (const lang of ['en', 'fa']) {
    const seen = new Map();
    for (const post of VF_POSTS) {
      const classic = post.classic?.[lang];
      const texts = post.body
        ? post.body[lang]
            .filter(([type]) => type !== 'img')
            .flatMap(([, value]) => (Array.isArray(value) ? value : [value]))
        : classic
          ? [...classic.before, classic.quote, classic.heading, ...classic.after]
          : [];
      assert.ok(texts.length, post.id + ' has its own article text in ' + lang);
      for (const text of texts) {
        assert.ok(typeof text === 'string' && text.trim(), post.id + ' text is not empty');
        if (text.length > 30)
          assert.ok(
            !seen.has(text),
            post.id + ' shares text with ' + seen.get(text) + ' in ' + lang + ': ' + text
          );
        seen.set(text, post.id);
      }
      const title = post[lang][0];
      assert.equal(
        VF_POSTS.filter(other => other[lang][0] === title).length,
        1,
        post.id + ' has its own title in ' + lang
      );
    }
  }
  const copy = read('src/storefront/content/journal/post/copy.js');
  for (const word of ['autumn', 'October', 'پاییز', 'مهر'])
    assert.ok(!copy.includes(word), 'the post page copy carries no article text: ' + word);
  const nginx = read('deployment/nginx.conf');
  for (const [old, next] of Object.entries(VF_POST_MOVED)) {
    assert.ok(!ids.includes(old), old + ' is retired from the journal list');
    assert.ok(ids.includes(next), old + ' moves to a listed post');
    for (const lang of ['en', 'fa'])
      assert.equal(
        vfReadRoute(`/${lang}/journal/${old}/`).post,
        next,
        old + ' opens ' + next + ' in ' + lang
      );
    assert.ok(
      nginx.includes(`rewrite ^/(en|fa)/journal/${old}/?$ /$1/journal/${next}/ permanent;`),
      'nginx redirects ' + old + ' to ' + next
    );
  }
  console.log('Passed journal articles: own text, no duplicates, retired posts redirect.');
});
