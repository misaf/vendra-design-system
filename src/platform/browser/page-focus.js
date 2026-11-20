// Storefront navigation + focus helpers (VF_NAV). The shared logic replaces href/link on every render
// (they need the current lang).
export const VF_NAV = (() => {
  // setTimeout, not rAF: rAF is paused in background tabs/iframes and the focus move would be lost
  const after = fn => setTimeout(fn, 30);
  const N = {
    href: () => '?',
    link: () => {},
    // Screen or step change → focus the page's h1 (tabindex="-1", no focus ring, no scroll jump).
    focusHeading({preserveFocus = false} = {}) {
      after(() => {
        // Check when the delayed move actually runs: a field or recovery action may have
        // received focus since the page scheduled its heading announcement.
        const active = document.activeElement;
        if (
          preserveFocus &&
          active?.closest('main') &&
          (active.matches('input, select, textarea') || active.closest('[data-vf-keep-focus]'))
        )
          return;
        const h = /** @type {HTMLElement | null} */ (
          document.querySelector('main h1') || document.querySelector('main')
        );
        if (!h) return;
        if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1');
        h.focus({preventScroll: true});
      });
    },
    // Wait briefly for a state update to render the requested element.
    focusById(id) {
      const attempt = remaining => {
        const target = document.getElementById(id);
        if (target) target.focus();
        else if (remaining > 1) setTimeout(() => attempt(remaining - 1), 50);
      };
      setTimeout(() => attempt(10), 0);
    },
    // After removing a row, focus its neighbour or fall back to the page's content.
    focusAfterRemoval(selector, index) {
      setTimeout(() => {
        const targets = [...document.querySelectorAll('main ' + selector)];
        const target = /** @type {HTMLElement} */ (
          targets[Math.min(index, targets.length - 1)] ||
            document.querySelector('main a[href]') ||
            document.querySelector('main h1')
        );
        if (target) {
          if (!target.hasAttribute('tabindex') && target.tagName === 'H1')
            target.setAttribute('tabindex', '-1');
          target.focus();
        }
      }, 0);
    },
    // Failed validation → focus the first invalid field (aria-invalid from the DS field components, or native :invalid).
    focusFirstInvalid(root) {
      after(() => {
        const r = root || document.querySelector('main') || document;
        const invalidField = r.querySelector(
          '[aria-invalid="true"],[data-invalid] > [aria-haspopup="listbox"],input:invalid,select:invalid,textarea:invalid'
        );
        if (invalidField) invalidField.focus();
      });
    }
  };
  return N;
})();
