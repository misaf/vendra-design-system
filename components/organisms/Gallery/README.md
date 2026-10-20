# Gallery

Swipeable product photos with scroll-snap and pill dots (active widens). RTL-aware. The dots are React Aria buttons; the track scrolls natively.

Use `onIndexChange(index)` to follow the zero-based active photo, for example when opening the same photo in a full-screen viewer.

```jsx
<Gallery
  label="Photos"
  images={[
    {src: a, alt: 'Front'},
    {src: b, alt: 'Detail'}
  ]}
/>
```

## Usage

**Use when:** Product detail photos — cover plus thumbnails.

**Don’t use when:** Don’t use for single images (ArchFrame) or horizontal product rows (Carousel).
