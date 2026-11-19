// What every page module needs at run time: the integrations (the API client and analytics, which
// pages and the shell use through vfRuntime from shared/platform/runtime.js) and the tenant theme,
// requested before the first render. On the server (the build's prerender) all of these do nothing.
import {vfRuntime} from '../shared/platform/runtime.js';
import {vfInstallRuntime} from '../shared/services/integrations/runtime.js';
import {vfApplyTenant, vfTenant} from '../shared/services/page-lifecycle.js';

vfInstallRuntime();
// The one window name the runtime has: a handle for tests and QA to inspect or stub the
// integrations (window.__vfRuntime.api, .track.log). Storefront code never reads it.
if (typeof window !== 'undefined') window.__vfRuntime = vfRuntime;
vfApplyTenant(vfTenant());

export const list = value => (Array.isArray(value) ? value : []);
