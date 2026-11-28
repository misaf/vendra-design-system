// Page behavior. Edit here, then run npm run build.
import React from 'react';
import {VF_NAV} from '../../../platform/browser/page-focus.js';
import {vfCopy} from './copy.js';
import {vfProductImage, vfProductSub, vfSearchProducts} from '../catalog.js';
import {vfShell} from '../../shell/shell-props.js';
import {vfPageRoute, vfRouteUrl} from '../../shell/routing.js';
import {usePageLogic} from '../../shell/page-state.js';
import {useStorefrontPage} from '../../shell/page-lifecycle.js';
import {vfSelectItem, vfViewList} from '../../../platform/browser/list-tracking.js';
import {vfRuntime} from '../../../platform/browser/runtime.js';
// Results update as the customer types; a search (and the result list it shows) is reported once
// the typing settles. A query that arrives with the address (a link, a reload, Back/Forward) shows
// its results at once, so their list is reported at once too.
const VF_SEARCH_SETTLE_MS = 1000;
export function useSearch(props) {
  const {go, store} = props;
  const route = vfPageRoute(props);
  const [previewQuery, setPreviewQuery] = React.useState(() => route.q || '');
  const query = go ? route.q || '' : previewQuery;
  const page = usePageLogic(props);
  useStorefrontPage(page, 'search');

  const pending = React.useRef(null);
  const listedQuery = React.useRef('');
  const cancelPending = React.useCallback(() => {
    if (pending.current) clearTimeout(pending.current.timer);
    pending.current = null;
  }, []);
  const reportList = React.useCallback((text, results) => {
    const key = text.trim().toLowerCase();
    if (!key || key === listedQuery.current) return;
    listedQuery.current = key;
    vfViewList('search', results);
  }, []);

  React.useEffect(() => {
    if (pending.current?.text === query) return;
    cancelPending();
    reportList(query, vfSearchProducts(query));
  }, [query, cancelPending, reportList]);
  React.useEffect(() => cancelPending, [cancelPending]);

  const S = vfShell(page, 'search');
  const L = S.lang;
  const q = query.trim().toLowerCase();
  const C = vfCopy(S);
  const results = vfSearchProducts(query);
  const pop = C.popularTerms;
  const change = (value, delay = VF_SEARCH_SETTLE_MS) => {
    cancelPending();
    if (value.trim()) {
      const timer = setTimeout(() => {
        pending.current = null;
        const results = vfSearchProducts(value);
        vfRuntime.track.event('search', {search_term: value, results: results.length});
        reportList(value, results);
      }, delay);
      pending.current = {text: value, timer};
    }
    if (go) go({...route, view: 'search', lang: L, q: value}, true);
    else setPreviewQuery(value);
  };
  return {
    ...S,
    t: {
      ...S.t,
      ...C,
      tryAgain: C.labels.tryAnotherSearch,
      browse: C.labels.browseTheShop
    },
    clearSearch: () => {
      change('');
      VF_NAV.focusById('vf-q');
    },
    closeHref: vfRouteUrl({
      ...store?.searchReturn,
      view: store?.searchReturn?.view || 'home',
      lang: L
    }),
    q: query,
    setQ: change,
    empty: !q,
    hasResults: results.length > 0,
    noResults: !!q && !results.length,
    countLabel: C.resultCount(results.length),
    popular: pop.map(l => ({
      label: l,
      pick: () => change(l, 0)
    })),
    results: results.map((p, index) => ({
      ...S.productLink(p.id),
      select: vfSelectItem('search', p, index),
      image: vfProductImage(p, L),
      name: p.id,
      sub: vfProductSub(p, L),
      price: S.m(p.price)
    }))
  };
}
