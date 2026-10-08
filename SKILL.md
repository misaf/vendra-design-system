---
name: vendra-design
description: Use this skill to generate well-branded interfaces and assets for Vendra (multi-tenant platform for florist websites; default tenant theme: Vendra Florist / گل‌فروشی وندرا, bilingual English/Persian), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read readme.md (overview, package, tenant themes) and guidelines/brand-guide.md (voice, visuals, rules) within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Always support both `lang="en" dir="ltr"` and `lang="fa" dir="rtl" data-lang="fa"`; light mode only (semantic tokens only); tenants restyle via `data-tenant="<slug>"` + `tokens/tenants/<slug>.json`, generated into `<slug>.css` (see readme → Tenant themes, samples `clay` and `fern`); use logical CSS properties and Persian digits for fa.

Store contact: phone +98-9129333034 (`tel:+989129333034`) · WhatsApp +989129333034 (https://wa.me/989129333034) · Instagram @misaf1990. Numbers render LTR inside Persian. When a time range is written in Persian (۰۸:۰۰ تا ۲۲:۰۰), wrap each time in Unicode FSI/PDI marks (`\u2068 … \u2069`) so the order can't flip.

Components (apps import them from the `@vendra/design-system` package in `dist/`; cards and templates use the window namespace from `templates/_runtime/components.js`; both built by `npm --prefix templates run build`). Each lives in `components/<Name>/` with its `.jsx`, `.d.ts`, `.css` and a `README.md` on usage. Basics — Icon, Button, IconButton, Badge, Chip, Card, ArchFrame, SkipLink, DetailList · Forms — Field, Input, PhoneInput, CodeInput, Select, Checkbox, Radio, Switch, QuantityInput, ChoiceGroup + ChoiceTile, RangeSlider, DatePicker · Navigation — Tabs, LanguageSwitch, Accordion, Stepper, BottomTabBar, NavLink, MenuList, SectionHeader, Carousel, LoadMore · Feedback and overlays — Dialog, Toast, Tooltip, Skeleton, Alert, EmptyState, AnnouncementBar, LiveRegion · Commerce — ProductCard, CategoryCard, BlogCard, PaymentCard, LineItem, Gallery, OrderTimeline, OrderSummary, AddressCard, ReminderRow. Class names: `cx()` from `components/utils/cx.js`. Price/number formatting: `format` → `{ CURRENCIES, money(n,{currency,lang,currencies}), num(n,lang) }` (source `components/utils/format.js`). Routing and <head> for the templates: `window.AG_SEO` (source `templates/_shared/seo.js`). Delivery, totals, discounts, paging and API adapters: `commerce` (source `components/utils/commerce.js`). Jalali/Gregorian dates: `dates` (source `components/utils/dates.js`); Persian full dates read weekday، day month year («سه‌شنبه، ۷ مهر ۱۴۰۵») — never Intl weekday + year together in fa.

Rules (details in guidelines/brand-guide.md → Links vs buttons, Routing & URLs, Accessibility, Payments, Storefront release checklist):
- Navigation is always `<a href>`; actions are `<button>`. Never a clickable `<div>`. `Button`, `IconButton`, `CategoryCard`, `BottomTabBar` items and `ProductCard` take `href`.
- URLs: `?lang=en|fa&view=<screen>&id=&cat=&post=&m=`, validated with `/^[\w:-]{1,40}$/`; unknown view → notfound. Use pushState for screen changes, replaceState for language changes, and handle popstate. noindex: bag, checkout, confirm, account, track, saved, search, notfound.
- On a screen or step change, focus the h1. On a failed submit, focus the first invalid field. Hints and errors sit outside the `<label>`, linked with `aria-describedby="{id}-hint"` (+ `aria-invalid`, `aria-errormessage`). Use SkipLink → `#main` and one LiveRegion. Dialog traps focus, closes on Esc, returns focus and locks scroll.
- `--text-subtle` is decorative or disabled only. Check the Contrast card (Colors), with `data-tenant` set for a tenant.
- PCI DSS doesn't apply (card-to-card; no card data touches the storefront).

New florist? Follow guidelines/tenant-onboarding.md; generate the theme with guidelines/theme-builder.html (all contrast checks must pass).
