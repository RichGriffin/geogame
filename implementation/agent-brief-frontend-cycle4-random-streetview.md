# Agent Brief — FE Lane (Cycle 4 Random Street View Coordinates)

Owner: Frontend lane
Depends on: Maps lane random-coordinate flag contract

## Mission
Keep round UX clear and playable while random coordinates drive Street View lookups.

## Files (owned)
- `src/screens/RoundScreen.tsx`

## Tasks
1. Add explicit UX signal for random-mode rounds:
   - show a lightweight badge when random coordinate mode is active.
2. Keep all round overlays functional in random mode:
   - timer, hint, nav controls, minimap, submit button unchanged.
3. Preserve fallback clarity:
   - if Street View is unavailable, fallback image state remains obvious and non-blocking.
4. Stay in lane:
   - do not modify `src/data/mockRounds.ts` or `electron/*` in FE lane.

## Verification
- `npm run build`
- Manual check:
  - random mode enabled: round opens and remains interactive.
  - fallback path still allows submit + phase transitions.

## Closeout format
STATUS + files changed + verification result + blockers.
