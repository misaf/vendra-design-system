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
import {StorefrontPresentationShortlist} from '../app/organisms/StorefrontPresentationShortlist/StorefrontPresentationShortlist.jsx';
import {StorefrontPresentationOrder} from '../app/organisms/StorefrontPresentationOrder/StorefrontPresentationOrder.jsx';
import {StorefrontPresentationScan} from '../app/organisms/StorefrontPresentationScan/StorefrontPresentationScan.jsx';
import {StorefrontPresentationUnlock} from '../app/organisms/StorefrontPresentationUnlock/StorefrontPresentationUnlock.jsx';
import {StorefrontPresentationSettings} from '../app/organisms/StorefrontPresentationSettings/StorefrontPresentationSettings.jsx';
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
                <StorefrontPresentationShortlist
                  open={v.shortlistOpen}
                  items={v.shortlist}
                  showPrices={v.showPrices}
                  labels={{
                    title: v.t?.shortlist,
                    empty: v.t?.shortlistEmpty,
                    clear: v.t?.clear,
                    sendShortlist: v.t?.sendShortlist,
                    show: v.t?.show,
                    remove: v.t?.remove
                  }}
                  renderLabel={item => <Label v={v} item={item} />}
                  onClose={v.closePanel}
                  onClear={v.clearShortlist}
                  onSend={v.sendShortlist}
                />
                <StorefrontPresentationOrder
                  open={v.orderOpen}
                  lines={v.orderLines}
                  showPrices={v.showPrices}
                  total={v.orderTotal}
                  canHandOver={v.canHandOver}
                  labels={{
                    title: v.t?.orderTitle,
                    empty: v.t?.orderEmpty,
                    clear: v.t?.clear,
                    handOver: v.t?.handOver,
                    total: v.t?.total
                  }}
                  formatQuantity={v.n}
                  onClose={v.closePanel}
                  onClear={v.clearOrder}
                  onHandOver={v.handOver}
                />
                <StorefrontPresentationScan
                  open={v.scanOpen}
                  labels={{title: v.t?.scanTitle, body: v.t?.scanBody}}
                  message={v.scanMessage}
                  videoId="vf-presentation-camera"
                  onClose={v.closePanel}
                />
                <StorefrontPresentationUnlock
                  open={v.unlockOpen}
                  value={v.pinEntry}
                  error={v.pinError ? v.t?.wrongPin : undefined}
                  labels={{title: v.t?.unlock, hint: v.t?.unlockHint}}
                  onChange={v.setPinEntry}
                  onComplete={v.checkPin}
                  onClose={v.closePanel}
                />
                <StorefrontPresentationSettings
                  open={v.settingsOpen}
                  isSetup={v.isSetup}
                  homeHref={v.href?.home}
                  formatNumber={v.n}
                  canStartDisplay={v.canStartDisplay}
                  onClose={v.closePanel}
                  onStartDisplay={v.startDisplay}
                  labels={{
                    setupTitle: v.t.setupTitle,
                    settings: v.t?.settings,
                    leave: v.t?.leave,
                    done: v.t.done,
                    startDisplay: v.t.startDisplay,
                    setupIntro: v.t.setupIntro,
                    startFullscreen: v.t.startFullscreen,
                    savedCollections: v.t.savedCollections,
                    deleteCollection: v.t.deleteCollection,
                    displayMode: v.t.displayMode,
                    tablet: v.t.tablet,
                    tv: v.t.tv,
                    displayCollection: v.t.displayCollection,
                    allDesigns: v.t.allDesigns,
                    byCategory: v.t.byCategory,
                    selectedDesigns: v.t.selectedDesigns,
                    displayCategory: v.t.displayCategory,
                    collectionSearch: v.t.collectionSearch,
                    selectionCount: v.t.selectionCount,
                    useShortlist: v.t.useShortlist,
                    previewCollection: v.t.previewCollection,
                    emptyCollection: v.t.emptyCollection,
                    collectionName: v.t.collectionName,
                    saveCollection: v.t.saveCollection,
                    displayLayout: v.t.displayLayout,
                    singlePhoto: v.t.singlePhoto,
                    pairedPhotos: v.t.pairedPhotos,
                    captions: v.t.captions,
                    photoOnly: v.t.photoOnly,
                    photoCode: v.t.photoCode,
                    photoPrice: v.t.photoPrice,
                    slideTiming: v.t.slideTiming,
                    seconds: v.t.seconds,
                    showPrices: v.t?.showPrices,
                    readyOnly: v.t?.readyOnly,
                    hideSoldOut: v.t?.hideSoldOut,
                    keepAwake: v.t?.keepAwake,
                    fullscreen: v.t?.fullscreen,
                    slideshow: v.t?.slideshow,
                    slideshowHint: v.t?.slideshowHint,
                    configuration: v.t.configuration,
                    configurationHint: v.t.configurationHint,
                    configurationText: v.t.configurationText,
                    configurationError: v.t.configurationError,
                    exportSetup: v.t.exportSetup,
                    importSetup: v.t.importSetup,
                    setupLink: v.t.setupLink,
                    pinSet: v.t?.pinSet,
                    removePin: v.t?.removePin,
                    pin: v.t?.pin,
                    pinHint: v.t?.pinHint
                  }}
                  fullscreen={{
                    available: v.canFullscreen,
                    startChecked: v.setupFullscreen,
                    onStartChange: v.setSetupFullscreen,
                    checked: v.fullscreen,
                    onChange: v.setFullscreen
                  }}
                  collections={{
                    saved: v.savedCollections,
                    active: v.activeCollection,
                    onLoad: v.loadCollection,
                    onDelete: v.deleteCollection,
                    mode: v.displayCollection,
                    onModeChange: v.setDisplayCollection,
                    category: v.displayCategory,
                    onCategoryChange: v.setDisplayCategory,
                    categories: v.displayCategories,
                    query: v.collectionQuery,
                    onQueryChange: v.setCollectionQuery,
                    selectedCount: v.selectedCount,
                    products: v.collectionProducts,
                    canUseShortlist: v.canUseShortlist,
                    onUseShortlist: v.useShortlist,
                    preview: v.previewProducts,
                    name: v.collectionName,
                    onNameChange: v.setCollectionName,
                    canSave: v.canSaveCollection,
                    onSave: v.saveCollection,
                    eligibleCountLabel: v.t.count(v.eligibleCount)
                  }}
                  display={{
                    mode: v.displayMode,
                    onModeChange: v.setDisplayMode,
                    layout: v.displayLayout,
                    onLayoutChange: v.setDisplayLayout,
                    captionMode: v.captionMode,
                    onCaptionChange: v.setCaptionMode,
                    slideSeconds: v.slideSeconds,
                    onSlideSecondsChange: v.setSlideSeconds
                  }}
                  transfer={{
                    text: v.transferText,
                    error: v.transferError,
                    onChange: v.setTransferText,
                    onExport: v.exportSetup,
                    onImport: v.importSetup,
                    link: v.setupLink
                  }}
                  pin={{
                    isSet: v.hasPin,
                    value: v.pinDraft,
                    onChange: v.setPinDraft,
                    onSave: v.savePin,
                    onRemove: v.removePin
                  }}
                  toggles={{
                    showPrices: {checked: v.settings?.showPrices, onChange: v.setShowPrices},
                    readyOnly: {checked: v.settings?.readyOnly, onChange: v.setReadyOnly},
                    hideSoldOut: {checked: v.settings?.hideSoldOut, onChange: v.setHideSoldOut},
                    keepAwake: {checked: v.settings?.keepAwake, onChange: v.setKeepAwake},
                    slideshow: {checked: v.settings?.slideshow, onChange: v.setSlideshow}
                  }}
                />
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
