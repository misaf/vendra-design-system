import {installTenantTheme} from '../../storefront/shell/components/tenant-theme.js';
import {vfApplyTvMode} from '../../platform/browser/tv.js';
import {vfConfigureRendering, vfSetHydrating} from '../../platform/browser/environment.js';
import {vfRuntime} from '../../platform/browser/runtime.js';
import {vfInstallRuntime} from '../../platform/browser/integrations/runtime.js';
import {vfApplyTenant, vfTenant} from '../../platform/tenant/tenant.js';

export const base = process.env.NEXT_PUBLIC_VF_BASE_PATH ?? '';
vfConfigureRendering(base + '/', Number(process.env.NEXT_PUBLIC_VF_RENDER_TIME));

if (typeof window !== 'undefined') {
  vfInstallRuntime();
  window.__vfRuntime = vfRuntime;
  // Resolve the tenant from the browser URL before hydration suppresses browser reads.
  vfApplyTenant(vfTenant());
  vfSetHydrating(true);
  installTenantTheme(base + '/');
  vfApplyTvMode();
  vfRuntime.offlineDisplay = process.env.NEXT_PUBLIC_VF_NEXT_EXPORT === 'true';
}
