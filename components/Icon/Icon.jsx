import React from 'react';
import {ICON_SVGS} from './icon-svgs.js';
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
const cache = {};
const src = name => {
  if (name in cache) return cache[name];
  const svg = ICON_SVGS[name];
  if (!svg)
    console.warn('Icon: "' + name + '" is not in icon-svgs.js — add its SVG from lucide.dev');
  return (cache[name] = svg
    ? 'url("data:image/svg+xml,' + encodeURIComponent(svg).replace(/'/g, '%27') + '")'
    : null);
};
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
  const url = src(name);
  const flip = flipRtl ?? DIRECTIONAL.includes(name);
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={(flip ? 'ag-flip-rtl ' : '') + className}
      style={{
        display: 'inline-block',
        flex: 'none',
        width: size,
        height: size,
        background: url ? color : 'transparent',
        WebkitMask: url ? url + ' center/contain no-repeat' : undefined,
        mask: url ? url + ' center/contain no-repeat' : undefined,
        ...style
      }}
      {...rest}
    ></span>
  );
}
