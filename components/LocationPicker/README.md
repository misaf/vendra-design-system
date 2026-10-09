# LocationPicker

A delivery pin. The pin stays at the centre of the map, and wherever the map stops is the chosen point. Customers drag or tap the map, press the arrow keys once it has focus, or use "Use my location". The status line says where the pin is.

```jsx
<LocationPicker
  id="delivery-map"
  label="Delivery pin"
  status={location ? 'Pinned at ' + text(location) : 'Move the map so the pin sits on the door.'}
  error={pinError}
  value={location}
  onChange={setLocation}
  loadLeaflet={() => import('leaflet').then(module => module.default)}
  tiles={{url: 'https://tile.example.com/{z}/{x}/{y}.png', attribution: '© Example maps'}}
  center={[35.8327, 50.9654]}
  locateLabel="Use my location"
  onLocateError={() => setPinError('We couldn’t find your location.')}
  onFail={() => setTypedAddress(true)}
/>
```

- **Leaflet is yours to load.** `loadLeaflet()` resolves with Leaflet however the app ships it: a dynamic import, a script tag or a CDN. The map is created in an effect, so the component renders on the server, and the package doesn't carry its own copy. Include Leaflet's CSS too.
- `onChange` gets the point under the pin, rounded to six decimals (`commerce.pinLocation`), each time the map stops. A new `value` from elsewhere, such as a saved address, moves the map there.
- The map is a labelled region described by the status and the error, so focusing it after a failed submit reads the problem. Its id is the one to focus.
- If Leaflet can't load, `onFail` runs: replace the picker with a full typed address.
- Tiles: OpenStreetMap's own server is for light use only. A busy store should use a commercial or self-hosted tile service.

## Usage

**Use when:** Choosing where flowers go: the delivery step and saved addresses.

**Don’t use when:** Don’t use to show places the customer only looks at, such as the studio on the contact page; a read-only map with markers fits that.
