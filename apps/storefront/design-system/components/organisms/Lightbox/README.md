# Lightbox

A full-screen viewer that shows one item at a time, as large as the screen allows, on a dark stage. Each item can have several photos, a caption, and buttons for the page's actions. The storefront's Presentation page uses it to show designs to a customer at the shop counter.

```jsx
<Lightbox
  items={products.map(product => ({
    id: product.code,
    images: product.photos,
    caption: <strong>{product.code}</strong>
  }))}
  index={openIndex}
  onIndexChange={setOpenIndex}
  onClose={() => setOpenIndex(null)}
  actions={item => <Button onClick={() => send(item.id)}>Send to customer</Button>}
/>
```

- `index` controls it: `null` keeps it closed. The viewer calls `onIndexChange` and `onClose`, and the page decides what to show.
- **Keyboard.** ←/→ move between items, and Esc closes the viewer. Focus is trapped inside while it's open and returns to the opener afterwards.
- **Touch.** A sideways swipe moves to the next or previous item.
- **RTL.** Under `dir="rtl"`, the arrow keys, swipes and chevrons are mirrored. Numbers use Persian digits.
- **Screen readers.** The viewer is a modal dialog named "Photo viewer". The position ("3 of 14") is a polite live region, so each move is announced.
- **Photos.** The photo uses `Picture` and is never cropped. The first photos of the two neighbouring items load ahead.

## Usage

**Use when:** Showing photos large and without distraction, one after another, such as the counter presentation or a full-screen view from a product gallery.

**Don’t use when:** The photos belong in the page flow (use Gallery) or in a row of cards (use Carousel).
