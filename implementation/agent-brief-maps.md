# Agent Brief — Maps Lane (Google Maps Integration)
# Cycle 1 · Wave 1

**Owner:** Maps lane agent  
**Coordinator contract:** `implementation/contract-baseline.md`  
**Status at handoff:** NOT STARTED

---

## Mission

Create the shared Google Maps utilities (`mapsLoader.ts` and `mapStyle.ts`) that both `MiniMap` and `ResultMap` import. Define the dark map style and the singleton loader so FE components can initialise a Google Maps instance with one call.

---

## Exact Files to Create / Change

| File | Action |
|------|--------|
| `src/utils/mapStyle.ts` | CREATE — dark style array |
| `src/utils/mapsLoader.ts` | CREATE — singleton Loader + typed helper |
| `package.json` | ADD `@googlemaps/js-api-loader` dependency |

---

## Step-by-Step Implementation

### 1. Install the loader package

```bash
cd C:/dev/rg/geogame
npm install @googlemaps/js-api-loader
```

Also install the types:
```bash
npm install --save-dev @types/google.maps
```

### 2. `src/utils/mapStyle.ts`

```ts
export const DARK_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#1a1f2c' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0d1117' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#3d4f63' }] },
  { featureType: 'road', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#526173' }, { weight: 0.5 }],
  },
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];
```

### 3. `src/utils/mapsLoader.ts`

```ts
import { Loader } from '@googlemaps/js-api-loader';

let loader: Loader | null = null;

function getLoader(): Loader {
  if (!loader) {
    const apiKey = (window as Window & { electronAPI?: { mapsApiKey: string } })
      .electronAPI?.mapsApiKey ?? '';
    loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['maps', 'marker'],
    });
  }
  return loader;
}

export async function loadMapsApi(): Promise<typeof google.maps> {
  const l = getLoader();
  await l.load();
  return google.maps;
}
```

**Why singleton:** The Google Maps JS API script tag can only be loaded once per page. A shared singleton prevents double-loading errors.

### 4. TypeScript declaration for `window.electronAPI`

Add to `src/vite-env.d.ts` (append to existing file):

```ts
interface Window {
  electronAPI: {
    mapsApiKey: string;
  };
}
```

---

## Validation

- Run `npx tsc --noEmit` from the project root. There must be zero errors in the two new files.
- Confirm `@googlemaps/js-api-loader` appears in `package.json` dependencies.
- Confirm `@types/google.maps` appears in devDependencies.
- Import `loadMapsApi` in a throwaway console log to confirm module resolution:
  ```ts
  import { loadMapsApi } from './utils/mapsLoader';
  // should compile without error
  ```

---

## Contract Notes

- `DARK_MAP_STYLE` is the single source of truth for map appearance. Both MiniMap and ResultMap import it — do NOT redefine inline in components.
- `loadMapsApi` must be callable multiple times safely (idempotent).
- Do not add any React code to these utility files — they are pure TS.

---

## Required Closeout Report

```
STATUS: DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED
files changed: [list]
verification command: npx tsc --noEmit
verification result: [paste output]
assumptions: [any]
blockers: [if any]
```
