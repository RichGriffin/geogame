# Agent Brief — Frontend Lane (React Renderer)
# Cycle 1 · Wave 1

**Owner:** FE lane agent  
**Coordinator contract:** `implementation/contract-baseline.md`  
**Depends on:** Maps lane (`src/utils/mapsLoader.ts`, `src/utils/mapStyle.ts`)  
**Status at handoff:** NOT STARTED

---

## Mission

Replace `MiniMap` and `ResultMap` with Google Maps-backed components. The map must be pan/zoom-able natively (no custom zoom buttons), support click-to-place-pin, and visually match the existing dark vector map palette.

---

## Exact Files to Change

| File | Action |
|------|--------|
| `src/components/MiniMap.tsx` | REWRITE — Google Maps, click-to-pin, native pan/zoom |
| `src/components/ResultMap.tsx` | REWRITE — Google Maps, answer + guess markers, polyline |
| `src/utils/mapProjection.ts` | Keep file — `coordsToPercent` still used by `ResultMap` legacy path; `clickToCoords` no longer called (do NOT delete the file, just stop importing `clickToCoords` in MiniMap) |
| `src/vite-env.d.ts` | Maps lane adds `Window.electronAPI` — do not duplicate |

---

## Prerequisite Check

Before writing components, confirm:
1. `src/utils/mapsLoader.ts` exists and exports `loadMapsApi`.
2. `src/utils/mapStyle.ts` exists and exports `DARK_MAP_STYLE`.
3. `window.electronAPI.mapsApiKey` is set (check in DevTools console).

If Maps lane is not done yet, implement with a placeholder `apiKey: ''` and leave a `// TODO: Maps lane` comment.

---

## 1. `src/components/MiniMap.tsx` — Full Rewrite

### Props (unchanged — do not change the interface):
```ts
type MiniMapProps = {
  pin: Pin;                            // Coords | null
  onPinPlace: (coords: Coords) => void;
};
```

### Implementation pattern:

```tsx
import { useEffect, useRef } from 'react';
import type { Coords, Pin } from '../types/game';
import { loadMapsApi } from '../utils/mapsLoader';
import { DARK_MAP_STYLE } from '../utils/mapStyle';

export function MiniMap({ pin, onPinPlace }: MiniMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  // Initialise map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    loadMapsApi().then((maps) => {
      if (cancelled || !containerRef.current) return;

      const map = new maps.Map(containerRef.current, {
        center: { lat: 20, lng: 0 },
        zoom: 2,
        minZoom: 1,
        maxZoom: 8,
        styles: DARK_MAP_STYLE,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: 'greedy',
        backgroundColor: '#1a1f2c',
      });

      map.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return;
        onPinPlace({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      });

      mapRef.current = map;
    });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync pin marker
  useEffect(() => {
    if (!mapRef.current) return;

    if (!pin) {
      markerRef.current?.setMap(null);
      markerRef.current = null;
      return;
    }

    if (!markerRef.current) {
      markerRef.current = new google.maps.Marker({
        map: mapRef.current,
        position: pin,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: '#f97316',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });
    } else {
      markerRef.current.setPosition(pin);
    }
  }, [pin]);

  return (
    <div className="w-[340px] overflow-hidden rounded-2xl shadow-2xl">
      <div
        ref={containerRef}
        className="h-[170px] w-full cursor-crosshair"
        style={{ background: '#1a1f2c' }}
      />
    </div>
  );
}
```

**Key points:**
- Height `170px` for a 2:1 aspect ratio on `340px` width (matches old `WORLD_MAP_ASPECT = 2`).
- `gestureHandling: 'greedy'` so scroll-to-zoom works without Ctrl key inside Electron.
- The `onPinPlace` callback always gets the latest coords — no stale closure risk because the click listener is set up once and calls the prop directly. If the prop changes identity each render, use a ref: `const onPinPlaceRef = useRef(onPinPlace); onPinPlaceRef.current = onPinPlace;` and call `onPinPlaceRef.current(...)` in the listener.
- Remove the old `ZoomButton`, `WORLD_MAP_ASPECT`, `clickToCoords`, `coordsToPercent` imports entirely from this file.
- Remove the old "Click map to place pin" text overlay — the cursor style alone is sufficient.

---

## 2. `src/components/ResultMap.tsx` — Full Rewrite

### Props (unchanged):
```ts
type ResultMapProps = {
  answer: Coords;
  guess: Coords | null;
};
```

### Implementation pattern:

```tsx
import { useEffect, useRef } from 'react';
import type { Coords } from '../types/game';
import { loadMapsApi } from '../utils/mapsLoader';
import { DARK_MAP_STYLE } from '../utils/mapStyle';

export function ResultMap({ answer, guess }: ResultMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    loadMapsApi().then((maps) => {
      if (cancelled || !containerRef.current) return;

      const map = new maps.Map(containerRef.current, {
        styles: DARK_MAP_STYLE,
        disableDefaultUI: true,
        gestureHandling: 'none',
        backgroundColor: '#1a1f2c',
        zoom: 4,
        center: answer,
      });

      // Answer marker (green)
      new maps.Marker({
        map,
        position: answer,
        icon: {
          path: maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#22c55e',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      // Guess marker (orange)
      if (guess) {
        new maps.Marker({
          map,
          position: guess,
          icon: {
            path: maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: '#f97316',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        // Connecting line
        new maps.Polyline({
          map,
          path: [guess, answer],
          strokeColor: '#ffffff',
          strokeOpacity: 0.5,
          strokeWeight: 2,
        });

        // Auto-fit bounds to show both markers
        const bounds = new maps.LatLngBounds();
        bounds.extend(answer);
        bounds.extend(guess);
        map.fitBounds(bounds, 60); // 60px padding
      }
    });

    return () => { cancelled = true; };
  }, [answer, guess]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      style={{ background: '#1a1f2c' }}
    />
  );
}
```

---

## 3. Visual Parity Checklist

Before closing the lane, confirm visually:

- [ ] MiniMap background is dark (`#1a1f2c`), land is `#3d4f63`
- [ ] MiniMap pin is orange (`#f97316`) with white ring
- [ ] MiniMap responds to click — pin appears, "Make Guess →" button appears
- [ ] MiniMap can be panned by drag and zoomed by scroll wheel
- [ ] ResultMap shows answer (green) and guess (orange) markers
- [ ] ResultMap draws a white line between markers
- [ ] ResultMap auto-fits to show both markers

---

## 4. What to NOT change

- `src/types/game.ts` — no changes
- `src/hooks/useGameState.ts` — no changes
- `src/screens/RoundScreen.tsx` — no changes (MiniMap props interface is unchanged)
- `src/screens/RoundResultScreen.tsx` — no changes (ResultMap props interface is unchanged)
- `src/utils/mapProjection.ts` — keep the file, just stop importing from it in MiniMap

---

## Required Closeout Report

```
STATUS: DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED
files changed: [list]
verification command: npm run dev → visual inspection
verification result: [describe what you see]
assumptions: [any]
blockers: [if any]
```
