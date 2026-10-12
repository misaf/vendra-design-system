// What every page module needs at run time: the integrations (they set window.VF_API, VF_TRACK and
// VF_PAYMENT, which pages and the shell call) and the tenant theme, requested before the first render.
import '../_shared/integrations/api.js';
import '../_shared/integrations/analytics.js';
import '../_shared/payments.js';
import {vfApplyTenant, vfTenant} from '../_shared/page-lifecycle.js';

vfApplyTenant(vfTenant());

export const list = value => (Array.isArray(value) ? value : []);
