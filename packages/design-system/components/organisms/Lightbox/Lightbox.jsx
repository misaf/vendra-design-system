import React from 'react';
import {Button, Dialog, Modal, ModalOverlay} from 'react-aria-components';
import {IconButton} from '../../atoms/IconButton/IconButton.jsx';
import {Picture} from '../../atoms/Picture/Picture.jsx';
import {cx} from '../../utils/cx.js';
import {format} from '../../utils/format.js';
import {localeLanguage, useMessages} from '../../utils/messages.js';
import {usePageLocale} from '../../utils/locale.js';
import {useDensity} from '../../utils/density.js';
import {messages} from './messages.js';

// How far a finger has to travel sideways before a swipe changes the item.
const SWIPE_MIN = 48;
const photoSrc = photo => (typeof photo === 'string' ? photo : photo && photo.src);

// One item at a time, as large as the screen allows, on a dark full-screen modal (React Aria):
// previous/next buttons, ←/→ and a sideways swipe move through `items` (mirrored in RTL), dots move
// through the current item's photos, Esc or × close it and focus returns to the opener. The
// position ("3 of 14") is announced as it changes; the neighbours' first photos load ahead.
export function Lightbox({
  items = [],
  index,
  onIndexChange,
  onClose,
  label,
  previousLabel,
  nextLabel,
  closeLabel,
  actions,
  sizes = '100vw',
  className
}) {
  const {locale, ref: localeRef} = usePageLocale();
  const density = useDensity();
  const text = useMessages(
    'Lightbox',
    messages,
    {label, previous: previousLabel, next: nextLabel, close: closeLabel},
    locale
  );
  const language = localeLanguage(locale) === 'fa' ? 'fa' : 'en';
  const count = items.length;
  const open = index != null && index >= 0 && index < count;
  const item = open ? items[index] : null;
  const photos = item ? item.images || [] : [];
  const [photoIndex, setPhotoIndex] = React.useState(0);
  const frameRef = React.useRef(null);
  const swipe = React.useRef(null);
  React.useEffect(() => setPhotoIndex(0), [index]);

  const goTo = target => {
    if (target >= 0 && target < count && target !== index && onIndexChange) onIndexChange(target);
  };
  const rtl = () => !!frameRef.current && getComputedStyle(frameRef.current).direction === 'rtl';

  // Arrow keys move between items while focus is in the viewer (not in a field, nor in a dialog
  // opened on top of it).
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = event => {
      const frame = frameRef.current;
      const target = /** @type {HTMLElement} */ (event.target);
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      if (!frame || !frame.contains(target) || target.closest('input, textarea, select')) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const forward = (event.key === 'ArrowRight') !== rtl();
      goTo(index + (forward ? 1 : -1));
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  });

  // The neighbours' first photos load while this one is on screen.
  React.useEffect(() => {
    if (!open) return;
    [items[index - 1], items[index + 1]].forEach(neighbour => {
      const src = neighbour && photoSrc((neighbour.images || [])[0]);
      if (src) new Image().src = src;
    });
  }, [open, index, items]);

  const numbers = value => format.number(value, language);
  const fill = (template, current, total) =>
    template.replace('{index}', numbers(current)).replace('{count}', numbers(total));
  const photo = photos[Math.min(photoIndex, photos.length - 1)];

  return (
    <ModalOverlay
      isOpen={open}
      onOpenChange={isOpen => !isOpen && onClose && onClose()}
      isDismissable={false}
      className="ag-lightbox__overlay"
      data-density={density}
    >
      <Modal className={cx('ag-lightbox', className)}>
        <Dialog
          aria-label={text.label}
          className="ag-lightbox__frame ag-on-inverse"
          ref={element => {
            frameRef.current = element;
            localeRef.current = element;
          }}
        >
          {item && (
            <>
              <div className="ag-lightbox__bar">
                <span className="ag-lightbox__position" aria-live="polite">
                  {fill(text.position, index + 1, count)}
                </span>
                <IconButton icon="x" label={text.close} inverse onClick={onClose} />
              </div>
              <div
                className="ag-lightbox__stage"
                onPointerDown={event => {
                  swipe.current = {x: event.clientX, y: event.clientY};
                }}
                onPointerUp={event => {
                  const start = swipe.current;
                  swipe.current = null;
                  if (!start) return;
                  const dx = event.clientX - start.x,
                    dy = event.clientY - start.y;
                  if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy)) return;
                  goTo(index + (dx < 0 !== rtl() ? 1 : -1));
                }}
                onPointerCancel={() => {
                  swipe.current = null;
                }}
              >
                {photo && (
                  <Picture
                    key={index + ':' + photoIndex}
                    image={photo}
                    sizes={sizes}
                    priority
                    draggable={false}
                    className="ag-lightbox__photo"
                  />
                )}
                {count > 1 && (
                  <>
                    <IconButton
                      icon="chevron-left"
                      label={text.previous}
                      variant="raised"
                      size="lg"
                      disabled={index === 0}
                      onClick={() => goTo(index - 1)}
                      className="ag-lightbox__step ag-lightbox__step--previous"
                    />
                    <IconButton
                      icon="chevron-right"
                      label={text.next}
                      variant="raised"
                      size="lg"
                      disabled={index === count - 1}
                      onClick={() => goTo(index + 1)}
                      className="ag-lightbox__step ag-lightbox__step--next"
                    />
                  </>
                )}
              </div>
              {photos.length > 1 && (
                <div className="ag-lightbox__dots">
                  {photos.map((_, i) => (
                    <Button
                      key={i}
                      className="ag-lightbox__dot"
                      aria-label={fill(text.photo, i + 1, photos.length)}
                      aria-current={i === photoIndex ? 'true' : undefined}
                      onPress={() => setPhotoIndex(i)}
                    >
                      <span></span>
                    </Button>
                  ))}
                </div>
              )}
              {(item.caption || actions) && (
                <div className="ag-lightbox__caption">
                  <div className="ag-lightbox__text">{item.caption}</div>
                  {actions && (
                    <div className="ag-lightbox__actions">
                      {typeof actions === 'function' ? actions(item, index) : actions}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
