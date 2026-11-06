// Every page names one canonical address — always with its language, its query in one order, without
// sorting or filters — and its hreflang alternate for its own language is exactly that address.
// Refined shop views (sorted, filtered) are noindex, follow (issue 151).
import assert from 'node:assert/strict';
import {vfServerRender} from '../shared/platform/environment.js';
import {vfPageHead} from '../shared/services/page-lifecycle.js';
import {vfReadRoute} from '../shared/services/routing.js';
import {VF_SEO} from '../shared/services/seo.js';

const origin = 'https://shop.example';
const app = origin + '/apps/storefront/app/';
// The <head> links of the page at `address` (a path under the app, with its query).
function head(address) {
  const url = '/apps/storefront/app/' + address;
  vfServerRender({url, origin});
  try {
    const route = vfReadRoute(url);
    const lang = route.lang || 'en';
    const tags = VF_SEO.headTags(
      vfPageHead({_vfPage: route.view, props: {lang, routeInfo: route}}, 'Heading')
    );
    const canonical = tags.links.find(link => link.rel === 'canonical')?.href;
    const alternates = Object.fromEntries(
      tags.links.filter(link => link.rel === 'alternate').map(link => [link.hreflang, link.href])
    );
    const robots = tags.meta.find(tag => tag.name === 'robots').content;
    return {lang, canonical, alternates, robots};
  } finally {
    vfServerRender(null);
  }
}

const UI_PARAMS = /[?&](sort|min|max|stock|filters|date|qty|size|addons|demo|tenant)=/;
const cases = {
  // address → [canonical (under the app), indexed]
  'fa/shop/boxes/?sort=low&page=2&occasion=birthday': ['fa/shop/boxes/?occasion=birthday', false],
  'en/shop/?occasion=birthday&sort=high': ['en/shop/?occasion=birthday', false],
  'en/shop/?occasion=birthday': ['en/shop/?occasion=birthday', true],
  'en/shop/?page=3': ['en/shop/', true],
  'en/shop/boxes/?min=100000&stock=1&filters=roses,ready&date=2026-11-10': [
    'en/shop/boxes/',
    false
  ],
  'shop/': ['en/shop/', true],
  'shop/boxes/?tenant=default&utm_source=mail': ['en/shop/boxes/', true],
  'en/shop/?demo=loading': ['en/shop/', false],
  'fa/product/VF-7K2M4Q/?qty=2&size=generous&date=2026-11-10': ['fa/product/VF-7K2M4Q/', true],
  'en/journal/?page=2': ['en/journal/?page=2', true],
  'en/policy/privacy/': ['en/policy/privacy/', true],
  '': ['en/', true]
};
for (const [address, [expected, indexed]] of Object.entries(cases)) {
  const {lang, canonical, alternates, robots} = head(address);
  assert.equal(canonical, app + expected, address + ': canonical');
  assert.doesNotMatch(canonical, UI_PARAMS, address + ': no sort or filter in the canonical');
  assert.equal(robots, indexed ? null : 'noindex, follow', address + ': robots');
  if (!indexed) {
    assert.deepEqual(alternates, {}, address + ': a noindex page lists no alternates');
    continue;
  }
  assert.equal(alternates[lang], canonical, address + ': hreflang to itself is the canonical');
  const other = lang === 'en' ? 'fa' : 'en';
  assert.equal(
    alternates[other],
    canonical.replace('/app/' + lang + '/', '/app/' + other + '/'),
    address + ': the other language differs only in its language'
  );
  assert.equal(alternates['x-default'], alternates.en, address + ': x-default is English');
}

// The same page spelt with its query in another order has the same canonical address.
assert.equal(
  head('en/journal/?page=2&demo=').canonical,
  head('en/journal/?demo=&page=2').canonical
);
// The not-found screen answers many addresses and names none of them.
assert.equal(head('en/nowhere/').canonical, undefined, 'not found: no canonical');

console.log(`Passed canonical and hreflang addresses for ${Object.keys(cases).length} pages.`);
