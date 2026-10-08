import React from 'react';
import {cx} from '../utils/cx.js';
// The track is focusable so keyboard users can scroll it with the arrow keys (axe: scrollable-region-focusable).
export function Gallery({
  images = [],
  sizes = '(max-width: 767px) 100vw, 540px',
  frame = 'arch',
  aspect = '3/4',
  label,
  slideLabel = (i, n) => i + ' / ' + n,
  className = ''
}) {
  const ref = React.useRef(null);
  const [idx, setIdx] = React.useState(0);
  const n = images.length;
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const i = Math.round(Math.abs(el.scrollLeft) / el.clientWidth);
    if (i !== idx) setIdx(i);
  };
  const go = i => {
    const el = ref.current;
    const rtl = getComputedStyle(el).direction === 'rtl';
    el.scrollTo({left: (rtl ? -1 : 1) * i * el.clientWidth});
  };
  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cx('ag-gallery', className)}
    >
      <div
        ref={ref}
        onScroll={onScroll}
        tabIndex={0}
        className={cx('ag-gallery__track', 'ag-product__media--' + frame)}
        style={{aspectRatio: aspect}}
      >
        {images.map((im, i) => (
          <div
            key={i}
            className="ag-gallery__slide"
            role="group"
            aria-roledescription="slide"
            aria-label={slideLabel(i + 1, n)}
          >
            <img
              src={im.src}
              srcSet={im.srcSet}
              sizes={im.srcSet ? sizes : undefined}
              alt={im.alt || ''}
              loading={i ? 'lazy' : undefined}
              decoding="async"
            />
          </div>
        ))}
      </div>
      {n > 1 && (
        <div className="ag-gallery__dots">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className="ag-gallery__dot"
              aria-label={slideLabel(i + 1, n)}
              aria-current={i === idx ? 'true' : undefined}
              onClick={() => go(i)}
            >
              <span></span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
