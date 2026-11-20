export const validLocation = location =>
  !!location &&
  Number.isFinite(location.lat) &&
  Number.isFinite(location.lng) &&
  Math.abs(location.lat) <= 90 &&
  Math.abs(location.lng) <= 180;

// A map point rounded to six decimals (about 10 cm): enough for a front door, and tidy in stored orders.
export const pinLocation = point => {
  const round = value => Math.round(value * 1e6) / 1e6;
  return {lat: round(point.lat), lng: round(point.lng)};
};
