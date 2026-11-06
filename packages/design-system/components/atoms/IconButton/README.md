# IconButton

Round icon-only button (React Aria's Button) for header actions, favourites, close. Pass `href` to render a React Aria Link (routed through a `RouterProvider` when the app has one). `label` is the accessible name and the `title` tooltip.

```jsx
<IconButton icon="shopping-bag" label="Bag, 2 items" count={2} />
<IconButton icon="heart" label="Save" variant="raised" active />
<IconButton icon="message-circle" label="WhatsApp" variant="secondary" href="https://wa.me/989129333034" target="_blank" />
<IconButton icon="phone" label="Call" variant="secondary" href="tel:+989129333034" />
```

On a dark surface (the footer, the consent banner) pass `inverse`: a light icon, a dark-surface edge for `secondary`, a lighter hover and the on-dark focus ring. `<IconButton icon="instagram" label="Instagram" variant="secondary" inverse href=… />`
`count` takes a number or a pre-localized string (e.g. `"۲"`) and hides at 0. The bubble isn't announced, so include the count in `label`.

## Usage

**Use when:** Compact actions where the icon is universal: favourite, close, edit, delete, bag. Always pass `label`.

**Don’t use when:** Don’t use when the meaning isn’t obvious from the icon — use Button with a label.
