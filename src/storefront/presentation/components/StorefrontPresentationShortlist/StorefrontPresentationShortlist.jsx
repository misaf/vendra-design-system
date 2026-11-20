import React from 'react';
import {Button} from '../../../../design-system/components/Button/Button.jsx';
import {Dialog} from '../../../../design-system/components/Dialog/Dialog.jsx';
import {Picture} from '../../../../design-system/components/Picture/Picture.jsx';
import {Price} from '../../../../design-system/components/Price/Price.jsx';

export function StorefrontPresentationShortlist({
  open,
  items,
  showPrices,
  labels,
  renderLabel,
  onClose,
  onClear,
  onSend
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={labels.title}
      maxWidth={1100}
      footer={
        items.length ? (
          <>
            <Button variant="secondary" onClick={onClear}>
              <>{labels.clear}</>
            </Button>
            <Button variant="primary" iconStart="send" onClick={onSend}>
              <>{labels.sendShortlist}</>
            </Button>
          </>
        ) : null
      }
    >
      {items.length ? (
        <ul className="tw:list-none tw:m-0 tw:p-0 tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
          {items.map(item => (
            <li key={item.id} className="tw:flex tw:flex-col tw:gap-2 tw:text-body">
              <span className="tw:block tw:[aspect-ratio:4/5] tw:rounded-md tw:overflow-hidden tw:bg-muted">
                <Picture
                  image={item.image}
                  sizes="(max-width: 767px) 50vw, 25vw"
                  className="tw:w-full tw:h-full tw:object-cover tw:block"
                />
              </span>
              <span className="tw:flex tw:flex-col tw:gap-1">
                {renderLabel(item)}
                {showPrices ? <Price value={item.price} size="md" /> : null}
              </span>
              <span className="tw:flex tw:gap-2">
                <Button variant="secondary" size="sm" onClick={item.show}>
                  <>{labels.show}</>
                </Button>
                <Button variant="ghost" size="sm" onClick={item.remove}>
                  <>{labels.remove}</>
                </Button>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="tw:m-0">
          <>{labels.empty}</>
        </p>
      )}
    </Dialog>
  );
}
