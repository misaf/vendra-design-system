// What every page module needs at run time: the integrations (they set window.VF_API, VF_TRACK and
// VF_PAYMENT, which pages and the shell call) and the tenant theme, requested before the first render.
// On the server (the build's prerender) all of these do nothing.
import '../_shared/services/integrations/api.js';
import '../_shared/services/integrations/analytics.js';
import '../_shared/domain/payments.js';
import {vfApplyTenant, vfTenant} from '../_shared/services/page-lifecycle.js';

vfApplyTenant(vfTenant());

export const list = value => (Array.isArray(value) ? value : []);
