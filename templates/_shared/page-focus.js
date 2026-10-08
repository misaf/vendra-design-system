// Storefront navigation + focus helpers (window.AG_NAV). The shared logic replaces href/link on
// every render (they need the current lang). Pages load this before shared-logic.js.
(() => {
  // setTimeout, not rAF: rAF is paused in background tabs/iframes and the focus move would be lost
  const after = fn => setTimeout(fn, 30);
  const N = {
    href: () => '?',
    link: () => {},
    // Screen or step change → focus the page's h1 (tabindex="-1", no focus ring, no scroll jump).
    focusHeading() {
      after(() => {
        const h = /** @type {HTMLElement | null} */ (
          document.querySelector('main h1') || document.querySelector('main')
        );
        if (!h) return;
        if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1');
        h.focus({preventScroll: true});
      });
    },
    // Failed validation → focus the first invalid field (aria-invalid from the DS field components, or native :invalid).
    focusFirstInvalid(root) {
      after(() => {
        const r = root || document.querySelector('main') || document;
        const el = r.querySelector(
          '[aria-invalid="true"],input:invalid,select:invalid,textarea:invalid'
        );
        if (el) el.focus();
      });
    }
  };
  window.AG_NAV = N;
})();
