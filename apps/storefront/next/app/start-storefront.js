import {loadPage} from '../../app/pages.js';
import {installTenantTheme} from '../../app/tenant-theme.js';
import {vfLanguage} from '../../shared/domain/store-config.js';
import {vfAccountLocale, vfAccountPhone} from '../../shared/domain/account-data.js';
import {vfReadRoute} from '../../shared/services/routing.js';
import {vfApplyTvMode} from '../../shared/services/tv.js';
import '../../app/runtime.js';

export async function startStorefront() {
  installTenantTheme('/');
  vfApplyTvMode();

  const query = new URLSearchParams(location.search);
  const route = vfReadRoute();
  const name = query.get('page') || 'site';
  const preview = name !== 'site' && loadPage(name);
  if (preview) {
    const {default: Page, defaults} = await preview;
    const lang = vfLanguage(query.get('lang') || route.lang || vfAccountLocale() || defaults?.lang);
    return {Page, props: {...defaults, lang}};
  }

  const view = route.view === 'account' && !vfAccountPhone() ? 'signin' : route.view;
  const [site] = await Promise.all([
    import('../../pages/site/Page.jsx'),
    loadPage(view)?.catch(() => {})
  ]);
  return {Page: site.default, props: site.defaults};
}
