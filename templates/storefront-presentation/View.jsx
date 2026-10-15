// StorefrontPresentation: the counter presentation, full screen without the site's header or footer.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {Shell} from '../app/Shell.jsx';
import {vfKeepOffline} from '../_shared/offline.js';
import {vfQrPath} from '../_shared/qr.js';

function Qr({text, label}) {
  const {path, size} = React.useMemo(() => vfQrPath(text), [text]);
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={'0 0 ' + size + ' ' + size}
      shapeRendering="crispEdges"
      className="vf-presentation-qr tw:block tw:w-full tw:max-w-[280px] tw:mx-auto tw:rounded-md"
    >
      <path d={path} fill="currentColor" />
    </svg>
  );
}

// The code, kind and price under a photo; `large` in the full-screen view.
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
      <span className={large ? 'tw:text-inverse-quiet' : 'tw:text-sm tw:text-quiet'}>
        <>{item.soldOut ? item.kind + ' · ' + v.t?.soldOut : item.kind}</>
      </span>
    </span>
  );
}

export function View({v}) {
  React.useEffect(vfKeepOffline, []);
  return (
    <Shell
      v={v}
      bare={true}
      content={
        <main
          id="main"
          tabIndex={-1}
          className="vf-presentation tw:min-h-screen tw:bg-page tw:text-body tw:flex tw:flex-col"
        >
          <h1 className="ag-sr-only">
            <>{v.t?.title}</>
          </h1>
          <div className="vf-presentation-bar tw:sticky tw:top-0 tw:z-header tw:bg-header tw:[backdrop-filter:blur(10px)] tw:[border-bottom:1px_solid_var(--border-subtle)]">
            <div className="tw:mx-auto tw:max-w-page tw:px-gutter tw:py-3 tw:flex tw:flex-col tw:gap-3">
              <div className="tw:flex tw:items-end tw:gap-2">
                <div className="tw:flex-1 tw:min-w-0">
                  <DS.SearchField
                    id="vf-presentation-q"
                    label={v.t?.search}
                    placeholder={v.t?.searchHint}
                    value={v.q}
                    onChange={v.setQ}
                    onSubmit={v.submitQ}
                  />
                </div>
                {v.canScan ? (
                  <DS.IconButton
                    icon="camera"
                    label={v.t?.scan}
                    variant="secondary"
                    onClick={v.openScan}
                  />
                ) : null}
                <DS.IconButton
                  icon="star"
                  label={v.shortlistLabel}
                  variant="secondary"
                  count={v.shortlistCount ? v.n(v.shortlistCount) : undefined}
                  onClick={v.openShortlist}
                />
                <DS.IconButton
                  icon="shopping-bag"
                  label={v.orderLabel}
                  variant="secondary"
                  count={v.orderCount ? v.n(v.orderCount) : undefined}
                  onClick={v.openOrder}
                />
                <DS.IconButton
                  icon="settings"
                  label={v.t?.settings}
                  variant="secondary"
                  onClick={v.openSettings}
                />
              </div>
              <div className="tw:flex tw:items-center tw:justify-between tw:gap-3 tw:flex-wrap">
                <div
                  role="group"
                  aria-label={v.t?.categories}
                  className="tw:flex tw:gap-2 tw:flex-wrap"
                >
                  {list(v.kinds).map(kind => (
                    <DS.Chip key={kind.id} selected={kind.selected} onClick={kind.pick}>
                      <>{kind.label}</>
                    </DS.Chip>
                  ))}
                </div>
                <div role="status" className="tw:text-sm tw:text-quiet">
                  <>{v.countLabel}</>
                </div>
              </div>
            </div>
          </div>
          <div className="tw:flex-1">
            <div className="tw:mx-auto tw:max-w-page tw:px-gutter tw:py-5">
              {v.noResults ? (
                <div className="tw:flex tw:flex-col tw:items-center tw:gap-4 tw:py-8">
                  <DS.EmptyState icon="search-x" title={v.t?.none} body={v.t?.noneBody} />
                  <DS.Button variant="secondary" onClick={v.showAll}>
                    <>{v.t?.showAll}</>
                  </DS.Button>
                </div>
              ) : (
                <ul className="tw:list-none tw:m-0 tw:p-0 tw:grid tw:gap-5 tw:[grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
                  {list(v.tiles).map(tile => (
                    <li key={tile.id} className="tw:relative">
                      <button
                        type="button"
                        onClick={tile.open}
                        aria-label={tile.openLabel}
                        className="vf-presentation-tile tw:w-full tw:p-0 tw:[border:0] tw:bg-transparent tw:text-body tw:[font:inherit] tw:text-start tw:cursor-pointer tw:flex tw:flex-col tw:gap-2"
                      >
                        <span className="tw:relative tw:block tw:w-full tw:[aspect-ratio:4/5] tw:rounded-md tw:overflow-hidden tw:bg-muted">
                          <DS.Picture
                            image={tile.image}
                            sizes="(max-width: 767px) 100vw, 33vw"
                            className="tw:w-full tw:h-full tw:object-cover tw:block"
                          />
                          {tile.ready ? (
                            <span className="tw:absolute tw:top-3 tw:start-3">
                              <DS.Badge tone="solid">
                                <>{v.t?.ready}</>
                              </DS.Badge>
                            </span>
                          ) : null}
                        </span>
                        <span className="tw:flex tw:items-baseline tw:justify-between tw:gap-3">
                          <Label v={v} item={tile} />
                          {v.showPrices ? <DS.Price value={tile.price} size="md" /> : null}
                        </span>
                      </button>
                      <span className="tw:absolute tw:top-2 tw:end-2">
                        <DS.IconButton
                          icon="star"
                          label={tile.starLabel}
                          variant="raised"
                          active={tile.starred}
                          onClick={tile.star}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <DS.Lightbox
            label={v.t?.viewer}
            items={list(v.viewer).map((item, index) => ({
              id: item.id,
              images: item.images,
              caption: (
                <div className="tw:flex tw:flex-col tw:gap-3">
                  <div className="tw:flex tw:items-baseline tw:gap-5 tw:flex-wrap">
                    <Label v={v} item={item} large={true} />
                    {v.showPrices ? (
                      <span className="tw:text-xl">
                        <DS.Price value={index === v.open ? item.quote : item.price} />
                      </span>
                    ) : null}
                  </div>
                  {index === v.open &&
                  !v.slideshowRunning &&
                  !item.soldOut &&
                  (item.sizes.length || item.addons.length) ? (
                    <div className="vf-presentation-options tw:bg-card tw:text-body tw:rounded-md tw:p-3 tw:flex tw:flex-wrap tw:items-center tw:gap-x-5 tw:gap-y-3">
                      {item.sizes.length ? (
                        <div
                          role="group"
                          aria-label={v.t?.size}
                          className="tw:flex tw:gap-2 tw:flex-wrap"
                        >
                          {item.sizes.map(size => (
                            <DS.Chip key={size.id} selected={size.selected} onClick={size.pick}>
                              <>{size.label}</>
                            </DS.Chip>
                          ))}
                        </div>
                      ) : null}
                      {item.addons.length ? (
                        <div
                          role="group"
                          aria-label={v.t?.extras}
                          className="tw:flex tw:gap-2 tw:flex-wrap"
                        >
                          {item.addons.map(addon => (
                            <DS.Chip key={addon.id} selected={addon.selected} onClick={addon.pick}>
                              <>{addon.label}</>
                            </DS.Chip>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              )
            }))}
            index={v.open}
            onIndexChange={v.setOpen}
            onClose={v.closeViewer}
            actions={(_, index) => {
              const item = v.viewer[index];
              return (
                <>
                  <DS.IconButton
                    icon="star"
                    label={item.starLabel}
                    inverse={true}
                    active={item.starred}
                    onClick={item.star}
                  />
                  {item.soldOut ? null : (
                    <DS.Button
                      variant="soft"
                      iconStart={item.added ? 'check' : 'plus'}
                      onClick={item.addToOrder}
                    >
                      <>{item.added ? v.t?.added : v.t?.addOrder}</>
                    </DS.Button>
                  )}
                  <DS.Button variant="primary" iconStart="send" onClick={item.sendIt}>
                    <>{v.t?.send}</>
                  </DS.Button>
                </>
              );
            }}
          />
          <DS.Dialog open={!!v.send} onClose={v.closeSend} title={v.send?.title} maxWidth={420}>
            {v.send ? (
              <div className="tw:flex tw:flex-col tw:gap-4">
                <div className="vf-presentation-tag tw:flex tw:flex-col tw:items-center tw:gap-2">
                  <Qr text={v.send.url} label={v.send.qrLabel} />
                  {v.send.code ? (
                    <span className="tw:font-display tw:text-xl tw:tracking-display" dir="ltr">
                      <>{v.send.code}</>
                    </span>
                  ) : null}
                </div>
                <p className="tw:m-0">
                  <>{v.send.body}</>
                </p>
                <div className="tw:flex tw:gap-3 tw:flex-wrap">
                  <DS.Button
                    variant="secondary"
                    iconStart="message-circle"
                    href={v.send.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <>{v.t?.whatsapp}</>
                  </DS.Button>
                  <DS.Button variant="secondary" iconStart="copy" onClick={v.send.copy}>
                    <>{v.send.copied ? v.t?.copied : v.t?.copy}</>
                  </DS.Button>
                  {v.send.tag ? (
                    <DS.Button variant="secondary" iconStart="tag" onClick={v.send.print}>
                      <>{v.t?.printTag}</>
                    </DS.Button>
                  ) : null}
                </div>
              </div>
            ) : null}
          </DS.Dialog>
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
                  <DS.Button variant="primary" iconStart="send" onClick={v.handOver}>
                    <>{v.t?.handOver}</>
                  </DS.Button>
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
                    price={line.price}
                    quantity={line.quantity}
                    onQuantityChange={line.setQuantity}
                    onRemove={line.remove}
                    formatQuantity={v.n}
                  />
                ))}
                <div className="tw:flex tw:justify-between tw:font-medium tw:pt-2 tw:[border-top:1px_solid_var(--border-subtle)]">
                  <span>
                    <>{v.t?.total}</>
                  </span>
                  <DS.Price value={v.orderTotal} size="md" />
                </div>
              </div>
            ) : (
              <p className="tw:m-0">
                <>{v.t?.orderEmpty}</>
              </p>
            )}
          </DS.Dialog>
          <DS.Dialog open={v.scanOpen} onClose={v.closePanel} title={v.t?.scanTitle} maxWidth={480}>
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
          <DS.Dialog open={v.unlockOpen} onClose={v.closePanel} title={v.t?.unlock} maxWidth={400}>
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
            title={v.t?.settings}
            maxWidth={440}
            footer={
              <>
                <DS.Button variant="secondary" href={v.href?.home}>
                  <>{v.t?.leave}</>
                </DS.Button>
                <DS.Button variant="primary" onClick={v.closePanel}>
                  <>{v.t?.done}</>
                </DS.Button>
              </>
            }
          >
            <div className="tw:flex tw:flex-col tw:gap-4">
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
        </main>
      }
      sticky={<></>}
    />
  );
}
