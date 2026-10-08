import React from 'react';
import {ICON_SVGS} from './icon-svgs.js';
import {cx} from '../utils/cx.js';

// Icons come only from the bundled Lucide set (icon-svgs.js) — no network. Unknown names render empty and warn once.
const DIRECTIONAL = [
  'arrow-right',
  'arrow-left',
  'chevron-right',
  'chevron-left',
  'move-right',
  'move-left',
  'undo-2',
  'redo-2'
];
// name → CSS mask url (or null), built once per icon.
const maskCache = {};
const maskUrl = name => {
  if (name in maskCache) return maskCache[name];
  const svg = ICON_SVGS[name];
  if (!svg)
    console.warn('Icon: "' + name + '" is not in icon-svgs.js — add its SVG from lucide.dev');
  return (maskCache[name] = svg
    ? 'url("data:image/svg+xml,' + encodeURIComponent(svg).replace(/'/g, '%27') + '")'
    : null);
};

// A Lucide icon drawn with a CSS mask, so it takes `color` (currentColor by default). Decorative
// unless `label` is set; arrows and chevrons mirror in RTL unless `flipRtl={false}`.
export function Icon({
  name,
  size = 20,
  color = 'currentColor',
  label,
  flipRtl,
  className = '',
  style,
  ...rest
}) {
  const mask = maskUrl(name);
  const flip = flipRtl ?? DIRECTIONAL.includes(name);
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cx(flip && 'ag-flip-rtl', className)}
      style={{
        display: 'inline-block',
        flex: 'none',
        width: size,
        height: size,
        background: mask ? color : 'transparent',
        WebkitMask: mask ? mask + ' center/contain no-repeat' : undefined,
        mask: mask ? mask + ' center/contain no-repeat' : undefined,
        ...style
      }}
      {...rest}
    ></span>
  );
}
