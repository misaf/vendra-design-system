import React from 'react';
import {Alert} from '../../../../../ui/components/Alert/Alert.jsx';
import {Button} from '../../../../../ui/components/Button/Button.jsx';
import {Checkbox} from '../../../../../ui/components/Checkbox/Checkbox.jsx';
import {CodeInput} from '../../../../../ui/components/CodeInput/CodeInput.jsx';
import {Dialog} from '../../../../../ui/components/Dialog/Dialog.jsx';
import {Input} from '../../../../../ui/components/Input/Input.jsx';
import {Picture} from '../../../../../ui/components/Picture/Picture.jsx';
import {SearchField} from '../../../../../ui/components/SearchField/SearchField.jsx';
import {Select} from '../../../../../ui/components/Select/Select.jsx';
import {Switch} from '../../../../../ui/components/Switch/Switch.jsx';

export function StorefrontPresentationSettings({
  open,
  isSetup,
  labels,
  homeHref,
  formatNumber,
  canStartDisplay,
  onClose,
  onStartDisplay,
  fullscreen,
  collections,
  display,
  toggles,
  transfer,
  pin
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isSetup ? labels.setupTitle : labels.settings}
      maxWidth={640}
      footer={
        <>
          <Button variant="secondary" href={homeHref}>
            <>{labels.leave}</>
          </Button>
          <Button variant="secondary" onClick={onClose}>
            {labels.done}
          </Button>
          <Button variant="primary" disabled={!canStartDisplay} onClick={onStartDisplay}>
            {labels.startDisplay}
          </Button>
        </>
      }
    >
      <div className="tw:flex tw:flex-col tw:gap-4">
        {isSetup ? <p className="tw:m-0">{labels.setupIntro}</p> : null}
        {fullscreen.available ? (
          <Switch
            label={labels.startFullscreen}
            checked={fullscreen.startChecked}
            onChange={fullscreen.onStartChange}
          />
        ) : null}
        {collections.saved.length ? (
          <div className="tw:flex tw:flex-col tw:gap-2">
            <Select
              label={labels.savedCollections}
              value={collections.active}
              options={collections.saved}
              onChange={collections.onLoad}
            />
            <Button
              variant="secondary"
              disabled={!collections.active}
              onClick={collections.onDelete}
            >
              {labels.deleteCollection}
            </Button>
          </div>
        ) : null}
        <Select
          label={labels.displayMode}
          value={display.mode}
          onChange={display.onModeChange}
          options={[
            {value: 'tablet', label: labels.tablet},
            {value: 'tv', label: labels.tv}
          ]}
        />
        <Select
          label={labels.displayCollection}
          value={collections.mode}
          onChange={collections.onModeChange}
          options={[
            {value: 'all', label: labels.allDesigns},
            {value: 'category', label: labels.byCategory},
            {value: 'selected', label: labels.selectedDesigns}
          ]}
        />
        {collections.mode === 'category' ? (
          <Select
            label={labels.displayCategory}
            value={collections.category}
            onChange={collections.onCategoryChange}
            options={collections.categories}
          />
        ) : null}
        {collections.mode === 'selected' ? (
          <div
            role="group"
            aria-label={labels.selectedDesigns}
            className="tw:flex tw:flex-col tw:gap-2"
          >
            <SearchField
              aria-label={labels.collectionSearch}
              value={collections.query}
              onChange={collections.onQueryChange}
            />
            <p className="tw:m-0" role="status">
              {labels.selectionCount}: {formatNumber(collections.selectedCount)}
            </p>
            {collections.products.map(product => (
              <Checkbox
                key={product.id}
                label={
                  <span className="vf-collection-product">
                    <Picture image={product.image} sizes="64px" />
                    <span dir="ltr">{product.id}</span>
                  </span>
                }
                checked={product.selected}
                onChange={product.toggle}
              />
            ))}
          </div>
        ) : null}
        {collections.canUseShortlist ? (
          <Button variant="secondary" onClick={collections.onUseShortlist}>
            {labels.useShortlist}
          </Button>
        ) : null}
        <div role="group" aria-label={labels.previewCollection} className="vf-collection-preview">
          {collections.preview.map(product => (
            <figure key={product.id}>
              <Picture image={product.image} sizes="120px" />
              <figcaption dir="ltr">{product.code}</figcaption>
            </figure>
          ))}
        </div>
        {!canStartDisplay ? (
          <Alert tone="warning" title={labels.emptyCollection} />
        ) : (
          <p className="tw:m-0" role="status">
            {collections.eligibleCountLabel}
          </p>
        )}
        <Input
          label={labels.collectionName}
          value={collections.name}
          onChange={collections.onNameChange}
          maxLength={60}
        />
        <Button variant="secondary" disabled={!collections.canSave} onClick={collections.onSave}>
          {labels.saveCollection}
        </Button>
        <Select
          label={labels.displayLayout}
          value={display.layout}
          onChange={display.onLayoutChange}
          options={[
            {value: 'single', label: labels.singlePhoto},
            {value: 'pair', label: labels.pairedPhotos}
          ]}
        />
        <Select
          label={labels.captions}
          value={display.captionMode}
          onChange={display.onCaptionChange}
          options={[
            {value: 'photo', label: labels.photoOnly},
            {value: 'code', label: labels.photoCode},
            {value: 'price', label: labels.photoPrice}
          ]}
        />
        <Select
          label={labels.slideTiming}
          value={String(display.slideSeconds)}
          onChange={display.onSlideSecondsChange}
          options={[6, 10, 15].map(seconds => ({
            value: String(seconds),
            label: formatNumber(seconds) + ' ' + labels.seconds
          }))}
        />
        <Switch
          label={labels.showPrices}
          checked={toggles.showPrices.checked}
          onChange={toggles.showPrices.onChange}
        />
        <Switch
          label={labels.readyOnly}
          checked={toggles.readyOnly.checked}
          onChange={toggles.readyOnly.onChange}
        />
        <Switch
          label={labels.hideSoldOut}
          checked={toggles.hideSoldOut.checked}
          onChange={toggles.hideSoldOut.onChange}
        />
        <Switch
          label={labels.keepAwake}
          checked={toggles.keepAwake.checked}
          onChange={toggles.keepAwake.onChange}
        />
        {fullscreen.available ? (
          <Switch
            label={labels.fullscreen}
            checked={fullscreen.checked}
            onChange={fullscreen.onChange}
          />
        ) : null}
        <div className="tw:flex tw:flex-col tw:gap-1">
          <Switch
            label={labels.slideshow}
            checked={toggles.slideshow.checked}
            onChange={toggles.slideshow.onChange}
          />
          <span className="tw:text-sm tw:text-quiet">
            <>{labels.slideshowHint}</>
          </span>
        </div>
        <details className="vf-setup-transfer">
          <summary>{labels.configuration}</summary>
          <p>{labels.configurationHint}</p>
          <Input
            multiline
            label={labels.configurationText}
            value={transfer.text}
            onChange={transfer.onChange}
            error={transfer.error ? labels.configurationError : undefined}
            maxLength={12000}
          />
          <div className="tw:flex tw:flex-wrap tw:gap-2 tw:mt-3">
            <Button variant="secondary" onClick={transfer.onExport}>
              {labels.exportSetup}
            </Button>
            <Button
              variant="secondary"
              disabled={!transfer.text.trim()}
              onClick={transfer.onImport}
            >
              {labels.importSetup}
            </Button>
            <Button variant="secondary" href={transfer.link} target="_blank" rel="noopener">
              {labels.setupLink}
            </Button>
          </div>
        </details>
        {pin.isSet ? (
          <div className="tw:flex tw:items-center tw:justify-between tw:gap-3">
            <span>
              <>{labels.pinSet}</>
            </span>
            <Button variant="secondary" size="sm" onClick={pin.onRemove}>
              <>{labels.removePin}</>
            </Button>
          </div>
        ) : (
          <CodeInput
            id="vf-presentation-pin"
            label={labels.pin}
            hint={labels.pinHint}
            length={4}
            webOtp={false}
            value={pin.value}
            onChange={pin.onChange}
            onComplete={pin.onSave}
          />
        )}
      </div>
    </Dialog>
  );
}
