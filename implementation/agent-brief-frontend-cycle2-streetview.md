# Agent Brief — FE Lane (Cycle 2 Street View)

Owner: Frontend lane  
Depends on: Maps lane schema + panorama metadata

## Mission
Replace the round background image with real Google Street View while preserving all gameplay phase transitions.

## Files (owned)
- `src/screens/RoundScreen.tsx`
- `src/components/StreetViewPanel.tsx` (new)
- `src/hooks/useGameState.ts`
- `src/components/NavControls.tsx` (only if wiring change is needed)

## Tasks
1. Create `StreetViewPanel` component using Google Maps JS API Street View:
   - Initialize Street View panorama in a full-screen container.
   - Inputs: `position`, `panoramaId?`, `defaultPov?`, `onReady?`.
   - Use `loadMapsApi()` from `src/utils/mapsLoader.ts`.
2. Update `RoundScreen.tsx`:
   - Replace `<img src={round.imageUrl}>` with `<StreetViewPanel .../>`.
   - Keep overlays (`timer`, `hint`, `minimap`, buttons) unchanged.
3. Update navigation flow:
   - Pass direction from `NavControls` through to game state.
   - `useGameState.navigate(direction)` must store the last navigation command for the current round.
   - Feed the command to `StreetViewPanel` so control inputs adjust panorama POV/movement.
4. Keep phase contract untouched:
   - `landing | round | roundResult | finalResults`.

## Verification
- `npm run dev`
- Validate flow:
  - round loads Street View
  - nav controls move/rotate panorama
  - submit guess works
  - next round loads next panorama

## Closeout format
STATUS + files changed + verification result + blockers.
