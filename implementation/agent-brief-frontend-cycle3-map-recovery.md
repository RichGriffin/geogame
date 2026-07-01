# Agent Brief — FE Lane (Cycle 3 Map Recovery)

Owner: Frontend lane
Depends on: Maps lane metadata policy

## Mission
Make round rendering robust when Street View fails, without breaking gameplay controls or phase flow.

## Files (owned)
- `src/components/StreetViewPanel.tsx`
- `src/screens/RoundScreen.tsx`

## Tasks
1. Add deterministic fallback handling in `StreetViewPanel`:
   - If `panoramaId` load fails, retry with coordinate-based Street View.
   - If coordinate-based Street View fails, expose a `failed` state to parent.
2. Update `RoundScreen` to support visual fallback:
   - When `StreetViewPanel` reports failure, render `round.imageUrl` as background fallback.
   - Keep all overlays (timer, hint, controls, minimap, submit) unchanged.
3. Maintain navigation safety:
   - Ignore nav commands cleanly while fallback image is active.
   - No runtime errors when panorama links are empty or missing.
4. UX clarity:
   - Show lightweight status badge: `Street View unavailable — using fallback image`.

## Verification
- `npm run build`
- Manual check:
  - Street View success: round interactive.
  - Forced Street View failure: fallback image appears and round remains playable.
  - Submit guess and phase transitions still pass.

## Closeout format
STATUS + files changed + verification result + blockers.
