// StorefrontPresentation: the counter presentation, full screen without the site's header or footer.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontPresentationLayout} from '../app/layouts/StorefrontPresentationLayout/StorefrontPresentationLayout.jsx';
import {StorefrontPresentationCatalog} from '../app/organisms/StorefrontPresentationCatalog/StorefrontPresentationCatalog.jsx';
import {StorefrontPresentationToolbar} from '../app/organisms/StorefrontPresentationToolbar/StorefrontPresentationToolbar.jsx';
import {StorefrontPresentationDisplay} from '../app/organisms/StorefrontPresentationDisplay/StorefrontPresentationDisplay.jsx';
import {StorefrontPresentationViewer} from '../app/organisms/StorefrontPresentationViewer/StorefrontPresentationViewer.jsx';
import {StorefrontPresentationSend} from '../app/organisms/StorefrontPresentationSend/StorefrontPresentationSend.jsx';
import {Shell} from '../app/Shell.jsx';
import {vfKeepOffline} from '../_shared/offline.js';

// The code under a photo (and "Sold out" when it is); `large` in the full-screen view. The price
// sits beside it. Nothing more: the presentation is about the photos.
function Label({v, item, large = false}) {
  return (
    <span className="tw:flex tw:flex-col">
      <span
        className={
          'tw:font-display tw:tracking-display tw:whitespace-nowrap ' +
          (large ? 'tw:text-3xl' : 'tw:text-xl')
        }
        dir="ltr"
      >
        <>{item.code}</>
      </span>
      {item.soldOut ? (
        <span className={large ? 'tw:text-inverse-quiet' : 'tw:text-sm tw:text-quiet'}>
          <>{v.t?.soldOut}</>
        </span>
      ) : null}
    </span>
  );
}

export function View({v}) {
  const [offline, setOffline] = React.useState({status: 'preparing', completed: 0, total: 0});
  const offlineUrls = v.offlineUrls.join('\n');
  React.useEffect(
    () => vfKeepOffline(offlineUrls.split('\n').filter(Boolean), setOffline),
    [offlineUrls]
  );
  return (
    <Shell
      v={v}
      bare={true}
      quiet={v.display}
      content={
        // On a TV everything (the dialogs and the viewer too) is sized for the far side of the room;
        // the tablet preset stays comfortable even where the storefront's TV mode is on.
        <DS.VendraProvider density={v.displayMode === 'tv' ? 'tv' : 'comfortable'}>
          <StorefrontPresentationLayout
            density={v.displayMode === 'tv' ? 'tv' : 'comfortable'}
            hideCatalog={v.display}
            heading={v.t?.title}
            bar={
              <StorefrontPresentationToolbar
                search={{
                  label: v.t?.search,
                  placeholder: v.t?.searchHint,
                  value: v.q,
                  onChange: v.setQ,
                  onSubmit: v.submitQ
                }}
                categoryLabel={v.t?.categories}
                kinds={list(v.kinds)}
                countLabel={v.countLabel}
                resume={{label: v.t.resumeDisplay, onClick: v.resumeDisplay}}
                scan={v.canScan ? {label: v.t?.scan, onClick: v.openScan} : null}
                shortlist={{
                  label: v.shortlistLabel,
                  count: v.shortlistCount ? v.n(v.shortlistCount) : undefined,
                  onClick: v.openShortlist
                }}
                order={{
                  label: v.orderLabel,
                  count: v.orderCount ? v.n(v.orderCount) : undefined,
                  onClick: v.openOrder
                }}
                startOver={v.canStartOver ? {label: v.t?.startOver, onClick: v.startOver} : null}
                settings={{label: v.t?.settings, onClick: v.openSettings}}
              />
            }
            catalog={
              <StorefrontPresentationCatalog
                tiles={list(v.tiles)}
                noResults={v.noResults}
                showPrices={v.showPrices}
                readyLabel={v.t?.ready}
                emptyTitle={v.t?.none}
                emptyBody={v.t?.noneBody}
                clearLabel={v.t?.showAll}
                onClear={v.showAll}
                renderLabel={tile => <Label v={v} item={tile} />}
              />
            }
            display={
              v.display ? (
                <StorefrontPresentationDisplay
                  mode={v.displayMode}
                  direction={v.dir}
                  products={v.displayProducts}
                  hasCurrentProduct={!!v.displayProduct}
                  preloadProducts={v.preloadProducts}
                  preloadVersion={v.preloadVersion}
                  captionMode={v.captionMode}
                  showPrices={v.showPrices}
                  labels={{
                    viewer: v.t.viewer,
                    hint: v.t.displayHint,
                    photoUnavailable: v.t.photoUnavailable,
                    soldOut: v.t.soldOut,
                    empty: v.t.displayEmpty,
                    sellerTools: v.t.sellerTools,
                    previous: v.t.previousDesign,
                    next: v.t.nextDesign
                  }}
                  onLoaded={v.displayLoaded}
                  onFailed={v.displayFailed}
                  onNext={v.nextDisplay}
                  onPrevious={v.previousDisplay}
                  onOpenTools={v.openTools}
                />
              ) : null
            }
            overlays={
              <>
                <DS.Dialog
                  open={v.toolsOpen}
                  onClose={v.closePanel}
                  title={v.t.sellerTools}
                  placement="start"
                  maxWidth={440}
                >
                  <div className="tw:flex tw:flex-col tw:gap-3">
                    <p
                      className="tw:m-0 tw:text-sm"
                      role="status"
                      data-offline-status={offline.status}
                    >
                      {v.t.offlineStates[offline.status]}
                      {offline.status === 'preparing' && offline.total
                        ? ' ' + v.n(offline.completed) + '/' + v.n(offline.total)
                        : ''}
                    </p>
                    {!v.online ? <DS.Alert tone="warning" title={v.t.offlineStatus} /> : null}
                    {v.displayIssue ? <DS.Alert tone="warning" title={v.t.photoIssue} /> : null}
                    {v.stockIssue ? <DS.Alert tone="warning" title={v.t.stockIssue} /> : null}
                    {v.stockUpdated ? (
                      <p className="tw:m-0 tw:text-sm tw:text-quiet">
                        {v.t.stockUpdated} <bdi>{v.stockUpdated}</bdi>
                      </p>
                    ) : null}
                    {v.displayIssue ? (
                      <DS.Button variant="secondary" disabled={!v.online} onClick={v.retryDisplay}>
                        {v.t.retryPhotos}
                      </DS.Button>
                    ) : null}
                    {!v.setupDone ? <p className="tw:m-0">{v.t.setupIntro}</p> : null}
                    <DS.Button variant="secondary" onClick={v.openSetup}>
                      {v.t.setupTitle}
                    </DS.Button>
                    {v.transferText ? (
                      <DS.Button variant="secondary" onClick={v.openSettings}>
                        {v.t.reviewSetup}
                      </DS.Button>
                    ) : null}
                    <dl
                      className="tw:m-0 tw:flex tw:flex-col tw:gap-2"
                      aria-label={v.t.deviceStatus}
                    >
                      <div>
                        <dt>{v.t.screenStatus}</dt>
                        <dd>
                          {v.canFullscreen
                            ? v.fullscreen
                              ? v.t.fullscreenActive
                              : v.t.fullscreenInactive
                            : v.t.unsupported}
                        </dd>
                      </div>
                      <div>
                        <dt>{v.t.wakeStatus}</dt>
                        <dd>{v.canWake ? v.t.wakeStates[v.wakeStatus] : v.t.unsupported}</dd>
                      </div>
                    </dl>
                    {!v.stockUpdated ? <p className="tw:m-0 tw:text-sm">{v.t.stockDemo}</p> : null}
                    <p className="tw:m-0 tw:text-sm tw:text-quiet">{v.t.gallerySample}</p>
                    <DS.Button variant="secondary" onClick={v.browse}>
                      {v.t.browse}
                    </DS.Button>
                    <DS.Button variant="secondary" iconStart="star" onClick={v.openShortlist}>
                      {v.shortlistLabel}
                    </DS.Button>
                    <DS.Button variant="secondary" iconStart="shopping-bag" onClick={v.openOrder}>
                      {v.orderLabel}
                    </DS.Button>
                    {v.canScan ? (
                      <DS.Button variant="secondary" iconStart="camera" onClick={v.openScan}>
                        {v.t.scan}
                      </DS.Button>
                    ) : null}
                    {v.canStartOver ? (
                      <DS.Button variant="secondary" onClick={v.startOver}>
                        {v.t.startOver}
                      </DS.Button>
                    ) : null}
                    <DS.Button variant="secondary" iconStart="settings" onClick={v.openSettings}>
                      {v.t.settings}
                    </DS.Button>
                  </div>
                </DS.Dialog>
                <StorefrontPresentationViewer
                  items={list(v.viewer)}
                  index={v.open}
                  calm={v.calm}
                  showPrices={v.showPrices}
                  optionsOpen={v.optionsOpen}
                  slideshowRunning={v.slideshowRunning}
                  labels={{
                    viewer: v.t?.viewer,
                    size: v.t?.size,
                    extras: v.t?.extras,
                    options: v.t?.options,
                    added: v.t?.added,
                    addOrder: v.t?.addOrder,
                    send: v.t?.send
                  }}
                  renderLabel={item => <Label v={v} item={item} large={true} />}
                  onIndexChange={v.setOpen}
                  onClose={v.closeViewer}
                  onToggleOptions={v.toggleOptions}
                />
                <StorefrontPresentationSend
                  send={v.send}
                  labels={{
                    whatsapp: v.t?.whatsapp,
                    copied: v.t?.copied,
                    copy: v.t?.copy,
                    printTag: v.t?.printTag
                  }}
                  onClose={v.closeSend}
                />
                <DS.Dialog
                  open={v.shortlistOpen}
                  onClose={v.closePanel}
                  title={v.t?.shortlist}
                  maxWidth={1100}
                  footer={
                    v.shortlist.length ? (
                      <>
                        <DS.Button variant="secondary" onClick={v.clearShortlist}>
                          <>{v.t?.clear}</>
                        </DS.Button>
                        <DS.Button variant="primary" iconStart="send" onClick={v.sendShortlist}>
                          <>{v.t?.sendShortlist}</>
                        </DS.Button>
                      </>
                    ) : null
                  }
                >
                  {v.shortlist.length ? (
                    <ul className="tw:list-none tw:m-0 tw:p-0 tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
                      {v.shortlist.map(item => (
                        <li key={item.id} className="tw:flex tw:flex-col tw:gap-2 tw:text-body">
                          <span className="tw:block tw:[aspect-ratio:4/5] tw:rounded-md tw:overflow-hidden tw:bg-muted">
                            <DS.Picture
                              image={item.image}
                              sizes="(max-width: 767px) 50vw, 25vw"
                              className="tw:w-full tw:h-full tw:object-cover tw:block"
                            />
                          </span>
                          <span className="tw:flex tw:flex-col tw:gap-1">
                            <Label v={v} item={item} />
                            {v.showPrices ? <DS.Price value={item.price} size="md" /> : null}
                          </span>
                          <span className="tw:flex tw:gap-2">
                            <DS.Button variant="secondary" size="sm" onClick={item.show}>
                              <>{v.t?.show}</>
                            </DS.Button>
                            <DS.Button variant="ghost" size="sm" onClick={item.remove}>
                              <>{v.t?.remove}</>
                            </DS.Button>
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="tw:m-0">
                      <>{v.t?.shortlistEmpty}</>
                    </p>
                  )}
                </DS.Dialog>
                <DS.Dialog
                  open={v.orderOpen}
                  onClose={v.closePanel}
                  title={v.t?.orderTitle}
                  maxWidth={560}
                  footer={
                    v.orderLines.length ? (
                      <>
                        <DS.Button variant="secondary" onClick={v.clearOrder}>
                          <>{v.t?.clear}</>
                        </DS.Button>
                        {v.canHandOver ? (
                          <DS.Button variant="primary" iconStart="send" onClick={v.handOver}>
                            <>{v.t?.handOver}</>
                          </DS.Button>
                        ) : null}
                      </>
                    ) : null
                  }
                >
                  {v.orderLines.length ? (
                    <div className="tw:flex tw:flex-col tw:gap-3 tw:text-body">
                      {v.orderLines.map(line => (
                        <DS.LineItem
                          key={line.id}
                          image={line.image}
                          name={line.name}
                          meta={line.meta}
                          price={v.showPrices ? line.price : ''}
                          quantity={line.quantity}
                          onQuantityChange={line.setQuantity}
                          onRemove={line.remove}
                          formatQuantity={v.n}
                        />
                      ))}
                      {v.showPrices ? (
                        <div className="tw:flex tw:justify-between tw:font-medium tw:pt-2 tw:[border-top:1px_solid_var(--border-subtle)]">
                          <span>
                            <>{v.t?.total}</>
                          </span>
                          <DS.Price value={v.orderTotal} size="md" />
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <p className="tw:m-0">
                      <>{v.t?.orderEmpty}</>
                    </p>
                  )}
                </DS.Dialog>
                <DS.Dialog
                  open={v.scanOpen}
                  onClose={v.closePanel}
                  title={v.t?.scanTitle}
                  maxWidth={480}
                >
                  <div className="tw:flex tw:flex-col tw:gap-3">
                    <p className="tw:m-0">
                      <>{v.t?.scanBody}</>
                    </p>
                    <video
                      id="vf-presentation-camera"
                      muted={true}
                      playsInline={true}
                      className="tw:w-full tw:rounded-md tw:bg-inverse tw:[aspect-ratio:4/3] tw:object-cover"
                    />
                    {v.scanMessage ? <DS.Alert tone="warning" title={v.scanMessage} /> : null}
                  </div>
                </DS.Dialog>
                <DS.Dialog
                  open={v.unlockOpen}
                  onClose={v.closePanel}
                  title={v.t?.unlock}
                  maxWidth={400}
                >
                  <DS.CodeInput
                    id="vf-presentation-unlock"
                    label={v.t?.unlockHint}
                    length={4}
                    webOtp={false}
                    autoFocus={true}
                    value={v.pinEntry}
                    onChange={v.setPinEntry}
                    onComplete={v.checkPin}
                    error={v.pinError ? v.t?.wrongPin : undefined}
                  />
                </DS.Dialog>
                <DS.Dialog
                  open={v.settingsOpen}
                  onClose={v.closePanel}
                  title={v.isSetup ? v.t.setupTitle : v.t?.settings}
                  maxWidth={640}
                  footer={
                    <>
                      <DS.Button variant="secondary" href={v.href?.home}>
                        <>{v.t?.leave}</>
                      </DS.Button>
                      <DS.Button variant="secondary" onClick={v.closePanel}>
                        {v.t.done}
                      </DS.Button>
                      <DS.Button
                        variant="primary"
                        disabled={!v.canStartDisplay}
                        onClick={v.startDisplay}
                      >
                        {v.t.startDisplay}
                      </DS.Button>
                    </>
                  }
                >
                  <div className="tw:flex tw:flex-col tw:gap-4">
                    {v.isSetup ? <p className="tw:m-0">{v.t.setupIntro}</p> : null}
                    {v.canFullscreen ? (
                      <DS.Switch
                        label={v.t.startFullscreen}
                        checked={v.setupFullscreen}
                        onChange={v.setSetupFullscreen}
                      />
                    ) : null}
                    {v.savedCollections.length ? (
                      <div className="tw:flex tw:flex-col tw:gap-2">
                        <DS.Select
                          label={v.t.savedCollections}
                          value={v.activeCollection}
                          options={v.savedCollections}
                          onChange={v.loadCollection}
                        />
                        <DS.Button
                          variant="secondary"
                          disabled={!v.activeCollection}
                          onClick={v.deleteCollection}
                        >
                          {v.t.deleteCollection}
                        </DS.Button>
                      </div>
                    ) : null}
                    <DS.Select
                      label={v.t.displayMode}
                      value={v.displayMode}
                      onChange={v.setDisplayMode}
                      options={[
                        {value: 'tablet', label: v.t.tablet},
                        {value: 'tv', label: v.t.tv}
                      ]}
                    />
                    <DS.Select
                      label={v.t.displayCollection}
                      value={v.displayCollection}
                      onChange={v.setDisplayCollection}
                      options={[
                        {value: 'all', label: v.t.allDesigns},
                        {value: 'category', label: v.t.byCategory},
                        {value: 'selected', label: v.t.selectedDesigns}
                      ]}
                    />
                    {v.displayCollection === 'category' ? (
                      <DS.Select
                        label={v.t.displayCategory}
                        value={v.displayCategory}
                        onChange={v.setDisplayCategory}
                        options={v.displayCategories}
                      />
                    ) : null}
                    {v.displayCollection === 'selected' ? (
                      <div
                        role="group"
                        aria-label={v.t.selectedDesigns}
                        className="tw:flex tw:flex-col tw:gap-2"
                      >
                        <DS.SearchField
                          aria-label={v.t.collectionSearch}
                          value={v.collectionQuery}
                          onChange={v.setCollectionQuery}
                        />
                        <p className="tw:m-0" role="status">
                          {v.t.selectionCount}: {v.n(v.selectedCount)}
                        </p>
                        {v.collectionProducts.map(product => (
                          <DS.Checkbox
                            key={product.id}
                            label={
                              <span className="vf-collection-product">
                                <DS.Picture image={product.image} sizes="64px" />
                                <span dir="ltr">{product.id}</span>
                              </span>
                            }
                            checked={product.selected}
                            onChange={product.toggle}
                          />
                        ))}
                      </div>
                    ) : null}
                    {v.canUseShortlist ? (
                      <DS.Button variant="secondary" onClick={v.useShortlist}>
                        {v.t.useShortlist}
                      </DS.Button>
                    ) : null}
                    <div
                      role="group"
                      aria-label={v.t.previewCollection}
                      className="vf-collection-preview"
                    >
                      {v.previewProducts.map(product => (
                        <figure key={product.id}>
                          <DS.Picture image={product.image} sizes="120px" />
                          <figcaption dir="ltr">{product.code}</figcaption>
                        </figure>
                      ))}
                    </div>
                    {!v.canStartDisplay ? (
                      <DS.Alert tone="warning" title={v.t.emptyCollection} />
                    ) : (
                      <p className="tw:m-0" role="status">
                        {v.t.count(v.eligibleCount)}
                      </p>
                    )}
                    <DS.Input
                      label={v.t.collectionName}
                      value={v.collectionName}
                      onChange={v.setCollectionName}
                      maxLength={60}
                    />
                    <DS.Button
                      variant="secondary"
                      disabled={!v.canSaveCollection}
                      onClick={v.saveCollection}
                    >
                      {v.t.saveCollection}
                    </DS.Button>
                    <DS.Select
                      label={v.t.displayLayout}
                      value={v.displayLayout}
                      onChange={v.setDisplayLayout}
                      options={[
                        {value: 'single', label: v.t.singlePhoto},
                        {value: 'pair', label: v.t.pairedPhotos}
                      ]}
                    />
                    <DS.Select
                      label={v.t.captions}
                      value={v.captionMode}
                      onChange={v.setCaptionMode}
                      options={[
                        {value: 'photo', label: v.t.photoOnly},
                        {value: 'code', label: v.t.photoCode},
                        {value: 'price', label: v.t.photoPrice}
                      ]}
                    />
                    <DS.Select
                      label={v.t.slideTiming}
                      value={String(v.slideSeconds)}
                      onChange={v.setSlideSeconds}
                      options={[6, 10, 15].map(seconds => ({
                        value: String(seconds),
                        label: v.n(seconds) + ' ' + v.t.seconds
                      }))}
                    />
                    <DS.Switch
                      label={v.t?.showPrices}
                      checked={v.settings?.showPrices}
                      onChange={v.setShowPrices}
                    />
                    <DS.Switch
                      label={v.t?.readyOnly}
                      checked={v.settings?.readyOnly}
                      onChange={v.setReadyOnly}
                    />
                    <DS.Switch
                      label={v.t?.hideSoldOut}
                      checked={v.settings?.hideSoldOut}
                      onChange={v.setHideSoldOut}
                    />
                    <DS.Switch
                      label={v.t?.keepAwake}
                      checked={v.settings?.keepAwake}
                      onChange={v.setKeepAwake}
                    />
                    {v.canFullscreen ? (
                      <DS.Switch
                        label={v.t?.fullscreen}
                        checked={v.fullscreen}
                        onChange={v.setFullscreen}
                      />
                    ) : null}
                    <div className="tw:flex tw:flex-col tw:gap-1">
                      <DS.Switch
                        label={v.t?.slideshow}
                        checked={v.settings?.slideshow}
                        onChange={v.setSlideshow}
                      />
                      <span className="tw:text-sm tw:text-quiet">
                        <>{v.t?.slideshowHint}</>
                      </span>
                    </div>
                    <details className="vf-setup-transfer">
                      <summary>{v.t.configuration}</summary>
                      <p>{v.t.configurationHint}</p>
                      <DS.Input
                        multiline
                        label={v.t.configurationText}
                        value={v.transferText}
                        onChange={v.setTransferText}
                        error={v.transferError ? v.t.configurationError : undefined}
                        maxLength={12000}
                      />
                      <div className="tw:flex tw:flex-wrap tw:gap-2 tw:mt-3">
                        <DS.Button variant="secondary" onClick={v.exportSetup}>
                          {v.t.exportSetup}
                        </DS.Button>
                        <DS.Button
                          variant="secondary"
                          disabled={!v.transferText.trim()}
                          onClick={v.importSetup}
                        >
                          {v.t.importSetup}
                        </DS.Button>
                        <DS.Button
                          variant="secondary"
                          href={v.setupLink}
                          target="_blank"
                          rel="noopener"
                        >
                          {v.t.setupLink}
                        </DS.Button>
                      </div>
                    </details>
                    {v.hasPin ? (
                      <div className="tw:flex tw:items-center tw:justify-between tw:gap-3">
                        <span>
                          <>{v.t?.pinSet}</>
                        </span>
                        <DS.Button variant="secondary" size="sm" onClick={v.removePin}>
                          <>{v.t?.removePin}</>
                        </DS.Button>
                      </div>
                    ) : (
                      <DS.CodeInput
                        id="vf-presentation-pin"
                        label={v.t?.pin}
                        hint={v.t?.pinHint}
                        length={4}
                        webOtp={false}
                        value={v.pinDraft}
                        onChange={v.setPinDraft}
                        onComplete={v.savePin}
                      />
                    )}
                  </div>
                </DS.Dialog>
              </>
            }
            feedback={<DS.ToastRegion queue={v.toasts} closeLabel={v.t?.dismiss} />}
          />
        </DS.VendraProvider>
      }
      sticky={<></>}
    />
  );
}
