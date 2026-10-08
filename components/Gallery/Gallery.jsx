import React from 'react';
import {cx} from '../utils/cx.js';

// Product photos in a swipeable scroll-snap track with dot buttons; RTL scrolls the other way.
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
  const trackRef = React.useRef(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const count = images.length;
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const slide = Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
    if (slide !== currentSlide) setCurrentSlide(slide);
  };
  const goTo = slide => {
    const track = trackRef.current;
    const rtl = getComputedStyle(track).direction === 'rtl';
    track.scrollTo({left: (rtl ? -1 : 1) * slide * track.clientWidth});
  };
  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cx('ag-gallery', className)}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        className={cx('ag-gallery__track', 'ag-product__media--' + frame)}
        style={{aspectRatio: aspect}}
      >
        {images.map((image, i) => (
          <div
            key={i}
            className="ag-gallery__slide"
            role="group"
            aria-roledescription="slide"
            aria-label={slideLabel(i + 1, count)}
          >
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes={image.srcSet ? sizes : undefined}
              alt={image.alt || ''}
              loading={i ? 'lazy' : undefined}
              decoding="async"
            />
          </div>
        ))}
      </div>
      {count > 1 && (
        <div className="ag-gallery__dots">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className="ag-gallery__dot"
              aria-label={slideLabel(i + 1, count)}
              aria-current={i === currentSlide ? 'true' : undefined}
              onClick={() => goTo(i)}
            >
              <span></span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
