# StorefrontShopFilterDialog

Controlled compact filter dialog receiving open/close/clear callbacks, title/show/clear labels and explicit occasion/date/price/stock descriptors. Composes Dialog, the scrolling filter fields and footer actions. Show uses the close callback; Clear retains the page's existing clear callback. Preserves dialog-specific field IDs and labelled range relationships.

View normalizes records/maps descriptors. Shop/shared logic retain dialog state, availability/cutoffs, price rules, filtering, tracking/debounce, result labels, URL/paging, sorting and clear semantics. Dialog and existing CSS retain focus trapping/restoration, dismissal, scrolling and action placement. No page model, state/effects, browser APIs or commerce rules move here.

Verify English/Persian top/scrolled views, short phone/tablet heights, reachable footer actions, selected/cleared controls, live result labels, disabled dates, slider values, URL and sort/category retention, Clear staying open, Show/Escape/close dismissal, focus wrap/restoration, reload, rotation, wide-layout closure and accessibility.
