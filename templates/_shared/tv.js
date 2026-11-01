// TV mode: the storefront on a television, read from across the room and driven by a remote. It
// sets data-density="tv" on <html> (tokens/spacing.css and typography.css rescale everything) and
// lets the arrow keys move focus to the nearest item on screen.
//
// Who gets it, first match wins:
//   ?tv=1 or ?tv=0 in the address: on or off, remembered on this device (localStorage vf-tv);
//   the remembered choice;
//   a TV browser: its user agent names a TV platform, or a wide screen reports no pointer at all.
import React from 'react';
import {setInteractionModality} from 'react-aria-components';
import {arrowDirection, nearestInDirection} from '../../components/utils/spatial.js';

const VF_TV_KEY = 'vf-tv';
const VF_TV_AGENTS =
  /\b(smart-?tv|tizen|web0s|webos|hbbtv|netcast|viera|bravia|aquos|crkey|googletv|android tv|aftb|aftm|aftt|afts|roku|playstation|xbox)\b/i;

// Whether this device shows the storefront as a TV. Reads (and, for ?tv=, saves) only in the browser.
export function vfTvMode() {
  if (typeof window === 'undefined') return false;
  const asked = new URLSearchParams(location.search).get('tv');
  try {
    if (asked === '1' || asked === '0') localStorage.setItem(VF_TV_KEY, asked);
    const saved = localStorage.getItem(VF_TV_KEY);
    if (saved === '1' || saved === '0') return saved === '1';
  } catch {
    if (asked === '1' || asked === '0') return asked === '1';
  }
  return (
    VF_TV_AGENTS.test(navigator.userAgent) ||
    matchMedia('(width >= 1440px) and (any-pointer: none)').matches
  );
}

// Called once before the first render, so a TV paints at its own size from the start.
export function vfApplyTvMode() {
  if (vfTvMode()) document.documentElement.dataset.density = 'tv';
}

// The density on <html> once the page has mounted ('tv' or undefined), for VendraProvider: the
// overlays open outside the page and take it from there. undefined on the server and in the first
// render, so hydration matches.
export function useVfDensity() {
  const [density, setDensity] = React.useState(undefined);
  React.useEffect(() => {
    setDensity(document.documentElement.dataset.density === 'tv' ? 'tv' : undefined);
  }, []);
  return density;
}

// Elements Tab can reach (React Aria's roving items keep -1 until they are current).
const VF_FOCUSABLE = [
  'a[href]',
  'button:not(:disabled)',
  'input:not(:disabled):not([type="hidden"])',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  'summary',
  '[tabindex]',
  '[contenteditable=""]',
  '[contenteditable="true"]'
]
  .map(selector => selector + ':not([tabindex="-1"])')
  .join(', ');

// Visually hidden (React Aria's VisuallyHidden, .ag-sr-only): clipped to nothing.
function vfClipped(element) {
  const style = getComputedStyle(element);
  return style.clipPath === 'inset(50%)' || style.clip === 'rect(0px, 0px, 0px, 0px)';
}

// The box a viewer sees for an element, or null when it isn't shown. A visually hidden input (a
// slider's input in its thumb) shows as the nearest box around it.
function vfBox(element) {
  if (element.closest('[inert], [aria-hidden="true"]')) return null;
  // checkVisibility is missing from older TV browsers; the size checks below still apply there.
  if (element.checkVisibility && !element.checkVisibility({visibilityProperty: true})) return null;
  // A checkbox or radio is shown, and pressed, as its label (React Aria hides the input itself).
  const label = element.tagName === 'INPUT' && element.closest('label');
  if (label) {
    const box = label.getBoundingClientRect();
    if (box.width > 2 && box.height > 2) return box;
  }
  for (let node = element, depth = 0; node && depth < 3; node = node.parentElement, depth++) {
    if (!vfClipped(node)) continue;
    if (element.tagName !== 'INPUT') return null;
    let shown = node.parentElement;
    while (shown && shown.getBoundingClientRect().width <= 2) shown = shown.parentElement;
    return shown ? shown.getBoundingClientRect() : null;
  }
  const box = element.getBoundingClientRect();
  if (box.width <= 2 || box.height <= 2) return null;
  // A stretched link (a card's title link, its ::after covering the card) is the card.
  if (getComputedStyle(element, '::after').position === 'absolute') {
    let card = element.parentElement;
    while (card && getComputedStyle(card).position === 'static') card = card.parentElement;
    if (card) return card.getBoundingClientRect();
  }
  return box;
}

// The part of an element's box on screen. An item taller than the room below the sticky header
// keeps its top under the header once focused; arrows are aimed from what the viewer sees.
function vfShownBox(element, box) {
  const x = Math.min(Math.max((box.left + box.right) / 2, 0), innerWidth - 1);
  const shown = y => {
    const hit = document.elementFromPoint(x, y);
    return !hit || element.contains(hit) || hit.contains(element);
  };
  let top = Math.max(box.top, 0);
  let bottom = Math.min(box.bottom, innerHeight);
  while (top < bottom && !shown(top + 1)) top += 4;
  while (bottom > top && !shown(bottom - 1)) bottom -= 4;
  return bottom > top ? {left: box.left, right: box.right, top, bottom} : box;
}

// The items the arrows can reach in `scope`, with their boxes. A focusable region around other
// items (a carousel's scrolling track) is left out: the arrows go to the items inside it.
function vfTargets(scope, selector = VF_FOCUSABLE) {
  const targets = [...scope.querySelectorAll(selector)]
    .map(element => ({element, box: vfBox(element)}))
    .filter(target => target.box);
  return targets.filter(
    target => !targets.some(other => other !== target && target.element.contains(other.element))
  );
}

// Whether the caret can still move that way inside a text field (so the arrow is the field's).
function vfCaretMoves(input, direction) {
  const {selectionStart: start, selectionEnd: end, value} = input;
  if (start === null || start !== end) return true;
  const rtl = getComputedStyle(input).direction === 'rtl';
  const forward = (direction === 'right') !== rtl;
  return forward ? end < value.length : start > 0;
}

// Composite widgets whose items React Aria moves between with the arrows. At the widget's edge (no
// item further that way) the arrow leaves it for the nearest item outside.
const VF_GROUPS = '[role="radiogroup"], [role="tablist"], [role="toolbar"], [role="menubar"]';
const VF_GROUP_ITEMS =
  'input[type="radio"], [role="radio"], [role="tab"], [role="menuitem"], button, a[href]';
// Widgets that keep every arrow: popover lists and grids (Escape, the remote's Back, closes them),
// the Lightbox's photo strip (left and right turn the photos), and multi-line text.
const VF_KEEPS_ARROWS =
  'textarea, select, [contenteditable=""], [contenteditable="true"], [role="listbox"], [role="menu"], [role="grid"], [role="tree"], [role="combobox"], .ag-location .leaflet-container';

// Whether the focused element uses this arrow itself, so spatial navigation leaves it alone.
function vfKeepsArrow(element, direction) {
  if (element.closest(VF_KEEPS_ARROWS)) return true;
  const across = direction === 'left' || direction === 'right';
  if (element.closest('.ag-lightbox') && across) return true;
  // A slider steps its value along its own axis; the other arrows leave it.
  const slider = element.closest('[role="slider"], input[type="range"]');
  if (slider) return (slider.getAttribute('aria-orientation') === 'vertical') !== across;
  if (element.tagName === 'INPUT') {
    const input = /** @type {HTMLInputElement} */ (element);
    if (['checkbox', 'button', 'submit', 'reset', 'image', 'file', 'color'].includes(input.type))
      return false;
    // A number field (QuantityInput) steps with up and down.
    const steps =
      input.closest('.react-aria-NumberField, [role="spinbutton"]') || input.type === 'number';
    if (!across && steps) return true;
    if (['text', 'search', 'email', 'tel', 'url', 'password', 'number'].includes(input.type))
      return across && vfCaretMoves(input, direction);
    if (input.type !== 'radio') return true;
  }
  const group = element.closest(VF_GROUPS);
  if (!group) return false;
  const from = vfBox(element) || element.getBoundingClientRect();
  const items = vfTargets(group, VF_GROUP_ITEMS).filter(item => item.element !== element);
  return (
    nearestInDirection(
      from,
      items.map(item => item.box),
      direction
    ) >= 0
  );
}

// On a TV the arrow keys move focus to the nearest item in that direction: header links, product
// cards, carousel slides, filters and the controls of an open dialog. Tab order and what screen
// readers announce don't change. Widgets that use the arrows themselves keep them until their edge
// (tabs, radio groups, sliders, the caret in a text field); lists in popovers keep them all. With
// nothing in that direction, the arrow does what it would anyway (scroll the page). Returns the
// function that stops it.
export function vfRemoteNavigation() {
  const onKeyDown = event => {
    if (event.defaultPrevented) return;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const active = /** @type {HTMLElement} */ (document.activeElement);
    const focused = active && active !== document.body ? active : null;
    // A delivery map pans with all four arrows. Back exits to its next surrounding control,
    // so a remote can both place the pin and leave the map without a Tab key.
    const map = focused && focused.closest('.ag-location .leaflet-container');
    if (event.key === 'Escape' && map) {
      const location = map.closest('.ag-location');
      const next = vfTargets(location).find(target => !map.contains(target.element));
      if (next) {
        event.preventDefault();
        event.stopPropagation();
        setInteractionModality('keyboard');
        next.element.focus();
      }
      return;
    }
    const direction = arrowDirection(event.key);
    if (!direction) return;
    if (focused && vfKeepsArrow(focused, direction)) return;
    const scope =
      (focused && focused.closest('[role="dialog"], [role="alertdialog"]')) ||
      document.querySelector('[role="dialog"][aria-modal="true"]') ||
      document.body;
    const targets = vfTargets(scope).filter(target => target.element !== focused);
    // Nothing focused yet: start from the edge of the screen the arrow points away from.
    const focusedBox = focused && vfBox(focused);
    const from = (focusedBox && vfShownBox(focused, focusedBox)) || {
      left: direction === 'left' ? innerWidth : 0,
      right: direction === 'right' ? 0 : innerWidth,
      top: direction === 'up' ? innerHeight : 0,
      bottom: direction === 'down' ? 0 : innerHeight
    };
    const index = nearestInDirection(
      from,
      targets.map(target => target.box),
      direction
    );
    if (index < 0) return;
    // Ours now: the widget's own handler (React Aria's, below this capture listener) must not
    // move as well.
    event.preventDefault();
    event.stopPropagation();
    setInteractionModality('keyboard');
    // Focusing scrolls the item into view, inside a carousel too; the Shell then clears it of the
    // sticky header and bottom bars.
    targets[index].element.focus();
  };
  // Capturing, so an arrow at a widget's edge can leave it before React Aria handles it; anything
  // the widget keeps passes through untouched.
  window.addEventListener('keydown', onKeyDown, true);
  return () => window.removeEventListener('keydown', onKeyDown, true);
}

// The Shell's arrow-key navigation, on while `enabled` (TV mode).
export function useVfRemoteNavigation(enabled) {
  React.useEffect(() => (enabled ? vfRemoteNavigation() : undefined), [enabled]);
}
