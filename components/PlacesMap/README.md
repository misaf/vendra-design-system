# PlacesMap

A map of places to look at, not to choose: the studio on the contact page, the customer's saved addresses in the account. Each place gets a labelled marker; the view fits them all, or zooms in on a single one.

```jsx
<PlacesMap
  id="account-places"
  label="Your saved addresses"
  places={addresses.map(address => ({
    id: address.id,
    label: address.label,
    title: 'Edit ' + address.label,
    location: address.location,
    onSelect: () => edit(address)
  }))}
  loadLeaflet={() => import('leaflet').then(module => module.default)}
  tiles={{url: 'https://tile.example.com/{z}/{x}/{y}.png', attribution: '© Example maps'}}
  center={[35.8327, 50.9654]}
  height={260}
  onFail={() => setShowMap(false)}
/>
```

- Markers are in the tab order and open their place with Enter or Space, as well as a click: Leaflet gives markers `role="button"` but only clicks them with a pointer.
- Places without a valid location are left off. New, moved or renamed places redraw the markers.
- Like LocationPicker, Leaflet is the app's to load (`loadLeaflet`) and the map is created only in the browser. If it can't load, `onFail` runs: hide the map, the places are still listed on the page.

## Usage

**Use when:** Showing where things are: the studio, saved addresses, pickup points.

**Don’t use when:** Don’t use to choose a point (LocationPicker), or as the only way to reach a place: list the places too.
