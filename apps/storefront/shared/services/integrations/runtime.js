// Installs the browser integrations into the storefront runtime (shared/platform/runtime.js):
// app/runtime.js calls it once, before the first render. On the server (the build's prerender) it
// installs nothing, so no request or analytics event can leave from there.
import {vfPayment} from '../../domain/payments.js';
import {vfRuntime} from '../../platform/runtime.js';
import {vfCreateTracker} from './analytics.js';
import {vfCreateApi} from './api.js';

export function vfInstallRuntime() {
  if (typeof window === 'undefined') return vfRuntime;
  if (!vfRuntime.api) vfRuntime.api = vfCreateApi();
  if (!vfRuntime.track) vfRuntime.track = vfCreateTracker();
  vfRuntime.payment = vfPayment;
  return vfRuntime;
}
