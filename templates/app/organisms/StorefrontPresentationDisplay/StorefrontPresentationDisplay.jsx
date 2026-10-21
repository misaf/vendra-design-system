import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontPresentationDisplay({
  mode,
  direction,
  products,
  hasCurrentProduct,
  preloadProducts,
  preloadVersion,
  captionMode,
  showPrices,
  labels,
  onLoaded,
  onFailed,
  onNext,
  onPrevious,
  onOpenTools
}) {
  const loaded = (event, key) => {
    const image = event.currentTarget;
    Promise.resolve(image.decode ? image.decode() : undefined).then(
      () => onLoaded(key),
      () => onFailed(key)
    );
  };
  const [controls, setControls] = React.useState(false);
  const timer = React.useRef(null);
  const pointer = React.useRef(null);
  const reveal = () => {
    clearTimeout(timer.current);
    setControls(true);
    timer.current = setTimeout(() => setControls(false), 4000);
  };
  React.useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <section
      className="vf-display ag-on-inverse"
      aria-label={labels.viewer}
      tabIndex={0}
      aria-describedby="vf-display-hint"
      data-controls={controls}
      data-mode={mode}
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (mode === 'tv') onOpenTools();
          else reveal();
        }
      }}
      onPointerDown={event => {
        const target = /** @type {Element} */ (event.target);
        if (target.closest('button, a, input')) return;
        pointer.current = {x: event.clientX, y: event.clientY};
      }}
      onPointerCancel={() => {
        pointer.current = null;
      }}
      onPointerUp={event => {
        const start = pointer.current;
        pointer.current = null;
        if (!start) return;
        const dx = event.clientX - start.x,
          dy = event.clientY - start.y;
        if (mode === 'tablet' && Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy)) {
          const next = dx < 0 !== (direction === 'rtl');
          (next ? onNext : onPrevious)();
        } else if (Math.abs(dx) < 12 && Math.abs(dy) < 12) reveal();
      }}
    >
      <span id="vf-display-hint" className="ag-sr-only">
        {labels.hint}
      </span>
      {products.length ? (
        <div
          className={'vf-display-media' + (products.length > 1 ? ' vf-display-media--pair' : '')}
        >
          {products.map(product => (
            <figure
              key={product.id}
              className={
                'vf-display-product' + (captionMode === 'photo' ? ' vf-display-product--photo' : '')
              }
            >
              {product.unavailableImage ? (
                <div
                  className="vf-display-photo-fallback"
                  role="img"
                  aria-label={labels.photoUnavailable}
                >
                  <DS.Icon name="image" size={48} />
                </div>
              ) : (
                <DS.Picture
                  image={product.image}
                  priority
                  sizes={products.length > 1 ? '50vw' : '100vw'}
                  draggable={false}
                  onLoad={event => loaded(event, product.imageKey)}
                  onError={() => onFailed(product.imageKey)}
                  className="vf-display-photo"
                />
              )}
              {captionMode !== 'photo' ? (
                <figcaption className="vf-display-caption">
                  <span className="vf-display-code" dir="ltr">
                    {product.code}
                  </span>
                  {product.soldOut ? (
                    <span className="tw:text-inverse-quiet">{labels.soldOut}</span>
                  ) : null}
                  {captionMode === 'price' && showPrices ? (
                    <DS.Price value={product.price} />
                  ) : null}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      ) : (
        <p>{labels.empty}</p>
      )}
      <div className="vf-display-preload" aria-hidden="true">
        {preloadProducts.map(product => (
          <DS.Picture
            key={product.imageKey + ':' + preloadVersion}
            image={product.image}
            alt=""
            priority
            sizes={products.length > 1 ? '50vw' : '100vw'}
            onLoad={event => loaded(event, product.imageKey)}
            onError={() => onFailed(product.imageKey)}
          />
        ))}
      </div>
      <div className="vf-display-tools">
        <DS.IconButton icon="settings" label={labels.sellerTools} inverse onClick={onOpenTools} />
      </div>
      {mode === 'tablet' && hasCurrentProduct ? (
        <div hidden={!controls} className="vf-display-navigation">
          <DS.IconButton
            icon={direction === 'rtl' ? 'chevron-right' : 'chevron-left'}
            label={labels.previous}
            inverse
            onClick={onPrevious}
          />
          <DS.IconButton
            icon={direction === 'rtl' ? 'chevron-left' : 'chevron-right'}
            label={labels.next}
            inverse
            onClick={onNext}
          />
        </div>
      ) : null}
    </section>
  );
}
