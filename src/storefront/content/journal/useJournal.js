import React from 'react';
import {VF_JCATS, VF_POSTS} from '../journal-content.js';
import {vfJournalImage} from '../journal-images.js';
import {vfSeparator} from '../../pricing/formatting.js';
import {vfCopy} from './copy.js';
import {vfShell} from '../../shell/shell-props.js';
import {vfPageRoute, vfRouteUrl} from '../../shell/routing.js';
import {VF_STORE} from '../../store/store-config.js';
import {searchIndex, matchesSearch} from '../../catalog/search-index.js';
import {usePageLogic} from '../../shell/page-state.js';
import {useStorefrontPage} from '../../shell/page-lifecycle.js';
// Each post's search index per language (searchIndex of its text), built once rather than
// on every keystroke.
const vfPostSearchIndexes = {en: new WeakMap(), fa: new WeakMap()};
function vfPostSearchIndex(post, lang) {
  const indexes = vfPostSearchIndexes[lang];
  if (!indexes.has(post)) indexes.set(post, searchIndex(post[lang].join(' ')));
  return indexes.get(post);
}
export function useJournal(props) {
  const page = usePageLogic(props);
  useStorefrontPage(page, 'journal');
  const [{category, query}, setFilters] = React.useState({category: 'all', query: ''});
  const S = vfShell(page, 'journal');
  const fa = S.fa;
  const L = S.lang;
  const C = vfCopy(S);
  const route = vfPageRoute(props);
  const all = VF_POSTS.filter(
    p =>
      (category === 'all' || p.cat === category) &&
      (!query.trim() || matchesSearch(vfPostSearchIndex(p, L), query))
  ).map(p => {
    const c = VF_JCATS.find(x => x[0] === p.cat);
    return {
      href: vfRouteUrl({
        view: 'post',
        post: p.id,
        lang: L
      }),
      title: p[L][0],
      image: vfJournalImage(p.image),
      excerpt: p[L][1],
      meta: [fa ? c[2] : c[1], p[L][3], p[L][2]].join(vfSeparator(L))
    };
  });
  // One page of posts (?page=2); a page past the end shows the last one.
  const size = VF_STORE.journalPageSize;
  const pageCount = Math.max(1, Math.ceil(all.length / size));
  const current = Math.min(route.page || 1, pageCount);
  const list = all.slice((current - 1) * size, current * size);
  const pageHref = number => vfRouteUrl({view: 'journal', lang: L, page: number});
  // A new filter or search starts again from the first page, replacing the history entry.
  const updateFilters = patch => {
    setFilters(filters => ({...filters, ...patch}));
    if (current > 1) props.go?.({view: 'journal', lang: L}, true);
  };
  return {
    ...S,
    migration: C.migration,
    q: query,
    setQ: value => updateFilters({query: value}),
    clear: () => updateFilters({query: '', category: 'all'}),
    loading: route.demo === 'loading',
    noStories: !all.length,
    t: {
      ...S.t,
      ...C
    },
    cats: [...VF_JCATS, ['updates', 'Updates', 'خبرها']].map(c => ({
      label: fa ? c[2] : c[1],
      on: category === c[0],
      pick: () => updateFilters({category: c[0]})
    })),
    // The first page leads with a featured story; later pages are all in the grid.
    hasLead: route.demo !== 'loading' && current === 1 && list.length > 0,
    lead: list[0] || {},
    rest: route.demo === 'loading' ? [] : current === 1 ? list.slice(1) : list,
    paging: {
      page: current,
      pageCount: route.demo === 'loading' ? 1 : pageCount,
      href: pageHref,
      // In the site, a page changes in place (the router scrolls to the top).
      onChange: props.go ? number => props.go({view: 'journal', lang: L, page: number}) : undefined
    }
  };
}
