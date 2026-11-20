import {VF_TENANT_SLUGS} from '../../_runtime/tenant-slugs.js';
import {VF_STORE} from '../../src/storefront/store/store-config.js';
import {vfLocation, vfOnServer} from '../platform/environment.js';
import {vfRuntime} from '../platform/runtime.js';

// Resolve the page selection, the preview URL, or the configured default tenant.
export function vfTenant(tenant = '') {
  if (VF_TENANT_SLUGS.includes(tenant)) return tenant;
  const asked = vfOnServer() ? null : vfLocation().searchParams.get('tenant');
  if (VF_TENANT_SLUGS.includes(asked)) return asked;
  return VF_TENANT_SLUGS.includes(VF_STORE.tenant) ? VF_STORE.tenant : 'default';
}

// Apply the resolved tenant when the browser renders the page.
export function vfPageTenant(props) {
  const tenant = vfTenant(props.tenant);
  vfApplyTenant(tenant);
  return tenant;
}

// The client entry can select a tenant before components/storefront/tenant-theme.js installs the stylesheet loader.
// The static export links the configured tenant's stylesheet in the document.
export function vfApplyTenant(tenant) {
  if (vfOnServer() || vfRuntime.tenant === tenant) return;
  vfRuntime.tenant = tenant;
  vfRuntime.useTenant(tenant);
}
