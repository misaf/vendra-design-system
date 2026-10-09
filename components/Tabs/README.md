# Tabs

Tab strip for switching sibling views (Description / Care / Delivery), account sections or a calendar toggle.

```jsx
<Tabs label="Product details" items={[{id: 'desc', label: 'Description'}, {id: 'care', label: 'Care'}]} value={tab} onChange={setTab}>
  {tab === 'desc' ? description : careNotes}
</Tabs>
<Tabs variant="pill" items={…} value={calendar} onChange={setCalendar} />
```

Built on React Aria. Keyboard: only the selected tab is in the Tab order. ←/→ move and select (mirrored in RTL, following the page's `lang`), Home/End jump to the first/last tab. Pass `label` when there's no visible heading naming the strip.

**Panels:** `children` is the selected tab's content. Tabs renders it in a `tabpanel` linked to its tab (`aria-controls`, `aria-labelledby`), so screen readers announce which tab owns the content. `panelClassName` styles the panel; `listClassName` wraps the tab list (for example a horizontal scroller on phones). Without children, Tabs is just the tab list (a calendar toggle).

> Changed in 0.2: `idPrefix` is gone. React Aria generates the ids and links the panel, so pass the panel content as `children` instead of rendering your own `role="tabpanel"`.

## Usage

**Use when:** Switching panels on the same page: Account tabs, product info. Arrow keys / Home / End move between tabs.

**Don’t use when:** Don’t use for page navigation (NavLink) or sequential steps (Stepper).
