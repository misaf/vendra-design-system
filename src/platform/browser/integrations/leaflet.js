export async function vfLoadLeaflet() {
  const [leaflet] = await Promise.all([import('leaflet'), import('./leaflet.css')]);
  return leaflet.default;
}
