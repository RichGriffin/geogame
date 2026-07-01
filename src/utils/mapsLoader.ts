import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

let initialized = false;

function ensureInitialized(): void {
  if (!initialized) {
    const key = window.electronAPI?.mapsApiKey ?? '';
    setOptions({
      key,
      v: 'weekly',
      libraries: ['maps', 'marker'],
    });
    initialized = true;
  }
}

export async function loadMapsApi(): Promise<typeof google.maps> {
  ensureInitialized();
  await importLibrary('maps');
  return google.maps;
}
