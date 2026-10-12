# Gallery

Swipeable product photos with scroll-snap and pill dots (active widens). RTL-aware. The dots are React Aria buttons; the track scrolls natively.

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
