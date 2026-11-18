// The storefront's styles and tenant theme. The design system's styles, Tailwind and the pages' custom
// CSS are imported (Vite bundles them, fonts included); the active tenant's theme loads on demand,
// after them, because tenant rules match :root's specificity.
// Tailwind first: the first stylesheet fixes the cascade-layer order, so Tailwind's layers sit under
// the package's (vendra.*), and the page CSS (in vendra.components) meets the ag-* classes on
// specificity while both still win over utilities, as the storefront was written.
import '../_runtime/tailwind.css';
import '../../../packages/design-system/styles.css';
import '../_runtime/custom.css';
import {vfRuntime} from '../shared/platform/runtime.js';
import {installTenantTheme} from './tenant-theme.js';

installTenantTheme(import.meta.env.BASE_URL);
vfRuntime.offlineDisplay = import.meta.env.PROD;
