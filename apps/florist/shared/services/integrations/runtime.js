// Installs the browser integrations into the storefront runtime (shared/platform/runtime.js):
// The Next.js client entry calls it before the first render. During static export it
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
