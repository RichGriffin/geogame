# Geogame Wave-1 Contract Baseline — Cycle 1

**Issued:** 2026-06-30T19:41:00Z  
**Status:** ACTIVE — all lanes must conform

---

## 1. API Key Bridge Contract

The Google Maps API key is owned exclusively by the Electron main process. The renderer accesses it through a preload bridge.

**Preload interface** (exposed as `window.electronAPI`):
```ts
window.electronAPI.mapsApiKey: string   // synchronous string, empty string if not set
```

**IPC channel** (internal, main ↔ preload only):
```
maps:getApiKey   →  returns string
```

**Env var read by main process:** `GOOGLE_MAPS_API_KEY`  
**`.env` file location:** `C:/dev/rg/geogame/.env` (gitignored)

The renderer NEVER calls `ipcRenderer` directly. It reads `window.electronAPI.mapsApiKey`.

---

## 2. Google Maps Loader

Package: `@googlemaps/js-api-loader`

```ts
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: window.electronAPI.mapsApiKey,
  version: 'weekly',
  libraries: ['maps', 'marker'],
});
```

The loader is instantiated once at module level (singleton). Both `MiniMap` and `ResultMap` import from a shared `src/utils/mapsLoader.ts`.

---

## 3. Dark Map Style

The Google Maps instance must be styled to match the existing dark vector palette:

```json
[
  { "elementType": "geometry", "stylers": [{ "color": "#1a1f2c" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0d1117" }] },
  { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#3d4f63" }] },
  { "featureType": "road", "stylers": [{ "visibility": "off" }] },
  { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
  { "featureType": "transit", "stylers": [{ "visibility": "off" }] },
  { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#526173" }, { "weight": 0.5 }] },
  { "featureType": "administrative", "elementType": "labels", "stylers": [{ "visibility": "off" }] }
]
```

This must be the SAME style object used by both `MiniMap` and `ResultMap`.  
Export from `src/utils/mapStyle.ts`.

---

## 4. MiniMap Component Contract

**Location:** `src/components/MiniMap.tsx`

**Props (unchanged):**
```ts
type MiniMapProps = {
  pin: Pin;                            // Coords | null
  onPinPlace: (coords: Coords) => void;
};
```

**Behaviour:**
- Renders a Google Maps instance, starting at zoom 2, center `{ lat: 20, lng: 0 }` (world view)
- User clicks the map → `onPinPlace({ lat, lng })` called with the clicked coords
- A single `AdvancedMarkerElement` (or `Marker`) shows the placed pin; styled to match current orange dot (`#f97316`)
- Pan and zoom are Google Maps native (drag to pan, scroll/+− to zoom)
- `+` / `−` buttons from current design are REMOVED — replaced by Google Maps native controls
- Map container dimensions: `w-[340px]`, aspect ratio preserved via `paddingBottom` trick or fixed height `h-[170px]`
- On `pin` prop change (e.g. parent resets), the marker must update accordingly

**Removed utilities** (no longer called from MiniMap):
- `clickToCoords`, `coordsToPercent`, `WORLD_MAP_ASPECT`

---

## 5. ResultMap Component Contract

**Location:** `src/components/ResultMap.tsx`

**Props (unchanged):**
```ts
type ResultMapProps = {
  answer: Coords;
  guess: Coords | null;
};
```

**Behaviour:**
- Renders a Google Maps instance, styled with the dark style
- Zoom and center are auto-fitted to show both `answer` and `guess` markers (use `LatLngBounds`)
- If `guess` is null, center on `answer` at zoom 4
- Answer marker: green circle (`#22c55e`) or standard green pin
- Guess marker: orange circle (`#f97316`) matching current `bg-guess`
- A `Polyline` connects guess → answer in white/50 opacity
- Map is non-interactive (no pan/zoom, `gestureHandling: 'none'`, `disableDefaultUI: true`)

---

## 6. Game Phase Contract (unchanged)

| Phase | Trigger |
|-------|---------|
| `landing` | App start / play again |
| `round` | Start game / next round |
| `roundResult` | Submit guess / timer expires |
| `finalResults` | Last round complete |

---

## 7. Types Contract (unchanged)

```ts
type Coords = { lat: number; lng: number };
type Pin    = Coords | null;
```

`MockRound` keeps `imageUrl` for this wave (Street View integration is Wave 2).

---

## 8. Files Changed Per Lane

| Lane | Files owned |
|------|------------|
| BE   | `electron/main.js`, `electron/preload.js`, `.env` (created, gitignored), `.gitignore` |
| FE   | `src/components/MiniMap.tsx`, `src/components/ResultMap.tsx`, `src/utils/mapsLoader.ts`, `src/utils/mapStyle.ts` |
| Maps | `src/utils/mapStyle.ts`, `src/utils/mapsLoader.ts` (owns the definition; FE imports) |

Maps lane defines the style and loader util. FE lane owns the component wrappers.  
No lane touches another lane's owned files without coordinator approval.

---

## 9. Verification Commands

```bash
# Check API key is exposed (run in Electron DevTools console):
window.electronAPI.mapsApiKey   # must return non-empty string

# Check map renders:
# Visual: MiniMap visible in round screen with dark background

# Check pin placement:
# Visual: click map → orange dot appears, "Make Guess →" button appears

# Check ResultMap:
# Visual: round result screen shows both markers connected by line
```

---

## 10. Out of Scope for Cycle 1

- Street View panorama integration (Wave 2)
- Custom map tile servers
- Multiplayer / leaderboards
- Round data sourced from API (still mock)
