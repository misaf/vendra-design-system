/* @ds-bundle: {"format":4,"namespace":"VendraDesignSystem_f4f210","components":[{"name":"AddressCard","sourcePath":"components/commerce/AddressCard.jsx"},{"name":"BlogCard","sourcePath":"components/commerce/BlogCard.jsx"},{"name":"CategoryCard","sourcePath":"components/commerce/CategoryCard.jsx"},{"name":"Gallery","sourcePath":"components/commerce/Gallery.jsx"},{"name":"LineItem","sourcePath":"components/commerce/LineItem.jsx"},{"name":"OrderSummary","sourcePath":"components/commerce/OrderSummary.jsx"},{"name":"OrderTimeline","sourcePath":"components/commerce/OrderTimeline.jsx"},{"name":"PaymentCard","sourcePath":"components/commerce/PaymentCard.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"ReminderRow","sourcePath":"components/commerce/ReminderRow.jsx"},{"name":"ArchFrame","sourcePath":"components/core/ArchFrame.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"DetailList","sourcePath":"components/core/DetailList.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"SkipLink","sourcePath":"components/core/SkipLink.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"ICON_SVGS","sourcePath":"components/core/icon-svgs.js"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"AnnouncementBar","sourcePath":"components/feedback/AnnouncementBar.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"LiveRegion","sourcePath":"components/feedback/LiveRegion.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"ChoiceGroup","sourcePath":"components/forms/ChoiceGroup.jsx"},{"name":"ChoiceTile","sourcePath":"components/forms/ChoiceTile.jsx"},{"name":"DatePicker","sourcePath":"components/forms/DatePicker.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"QuantityStepper","sourcePath":"components/forms/QuantityStepper.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"RangeSlider","sourcePath":"components/forms/RangeSlider.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Accordion","sourcePath":"components/navigation/Accordion.jsx"},{"name":"BottomTabBar","sourcePath":"components/navigation/BottomTabBar.jsx"},{"name":"LanguageSwitch","sourcePath":"components/navigation/LanguageSwitch.jsx"},{"name":"MenuList","sourcePath":"components/navigation/MenuList.jsx"},{"name":"NavLink","sourcePath":"components/navigation/NavLink.jsx"},{"name":"SectionHeader","sourcePath":"components/navigation/SectionHeader.jsx"},{"name":"SnapScroller","sourcePath":"components/navigation/SnapScroller.jsx"},{"name":"Stepper","sourcePath":"components/navigation/Stepper.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/commerce/AddressCard.jsx":"37b220086322","components/commerce/BlogCard.jsx":"36ef083cbeb8","components/commerce/CategoryCard.jsx":"f51f60d40099","components/commerce/Gallery.jsx":"ae185b02ac38","components/commerce/LineItem.jsx":"2258f655d1d0","components/commerce/OrderSummary.jsx":"0721d0841dec","components/commerce/OrderTimeline.jsx":"601537deba31","components/commerce/PaymentCard.jsx":"125173e3d345","components/commerce/ProductCard.jsx":"277ccc1de715","components/commerce/ReminderRow.jsx":"f54847f91308","components/core/ArchFrame.jsx":"d527eb309df8","components/core/Badge.jsx":"f9cca1c95972","components/core/Button.jsx":"5a77f8df5a87","components/core/Card.jsx":"55723458b4a2","components/core/DetailList.jsx":"15ed6e473d53","components/core/Icon.jsx":"3cfc4b4f0c8d","components/core/IconButton.jsx":"014224884557","components/core/SkipLink.jsx":"bfcefe7f715f","components/core/Tag.jsx":"c2fcd6dc5d47","components/core/icon-svgs.js":"b67f776a1172","components/feedback/Alert.jsx":"9f3cb61d7064","components/feedback/AnnouncementBar.jsx":"ff25283f4048","components/feedback/Dialog.jsx":"403f68c220c2","components/feedback/EmptyState.jsx":"c3e59bea9315","components/feedback/LiveRegion.jsx":"55b92cf687a9","components/feedback/Skeleton.jsx":"2ae301bd9cf9","components/feedback/Toast.jsx":"c93f75a0393c","components/feedback/Tooltip.jsx":"77be487ea9be","components/forms/Checkbox.jsx":"119f891c0fa7","components/forms/ChoiceGroup.jsx":"3c6e886f8ef1","components/forms/ChoiceTile.jsx":"5599f09f37bd","components/forms/DatePicker.jsx":"93cc16cde5ff","components/forms/Input.jsx":"2597bec4c519","components/forms/QuantityStepper.jsx":"bc1bef867d7a","components/forms/Radio.jsx":"c5405e8e2f7c","components/forms/RangeSlider.jsx":"5d4b6d2246cc","components/forms/Select.jsx":"d543eb64c6d3","components/forms/Switch.jsx":"769640378519","components/navigation/Accordion.jsx":"acb3368cae51","components/navigation/BottomTabBar.jsx":"47dc44a47a18","components/navigation/LanguageSwitch.jsx":"9c4d7b9408e7","components/navigation/MenuList.jsx":"43c3156bf970","components/navigation/NavLink.jsx":"9e143a04b3f0","components/navigation/SectionHeader.jsx":"f9b752923188","components/navigation/SnapScroller.jsx":"22236afd7a2f","components/navigation/Stepper.jsx":"c94f630bd8db","components/navigation/Tabs.jsx":"fb4d44851b27","components/utils/dates.js":"6e02a4c4f389","components/utils/format.js":"38da12a44fae","components/utils/nav.js":"c0187093021e","components/utils/responsive.js":"0e93a531f6e0","components/utils/seo.js":"3a06025cae1d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VendraDesignSystem_f4f210 = window.VendraDesignSystem_f4f210 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/commerce/Gallery.jsx
try { (() => {
// The track is focusable so keyboard users can scroll it with the arrow keys (axe: scrollable-region-focusable).
function Gallery({
  images = [],
  sizes = '(max-width: 767px) 100vw, 540px',
  frame = 'arch',
  aspect = '3/4',
  label,
  slideLabel = (i, n) => i + ' / ' + n,
  className = ''
}) {
  const ref = React.useRef(null);
  const [idx, setIdx] = React.useState(0);
  const n = images.length;
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const i = Math.round(Math.abs(el.scrollLeft) / el.clientWidth);
    if (i !== idx) setIdx(i);
  };
  const go = i => {
    const el = ref.current;
    const rtl = getComputedStyle(el).direction === 'rtl';
    el.scrollTo({
      left: (rtl ? -1 : 1) * i * el.clientWidth
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "region",
    "aria-roledescription": "carousel",
    "aria-label": label,
    className: 'ag-gallery ' + className
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onScroll: onScroll,
    tabIndex: 0,
    className: 'ag-gallery__track ag-product__media--' + frame,
    style: {
      aspectRatio: aspect
    }
  }, images.map((im, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "ag-gallery__slide",
    role: "group",
    "aria-roledescription": "slide",
    "aria-label": slideLabel(i + 1, n)
  }, /*#__PURE__*/React.createElement("img", {
    src: im.src,
    srcSet: im.srcSet,
    sizes: im.srcSet ? sizes : undefined,
    alt: im.alt || '',
    loading: i ? 'lazy' : undefined,
    decoding: "async"
  })))), n > 1 && /*#__PURE__*/React.createElement("div", {
    className: "ag-gallery__dots"
  }, images.map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    className: "ag-gallery__dot",
    "aria-label": slideLabel(i + 1, n),
    "aria-current": i === idx ? 'true' : undefined,
    onClick: () => go(i)
  }, /*#__PURE__*/React.createElement("span", null)))));
}
Object.assign(__ds_scope, { Gallery });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/Gallery.jsx", error: String((e && e.message) || e) }); }

// components/core/ArchFrame.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ARCH_RATIOS = {
  '4/5': '4 / 5',
  '3/4': '3 / 4',
  '4/3': '4 / 3',
  '1/1': '1 / 1'
};
function ArchFrame({
  src,
  srcSet,
  sizes,
  alt = '',
  ratio = '4/5',
  shape = 'arch',
  placeholder = true,
  placeholderLabel,
  ring,
  minHeight,
  tone = 'petal',
  size,
  zoomOnHover,
  objectPosition,
  children,
  className = '',
  style,
  ...rest
}) {
  const fill = ratio === 'fill' && shape !== 'circle';
  const ar = shape === 'circle' ? '1 / 1' : fill ? undefined : ARCH_RATIOS[ratio] || ratio.replace('/', ' / ');
  const thumb = size === 'thumb';
  const cls = ['ag-arch', 'ag-arch--' + shape, ring ? 'ag-arch--ring' : '', fill ? 'ag-arch--fill' : '', tone === 'product' ? 'ag-arch--product' : '', thumb ? 'ag-arch--thumb' : '', zoomOnHover ? 'ag-arch--zoom' : '', className].join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    style: {
      aspectRatio: ar,
      minHeight: fill ? minHeight : undefined,
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    srcSet: srcSet,
    sizes: srcSet ? sizes : undefined,
    alt: alt,
    loading: "lazy",
    decoding: "async",
    style: objectPosition ? {
      objectPosition
    } : undefined
  }) : placeholder ? /*#__PURE__*/React.createElement("span", {
    className: "ag-arch__ph",
    role: alt ? 'img' : undefined,
    "aria-label": alt || undefined
  }, thumb ? null : placeholderLabel) : null, children);
}
Object.assign(__ds_scope, { ArchFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ArchFrame.jsx", error: String((e && e.message) || e) }); }

// components/commerce/OrderSummary.jsx
try { (() => {
// Lines + totals for order pages and confirmations. Card note: italic in EN, upright in FA (CSS).
function OrderSummary({
  lines = [],
  sums = [],
  title,
  titleAs = 'h2',
  className = '',
  style
}) {
  const H = titleAs;
  return /*#__PURE__*/React.createElement("section", {
    className: 'ag-osum ' + className,
    style: style
  }, title && /*#__PURE__*/React.createElement(H, {
    className: "ag-osum__title"
  }, title), /*#__PURE__*/React.createElement("ul", {
    className: "ag-osum__lines"
  }, lines.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "ag-osum__line"
  }, /*#__PURE__*/React.createElement(__ds_scope.ArchFrame, {
    size: "thumb",
    tone: "product",
    src: l.image,
    alt: "",
    style: {
      width: 48
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ag-osum__main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ag-osum__name"
  }, l.href ? /*#__PURE__*/React.createElement("a", {
    href: l.href,
    onClick: l.onClick
  }, l.name) : l.name), l.meta && /*#__PURE__*/React.createElement("div", {
    className: "ag-osum__meta"
  }, l.meta), l.note && /*#__PURE__*/React.createElement("div", {
    className: "ag-osum__note"
  }, l.note)), /*#__PURE__*/React.createElement("div", {
    className: "ag-osum__total"
  }, l.total)))), sums.length > 0 && /*#__PURE__*/React.createElement("dl", {
    className: "ag-osum__sums"
  }, sums.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: 'ag-osum__sum' + (s.strong ? ' ag-osum__sum--strong' : '')
  }, /*#__PURE__*/React.createElement("dt", null, s.label), /*#__PURE__*/React.createElement("dd", null, s.value)))));
}
Object.assign(__ds_scope, { OrderSummary });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/OrderSummary.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Retired palette names → shared status tones (kept so older markup still renders).
const BADGE_TONE_ALIASES = {
  sage: 'success',
  ochre: 'warning',
  plum: 'info'
};
function Badge({
  tone = 'neutral',
  className = '',
  children,
  ...rest
}) {
  const t = BADGE_TONE_ALIASES[tone] || tone;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: 'ag-badge ag-badge--' + t + ' ' + className
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  variant = 'default',
  padding = 24,
  className = '',
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'ag-card' + (variant !== 'default' ? ' ag-card--' + variant : '') + ' ' + className,
    style: {
      padding,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/SkipLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// First element in <body>. Hidden until focused; moves focus to the target (adds tabindex="-1" if needed) without touching the URL.
function SkipLink({
  href = '#main',
  children,
  className = '',
  onClick,
  ...rest
}) {
  const go = e => {
    onClick && onClick(e);
    if (e.defaultPrevented || !href.startsWith('#')) return;
    const t = document.getElementById(href.slice(1));
    if (!t) return;
    e.preventDefault();
    if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
    t.focus();
  };
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    className: 'ag-skip ' + className,
    onClick: go
  }, rest), children);
}
Object.assign(__ds_scope, { SkipLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SkipLink.jsx", error: String((e && e.message) || e) }); }

// components/core/icon-svgs.js
try { (() => {
// Lucide 0.460.0 (ISC licence) — the icons this design system uses, bundled so no CDN is needed.
// To add one: paste its SVG from lucide.dev into this map. Names not listed render empty (with a console warning).
const ICON_SVGS = {
  'arrow-down': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12 5v14\" /><path d=\"m19 12-7 7-7-7\" /></svg>",
  'arrow-left': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m12 19-7-7 7-7\" /><path d=\"M19 12H5\" /></svg>",
  'arrow-right': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M5 12h14\" /><path d=\"m12 5 7 7-7 7\" /></svg>",
  'arrow-up': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m5 12 7-7 7 7\" /><path d=\"M12 19V5\" /></svg>",
  'badge': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z\" /></svg>",
  'banknote': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"20\" height=\"12\" x=\"2\" y=\"6\" rx=\"2\" /><circle cx=\"12\" cy=\"12\" r=\"2\" /><path d=\"M6 12h.01M18 12h.01\" /></svg>",
  'baseline': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M4 20h16\" /><path d=\"m6 16 6-12 6 12\" /><path d=\"M8 12h8\" /></svg>",
  'bell': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9\" /><path d=\"M10.3 21a1.94 1.94 0 0 0 3.4 0\" /></svg>",
  'book-x': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m14.5 7-5 5\" /><path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\" /><path d=\"m9.5 7 5 5\" /></svg>",
  'boxes': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z\" /><path d=\"m7 16.5-4.74-2.85\" /><path d=\"m7 16.5 5-3\" /><path d=\"M7 16.5v5.17\" /><path d=\"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z\" /><path d=\"m17 16.5-5-3\" /><path d=\"m17 16.5 4.74-2.85\" /><path d=\"M17 16.5v5.17\" /><path d=\"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z\" /><path d=\"M12 8 7.26 5.15\" /><path d=\"m12 8 4.74-2.85\" /><path d=\"M12 13.5V8\" /></svg>",
  'cake': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8\" /><path d=\"M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1\" /><path d=\"M2 21h20\" /><path d=\"M7 8v3\" /><path d=\"M12 8v3\" /><path d=\"M17 8v3\" /><path d=\"M7 4h.01\" /><path d=\"M12 4h.01\" /><path d=\"M17 4h.01\" /></svg>",
  'calendar': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M8 2v4\" /><path d=\"M16 2v4\" /><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" /><path d=\"M3 10h18\" /></svg>",
  'calendar-days': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M8 2v4\" /><path d=\"M16 2v4\" /><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" /><path d=\"M3 10h18\" /><path d=\"M8 14h.01\" /><path d=\"M12 14h.01\" /><path d=\"M16 14h.01\" /><path d=\"M8 18h.01\" /><path d=\"M12 18h.01\" /><path d=\"M16 18h.01\" /></svg>",
  'calendar-heart': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M3 10h18V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7\" /><path d=\"M8 2v4\" /><path d=\"M16 2v4\" /><path d=\"M21.29 14.7a2.43 2.43 0 0 0-2.65-.52c-.3.12-.57.3-.8.53l-.34.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L17.5 22l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z\" /></svg>",
  'camera': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z\" /><circle cx=\"12\" cy=\"13\" r=\"3\" /></svg>",
  'car': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2\" /><circle cx=\"7\" cy=\"17\" r=\"2\" /><path d=\"M9 17h6\" /><circle cx=\"17\" cy=\"17\" r=\"2\" /></svg>",
  'cat': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z\" /><path d=\"M8 14v.5\" /><path d=\"M16 14v.5\" /><path d=\"M11.25 16.25h1.5L12 17l-.75-.75Z\" /></svg>",
  'check': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M20 6 9 17l-5-5\" /></svg>",
  'chevron-down': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m6 9 6 6 6-6\" /></svg>",
  'chevron-left': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m15 18-6-6 6-6\" /></svg>",
  'chevron-right': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m9 18 6-6-6-6\" /></svg>",
  'chevron-up': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m18 15-6-6-6 6\" /></svg>",
  'circle': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /></svg>",
  'circle-alert': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\" /><line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\" /></svg>",
  'circle-check': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"m9 12 2 2 4-4\" /></svg>",
  'circle-help': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\" /><path d=\"M12 17h.01\" /></svg>",
  'circle-x': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"m15 9-6 6\" /><path d=\"m9 9 6 6\" /></svg>",
  'clock': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><polyline points=\"12 6 12 12 16 14\" /></svg>",
  'code': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><polyline points=\"16 18 22 12 16 6\" /><polyline points=\"8 6 2 12 8 18\" /></svg>",
  'contact': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M16 2v2\" /><path d=\"M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2\" /><path d=\"M8 2v2\" /><circle cx=\"12\" cy=\"11\" r=\"3\" /><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" /></svg>",
  'copy': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\" /><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\" /></svg>",
  'currency': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"8\" /><line x1=\"3\" x2=\"6\" y1=\"3\" y2=\"6\" /><line x1=\"21\" x2=\"18\" y1=\"3\" y2=\"6\" /><line x1=\"3\" x2=\"6\" y1=\"21\" y2=\"18\" /><line x1=\"21\" x2=\"18\" y1=\"21\" y2=\"18\" /></svg>",
  'download': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" /><polyline points=\"7 10 12 15 17 10\" /><line x1=\"12\" x2=\"12\" y1=\"15\" y2=\"3\" /></svg>",
  'ellipsis': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"1\" /><circle cx=\"19\" cy=\"12\" r=\"1\" /><circle cx=\"5\" cy=\"12\" r=\"1\" /></svg>",
  'external-link': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M15 3h6v6\" /><path d=\"M10 14 21 3\" /><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\" /></svg>",
  'eye': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\" /><circle cx=\"12\" cy=\"12\" r=\"3\" /></svg>",
  'eye-off': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49\" /><path d=\"M14.084 14.158a3 3 0 0 1-4.242-4.242\" /><path d=\"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143\" /><path d=\"m2 2 20 20\" /></svg>",
  'filter': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\" /></svg>",
  'flower-2': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1\" /><circle cx=\"12\" cy=\"8\" r=\"2\" /><path d=\"M12 10v12\" /><path d=\"M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z\" /><path d=\"M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z\" /></svg>",
  'frame': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><line x1=\"22\" x2=\"2\" y1=\"6\" y2=\"6\" /><line x1=\"22\" x2=\"2\" y1=\"18\" y2=\"18\" /><line x1=\"6\" x2=\"6\" y1=\"2\" y2=\"22\" /><line x1=\"18\" x2=\"18\" y1=\"2\" y2=\"22\" /></svg>",
  'gem': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M6 3h12l4 6-10 13L2 9Z\" /><path d=\"M11 3 8 9l4 13 4-13-3-6\" /><path d=\"M2 9h20\" /></svg>",
  'ghost': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M9 10h.01\" /><path d=\"M15 10h.01\" /><path d=\"M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z\" /></svg>",
  'gift': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\" /><path d=\"M12 8v13\" /><path d=\"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7\" /><path d=\"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5\" /></svg>",
  'globe': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\" /><path d=\"M2 12h20\" /></svg>",
  'group': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M3 7V5c0-1.1.9-2 2-2h2\" /><path d=\"M17 3h2c1.1 0 2 .9 2 2v2\" /><path d=\"M21 17v2c0 1.1-.9 2-2 2h-2\" /><path d=\"M7 21H5c-1.1 0-2-.9-2-2v-2\" /><rect width=\"7\" height=\"5\" x=\"7\" y=\"7\" rx=\"1\" /><rect width=\"7\" height=\"5\" x=\"10\" y=\"12\" rx=\"1\" /></svg>",
  'heart': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\" /></svg>",
  'house': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" /><path d=\"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" /></svg>",
  'image': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\" /><circle cx=\"9\" cy=\"9\" r=\"2\" /><path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\" /></svg>",
  'info': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 16v-4\" /><path d=\"M12 8h.01\" /></svg>",
  'instagram': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"20\" height=\"20\" x=\"2\" y=\"2\" rx=\"5\" ry=\"5\" /><path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\" /><line x1=\"17.5\" x2=\"17.51\" y1=\"6.5\" y2=\"6.5\" /></svg>",
  'italic': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><line x1=\"19\" x2=\"10\" y1=\"4\" y2=\"4\" /><line x1=\"14\" x2=\"5\" y1=\"20\" y2=\"20\" /><line x1=\"15\" x2=\"9\" y1=\"4\" y2=\"20\" /></svg>",
  'key': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4\" /><path d=\"m21 2-9.6 9.6\" /><circle cx=\"7.5\" cy=\"15.5\" r=\"5.5\" /></svg>",
  'layout-grid': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\" /><rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\" /><rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\" /><rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\" /></svg>",
  'leaf': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z\" /><path d=\"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12\" /></svg>",
  'link': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\" /><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\" /></svg>",
  'loader-circle': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M21 12a9 9 0 1 1-6.219-8.56\" /></svg>",
  'lock': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\" /><path d=\"M7 11V7a5 5 0 0 1 10 0v4\" /></svg>",
  'log-out': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\" /><polyline points=\"16 17 21 12 16 7\" /><line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\" /></svg>",
  'mail': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\" /><path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\" /></svg>",
  'map': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z\" /><path d=\"M15 5.764v15\" /><path d=\"M9 3.236v15\" /></svg>",
  'map-pin': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\" /><circle cx=\"12\" cy=\"10\" r=\"3\" /></svg>",
  'menu': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><line x1=\"4\" x2=\"20\" y1=\"12\" y2=\"12\" /><line x1=\"4\" x2=\"20\" y1=\"6\" y2=\"6\" /><line x1=\"4\" x2=\"20\" y1=\"18\" y2=\"18\" /></svg>",
  'message-circle': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M7.9 20A9 9 0 1 0 4 16.1L2 22Z\" /></svg>",
  'message-square': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\" /></svg>",
  'minus': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M5 12h14\" /></svg>",
  'moon': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\" /></svg>",
  'move-left': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M6 8L2 12L6 16\" /><path d=\"M2 12H22\" /></svg>",
  'move-right': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M18 8L22 12L18 16\" /><path d=\"M2 12H22\" /></svg>",
  'notebook-pen': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4\" /><path d=\"M2 6h4\" /><path d=\"M2 10h4\" /><path d=\"M2 14h4\" /><path d=\"M2 18h4\" /><path d=\"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z\" /></svg>",
  'package-search': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14\" /><path d=\"m7.5 4.27 9 5.15\" /><polyline points=\"3.29 7 12 12 20.71 7\" /><line x1=\"12\" x2=\"12\" y1=\"22\" y2=\"12\" /><circle cx=\"18.5\" cy=\"15.5\" r=\"2.5\" /><path d=\"M20.27 17.27 22 19\" /></svg>",
  'palette': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"13.5\" cy=\"6.5\" r=\".5\" fill=\"currentColor\" /><circle cx=\"17.5\" cy=\"10.5\" r=\".5\" fill=\"currentColor\" /><circle cx=\"8.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\" /><circle cx=\"6.5\" cy=\"12.5\" r=\".5\" fill=\"currentColor\" /><path d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z\" /></svg>",
  'pencil': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\" /><path d=\"m15 5 4 4\" /></svg>",
  'phone': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\" /></svg>",
  'pill': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z\" /><path d=\"m8.5 8.5 7 7\" /></svg>",
  'plus': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M5 12h14\" /><path d=\"M12 5v14\" /></svg>",
  'pointer': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M22 14a8 8 0 0 1-8 8\" /><path d=\"M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2\" /><path d=\"M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1\" /><path d=\"M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10\" /><path d=\"M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15\" /></svg>",
  'quote': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\" /><path d=\"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\" /></svg>",
  'radio': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M4.9 19.1C1 15.2 1 8.8 4.9 4.9\" /><path d=\"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5\" /><circle cx=\"12\" cy=\"12\" r=\"2\" /><path d=\"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5\" /><path d=\"M19.1 4.9C23 8.8 23 15.1 19.1 19\" /></svg>",
  'receipt': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z\" /><path d=\"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8\" /><path d=\"M12 17.5v-11\" /></svg>",
  'redo-2': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m15 14 5-5-5-5\" /><path d=\"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13\" /></svg>",
  'refresh-cw': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\" /><path d=\"M21 3v5h-5\" /><path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\" /><path d=\"M8 16H3v5\" /></svg>",
  'rotate-ccw': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\" /><path d=\"M3 3v5h5\" /></svg>",
  'search': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"11\" cy=\"11\" r=\"8\" /><path d=\"m21 21-4.3-4.3\" /></svg>",
  'search-x': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m13.5 8.5-5 5\" /><path d=\"m8.5 8.5 5 5\" /><circle cx=\"11\" cy=\"11\" r=\"8\" /><path d=\"m21 21-4.3-4.3\" /></svg>",
  'send': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\" /><path d=\"m21.854 2.147-10.94 10.939\" /></svg>",
  'settings': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\" /><circle cx=\"12\" cy=\"12\" r=\"3\" /></svg>",
  'share-2': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"18\" cy=\"5\" r=\"3\" /><circle cx=\"6\" cy=\"12\" r=\"3\" /><circle cx=\"18\" cy=\"19\" r=\"3\" /><line x1=\"8.59\" x2=\"15.42\" y1=\"13.51\" y2=\"17.49\" /><line x1=\"15.41\" x2=\"8.59\" y1=\"6.51\" y2=\"10.49\" /></svg>",
  'shield-check': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" /><path d=\"m9 12 2 2 4-4\" /></svg>",
  'shopping-bag': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z\" /><path d=\"M3 6h18\" /><path d=\"M16 10a4 4 0 0 1-8 0\" /></svg>",
  'sliders-horizontal': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><line x1=\"21\" x2=\"14\" y1=\"4\" y2=\"4\" /><line x1=\"10\" x2=\"3\" y1=\"4\" y2=\"4\" /><line x1=\"21\" x2=\"12\" y1=\"12\" y2=\"12\" /><line x1=\"8\" x2=\"3\" y1=\"12\" y2=\"12\" /><line x1=\"21\" x2=\"16\" y1=\"20\" y2=\"20\" /><line x1=\"12\" x2=\"3\" y1=\"20\" y2=\"20\" /><line x1=\"14\" x2=\"14\" y1=\"2\" y2=\"6\" /><line x1=\"8\" x2=\"8\" y1=\"10\" y2=\"14\" /><line x1=\"16\" x2=\"16\" y1=\"18\" y2=\"22\" /></svg>",
  'smartphone': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"14\" height=\"20\" x=\"5\" y=\"2\" rx=\"2\" ry=\"2\" /><path d=\"M12 18h.01\" /></svg>",
  'sprout': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M7 20h10\" /><path d=\"M10 20c5.5-2.5.8-6.4 3-10\" /><path d=\"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z\" /><path d=\"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z\" /></svg>",
  'star': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\" /></svg>",
  'store': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7\" /><path d=\"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8\" /><path d=\"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4\" /><path d=\"M2 7h20\" /><path d=\"M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7\" /></svg>",
  'sun': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"4\" /><path d=\"M12 2v2\" /><path d=\"M12 20v2\" /><path d=\"m4.93 4.93 1.41 1.41\" /><path d=\"m17.66 17.66 1.41 1.41\" /><path d=\"M2 12h2\" /><path d=\"M20 12h2\" /><path d=\"m6.34 17.66-1.41 1.41\" /><path d=\"m19.07 4.93-1.41 1.41\" /></svg>",
  'tag': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z\" /><circle cx=\"7.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\" /></svg>",
  'text': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M17 6.1H3\" /><path d=\"M21 12.1H3\" /><path d=\"M15.1 18H3\" /></svg>",
  'trash-2': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M3 6h18\" /><path d=\"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6\" /><path d=\"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2\" /><line x1=\"10\" x2=\"10\" y1=\"11\" y2=\"17\" /><line x1=\"14\" x2=\"14\" y1=\"11\" y2=\"17\" /></svg>",
  'triangle-alert': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\" /><path d=\"M12 9v4\" /><path d=\"M12 17h.01\" /></svg>",
  'truck': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2\" /><path d=\"M15 18H9\" /><path d=\"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14\" /><circle cx=\"17\" cy=\"18\" r=\"2\" /><circle cx=\"7\" cy=\"18\" r=\"2\" /></svg>",
  'type': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><polyline points=\"4 7 4 4 20 4 20 7\" /><line x1=\"9\" x2=\"15\" y1=\"20\" y2=\"20\" /><line x1=\"12\" x2=\"12\" y1=\"4\" y2=\"20\" /></svg>",
  'underline': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M6 4v6a6 6 0 0 0 12 0V4\" /><line x1=\"4\" x2=\"20\" y1=\"20\" y2=\"20\" /></svg>",
  'undo-2': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M9 14 4 9l5-5\" /><path d=\"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11\" /></svg>",
  'user': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\" /><circle cx=\"12\" cy=\"7\" r=\"4\" /></svg>",
  'view': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2\" /><path d=\"M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2\" /><circle cx=\"12\" cy=\"12\" r=\"1\" /><path d=\"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0\" /></svg>",
  'x': "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M18 6 6 18\" /><path d=\"m6 6 12 12\" /></svg>"
};
Object.assign(__ds_scope, { ICON_SVGS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/icon-svgs.js", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Icons come only from the bundled Lucide set (icon-svgs.js) — no network. Unknown names render empty and warn once.
const DIRECTIONAL = ['arrow-right', 'arrow-left', 'chevron-right', 'chevron-left', 'move-right', 'move-left', 'undo-2', 'redo-2'];
const cache = {};
const src = name => {
  if (name in cache) return cache[name];
  const svg = __ds_scope.ICON_SVGS[name];
  if (!svg) console.warn('Icon: "' + name + '" is not in icon-svgs.js — add its SVG from lucide.dev');
  return cache[name] = svg ? 'url("data:image/svg+xml,' + encodeURIComponent(svg).replace(/'/g, '%27') + '")' : null;
};
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  label,
  flipRtl,
  className = '',
  style,
  ...rest
}) {
  const url = src(name);
  const flip = flipRtl ?? DIRECTIONAL.includes(name);
  return /*#__PURE__*/React.createElement("span", _extends({
    role: label ? 'img' : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
    className: (flip ? 'ag-flip-rtl ' : '') + className,
    style: {
      display: 'inline-block',
      flex: 'none',
      width: size,
      height: size,
      background: url ? color : 'transparent',
      WebkitMask: url ? url + ' center/contain no-repeat' : undefined,
      mask: url ? url + ' center/contain no-repeat' : undefined,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/commerce/BlogCard.jsx
try { (() => {
function BlogCard({
  image,
  srcSet,
  sizes,
  date,
  meta,
  title,
  excerpt,
  cta,
  onClick,
  href,
  frame = 'arch',
  aspect,
  layout = 'stack',
  headingLevel = 3,
  priority,
  className = ''
}) {
  const H = 'h' + headingLevel;
  const L = href ? 'a' : 'button';
  const wide = layout === 'wide';
  const sz = sizes || (wide ? '(max-width: 767px) 100vw, 55vw' : '(max-width: 767px) 100vw, 400px');
  return /*#__PURE__*/React.createElement("article", {
    className: 'ag-blog' + (wide ? ' ag-blog--wide' : '') + ' ' + className
  }, /*#__PURE__*/React.createElement("div", {
    className: 'ag-blog__media ag-product__media--' + frame,
    style: aspect ? {
      aspectRatio: aspect
    } : undefined
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    srcSet: srcSet,
    sizes: srcSet ? sz : undefined,
    alt: "",
    loading: priority ? undefined : 'lazy',
    fetchpriority: priority ? 'high' : undefined,
    decoding: "async"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "ag-product__ph"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ag-blog__body"
  }, date && /*#__PURE__*/React.createElement("span", {
    className: "ag-eyebrow ag-blog__date"
  }, date), meta && /*#__PURE__*/React.createElement("div", {
    className: "ag-blog__meta"
  }, meta), /*#__PURE__*/React.createElement(H, {
    className: "ag-blog__title"
  }, /*#__PURE__*/React.createElement(L, {
    href: href,
    type: href ? undefined : 'button',
    className: "ag-blog__link",
    onClick: onClick
  }, title)), excerpt && /*#__PURE__*/React.createElement("p", {
    className: "ag-blog__excerpt"
  }, excerpt), cta && /*#__PURE__*/React.createElement("span", {
    className: "ag-blog__cta",
    "aria-hidden": "true"
  }, cta, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 16
  }))));
}
Object.assign(__ds_scope, { BlogCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/BlogCard.jsx", error: String((e && e.message) || e) }); }

// components/commerce/CategoryCard.jsx
try { (() => {
function CategoryCard({
  label,
  count,
  image,
  srcSet,
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  frame = 'arch',
  onClick,
  href,
  className = ''
}) {
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: 'ag-cat__media ag-product__media--' + frame
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    srcSet: srcSet,
    sizes: srcSet ? sizes : undefined,
    alt: "",
    loading: "lazy",
    decoding: "async"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "ag-product__ph"
  })), /*#__PURE__*/React.createElement("span", {
    className: "ag-cat__row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ag-cat__label"
  }, label), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 16,
    className: "ag-cat__arrow"
  })), count && /*#__PURE__*/React.createElement("span", {
    className: "ag-cat__count"
  }, count));
  if (href) return /*#__PURE__*/React.createElement("a", {
    href: href,
    className: 'ag-cat ' + className,
    onClick: onClick
  }, inner);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: 'ag-cat ' + className,
    onClick: onClick
  }, inner);
}
Object.assign(__ds_scope, { CategoryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CategoryCard.jsx", error: String((e && e.message) || e) }); }

// components/commerce/OrderTimeline.jsx
try { (() => {
// Vertical order progress. Cancelled renders nothing — the screen shows an Alert instead.
function OrderTimeline({
  steps = [],
  current = 0,
  status = 'active',
  label,
  doneLabel = 'done',
  className = '',
  style
}) {
  if (status === 'cancelled') return null;
  return /*#__PURE__*/React.createElement("ol", {
    className: 'ag-otl ' + className,
    style: style,
    "aria-label": label
  }, steps.map((s, i) => {
    const done = status === 'done' || i < current;
    const now = status !== 'done' && i === current;
    const st = done ? 'done' : now ? 'current' : 'upcoming';
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      className: 'ag-otl__step ag-otl__step--' + st,
      "aria-current": now ? 'step' : undefined
    }, /*#__PURE__*/React.createElement("span", {
      className: "ag-otl__rail",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ag-otl__dot"
    }, done && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 14
    })), i < steps.length - 1 && /*#__PURE__*/React.createElement("span", {
      className: 'ag-otl__line' + (done ? ' ag-otl__line--done' : '')
    })), /*#__PURE__*/React.createElement("span", {
      className: "ag-otl__label"
    }, s.label, done && /*#__PURE__*/React.createElement("span", {
      className: "ag-sr-only"
    }, " \u2014 ", doneLabel)), s.time && /*#__PURE__*/React.createElement("span", {
      className: "ag-otl__time"
    }, s.time));
  }));
}
Object.assign(__ds_scope, { OrderTimeline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/OrderTimeline.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// href → <a> (navigation); no href → <button> (action). A disabled link drops its href and gets aria-disabled.
// loading: spinner replaces iconStart, label stays (width doesn't jump), button is disabled + aria-busy; loadingLabel is announced to screen readers.
function Button({
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  block,
  className = '',
  children,
  type = 'button',
  href,
  target,
  rel,
  disabled,
  loading,
  loadingLabel,
  ...rest
}) {
  if (loading) disabled = true;
  const is = size === 'sm' ? 16 : size === 'lg' ? 20 : 18;
  const cls = ['ag-btn', 'ag-btn--' + variant, 'ag-btn--' + size, block ? 'ag-btn--block' : '', loading ? 'ag-btn--loading' : '', className].join(' ');
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, loading ? /*#__PURE__*/React.createElement("span", {
    className: "ag-spin",
    style: {
      width: is,
      height: is
    },
    "aria-hidden": "true"
  }) : iconStart && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconStart,
    size: is
  }), children, !loading && iconEnd && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconEnd,
    size: is
  }), loading && loadingLabel && /*#__PURE__*/React.createElement("span", {
    className: "ag-sr",
    role: "status"
  }, loadingLabel));
  if (href != null) return /*#__PURE__*/React.createElement("a", _extends({
    href: disabled ? undefined : href,
    target: target,
    rel: rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined),
    "aria-disabled": disabled || undefined,
    className: cls + (disabled ? ' ag-btn--disabled' : '')
  }, rest), inner);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    "aria-busy": loading || undefined,
    className: cls
  }, rest), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/commerce/PaymentCard.jsx
try { (() => {
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
function PaymentCard({
  cardNumber = '',
  holder,
  bank,
  amount,
  labels = {},
  onCopy,
  className = ''
}) {
  const L = {
    card: 'Card number',
    holder: 'Card holder',
    bank: 'Bank',
    amount: 'Amount',
    copy: 'Copy',
    copied: 'Copied',
    ...labels
  };
  const digits = String(cardNumber).replace(/[۰-۹]/g, d => FA_DIGITS.indexOf(d)).replace(/\D/g, '');
  const grouped = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  const [copied, setCopied] = React.useState(false);
  const t = React.useRef();
  React.useEffect(() => () => clearTimeout(t.current), []);
  const copy = () => {
    const done = () => {
      setCopied(true);
      clearTimeout(t.current);
      t.current = setTimeout(() => setCopied(false), 2000);
      onCopy && onCopy(digits);
    };
    const fallback = () => {
      const a = document.createElement('textarea');
      a.value = digits;
      a.style.position = 'fixed';
      a.style.opacity = '0';
      document.body.appendChild(a);
      a.select();
      try {
        document.execCommand('copy');
      } catch (e) {}
      a.remove();
      done();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(digits).then(done, fallback);else fallback();
  };
  const rows = [[L.holder, holder], [L.bank, bank], [L.amount, amount, 'amount']].filter(r => r[1]);
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-pay ' + className
  }, /*#__PURE__*/React.createElement("div", {
    className: "ag-pay__row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ag-pay__cardcol"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ag-pay__k"
  }, L.card), /*#__PURE__*/React.createElement("div", {
    className: "ag-pay__num",
    dir: "ltr"
  }, grouped)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    iconStart: copied ? 'check' : 'copy',
    onClick: copy
  }, copied ? L.copied : L.copy)), rows.length > 0 && /*#__PURE__*/React.createElement("dl", {
    className: "ag-pay__meta"
  }, rows.map(([k, v, m]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: m ? 'ag-pay__' + m : undefined
  }, /*#__PURE__*/React.createElement("dt", {
    className: "ag-pay__k"
  }, k), /*#__PURE__*/React.createElement("dd", null, v)))), /*#__PURE__*/React.createElement("span", {
    role: "status",
    className: "ag-sr"
  }, copied ? L.copied : ''));
}
Object.assign(__ds_scope, { PaymentCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/PaymentCard.jsx", error: String((e && e.message) || e) }); }

// components/core/DetailList.jsx
try { (() => {
// Label / value pairs as a <dl>. Icons are decorative (aria-hidden) in --text-accent; values wrap anywhere (long addresses, references).
function DetailList({
  rows = [],
  className = '',
  style
}) {
  return /*#__PURE__*/React.createElement("dl", {
    className: 'ag-dl ' + className,
    style: style
  }, rows.filter(Boolean).map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: 'ag-dl__row' + (r.icon ? ' ag-dl__row--icon' : '')
  }, /*#__PURE__*/React.createElement("dt", {
    className: "ag-dl__label"
  }, r.icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: r.icon,
    size: 18,
    className: "ag-dl__icon"
  }), r.label), /*#__PURE__*/React.createElement("dd", {
    className: "ag-dl__value"
  }, r.value))));
}
Object.assign(__ds_scope, { DetailList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/DetailList.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  active,
  count,
  className = '',
  type = 'button',
  href,
  target,
  rel,
  ...rest
}) {
  const is = size === 'sm' ? 16 : size === 'lg' ? 22 : 20;
  const cls = ['ag-iconbtn', 'ag-iconbtn--' + variant, 'ag-iconbtn--' + size, active ? 'ag-iconbtn--active' : '', className].join(' ');
  // count may be a pre-localized string (Persian digits), so test for a value rather than count>0.
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: is
  }), count ? /*#__PURE__*/React.createElement("span", {
    className: "ag-iconbtn__count"
  }, count) : null);
  if (href) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: target,
    rel: rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined),
    "aria-label": label,
    title: label,
    className: cls
  }, rest), inner);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    "aria-label": label,
    title: label,
    "aria-pressed": active,
    className: cls
  }, rest), inner);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/commerce/AddressCard.jsx
try { (() => {
const AC_DEF = {
  edit: 'Edit {name}',
  delete: 'Delete {name}',
  default: 'Default',
  makeDefault: 'Set as default'
};
// Saved delivery address. Edit / delete IconButtons get specific names ("Edit Home", "Delete Home").
function AddressCard({
  label,
  line,
  recipient,
  phone,
  zone,
  isDefault,
  onEdit,
  onDelete,
  onMakeDefault,
  labels,
  className = '',
  style
}) {
  const L = {
    ...AC_DEF,
    ...labels
  };
  const nm = s => s.replace('{name}', label || '');
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-card ag-addr ' + className,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "ag-addr__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ag-addr__label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "ag-addr__tools"
  }, isDefault && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "accent"
  }, L.default), onEdit && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "pencil",
    size: "sm",
    label: nm(L.edit),
    onClick: onEdit
  }), onDelete && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "trash-2",
    size: "sm",
    label: nm(L.delete),
    onClick: onDelete
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ag-addr__line"
  }, line), /*#__PURE__*/React.createElement("div", {
    className: "ag-addr__meta"
  }, [recipient, phone && /*#__PURE__*/React.createElement("span", {
    key: "p",
    dir: "ltr"
  }, phone), zone].filter(Boolean).map((x, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, " \xB7 "), x))), !isDefault && onMakeDefault && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "sm",
    onClick: onMakeDefault,
    className: "ag-addr__default"
  }, L.makeDefault)));
}
Object.assign(__ds_scope, { AddressCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/AddressCard.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
// The product name is the one interactive target: <a href> (or <button> without href) with a stretched ::after covering the card.
function ProductCard({
  name,
  subtitle,
  price,
  compareAt,
  image,
  srcSet,
  images,
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  badge,
  badgeTone = 'neutral',
  frame = 'arch',
  tone,
  favorite,
  onFavorite,
  onClick,
  href,
  linkLabel,
  placeholder = 'Bouquet photo',
  favLabel = 'Save'
}) {
  const list = (images && images.length ? images : image ? [{
    src: image,
    srcSet
  }] : []).map(x => typeof x === 'string' ? {
    src: x
  } : x);
  const [a, b] = list;
  const pic = (x, cls) => /*#__PURE__*/React.createElement("img", {
    className: cls,
    src: x.src,
    srcSet: x.srcSet,
    sizes: x.srcSet ? sizes : undefined,
    alt: cls ? '' : x.alt || name,
    loading: "lazy",
    decoding: "async",
    style: x.crop ? {
      objectPosition: x.crop,
      transform: 'scale(1.6)',
      transformOrigin: x.crop
    } : undefined
  });
  const aria = linkLabel ?? (typeof name === 'string' && typeof price === 'string' ? name + ' — ' + price : undefined);
  const linked = !!(href || onClick);
  const title = href ? /*#__PURE__*/React.createElement("a", {
    href: href,
    className: "ag-product__link",
    "aria-label": aria,
    onClick: onClick
  }, name) : onClick ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ag-product__link",
    "aria-label": aria,
    onClick: onClick
  }, name) : name;
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-product' + (linked ? ' ag-product--link' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: 'ag-product__media ag-product__media--' + frame + (tone === 'product' ? ' ag-arch--product' : '')
  }, a ? pic(a) : /*#__PURE__*/React.createElement("div", {
    className: "ag-product__ph"
  }, placeholder), b && pic(b, 'ag-product__alt'), badge && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: badgeTone,
    className: "ag-product__badge"
  }, badge), onFavorite && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "heart",
    label: favLabel,
    variant: "solid",
    size: "sm",
    active: favorite,
    className: "ag-product__fav",
    onClick: e => {
      e.stopPropagation();
      onFavorite();
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "ag-product__name"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "ag-product__meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ag-product__sub"
  }, subtitle), /*#__PURE__*/React.createElement("span", {
    className: "ag-product__price"
  }, compareAt && /*#__PURE__*/React.createElement("s", null, compareAt), price))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  selected,
  onRemove,
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-pressed": !!selected,
    className: 'ag-tag' + (selected ? ' ag-tag--selected' : '') + ' ' + className
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("span", {
    className: "ag-tag__x",
    onClick: e => {
      e.stopPropagation();
      onRemove();
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 14
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
const ALERT_ICONS = {
  neutral: 'info',
  warning: 'triangle-alert',
  danger: 'circle-alert',
  success: 'circle-check'
};
function Alert({
  tone = 'neutral',
  icon,
  title,
  children,
  action,
  onClose,
  closeLabel = 'Dismiss',
  className = '',
  style
}) {
  const t = tone === 'error' ? 'danger' : tone;
  const role = t === 'danger' || t === 'warning' ? 'alert' : 'status';
  return /*#__PURE__*/React.createElement("div", {
    role: role,
    className: 'ag-alert ag-alert--' + t + ' ' + className,
    style: style
  }, icon !== false && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon || ALERT_ICONS[t] || ALERT_ICONS.neutral,
    size: 20,
    className: "ag-alert__icon"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ag-alert__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ag-alert__msg"
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "ag-alert__title"
  }, title), children && /*#__PURE__*/React.createElement("div", {
    className: "ag-alert__text"
  }, children)), action && /*#__PURE__*/React.createElement("div", {
    className: "ag-alert__action"
  }, action)), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: closeLabel,
    className: "ag-alert__close",
    onClick: onClose
  }));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/AnnouncementBar.jsx
try { (() => {
function AnnouncementBar({
  children,
  onClose,
  closeLabel = 'Dismiss',
  label,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "region",
    "aria-label": label,
    className: 'ag-announce ' + className
  }, /*#__PURE__*/React.createElement("div", {
    className: "ag-announce__text"
  }, children), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: closeLabel,
    className: "ag-announce__close",
    onClick: onClose
  }));
}
Object.assign(__ds_scope, { AnnouncementBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/AnnouncementBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
const FOCUSABLE = 'a[href],area[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),iframe,[tabindex]:not([tabindex="-1"]),[contenteditable="true"]';
let locks = 0,
  saved = null;
const lockScroll = () => {
  if (locks++ === 0) {
    const b = document.body,
      sw = window.innerWidth - document.documentElement.clientWidth;
    saved = {
      o: b.style.overflow,
      p: b.style.paddingInlineEnd
    };
    b.style.overflow = 'hidden';
    if (sw > 0) b.style.paddingInlineEnd = sw + 'px';
  }
};
const unlockScroll = () => {
  if (--locks === 0 && saved) {
    document.body.style.overflow = saved.o;
    document.body.style.paddingInlineEnd = saved.p;
    saved = null;
  }
};
// role="dialog" + aria-modal + aria-labelledby → title. Focus moves in on open, Tab/Shift+Tab stay inside, Esc closes,
// focus returns to the opener on close, and the page behind can't scroll (skipped for inline previews).
function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  inline,
  closeLabel = 'Close',
  maxWidth,
  initialFocus,
  placement = 'center'
}) {
  const tid = React.useId();
  const ref = React.useRef(null);
  const closeRef = React.useRef(onClose);
  closeRef.current = onClose;
  React.useEffect(() => {
    if (!open) return;
    const d = ref.current;
    if (!d) return;
    const opener = document.activeElement;
    const list = () => [...d.querySelectorAll(FOCUSABLE)].filter(el => el.getClientRects().length);
    const f = list();
    const first = initialFocus && d.querySelector(initialFocus) || f.find(el => !el.closest('.ag-dialog__head')) || f[0] || d;
    // Inline previews don't move or trap focus — several on one page would fight over it.
    if (!inline) first.focus({
      preventScroll: true
    });
    const onKey = e => {
      if (e.key === 'Escape') {
        if (closeRef.current) {
          e.stopPropagation();
          closeRef.current();
        }
        return;
      }
      if (e.key !== 'Tab') return;
      const all = list();
      if (!all.length) {
        e.preventDefault();
        d.focus();
        return;
      }
      const a = all[0],
        z = all[all.length - 1],
        cur = document.activeElement;
      if (e.shiftKey && (cur === a || cur === d || !d.contains(cur))) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && (cur === z || !d.contains(cur))) {
        e.preventDefault();
        a.focus();
      }
    };
    const onFocusIn = e => {
      if (!d.contains(e.target)) {
        const all = list();
        (all[0] || d).focus({
          preventScroll: true
        });
      }
    };
    if (inline) return;
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('focusin', onFocusIn);
    lockScroll();
    return () => {
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('focusin', onFocusIn);
      unlockScroll();
      if (opener && opener.focus && document.contains(opener)) opener.focus({
        preventScroll: true
      });
    };
  }, [open, inline]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-dialog__overlay' + (inline ? ' ag-dialog__overlay--inline' : '') + (placement === 'start' ? ' ag-dialog__overlay--sheet' : ''),
    onClick: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": title ? tid : undefined,
    tabIndex: -1,
    className: 'ag-dialog' + (placement === 'start' ? ' ag-dialog--sheet' : ''),
    style: maxWidth ? {
      maxWidth
    } : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "ag-dialog__head"
  }, /*#__PURE__*/React.createElement("h2", {
    id: tid,
    className: "ag-dialog__title"
  }, title), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: closeLabel,
    size: "sm",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    className: "ag-dialog__body"
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "ag-dialog__foot"
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function EmptyState({
  icon,
  tone = 'neutral',
  eyebrow,
  title,
  titleAccent,
  body,
  actions,
  headingLevel = 2,
  className = '',
  style
}) {
  const H = 'h' + headingLevel;
  const t = tone === 'error' ? 'danger' : tone;
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-empty ' + className,
    style: style
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: 'ag-empty__icon ag-empty__icon--' + t
  }, typeof icon === 'string' ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 28
  }) : icon), eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "ag-eyebrow ag-empty__eyebrow"
  }, eyebrow), /*#__PURE__*/React.createElement(H, {
    className: "ag-empty__title"
  }, title, titleAccent && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, titleAccent))), body && /*#__PURE__*/React.createElement("div", {
    className: "ag-empty__body"
  }, body), actions && /*#__PURE__*/React.createElement("div", {
    className: "ag-empty__actions"
  }, actions));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/LiveRegion.jsx
try { (() => {
// Mount once, keep mounted, change children to announce. polite → role="status"; assertive → role="alert" (errors only).
function LiveRegion({
  children,
  politeness = 'polite',
  atomic = true,
  id,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    role: politeness === 'assertive' ? 'alert' : 'status',
    "aria-live": politeness,
    "aria-atomic": atomic,
    className: 'ag-sr-only ' + className
  }, children);
}
Object.assign(__ds_scope, { LiveRegion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/LiveRegion.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Skeleton.jsx
try { (() => {
function Skeleton({
  shape = 'text',
  width,
  height,
  lines = 1,
  radius,
  className = '',
  style
}) {
  if (shape === 'card') return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: 'ag-skel-card ' + className,
    style: {
      width,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ag-skel ag-skel--arch"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ag-skel ag-skel--text",
    style: {
      width: '70%',
      height: 20
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "ag-skel ag-skel--text",
    style: {
      width: '45%'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "ag-skel ag-skel--text",
    style: {
      width: '30%'
    }
  }));
  if (shape === 'text') return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: 'ag-skel-lines ' + className,
    style: {
      width,
      ...style
    }
  }, Array.from({
    length: Math.max(1, lines)
  }, (_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "ag-skel ag-skel--text",
    style: {
      height,
      borderRadius: radius,
      width: lines > 1 && i === lines - 1 ? '60%' : undefined
    }
  })));
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: 'ag-skel ag-skel--' + shape + ' ' + className,
    style: {
      width,
      height: height ?? (shape === 'circle' ? width : undefined),
      borderRadius: radius,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const ICONS = {
  success: 'circle-check',
  info: 'flower-2',
  warning: 'triangle-alert',
  danger: 'circle-alert'
};
// The toast itself is never a click target — put the follow-up in `action` (a real button or link).
function Toast({
  tone = 'success',
  title,
  message,
  action,
  onClose,
  closeLabel = 'Dismiss',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    className: "ag-toast",
    style: style
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ICONS[tone],
    size: 20,
    className: 'ag-toast__icon--' + tone
  }), /*#__PURE__*/React.createElement("div", {
    className: "ag-toast__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ag-toast__title"
  }, title), message && /*#__PURE__*/React.createElement("div", {
    className: "ag-toast__msg"
  }, message), action && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "sm",
    className: "ag-toast__action",
    href: action.href,
    onClick: action.onClick
  }, action.label)), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ag-toast__close",
    "aria-label": closeLabel,
    onClick: onClose
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
// WCAG 1.4.13: the bubble describes its trigger (aria-describedby), stays open while the pointer is over it, and Esc dismisses it until the pointer or focus leaves.
function Tooltip({
  content,
  placement = 'top',
  open,
  children
}) {
  const id = React.useId();
  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const active = hover || focus;
  React.useEffect(() => {
    if (!active) return;
    const onKey = e => {
      if (e.key === 'Escape') setDismissed(true);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active]);
  React.useEffect(() => {
    if (!active) setDismissed(false);
  }, [active]);
  // Template runtimes pass even a single child as an array, so unwrap a lone element before linking it.
  const kids = React.Children.toArray(children);
  const only = kids.length === 1 && React.isValidElement(kids[0]) ? kids[0] : null;
  const trigger = only ? React.cloneElement(only, {
    'aria-describedby': [only.props['aria-describedby'], id].filter(Boolean).join(' ')
  }) : children;
  return /*#__PURE__*/React.createElement("span", {
    className: 'ag-tip' + (open ? ' ag-tip--open' : '') + (dismissed ? ' ag-tip--dismissed' : ''),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: () => setFocus(true),
    onBlur: e => {
      if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false);
    }
  }, trigger, /*#__PURE__*/React.createElement("span", {
    id: id,
    role: "tooltip",
    className: 'ag-tip__bubble' + (placement === 'bottom' ? ' ag-tip__bubble--bottom' : '')
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  hint,
  error,
  disabled,
  id,
  className = '',
  style,
  ...rest
}) {
  const auto = React.useId();
  const fid = id || auto;
  const hid = fid + '-hint';
  const msg = error || hint;
  const desc = [msg ? hid : null, rest['aria-describedby']].filter(Boolean).join(' ') || undefined;
  const box = /*#__PURE__*/React.createElement("label", {
    className: 'ag-check ag-check--checkbox' + (error ? ' ag-check--error' : '') + (disabled ? ' ag-check--disabled' : '') + (msg ? '' : ' ' + className),
    style: msg ? undefined : style
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    id: id,
    disabled: disabled
  }, rest, {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": desc,
    "aria-errormessage": error ? hid : undefined
  })), /*#__PURE__*/React.createElement("span", {
    className: "ag-check__box"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14
  })), label && /*#__PURE__*/React.createElement("span", null, label));
  if (!msg) return box;
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-field ag-field--check ' + className,
    style: style
  }, box, msg && /*#__PURE__*/React.createElement("span", {
    id: hid,
    className: 'ag-field__hint' + (error ? ' ag-field__hint--error' : '')
  }, msg));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/ChoiceGroup.jsx
try { (() => {
// legend → <fieldset><legend>; hint/error below the tiles, linked to the radiogroup via aria-describedby (+ aria-invalid / aria-errormessage).
function ChoiceGroup({
  label,
  labelledBy,
  legend,
  hint,
  error,
  id,
  columns,
  minTileWidth = 140,
  children,
  className = '',
  style
}) {
  const ref = React.useRef(null);
  const auto = React.useId();
  const gid = id || auto;
  const hid = gid + '-hint';
  const lid = gid + '-legend';
  const msg = error || hint;
  React.useEffect(() => {
    const r = ref.current;
    if (!r) return;
    const t = [...r.querySelectorAll('[role="radio"]:not(:disabled)')];
    if (t.length && !t.some(x => x.tabIndex === 0)) t[0].tabIndex = 0;
  });
  const onKey = e => {
    const t = [...ref.current.querySelectorAll('[role="radio"]:not(:disabled)')];
    const i = t.indexOf(document.activeElement);
    if (i < 0) return;
    const rtl = getComputedStyle(ref.current).direction === 'rtl';
    const map = {
      ArrowDown: 1,
      ArrowUp: -1,
      ArrowRight: rtl ? -1 : 1,
      ArrowLeft: rtl ? 1 : -1
    };
    let n;
    if (e.key in map) n = (i + map[e.key] + t.length) % t.length;else if (e.key === 'Home') n = 0;else if (e.key === 'End') n = t.length - 1;else return;
    e.preventDefault();
    t[n].focus();
    t[n].click();
  };
  const wrapped = !!(legend || msg);
  const group = /*#__PURE__*/React.createElement("div", {
    ref: ref,
    id: gid,
    role: "radiogroup",
    "aria-label": legend ? undefined : label,
    "aria-labelledby": legend ? lid : labelledBy,
    "aria-describedby": msg ? hid : undefined,
    "aria-invalid": error ? true : undefined,
    "aria-errormessage": error ? hid : undefined,
    onKeyDown: onKey,
    className: 'ag-choices' + (error ? ' ag-choices--error' : '') + (wrapped ? '' : ' ' + className),
    style: {
      gridTemplateColumns: columns ? 'repeat(' + columns + ',minmax(0,1fr))' : 'repeat(auto-fill,minmax(' + minTileWidth + 'px,1fr))',
      ...(wrapped ? null : style)
    }
  }, children);
  if (!wrapped) return group;
  const hintEl = msg && /*#__PURE__*/React.createElement("span", {
    id: hid,
    className: 'ag-field__hint' + (error ? ' ag-field__hint--error' : '')
  }, msg);
  if (legend) return /*#__PURE__*/React.createElement("fieldset", {
    className: 'ag-field ag-fieldset ' + className,
    style: style
  }, /*#__PURE__*/React.createElement("legend", {
    id: lid,
    className: "ag-field__label"
  }, legend), group, hintEl);
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-field ' + className,
    style: style
  }, group, hintEl);
}
Object.assign(__ds_scope, { ChoiceGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ChoiceGroup.jsx", error: String((e && e.message) || e) }); }

// components/forms/ChoiceTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// The label names the tile; the description is read after it as its description, not as part of the name.
function ChoiceTile({
  label,
  description,
  selected,
  disabled,
  onSelect,
  size = 'md',
  className = '',
  ...rest
}) {
  const auto = React.useId();
  const lid = auto + '-label';
  const did = auto + '-desc';
  const named = description && label && !rest['aria-label'] && !rest['aria-labelledby'];
  const desc = [description ? did : null, rest['aria-describedby']].filter(Boolean).join(' ') || undefined;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "radio",
    "aria-checked": !!selected,
    disabled: disabled,
    tabIndex: selected ? 0 : -1,
    className: ['ag-choice', 'ag-choice--' + size, selected ? 'ag-choice--selected' : '', className].join(' '),
    onClick: () => onSelect && onSelect()
  }, rest, {
    "aria-labelledby": named ? lid : rest['aria-labelledby'],
    "aria-describedby": desc
  }), /*#__PURE__*/React.createElement("span", {
    id: lid,
    className: "ag-choice__label"
  }, label), description && /*#__PURE__*/React.createElement("span", {
    id: did,
    className: "ag-choice__desc"
  }, description));
}
Object.assign(__ds_scope, { ChoiceTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ChoiceTile.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Label text only inside <label>; hint/error sits outside it and is linked via aria-describedby (+ aria-errormessage when invalid).
function Input({
  label,
  hint,
  error,
  iconStart,
  multiline,
  disabled,
  id,
  className = '',
  style,
  ...rest
}) {
  const auto = React.useId();
  const fid = id || auto;
  const hid = fid + '-hint';
  const msg = error || hint;
  const desc = [msg ? hid : null, rest['aria-describedby']].filter(Boolean).join(' ') || undefined;
  const Ctrl = multiline ? 'textarea' : 'input';
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-field ' + className,
    style: style
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "ag-field__label",
    htmlFor: fid
  }, label), /*#__PURE__*/React.createElement("span", {
    className: 'ag-input' + (error ? ' ag-input--error' : '') + (disabled ? ' ag-input--disabled' : ''),
    onClick: e => {
      if (e.target === e.currentTarget) {
        const el = document.getElementById(fid);
        el && el.focus();
      }
    }
  }, iconStart && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconStart,
    size: 18
  }), /*#__PURE__*/React.createElement(Ctrl, _extends({
    id: fid,
    disabled: disabled
  }, rest, {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": desc,
    "aria-errormessage": error ? hid : undefined
  }))), msg && /*#__PURE__*/React.createElement("span", {
    id: hid,
    className: 'ag-field__hint' + (error ? ' ag-field__hint--error' : '')
  }, msg));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/QuantityStepper.jsx
try { (() => {
function QuantityStepper({
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  disabled,
  size = 'md',
  format = n => String(n),
  labels = {
    dec: 'Decrease',
    inc: 'Increase'
  }
}) {
  const [inner, setInner] = React.useState(defaultValue);
  const v = value ?? inner;
  const set = n => {
    n = Math.max(min, Math.min(max, n));
    if (value === undefined) setInner(n);
    onChange && onChange(n);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-stepper' + (size === 'sm' ? ' ag-stepper--sm' : '') + (disabled ? ' ag-stepper--disabled' : '')
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": labels.dec,
    disabled: disabled || v <= min,
    onClick: () => set(v - 1)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "minus",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    className: "ag-stepper__val",
    "aria-live": "polite"
  }, format(v)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": labels.inc,
    disabled: disabled || v >= max,
    onClick: () => set(v + 1)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 16
  })));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/commerce/LineItem.jsx
try { (() => {
function LineItem({
  image,
  srcSet,
  name,
  meta,
  note,
  price,
  quantity,
  onQuantityChange,
  onRemove,
  removeLabel = 'Remove',
  quantityLabels,
  formatQuantity = n => String(n),
  size = 'lg',
  unavailable,
  unavailableLabel = 'No longer available',
  busy,
  className = ''
}) {
  const lg = size !== 'sm';
  const tw = lg ? 88 : 44;
  return /*#__PURE__*/React.createElement("div", {
    className: "ag-linewrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: 'ag-line ag-line--' + (lg ? 'lg' : 'sm') + (unavailable ? ' ag-line--unavailable' : '') + ' ' + className,
    "aria-busy": busy || undefined
  }, /*#__PURE__*/React.createElement("span", {
    className: "ag-line__thumb",
    style: {
      width: tw
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    srcSet: srcSet,
    sizes: srcSet ? tw + 'px' : undefined,
    alt: "",
    loading: "lazy",
    decoding: "async"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "ag-product__ph"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ag-line__main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ag-line__name"
  }, name), meta && /*#__PURE__*/React.createElement("div", {
    className: "ag-line__meta"
  }, meta), note && /*#__PURE__*/React.createElement("div", {
    className: "ag-line__note"
  }, note), unavailable && /*#__PURE__*/React.createElement("div", {
    className: "ag-line__flag"
  }, unavailableLabel), lg && (onQuantityChange || onRemove) && /*#__PURE__*/React.createElement("div", {
    className: "ag-line__actions"
  }, onQuantityChange && !unavailable && /*#__PURE__*/React.createElement(__ds_scope.QuantityStepper, {
    value: quantity,
    disabled: busy,
    onChange: onQuantityChange,
    format: formatQuantity,
    labels: quantityLabels
  }), onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ag-line__remove",
    onClick: onRemove
  }, removeLabel))), /*#__PURE__*/React.createElement("div", {
    className: "ag-line__end"
  }, !lg && quantity != null && /*#__PURE__*/React.createElement("span", {
    className: "ag-line__qty"
  }, "\xD7", formatQuantity(quantity)), !unavailable && /*#__PURE__*/React.createElement("span", {
    className: "ag-line__price"
  }, price))));
}
Object.assign(__ds_scope, { LineItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/LineItem.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// The label names the radio; the description is read after it as its description, not as part of the name.
function Radio({
  label,
  description,
  hint,
  error,
  disabled,
  id,
  className = '',
  style,
  ...rest
}) {
  const auto = React.useId();
  const fid = id || auto;
  const hid = fid + '-hint';
  const lid = fid + '-label';
  const did = fid + '-desc';
  const msg = error || hint;
  const desc = [description ? did : null, msg ? hid : null, rest['aria-describedby']].filter(Boolean).join(' ') || undefined;
  const named = description && label && !rest['aria-label'] && !rest['aria-labelledby'];
  const box = /*#__PURE__*/React.createElement("label", {
    className: 'ag-check ag-check--radio' + (error ? ' ag-check--error' : '') + (disabled ? ' ag-check--disabled' : '') + (msg ? '' : ' ' + className),
    style: msg ? undefined : style
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    id: id,
    disabled: disabled
  }, rest, {
    "aria-labelledby": named ? lid : rest['aria-labelledby'],
    "aria-invalid": error ? true : undefined,
    "aria-describedby": desc,
    "aria-errormessage": error ? hid : undefined
  })), /*#__PURE__*/React.createElement("span", {
    className: "ag-check__box"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    id: lid
  }, label), description && /*#__PURE__*/React.createElement("span", {
    id: did,
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, description)));
  if (!msg) return box;
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-field ag-field--check ' + className,
    style: style
  }, box, msg && /*#__PURE__*/React.createElement("span", {
    id: hid,
    className: 'ag-field__hint' + (error ? ' ag-field__hint--error' : '')
  }, msg));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/RangeSlider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function RangeSlider({
  range = true,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  formatValue = v => String(v),
  label = 'Value',
  labels = {
    min: 'Minimum',
    max: 'Maximum'
  },
  showValues = true,
  className = ''
}) {
  const init = defaultValue ?? (range ? [min, max] : min);
  const [inner, setInner] = React.useState(init);
  const cur = value ?? inner;
  const commit = n => {
    if (value === undefined) setInner(n);
    onChange && onChange(n);
  };
  const pct = v => (v - min) / (max - min || 1) * 100;
  const common = {
    type: 'range',
    min,
    max,
    step,
    className: 'ag-range__input'
  };
  if (!range) {
    const v = Number(cur);
    return /*#__PURE__*/React.createElement("div", {
      className: 'ag-range ag-range--single ' + className
    }, /*#__PURE__*/React.createElement("div", {
      className: "ag-range__track"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ag-range__fill",
      style: {
        insetInlineStart: 0,
        width: pct(v) + '%'
      }
    }), /*#__PURE__*/React.createElement("input", _extends({}, common, {
      value: v,
      "aria-label": label,
      "aria-valuetext": formatValue(v),
      onChange: e => commit(Number(e.target.value))
    }))), showValues && /*#__PURE__*/React.createElement("div", {
      className: "ag-range__vals"
    }, /*#__PURE__*/React.createElement("span", null, formatValue(min)), /*#__PURE__*/React.createElement("span", null, formatValue(max))));
  }
  const [lo, hi] = cur;
  const set = (i, raw) => {
    const v = Number(raw);
    const n = i ? [lo, Math.min(max, Math.max(v, lo + step))] : [Math.max(min, Math.min(v, hi - step)), hi];
    if (n[0] !== lo || n[1] !== hi) commit(n);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-range ' + className
  }, /*#__PURE__*/React.createElement("div", {
    className: "ag-range__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ag-range__fill",
    style: {
      insetInlineStart: pct(lo) + '%',
      width: pct(hi) - pct(lo) + '%'
    }
  }), /*#__PURE__*/React.createElement("input", _extends({}, common, {
    value: lo,
    "aria-label": labels.min,
    "aria-valuetext": formatValue(lo),
    onChange: e => set(0, e.target.value),
    style: {
      zIndex: pct(lo) > 90 ? 3 : 2
    }
  })), /*#__PURE__*/React.createElement("input", _extends({}, common, {
    value: hi,
    "aria-label": labels.max,
    "aria-valuetext": formatValue(hi),
    onChange: e => set(1, e.target.value)
  }))), showValues && /*#__PURE__*/React.createElement("div", {
    className: "ag-range__vals"
  }, /*#__PURE__*/React.createElement("span", null, formatValue(lo)), /*#__PURE__*/React.createElement("span", null, formatValue(hi))));
}
Object.assign(__ds_scope, { RangeSlider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RangeSlider.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Group pickers (DatePicker) can own the hint: pass aria-invalid / aria-errormessage / aria-describedby with no hint or error.
function Select({
  label,
  hint,
  error,
  options = [],
  placeholder,
  disabled,
  id,
  className = '',
  style,
  ...rest
}) {
  const auto = React.useId();
  const fid = id || auto;
  const hid = fid + '-hint';
  const msg = error || hint;
  const inv = !!error || rest['aria-invalid'] === true || rest['aria-invalid'] === 'true';
  const desc = [msg ? hid : null, rest['aria-describedby']].filter(Boolean).join(' ') || undefined;
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-field ' + className,
    style: style
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "ag-field__label",
    htmlFor: fid
  }, label), /*#__PURE__*/React.createElement("span", {
    className: 'ag-input' + (inv ? ' ag-input--error' : '') + (disabled ? ' ag-input--disabled' : ''),
    onClick: e => {
      if (e.target === e.currentTarget) {
        const el = document.getElementById(fid);
        el && el.focus();
      }
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    disabled: disabled
  }, rest, {
    "aria-invalid": inv ? true : undefined,
    "aria-describedby": desc,
    "aria-errormessage": error ? hid : rest['aria-errormessage']
  }), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value,
    disabled: o.disabled
  }, o.label))), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16,
    className: "ag-input__chev"
  })), msg && /*#__PURE__*/React.createElement("span", {
    id: hid,
    className: 'ag-field__hint' + (error ? ' ag-field__hint--error' : '')
  }, msg));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  className = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: 'ag-switch ' + className,
    style: style
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ag-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ag-switch__thumb"
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ReminderRow.jsx
try { (() => {
const RR_DEF = {
  paused: 'Paused',
  sendFlowers: 'Send flowers',
  reminderFor: 'Reminder for {name}',
  edit: 'Edit reminder for {name}',
  delete: 'Delete reminder for {name}'
};
// One occasion reminder: arched date tile · name + meta · controls (drop below on narrow widths via container query).
function ReminderRow({
  name,
  day,
  month,
  occasion,
  occasionIcon = 'calendar-heart',
  before,
  channel = 'sms',
  altDate,
  when,
  soon,
  on = true,
  onToggle,
  onEdit,
  onDelete,
  sendHref,
  sendOnClick,
  labels,
  className = '',
  style
}) {
  const L = {
    ...RR_DEF,
    ...labels
  };
  const nm = s => s.replace('{name}', typeof name === 'string' ? name : '');
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-remwrap ' + className,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: 'ag-rem' + (soon && on ? ' ag-rem--soon' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: 'ag-rem__tile' + (on ? '' : ' ag-rem__tile--paused'),
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ag-rem__day"
  }, day), /*#__PURE__*/React.createElement("span", {
    className: "ag-rem__month"
  }, month)), /*#__PURE__*/React.createElement("div", {
    className: "ag-rem__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ag-rem__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ag-rem__name"
  }, name), on ? when && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: soon ? 'accent' : 'neutral'
  }, when) : /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "neutral"
  }, L.paused)), /*#__PURE__*/React.createElement("div", {
    className: "ag-rem__meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ag-rem__bit"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: occasionIcon,
    size: 14
  }), occasion), /*#__PURE__*/React.createElement("span", {
    className: "ag-rem__bit"
  }, day, " ", month, altDate && /*#__PURE__*/React.createElement("span", null, " (", altDate, ")")), before && /*#__PURE__*/React.createElement("span", {
    className: "ag-rem__bit"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: channel === 'wa' ? 'message-circle' : 'message-square',
    size: 14
  }), before))), /*#__PURE__*/React.createElement("div", {
    className: "ag-rem__controls"
  }, soon && on && (sendHref || sendOnClick) && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "secondary",
    href: sendHref,
    onClick: sendOnClick
  }, L.sendFlowers), /*#__PURE__*/React.createElement(__ds_scope.Switch, {
    checked: on,
    onChange: e => onToggle && onToggle(e.target.checked),
    "aria-label": nm(L.reminderFor)
  }), onEdit && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "pencil",
    size: "sm",
    label: nm(L.edit),
    onClick: onEdit
  }), onDelete && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "trash-2",
    size: "sm",
    label: nm(L.delete),
    onClick: onDelete
  }))));
}
Object.assign(__ds_scope, { ReminderRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ReminderRow.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Accordion.jsx
try { (() => {
function Accordion({
  items = [],
  openId,
  defaultOpenId,
  onToggle,
  allowMultiple,
  headingLevel = 3,
  className = ''
}) {
  const uid = React.useId();
  const arr = v => v == null ? [] : Array.isArray(v) ? v : [v];
  const [inner, setInner] = React.useState(arr(defaultOpenId));
  const open = openId !== undefined ? arr(openId) : inner;
  const toggle = id => {
    const was = open.includes(id);
    const next = was ? open.filter(x => x !== id) : allowMultiple ? [...open, id] : [id];
    if (openId === undefined) setInner(next);
    onToggle && onToggle(id, !was, next);
  };
  const H = 'h' + headingLevel;
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-acc ' + className
  }, items.map(it => {
    const o = open.includes(it.id);
    const b = uid + 'b' + it.id,
      p = uid + 'p' + it.id;
    return /*#__PURE__*/React.createElement("div", {
      key: it.id,
      className: 'ag-acc__item' + (o ? ' ag-acc__item--open' : '')
    }, /*#__PURE__*/React.createElement(H, {
      className: "ag-acc__h"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      id: b,
      className: "ag-acc__btn",
      "aria-expanded": o,
      "aria-controls": p,
      onClick: () => toggle(it.id)
    }, /*#__PURE__*/React.createElement("span", null, it.title), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "chevron-down",
      size: 18,
      className: "ag-acc__chev"
    }))), /*#__PURE__*/React.createElement("div", {
      id: p,
      role: "region",
      "aria-labelledby": b,
      className: "ag-acc__panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ag-acc__clip"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ag-acc__content"
    }, it.content))));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomTabBar.jsx
try { (() => {
function BottomTabBar({
  items = [],
  label,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": label,
    className: 'ag-tabbar ' + className
  }, /*#__PURE__*/React.createElement("ul", {
    className: "ag-tabbar__list"
  }, items.map(it => {
    const cls = 'ag-tabbar__item' + (it.current ? ' ag-tabbar__item--current' : '');
    const cur = it.current ? 'page' : undefined;
    const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "ag-tabbar__icon"
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 22
    }), it.count ? /*#__PURE__*/React.createElement("span", {
      className: "ag-tabbar__count"
    }, it.count) : null), /*#__PURE__*/React.createElement("span", {
      className: "ag-tabbar__label"
    }, it.label));
    return /*#__PURE__*/React.createElement("li", {
      key: it.id
    }, it.href ? /*#__PURE__*/React.createElement("a", {
      href: it.href,
      target: it.target,
      rel: it.rel ?? (it.target === '_blank' ? 'noopener noreferrer' : undefined),
      className: cls,
      "aria-current": cur,
      onClick: it.onClick
    }, inner) : /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: cls,
      "aria-current": cur,
      onClick: it.onClick
    }, inner));
  })));
}
Object.assign(__ds_scope, { BottomTabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomTabBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/LanguageSwitch.jsx
try { (() => {
function LanguageSwitch({
  value = 'en',
  onChange,
  label = 'Language',
  options = [{
    id: 'en',
    label: 'EN'
  }, {
    id: 'fa',
    label: 'فا'
  }]
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ag-lang",
    role: "group",
    "aria-label": label
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.id,
    type: "button",
    lang: o.id,
    "aria-pressed": value === o.id,
    onClick: () => onChange && onChange(o.id)
  }, o.label)));
}
Object.assign(__ds_scope, { LanguageSwitch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/LanguageSwitch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/MenuList.jsx
try { (() => {
function MenuList({
  title,
  label,
  children,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": label || (typeof title === 'string' ? title : undefined),
    className: 'ag-menu ' + className
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "ag-eyebrow ag-menu__title"
  }, title), /*#__PURE__*/React.createElement("ul", {
    className: "ag-menu__list"
  }, React.Children.map(children, c => c ? /*#__PURE__*/React.createElement("li", null, c) : null)));
}
Object.assign(__ds_scope, { MenuList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/MenuList.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NavLink({
  href,
  current,
  variant = 'header',
  onClick,
  children,
  className = '',
  ...rest
}) {
  const T = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(T, _extends({
    href: href,
    type: href ? undefined : 'button',
    onClick: onClick,
    "aria-current": current ? 'page' : undefined,
    className: ['ag-nav', 'ag-nav--' + variant, current ? 'ag-nav--current' : '', className].join(' ')
  }, rest), /*#__PURE__*/React.createElement("span", null, children), variant === 'menu' && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 18,
    className: "ag-nav__chev"
  }));
}
Object.assign(__ds_scope, { NavLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavLink.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SectionHeader.jsx
try { (() => {
function SectionHeader({
  title,
  accent,
  eyebrow,
  level = 'h2',
  action,
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
  prevLabel = 'Previous',
  nextLabel = 'Next',
  id,
  className = '',
  style
}) {
  const H = ['h1', 'h2', 'h3'].includes(level) ? level : 'h2';
  const arrows = onPrev || onNext;
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-sechead ag-sechead--' + H + ' ' + className,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "ag-sechead__text"
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "ag-eyebrow ag-sechead__eyebrow"
  }, eyebrow), /*#__PURE__*/React.createElement(H, {
    id: id,
    className: "ag-sechead__title"
  }, title, accent && /*#__PURE__*/React.createElement(React.Fragment, null, ' ', /*#__PURE__*/React.createElement("em", null, accent)))), (action || arrows) && /*#__PURE__*/React.createElement("div", {
    className: "ag-sechead__actions"
  }, action, arrows && /*#__PURE__*/React.createElement("div", {
    className: "ag-sechead__arrows"
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "chevron-left",
    label: prevLabel,
    variant: "outline",
    onClick: onPrev,
    disabled: !onPrev || !canPrev
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "chevron-right",
    label: nextLabel,
    variant: "outline",
    onClick: onNext,
    disabled: !onNext || !canNext
  }))));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SnapScroller.jsx
try { (() => {
// Flatten fragments, nested arrays and [data-snap-group] wrappers so each repeated item gets its own snap slot.
function flattenSnap(children) {
  const out = [];
  const walk = (nodes, prefix) => {
    React.Children.toArray(nodes).forEach(c => {
      if (React.isValidElement(c) && (c.type === React.Fragment || c.props && c.props['data-snap-group'] != null)) {
        walk(c.props.children, prefix + String(c.key) + '/');
      } else out.push({
        node: c,
        key: prefix + (React.isValidElement(c) && c.key != null ? c.key : out.length)
      });
    });
  };
  walk(children, '');
  return out;
}
const SnapScroller = React.forwardRef(function SnapScroller({
  children,
  items,
  renderItem,
  itemAs = 'wrap',
  itemMin = '200px',
  perView = 5,
  perViewMobile = 2.3,
  gap = '16px',
  label,
  arrows,
  prevLabel = 'Previous',
  nextLabel = 'Next',
  onScrollStateChange,
  bleed = true,
  className = '',
  style
}, ref) {
  const el = React.useRef(null);
  const [st, setSt] = React.useState({
    canPrev: false,
    canNext: false
  });
  const last = React.useRef(null);
  const cb = React.useRef(onScrollStateChange);
  cb.current = onScrollStateChange;
  const measure = React.useCallback(() => {
    const t = el.current;
    if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    const pos = Math.abs(t.scrollLeft);
    const n = {
      canPrev: pos > 1,
      canNext: pos < max - 1
    };
    const o = last.current;
    if (o && o.canPrev === n.canPrev && o.canNext === n.canNext) return;
    last.current = n;
    setSt(n);
    cb.current && cb.current(n);
  }, []);
  const by = React.useCallback(d => {
    const t = el.current;
    if (!t) return;
    const rtl = getComputedStyle(t).direction === 'rtl';
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    t.scrollBy({
      left: d * (rtl ? -1 : 1) * t.clientWidth * .85,
      behavior: reduce ? 'auto' : 'smooth'
    });
  }, []);
  React.useImperativeHandle(ref, () => ({
    scrollPrev: () => by(-1),
    scrollNext: () => by(1),
    get element() {
      return el.current;
    },
    get state() {
      return st;
    }
  }), [by, st]);
  React.useEffect(() => {
    measure();
    const t = el.current;
    if (!t || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    return () => ro.disconnect();
  }, [measure, children, items]);
  const vars = {
    '--ss-min': itemMin,
    '--ss-per': perView,
    '--ss-per-m': perViewMobile,
    '--ss-gap': gap,
    ...style
  };
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-snap' + (bleed ? ' ag-snap--bleed' : '') + (itemAs === 'contents' ? ' ag-snap--contents' : '') + ' ' + className,
    style: vars
  }, arrows && /*#__PURE__*/React.createElement("div", {
    className: "ag-snap__nav"
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "chevron-left",
    label: prevLabel,
    variant: "outline",
    size: "sm",
    onClick: () => by(-1),
    disabled: !st.canPrev
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "chevron-right",
    label: nextLabel,
    variant: "outline",
    size: "sm",
    onClick: () => by(1),
    disabled: !st.canNext
  })), /*#__PURE__*/React.createElement("div", {
    ref: el,
    className: "ag-snap__track",
    role: "region",
    "aria-label": label,
    tabIndex: 0,
    onScroll: measure
  }, itemAs === 'contents' ? items && renderItem ? items.map((it, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: it && it.id != null ? it.id : i
  }, renderItem(it, i))) : children : [...(items && renderItem ? items.map((it, i) => ({
    node: renderItem(it, i),
    key: it && it.id != null ? 'i' + it.id : 'i' + i
  })) : []), ...flattenSnap(children)].map(({
    node,
    key
  }) => /*#__PURE__*/React.createElement("div", {
    className: "ag-snap__item",
    key: key
  }, node))));
});
Object.assign(__ds_scope, { SnapScroller });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SnapScroller.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Stepper.jsx
try { (() => {
const defaultCaption = (n, total, label) => 'Step ' + n + ' of ' + total + ' · ' + label;
function Stepper({
  steps = [],
  current = 0,
  onStepClick,
  formatNumber = n => String(n),
  doneLabel,
  label,
  compact = false,
  captionFormat = defaultCaption,
  className = ''
}) {
  const list = /*#__PURE__*/React.createElement("ol", {
    "aria-label": label,
    className: 'ag-steps' + (compact ? ' ag-steps--compact' : '') + (compact ? '' : ' ' + className)
  }, steps.map((s, i) => {
    const st = i < current ? 'done' : i === current ? 'current' : 'upcoming';
    const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "ag-steps__dot",
      "aria-hidden": compact || undefined
    }, st === 'done' ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 14
    }) : s.number ?? formatNumber(i + 1)), /*#__PURE__*/React.createElement("span", {
      className: compact ? 'ag-sr' : 'ag-steps__label'
    }, s.label, st === 'done' && doneLabel && /*#__PURE__*/React.createElement("span", {
      className: "ag-sr"
    }, " ", doneLabel)));
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      className: 'ag-steps__item ag-steps__item--' + st,
      "aria-current": st === 'current' ? 'step' : undefined
    }, st === 'done' && onStepClick ? /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "ag-steps__btn",
      onClick: () => onStepClick(i)
    }, inner) : /*#__PURE__*/React.createElement("span", {
      className: "ag-steps__btn"
    }, inner));
  }));
  if (!compact) return list;
  const ci = Math.min(Math.max(current, 0), steps.length - 1);
  const cur = steps[ci];
  return /*#__PURE__*/React.createElement("div", {
    className: 'ag-steps-wrap ' + className
  }, list, cur && /*#__PURE__*/React.createElement("p", {
    className: "ag-steps__caption",
    "aria-hidden": "true"
  }, captionFormat(cur.number ?? formatNumber(ci + 1), formatNumber(steps.length), cur.label)));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
// role="tablist" with a roving tabindex: only the selected tab is in the Tab order; ←/→ (mirrored in RTL), Home and End move and select.
// With idPrefix, tabs get ids `${idPrefix}-tab-${id}` and the selected tab points at its panel `${idPrefix}-panel-${id}` (render that panel with role="tabpanel").
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  label,
  idPrefix,
  className = ''
}) {
  const [inner, setInner] = React.useState(defaultValue ?? items[0]?.id);
  const v = value ?? inner;
  const refs = React.useRef([]);
  const pick = id => {
    if (value === undefined) setInner(id);
    onChange && onChange(id);
  };
  const onKey = (e, i) => {
    const n = items.length;
    if (!n) return;
    const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
    let j = null;
    if (e.key === 'ArrowRight') j = rtl ? i - 1 : i + 1;else if (e.key === 'ArrowLeft') j = rtl ? i + 1 : i - 1;else if (e.key === 'Home') j = 0;else if (e.key === 'End') j = n - 1;
    if (j === null) return;
    e.preventDefault();
    j = (j + n) % n;
    refs.current[j] && refs.current[j].focus();
    pick(items[j].id);
  };
  const sel = items.some(it => it.id === v) ? v : items[0]?.id;
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    "aria-label": label,
    className: 'ag-tabs' + (variant === 'pill' ? ' ag-tabs--pill' : '') + ' ' + className
  }, items.map((it, i) => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    ref: el => refs.current[i] = el,
    role: "tab",
    type: "button",
    id: idPrefix ? idPrefix + '-tab-' + it.id : undefined,
    "aria-controls": idPrefix && sel === it.id ? idPrefix + '-panel-' + it.id : undefined,
    "aria-selected": v === it.id,
    tabIndex: sel === it.id ? 0 : -1,
    className: 'ag-tab' + (v === it.id ? ' ag-tab--active' : ''),
    onClick: () => pick(it.id),
    onKeyDown: e => onKey(e, i)
  }, it.label)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/forms/DatePicker.jsx
try { (() => {
// Year / month / day selects in Jalali (Shamsi) or Gregorian. Uses the date helpers (components/utils/dates.js → .dates on the namespace).
const DP_DEF = {
  en: {
    jalali: 'Shamsi',
    gregorian: 'Gregorian',
    year: 'Year',
    month: 'Month',
    day: 'Day',
    equivalent: 'That’s {date}'
  },
  fa: {
    jalali: 'شمسی',
    gregorian: 'میلادی',
    year: 'سال',
    month: 'ماه',
    day: 'روز',
    equivalent: 'برابر با {date}'
  }
};
const dpDates = () => window.VendraDesignSystem_f4f210 && window.VendraDesignSystem_f4f210.dates || window.AG_DATES;
const G_MAX = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function DatePicker({
  label,
  value,
  onChange,
  calendar,
  onCalendarChange,
  calendars = ['j', 'g'],
  yearly = false,
  years = 3,
  minDate,
  hint,
  error,
  lang = 'en',
  labels,
  showEquivalent = true,
  disabled,
  id,
  className = '',
  style
}) {
  const D = dpDates();
  const L = {
    ...DP_DEF[lang === 'fa' ? 'fa' : 'en'],
    ...labels
  };
  const auto = React.useId();
  const fid = id || 'dp' + auto.replace(/:/g, '');
  const hid = fid + '-hint';
  const msg = error || hint;
  const pref = lang === 'fa' ? 'j' : 'g';
  const [innerCal, setInnerCal] = React.useState(() => yearly && value && value.cal || (calendars.includes(pref) ? pref : calendars[0]));
  React.useEffect(() => {
    if (yearly && !calendar && value && value.cal && value.cal !== innerCal) setInnerCal(value.cal);
  }, [yearly && value && value.cal]);
  const cal = calendar || innerCal;
  const today = new Date();
  const fromValue = c => {
    if (!value) return null;
    if (yearly) {
      if (!value.m || !value.d) return null;
      const vc = value.cal || 'j';
      if (vc === c) return {
        m: value.m,
        d: value.d
      };
      const cy = D.yearOf(vc, today);
      const dt = D.toDate(vc, cy, value.m, Math.min(value.d, D.daysInMonth(vc, cy, value.m)));
      const p = D.parts(c, dt);
      return {
        m: p[1],
        d: p[2]
      };
    }
    const dt = D.fromIso(value);
    if (!dt) return null;
    const p = D.parts(c, dt);
    return {
      y: p[0],
      m: p[1],
      d: p[2]
    };
  };
  const vKey = yearly ? value ? (value.cal || 'j') + value.m + '-' + value.d : '' : value || '';
  const [draft, setDraft] = React.useState(() => fromValue(cal) || {});
  React.useEffect(() => {
    const p = fromValue(cal);
    setDraft(p || {});
  }, [vKey, cal]);
  const maxFor = ({
    y,
    m
  }) => !m ? 31 : !yearly && y ? D.daysInMonth(cal, y, m) : cal === 'j' ? m <= 6 ? 31 : 30 : G_MAX[m - 1];
  const emit = n => {
    if (!onChange) return;
    if (yearly) {
      if (n.m && n.d) onChange({
        cal,
        m: n.m,
        d: n.d
      });
    } else if (n.y && n.m && n.d) onChange(D.iso(D.toDate(cal, n.y, n.m, n.d)));
  };
  // Changing year or month clamps the day (Mehr 30 → Esfand 1404 = 29). Never rolls over into the next month.
  const set = k => e => {
    const v = e.target.value;
    const n = {
      ...draft,
      [k]: v ? +v : undefined
    };
    if (n.d && n.m) n.d = Math.min(n.d, maxFor(n));
    setDraft(n);
    emit(n);
  };
  const switchCal = c => {
    if (c === cal) return;
    if (!calendar) setInnerCal(c);
    onCalendarChange && onCalendarChange(c);
    if (yearly && draft.m && draft.d && onChange) {
      const cy = D.yearOf(cal, today);
      const dt = D.toDate(cal, cy, draft.m, Math.min(draft.d, D.daysInMonth(cal, cy, draft.m)));
      const p = D.parts(c, dt);
      onChange({
        cal: c,
        m: p[1],
        d: p[2]
      });
    }
  };
  const minD = minDate ? D.fromIso(minDate) : null;
  const startY = D.yearOf(cal, minD && minD > today ? minD : today);
  let ys = Array.from({
    length: years
  }, (_, i) => startY + i);
  if (draft.y && !ys.includes(draft.y)) ys = [...ys, draft.y].sort((a, b) => a - b);
  const names = D.monthNames(cal, lang);
  const dg = n => D.digits(n, lang);
  const monthOff = m => !!(minD && draft.y && D.toDate(cal, draft.y, m, D.daysInMonth(cal, draft.y, m)) < minD);
  const dayOff = d => !!(minD && draft.y && draft.m && D.toDate(cal, draft.y, draft.m, d) < minD);
  const nDays = maxFor(draft);
  const complete = yearly ? draft.m && draft.d : draft.y && draft.m && draft.d;
  const other = calendars.find(c => c !== cal);
  let eq = '';
  if (showEquivalent && other && complete) {
    const dt = yearly ? D.nextYearly({
      cal,
      m: draft.m,
      d: draft.d
    }).date : D.toDate(cal, draft.y, draft.m, draft.d);
    eq = L.equivalent.replace('{date}', D.fullDate(dt, D.locale(lang, other), false));
  }
  const desc = msg ? hid : undefined;
  return /*#__PURE__*/React.createElement("fieldset", {
    className: 'ag-fieldset ag-date ' + className,
    style: style,
    disabled: disabled
  }, /*#__PURE__*/React.createElement("legend", {
    className: "ag-date__legend"
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "ag-field__label"
  }, label), calendars.length > 1 && /*#__PURE__*/React.createElement(__ds_scope.Tabs, {
    variant: "pill",
    className: "ag-date__cal",
    items: calendars.map(c => ({
      id: c,
      label: c === 'j' ? L.jalali : L.gregorian
    })),
    value: cal,
    onChange: switchCal
  })), /*#__PURE__*/React.createElement("div", {
    className: 'ag-date__grid' + (yearly ? ' ag-date__grid--yearly' : '')
  }, !yearly && /*#__PURE__*/React.createElement(__ds_scope.Select, {
    id: fid + '-y',
    label: L.year,
    value: draft.y ? String(draft.y) : '',
    placeholder: draft.y ? undefined : '—',
    onChange: set('y'),
    "aria-describedby": desc,
    options: ys.map(y => ({
      value: String(y),
      label: dg(y)
    }))
  }), /*#__PURE__*/React.createElement(__ds_scope.Select, {
    id: fid + '-m',
    label: L.month,
    value: draft.m ? String(draft.m) : '',
    placeholder: draft.m ? undefined : '—',
    onChange: set('m'),
    "aria-describedby": desc,
    options: names.map((n, i) => ({
      value: String(i + 1),
      label: n,
      disabled: monthOff(i + 1)
    }))
  }), /*#__PURE__*/React.createElement(__ds_scope.Select, {
    id: fid + '-d',
    label: L.day,
    value: draft.d ? String(draft.d) : '',
    placeholder: draft.d ? undefined : '—',
    onChange: set('d'),
    "aria-describedby": desc,
    "aria-invalid": error ? true : undefined,
    "aria-errormessage": error ? hid : undefined,
    options: Array.from({
      length: nDays
    }, (_, i) => ({
      value: String(i + 1),
      label: dg(i + 1),
      disabled: dayOff(i + 1)
    }))
  })), msg && /*#__PURE__*/React.createElement("span", {
    id: hid,
    className: 'ag-field__hint' + (error ? ' ag-field__hint--error' : '')
  }, msg), showEquivalent && other && /*#__PURE__*/React.createElement("p", {
    className: "ag-date__eq",
    "aria-live": "polite"
  }, eq));
}
Object.assign(__ds_scope, { DatePicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DatePicker.jsx", error: String((e && e.message) || e) }); }

// components/utils/dates.js
try { (() => {
// Jalali (Shamsi) / Gregorian date helpers. Exposed as window.AG_DATES and window.VendraDesignSystem_f4f210.dates.
// Always pass explicit locales: 'fa-IR-u-ca-persian', 'fa-IR-u-ca-gregory', 'en-GB', 'en-GB-u-ca-persian' (see locale()).
(() => {
  const div = (a, b) => Math.floor(a / b);
  const noon = d => {
    const x = new Date(d);
    x.setHours(12, 0, 0, 0);
    return x;
  };
  // Jalali → Gregorian — jdf 33-year-cycle algorithm. Returns a local Date at 12:00 (DST-safe).
  const j2g = (jy, jm, jd) => {
    jy += 1595;
    let days = -355668 + 365 * jy + div(jy, 33) * 8 + div(jy % 33 + 3, 4) + jd + (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
    let gy = 400 * div(days, 146097);
    days %= 146097;
    if (days > 36524) {
      gy += 100 * div(--days, 36524);
      days %= 36524;
      if (days >= 365) days++;
    }
    gy += 4 * div(days, 1461);
    days %= 1461;
    if (days > 365) {
      gy += div(days - 1, 365);
      days = (days - 1) % 365;
    }
    let gd = days + 1;
    const sal = [0, 31, gy % 4 === 0 && gy % 100 !== 0 || gy % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let gm;
    for (gm = 0; gm < 13 && gd > sal[gm]; gm++) gd -= sal[gm];
    return new Date(gy, gm - 1, gd, 12);
  };
  const JF = new Intl.DateTimeFormat('en-US-u-ca-persian-nu-latn', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
  // Gregorian Date → [jy, jm, jd]
  const g2j = date => {
    const p = JF.formatToParts(date);
    const g = t => parseInt((p.find(x => x.type === t) || {}).value, 10);
    return [g('year'), g('month'), g('day')];
  };
  const jYear = date => g2j(date)[0];
  const same = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const isJLeap = y => !same(j2g(y, 12, 30), j2g(y + 1, 1, 1));
  const daysInMonth = (cal, y, m) => cal === 'j' ? m <= 6 ? 31 : m <= 11 ? 30 : isJLeap(y) ? 30 : 29 : new Date(y, m, 0).getDate();
  // cal 'j' | 'g' → Date / [y,m,d]
  const toDate = (cal, y, m, d) => cal === 'j' ? j2g(y, m, d) : new Date(y, m - 1, d, 12);
  const parts = (cal, date) => cal === 'j' ? g2j(date) : [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  const yearOf = (cal, date) => parts(cal, date)[0];
  const iso = date => date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  const fromIso = s => {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || '');
    return m ? new Date(+m[1], +m[2] - 1, +m[3], 12) : null;
  };
  const daysBetween = (a, b) => Math.round((noon(b) - noon(a)) / 864e5);
  // Next occurrence of a yearly date ({cal:'j'|'g', m, d}), today included. Day clamps (Esfand 30 → 29, 29 Feb → 28).
  const nextYearly = ({
    cal = 'j',
    m,
    d
  }, today = new Date()) => {
    const t = noon(today);
    let y = yearOf(cal, t);
    for (let i = 0; i < 2; i++) {
      const date = toDate(cal, y, m, Math.min(d, daysInMonth(cal, y, m)));
      if (date >= t) return {
        date,
        days: daysBetween(t, date)
      };
      y++;
    }
    const date = toDate(cal, y, m, Math.min(d, daysInMonth(cal, y, m)));
    return {
      date,
      days: daysBetween(t, date)
    };
  };
  // Next Hijri (lunar) month/day — Umm al-Qura arithmetic. Iran's official date can differ by a day: let the store publish the real one (AG_DATA.occasionDates).
  const HF = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura-nu-latn', {
    month: 'numeric',
    day: 'numeric'
  });
  const nextHijri = (hm, hd, today = new Date()) => {
    const t = noon(today);
    for (let i = 0; i < 400; i++) {
      const x = new Date(t);
      x.setDate(t.getDate() + i);
      const p = HF.formatToParts(x);
      const g = k => +(p.find(q => q.type === k) || {}).value;
      if (g('month') === hm && g('day') === hd) return {
        date: x,
        days: i
      };
    }
    return null;
  };
  const locale = (lang, cal) => lang === 'fa' ? cal === 'g' ? 'fa-IR-u-ca-gregory' : 'fa-IR-u-ca-persian' : cal === 'j' ? 'en-GB-u-ca-persian' : 'en-GB';
  const calOf = loc => /ca-persian/.test(loc) || /^fa/.test(loc) && !/ca-gregory/.test(loc) ? 'j' : 'g';
  const clean = s => s.replace(/\s*AP$/, '').replace(/\s+/g, ' ').trim();
  const JM = {
    en: ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand'],
    fa: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
  };
  const monthNames = (cal, lang) => cal === 'j' ? JM[lang === 'fa' ? 'fa' : 'en'].slice() : Array.from({
    length: 12
  }, (_, i) => new Intl.DateTimeFormat(locale(lang, 'g'), {
    month: 'long'
  }).format(new Date(2026, i, 15, 12)));
  const FA_D = '۰۱۲۳۴۵۶۷۸۹';
  const digits = (n, lang) => lang === 'fa' ? String(n).replace(/[0-9]/g, d => FA_D[d]) : String(n);
  // "7 Mehr" / "۷ مهر" — built from our own month names so en-GB-u-ca-persian never drifts.
  const dayMonth = (date, loc) => {
    const fa = /^fa/.test(loc);
    const cal = calOf(loc);
    if (cal === 'j') {
      const [, m, d] = g2j(date);
      return digits(d, fa ? 'fa' : 'en') + ' ' + JM[fa ? 'fa' : 'en'][m - 1];
    }
    return clean(new Intl.DateTimeFormat(loc, {
      day: 'numeric',
      month: 'long'
    }).format(date));
  };
  // Full date. fa never asks Intl for weekday + year together (Chrome returns "۱۴۰۵ مهر ۷, سه‌شنبه"):
  // it is built as weekday + '، ' + "day month year" → «سه‌شنبه، ۷ مهر ۱۴۰۵».
  const fullDate = (date, loc = 'en-GB', withWeekday = false) => {
    if (!date) return '';
    const fa = /^fa/.test(loc);
    const cal = calOf(loc);
    let dmy;
    if (cal === 'j') {
      const [y, m, d] = g2j(date);
      const L = fa ? 'fa' : 'en';
      dmy = digits(d, L) + ' ' + JM[L][m - 1] + ' ' + digits(y, L);
    } else dmy = clean(new Intl.DateTimeFormat(loc, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date));
    if (!withWeekday) return dmy;
    const wd = new Intl.DateTimeFormat(fa ? 'fa-IR' : 'en-GB', {
      weekday: 'long'
    }).format(date);
    return wd + (fa ? '، ' : ', ') + dmy;
  };
  const X = {
    j2g,
    g2j,
    jYear,
    isJLeap,
    daysInMonth,
    toDate,
    parts,
    yearOf,
    iso,
    fromIso,
    daysBetween,
    nextYearly,
    nextHijri,
    locale,
    fullDate,
    dayMonth,
    monthNames,
    digits
  };
  window.AG_DATES = X;
  (window.VendraDesignSystem_f4f210 = window.VendraDesignSystem_f4f210 || {}).dates = X;
  if (typeof module !== 'undefined' && module.exports) module.exports = X;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/utils/dates.js", error: String((e && e.message) || e) }); }

// components/utils/format.js
try { (() => {
// Shared formatting helpers. Prices are stored in Toman; rate = units per 1 Toman (DEMO rates).
(() => {
  const CURRENCIES = {
    IRT: {
      rate: 1,
      dec: 0,
      sym: '',
      en: 'Toman',
      fa: 'تومان'
    },
    IRR: {
      rate: 10,
      dec: 0,
      sym: '',
      en: 'Rial',
      fa: 'ریال'
    },
    USD: {
      rate: 1 / 100000,
      dec: 2,
      sym: '$',
      en: 'USD',
      fa: 'دلار'
    },
    EUR: {
      rate: 1 / 110000,
      dec: 2,
      sym: '€',
      en: 'EUR',
      fa: 'یورو'
    },
    AED: {
      rate: 1 / 27000,
      dec: 0,
      sym: '',
      en: 'AED',
      fa: 'درهم'
    }
  };
  const loc = l => l === 'fa' ? 'fa-IR' : 'en-US';
  // Normalize separators explicitly so Persian output is stable across browser locale data.
  const formatNumber = (n, lang, options = {}) => {
    const formatter = new Intl.NumberFormat(loc(lang), {
      ...options,
      ...(lang === 'fa' ? {
        numberingSystem: 'arabext'
      } : {})
    });
    return formatter.formatToParts(Number(n)).map(p => lang === 'fa' ? p.type === 'group' ? '٬' : p.type === 'decimal' ? '٫' : p.value : p.value).join('');
  };
  const num = (n, lang = 'en') => formatNumber(n, lang);
  // fa: number then label (۴٬۲۰۰٬۰۰۰ تومان) · en: symbol first ($42.00), words after (4,200,000 Toman)
  const money = (n, {
    currency = 'IRT',
    lang = 'en'
  } = {}) => {
    const c = CURRENCIES[currency] || CURRENCIES.IRT;
    const s = formatNumber(Number(n) * c.rate, lang, {
      minimumFractionDigits: c.dec,
      maximumFractionDigits: c.dec
    });
    if (lang === 'fa') return s + ' ' + c.fa;
    return c.sym ? c.sym + s : s + ' ' + c.en;
  };
  const F = {
    CURRENCIES,
    money,
    num
  };
  window.AG_FORMAT = F;
  (window.VendraDesignSystem_f4f210 = window.VendraDesignSystem_f4f210 || {}).format = F;
  if (typeof module !== 'undefined' && module.exports) module.exports = F;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/utils/format.js", error: String((e && e.message) || e) }); }

// components/utils/nav.js
try { (() => {
// Storefront navigation + focus helpers. App.jsx replaces href/link on every render (they need the current lang).
(() => {
  // setTimeout, not rAF: rAF is paused in background tabs/iframes and the focus move would be lost
  const after = fn => setTimeout(fn, 30);
  const N = {
    href: () => '?',
    link: () => {},
    // Screen or step change → focus the page's h1 (tabindex="-1", no focus ring, no scroll jump).
    focusHeading() {
      after(() => {
        const h = document.querySelector('main h1') || document.querySelector('main');
        if (!h) return;
        if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1');
        h.focus({
          preventScroll: true
        });
      });
    },
    // Failed validation → focus the first invalid field (aria-invalid from the DS field components, or native :invalid).
    focusFirstInvalid(root) {
      after(() => {
        const r = root || document.querySelector('main') || document;
        const el = r.querySelector('[aria-invalid="true"],input:invalid,select:invalid,textarea:invalid');
        if (el) el.focus();
      });
    }
  };
  window.AG_NAV = N;
  // Call at the top of a multi-step screen: useHeadingFocus(step)
  window.useHeadingFocus = dep => {
    const first = React.useRef(true);
    React.useEffect(() => {
      if (first.current) {
        first.current = false;
        return;
      }
      N.focusHeading();
    }, [dep]);
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/utils/nav.js", error: String((e && e.message) || e) }); }

// components/utils/responsive.js
try { (() => {
// Breakpoints: mobile < 768, tablet < 1100
window.useBP = function () {
  const get = () => ({
    w: window.innerWidth,
    mobile: window.innerWidth < 768,
    tablet: window.innerWidth < 1100
  });
  const [bp, setBp] = React.useState(get);
  React.useEffect(() => {
    const on = () => setBp(get());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return bp;
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/utils/responsive.js", error: String((e && e.message) || e) }); }

// components/utils/seo.js
try { (() => {
// Routing, <head> and Schema.org helpers for the storefront. Exposed as window.AG_SEO and window.VendraDesignSystem_f4f210.seo.
// URL scheme: ?lang=en|fa&view=<screen>&id=<productId>&cat=<category>&post=<postId>&m=<momentId>
(() => {
  const SCREENS = new Set(['home', 'shop', 'product', 'bag', 'checkout', 'contact', 'search', 'gifts', 'moment', 'saved', 'track', 'custom', 'account', 'journal', 'post', 'care', 'faq']);
  const NOINDEX = new Set(['bag', 'checkout', 'confirm', 'account', 'track', 'saved', 'search', 'notfound']);
  const PARAMS = ['id', 'cat', 'post', 'm'];
  const NUMERIC = new Set(['m']); // params whose ids are numeric → digits only
  const REQUIRED = {
    product: 'id',
    post: 'post',
    moment: 'm'
  }; // screen → param it can't render without
  const OPTIONAL = {
    track: 'id'
  }; // track: optional order number (?view=track&id=VB-10491), SAFE pattern; no id → order lookup / not-found state. Stays noindex.
  const SAFE = /^[\w:-]{1,40}$/,
    DIGITS = /^\d{1,40}$/;
  const register = (...names) => names.forEach(n => SAFE.test(n) && SCREENS.add(n));
  const setNumeric = keys => {
    NUMERIC.clear();
    keys.forEach(k => NUMERIC.add(k));
  };
  const valid = (k, v) => SAFE.test(v) && (!NUMERIC.has(k) || DIGITS.test(v));

  // Parse location.search. Invalid values are dropped; an unknown view — or a view missing its required id — becomes "notfound".
  const readRoute = (search = location.search) => {
    const q = new URLSearchParams(search);
    const r = {};
    const l = q.get('lang');
    if (l === 'en' || l === 'fa') r.lang = l;
    const v = q.get('view');
    r.view = v == null || v === '' ? 'home' : SAFE.test(v) && SCREENS.has(v) ? v : 'notfound';
    for (const k of PARAMS) {
      const x = q.get(k);
      if (x != null && x !== '' && valid(k, x)) r[k] = x;
    }
    if (REQUIRED[r.view] && !r[REQUIRED[r.view]]) r.view = 'notfound';
    return r;
  };
  // State → "?lang=…&view=…". Home omits view; unknown keys and invalid values are ignored.
  const routeParams = (state = {}) => {
    const q = new URLSearchParams();
    if (state.lang === 'en' || state.lang === 'fa') q.set('lang', state.lang);
    if (state.view && state.view !== 'home' && SAFE.test(state.view)) q.set('view', state.view);
    for (const k of PARAMS) {
      const x = state[k];
      if (x != null && x !== '' && valid(k, String(x))) q.set(k, String(x));
    }
    const s = q.toString();
    return s ? '?' + s : '?';
  };
  const hrefFor = (state = {}, screen = 'home', extra = {}) => routeParams({
    lang: state.lang,
    view: screen,
    ...extra
  });
  // One click handler for every internal <a href>. Modified / middle clicks and target=_blank fall through to the browser.
  const linkHandler = go => e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.currentTarget;
    if (!a || !a.href || a.target && a.target !== '_self' || a.hasAttribute('download')) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.pathname !== location.pathname) return;
    e.preventDefault();
    go(readRoute(u.search), e);
  };
  const isNoindex = view => NOINDEX.has(view);
  const abs = u => {
    try {
      return u ? new URL(u, location.href).href : undefined;
    } catch (e) {
      return undefined;
    }
  };
  const upsert = (sel, tag, attrs) => {
    let el = document.head.querySelector(sel);
    if (!el) {
      el = document.createElement(tag);
      el.setAttribute('data-ag-seo', '');
      document.head.appendChild(el);
    }
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  };
  const drop = sel => document.head.querySelectorAll(sel).forEach(el => el.remove());
  const meta = (key, name, content) => content == null || content === '' ? drop('meta[' + key + '="' + name + '"]') : upsert('meta[' + key + '="' + name + '"]', 'meta', {
    [key]: name,
    content
  });
  const LOCALE = {
    en: 'en_US',
    fa: 'fa_IR'
  };
  // Sets <title>, description, og:*, twitter:*, canonical, hreflang en/fa/x-default and robots.
  const syncHead = ({
    title,
    description,
    image,
    url,
    locale = 'en',
    type = 'website',
    alternates = {},
    noindex = false
  } = {}) => {
    if (title) document.title = title;
    const img = abs(image),
      href = abs(url);
    meta('name', 'description', description);
    meta('property', 'og:title', title);
    meta('property', 'og:description', description);
    meta('property', 'og:image', img);
    meta('property', 'og:url', href);
    meta('property', 'og:type', type);
    meta('property', 'og:locale', LOCALE[locale] || locale);
    meta('property', 'og:locale:alternate', LOCALE[locale === 'fa' ? 'en' : 'fa']);
    meta('name', 'twitter:card', img ? 'summary_large_image' : 'summary');
    meta('name', 'twitter:title', title);
    meta('name', 'twitter:description', description);
    meta('name', 'twitter:image', img);
    if (href) upsert('link[rel="canonical"]', 'link', {
      rel: 'canonical',
      href
    });else drop('link[rel="canonical"]');
    for (const h of ['en', 'fa', 'x-default']) {
      const u = abs(h === 'x-default' ? alternates['x-default'] || alternates.en : alternates[h]);
      const sel = 'link[rel="alternate"][hreflang="' + h + '"]';
      if (u && !noindex) upsert(sel, 'link', {
        rel: 'alternate',
        hreflang: h,
        href: u
      });else drop(sel);
    }
    meta('name', 'robots', noindex ? 'noindex, follow' : null);
  };
  const setJsonLd = (id, data) => {
    const sel = 'script[type="application/ld+json"][data-ag-ld="' + id + '"]';
    if (!data) {
      drop(sel);
      return;
    }
    const el = upsert(sel, 'script', {
      type: 'application/ld+json',
      'data-ag-ld': id
    });
    el.textContent = JSON.stringify(data);
  };
  const D = () => window.AG_DATA || {};
  const STORE_NAME = 'Vendra Florist';
  const ISO = {
    toman: 'IRT',
    rial: 'IRR',
    usd: 'USD',
    eur: 'EUR',
    aed: 'AED'
  };
  // Prices are stored in Toman. Toman isn't ISO 4217, so IRT is published as IRR (× 10).
  const offerPrice = (toman, code) => {
    const F = window.AG_FORMAT || {
      CURRENCIES: {}
    };
    let c = code || ISO[D().getCurrency && D().getCurrency()] || 'IRT';
    if (c === 'IRT') return {
      price: String(Math.round(Number(toman) * 10)),
      priceCurrency: 'IRR'
    };
    const cur = F.CURRENCIES[c];
    if (!cur) return {
      price: String(Math.round(Number(toman) * 10)),
      priceCurrency: 'IRR'
    };
    return {
      price: (Number(toman) * cur.rate).toFixed(cur.dec),
      priceCurrency: c
    };
  };
  const seller = url => ({
    '@type': 'Florist',
    name: STORE_NAME,
    url: abs(url || location.pathname)
  });
  const shippingDetails = currency => {
    const z = D().delivery && D().delivery.IR && D().delivery.IR.zones || [];
    return z.map(x => {
      const p = offerPrice(x.fee, currency);
      return {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: p.price,
          currency: p.priceCurrency
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IR',
          addressRegion: x.en
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: x.sameDay ? 0 : 3,
            maxValue: x.sameDay ? 0 : 5,
            unitCode: 'DAY'
          }
        }
      };
    });
  };
  // admin.returnPolicy: {default:{…}, byCat:{<categoryId>:{…}}} (or a single policy). Each: {category, days, method, fees, country, url}.
  // MerchantReturnNotPermitted (perishables) publishes no days/method/fees, as Google expects.
  const returnPolicy = p => {
    const R = D().admin && D().admin.returnPolicy;
    if (!R) return undefined;
    const r = Object.assign({}, R.default || (R.byCat ? {} : R), R.byCat && p && R.byCat[p.cat] || {});
    if (!r.category && !r.days) return undefined;
    const cat = r.category || 'MerchantReturnFiniteReturnWindow';
    const base = {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: r.country || 'IR',
      returnPolicyCategory: 'https://schema.org/' + cat,
      ...(r.url ? {
        merchantReturnLink: abs(r.url)
      } : {})
    };
    if (cat === 'MerchantReturnNotPermitted') return base;
    return {
      ...base,
      ...(r.days != null && cat === 'MerchantReturnFiniteReturnWindow' ? {
        merchantReturnDays: r.days
      } : {}),
      ...(r.method ? {
        returnMethod: 'https://schema.org/' + r.method
      } : {}),
      ...(r.fees ? {
        returnFees: 'https://schema.org/' + r.fees
      } : {})
    };
  };
  // Schema.org Product. Items priced "on request" (price == null or onRequest) carry no Offer.
  const productJsonLd = (p, {
    url,
    lang = 'en',
    currency,
    shipping = true,
    returns = true
  } = {}) => {
    if (!p) return null;
    const imgs = (D().imagesOf ? D().imagesOf(p) : [{
      src: p.image
    }]).filter(x => x && x.src && !x.crop).map(x => abs(x.src));
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p[lang] || p.name || p.en,
      description: (lang === 'fa' ? p.subFa : p.subEn) || p.description,
      image: [...new Set(imgs)],
      sku: p.sku || p.id,
      brand: {
        '@type': 'Brand',
        name: STORE_NAME
      },
      url: abs(url)
    };
    const onRequest = p.onRequest || p.price == null;
    if (!onRequest) {
      const sold = p.badge === 'soldout' || p.soldOut || p.inStock === false;
      const offer = {
        '@type': 'Offer',
        ...offerPrice(p.price, currency),
        availability: 'https://schema.org/' + (sold ? 'OutOfStock' : 'InStock'),
        itemCondition: 'https://schema.org/NewCondition',
        url: abs(url),
        seller: seller()
      };
      if (shipping) {
        const s = shippingDetails(currency);
        if (s.length) offer.shippingDetails = s;
      }
      if (returns) {
        const r = returnPolicy(p);
        if (r) offer.hasMerchantReturnPolicy = r;
      }
      ld.offers = offer;
    }
    return ld;
  };
  // Schema.org Florist for the studio (home + contact).
  const storeJsonLd = ({
    url,
    logo = '../../assets/logo-mark.png',
    image
  } = {}) => {
    const C = D().contact || {};
    const g = C.geo || {
      lat: 35.8390,
      lng: 50.9770
    };
    return {
      '@context': 'https://schema.org',
      '@type': 'Florist',
      name: STORE_NAME,
      url: abs(url || location.pathname),
      logo: abs(logo),
      ...(image ? {
        image: abs(image)
      } : {}),
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Azimiyeh',
        addressLocality: 'Karaj',
        addressRegion: 'Alborz',
        addressCountry: 'IR'
      },
      telephone: '+989129333034',
      openingHours: 'Mo-Su 08:00-22:00',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: g.lat,
        longitude: g.lng
      },
      sameAs: ['https://instagram.com/misaf1990']
    };
  };
  const S = {
    returnPolicy,
    SCREENS,
    NOINDEX,
    OPTIONAL,
    REQUIRED,
    register,
    setNumeric,
    readRoute,
    routeParams,
    hrefFor,
    linkHandler,
    isNoindex,
    syncHead,
    setJsonLd,
    productJsonLd,
    storeJsonLd,
    offerPrice
  };
  window.AG_SEO = S;
  (window.VendraDesignSystem_f4f210 = window.VendraDesignSystem_f4f210 || {}).seo = S;
  if (typeof module !== 'undefined' && module.exports) module.exports = S;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/utils/seo.js", error: String((e && e.message) || e) }); }

__ds_ns.AddressCard = __ds_scope.AddressCard;

__ds_ns.BlogCard = __ds_scope.BlogCard;

__ds_ns.CategoryCard = __ds_scope.CategoryCard;

__ds_ns.Gallery = __ds_scope.Gallery;

__ds_ns.LineItem = __ds_scope.LineItem;

__ds_ns.OrderSummary = __ds_scope.OrderSummary;

__ds_ns.OrderTimeline = __ds_scope.OrderTimeline;

__ds_ns.PaymentCard = __ds_scope.PaymentCard;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.ReminderRow = __ds_scope.ReminderRow;

__ds_ns.ArchFrame = __ds_scope.ArchFrame;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.DetailList = __ds_scope.DetailList;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.SkipLink = __ds_scope.SkipLink;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.ICON_SVGS = __ds_scope.ICON_SVGS;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.AnnouncementBar = __ds_scope.AnnouncementBar;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.LiveRegion = __ds_scope.LiveRegion;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.ChoiceGroup = __ds_scope.ChoiceGroup;

__ds_ns.ChoiceTile = __ds_scope.ChoiceTile;

__ds_ns.DatePicker = __ds_scope.DatePicker;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.RangeSlider = __ds_scope.RangeSlider;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.BottomTabBar = __ds_scope.BottomTabBar;

__ds_ns.LanguageSwitch = __ds_scope.LanguageSwitch;

__ds_ns.MenuList = __ds_scope.MenuList;

__ds_ns.NavLink = __ds_scope.NavLink;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.SnapScroller = __ds_scope.SnapScroller;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
