Tab strip for switching sibling views (Description / Care / Delivery), account sections or a calendar toggle.
```jsx
<Tabs label="Product details" items={[{id:'desc',label:'Description'},{id:'care',label:'Care'}]} />
<Tabs variant="pill" items={…} value={tab} onChange={setTab} />
```
Keyboard: only the selected tab is in the Tab order. ←/→ move and select (mirrored in RTL), Home/End jump to the first/last tab. Pass `label` when there's no visible heading naming the strip.

## Usage
**Use when:** Switching panels on the same page: Account tabs, product info. Arrow keys / Home / End move between tabs.

**Don’t use when:** Don’t use for page navigation (NavLink) or sequential steps (Stepper).
