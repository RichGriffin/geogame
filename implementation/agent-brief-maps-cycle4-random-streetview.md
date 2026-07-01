# Agent Brief — Maps Lane (Cycle 4 Random Street View Coordinates)

Owner: Maps lane

## Mission
Implement bounded random latitude/longitude generation for round Street View position while keeping normalization and fallback behavior deterministic.

## Files (owned)
- `src/data/mockRounds.ts`
- `src/utils/streetView.ts` (only if helper updates are needed)
- `src/types/game.ts` (only if type additions are needed)

## Tasks
1. Add random coordinate generation in `mockRounds.ts`:
   - bounded latitude range (avoid polar extremes),
   - bounded longitude range,
   - fixed decimal precision for deterministic display.
2. Add random-mode toggle:
   - default ON for this cycle pack,
   - allow disabling via `VITE_RANDOM_STREET_VIEW=0`.
3. In random mode, ensure rounds use generated coordinates for Street View lookup:
   - clear `panoramaId` so coordinate flow is authoritative.
4. Keep compatibility with current contracts:
   - same round count,
   - same phase flow,
   - no scoring changes.

## Verification
- `npm run build`
- `npx tsc --noEmit`
- Manual check:
  - multiple app restarts produce different round coordinates in random mode.

## Closeout format
STATUS + files changed + verification result + blockers.
