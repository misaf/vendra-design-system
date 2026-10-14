import React from 'react';
import {Button} from 'react-aria-components';
import {Picture} from '../Picture/Picture.jsx';
import {cx} from '../utils/cx.js';

// Product photos (Picture: a URL or a photo object) in a swipeable scroll-snap track with dot buttons (React Aria); RTL scrolls the
// other way.
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
            <Picture image={image} sizes={sizes} alt={image.alt || ''} priority={i === 0} />
          </div>
        ))}
      </div>
      {count > 1 && (
        <div className="ag-gallery__dots">
          {images.map((_, i) => (
            <Button
              key={i}
              className="ag-gallery__dot"
              aria-label={slideLabel(i + 1, count)}
              aria-current={i === currentSlide ? 'true' : undefined}
              onPress={() => goTo(i)}
            >
              <span></span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
