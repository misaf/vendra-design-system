import React from 'react';
import {Icon} from '../../../../../components/ui/components/Icon/Icon.jsx';
import {IconButton} from '../../../../../components/ui/components/IconButton/IconButton.jsx';
import {Picture} from '../../../../../components/ui/patterns/atoms/Picture/Picture.jsx';
import {Price} from '../../../../../components/ui/patterns/atoms/Price/Price.jsx';

function DisplayPhoto({product, onLoaded, onFailed, ...props}) {
  const ref = React.useRef(null);
  const eventVersion = React.useRef(0);
  const recoveredSource = React.useRef('');
  const loaded = image => {
    const version = ++eventVersion.current;
    Promise.resolve(image.decode?.()).then(
      () => {
        if (ref.current === image && eventVersion.current === version) onLoaded(product.imageKey);
      },
      () => {
        if (ref.current === image && eventVersion.current === version) onFailed(product.imageKey);
      }
    );
  };
  const failed = () => {
    eventVersion.current += 1;
    onFailed(product.imageKey);
  };
  const handleEvent = (event, notify) => {
    const image = event.currentTarget;
    const source = image.currentSrc || image.src;
    // A native event can still be queued for the same photo inspected at mount.
    if (event.isTrusted && recoveredSource.current === source) {
      recoveredSource.current = '';
      return;
    }
    recoveredSource.current = '';
    notify(image);
  };
  // The browser can finish a prerendered photo before React attaches its event handlers.
  React.useEffect(() => {
    const image = ref.current;
    if (!image?.complete || eventVersion.current) return;
    recoveredSource.current = image.currentSrc || image.src;
    if (image.naturalWidth) loaded(image);
    else failed();
  }, []);
  return (
    <Picture
      {...props}
      ref={ref}
      image={product.image}
      priority
      onLoad={event => handleEvent(event, loaded)}
      onError={event => handleEvent(event, failed)}
    />
  );
}

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
                  <Icon name="image" size={48} />
                </div>
              ) : (
                <DisplayPhoto
                  key={product.imageKey}
                  product={product}
                  sizes={products.length > 1 ? '50vw' : '100vw'}
                  draggable={false}
                  onLoaded={onLoaded}
                  onFailed={onFailed}
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
                  {captionMode === 'price' && showPrices ? <Price value={product.price} /> : null}
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
          <DisplayPhoto
            key={product.imageKey + ':' + preloadVersion}
            product={product}
            alt=""
            sizes={products.length > 1 ? '50vw' : '100vw'}
            onLoaded={onLoaded}
            onFailed={onFailed}
          />
        ))}
      </div>
      <div className="vf-display-tools">
        <IconButton icon="settings" label={labels.sellerTools} inverse onClick={onOpenTools} />
      </div>
      {mode === 'tablet' && hasCurrentProduct ? (
        <div hidden={!controls} className="vf-display-navigation">
          <IconButton
            icon={direction === 'rtl' ? 'chevron-right' : 'chevron-left'}
            label={labels.previous}
            inverse
            onClick={onPrevious}
          />
          <IconButton
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
