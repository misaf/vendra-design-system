// Keeps the storefront working offline on this device (templates/app/sw.js). The counter
// presentation asks for it, for the shop's tablet; only in a production build, as in development
// Vite serves files that change under the same names.
export function vfKeepOffline() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register(new URL('sw.js', location.href).pathname).catch(() => {});
}
