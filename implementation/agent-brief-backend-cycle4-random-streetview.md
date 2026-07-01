# Agent Brief — BE Lane (Cycle 4 Random Street View Coordinates)

Owner: Backend lane (Electron main/preload)

## Mission
Keep diagnostics and preload contracts stable while random Street View mode is exercised.

## Files (owned)
- `electron/main.js`
- `electron/preload.js`
- `src/vite-env.d.ts` (if preload typing changes are required)

## Tasks
1. Preserve existing key/diagnostic channels:
   - `maps:getApiKey`
   - `maps:getApiDiagnostics`
2. (Optional) expose a non-secret random-mode diagnostic flag to renderer if requested by coordinator.
3. Keep renderer contract stable:
   - no breaking changes to existing preload API methods.
4. Stay in lane:
   - do not alter random-coordinate generation logic in `src/data/mockRounds.ts`.

## Verification
- `npm run build`
- Runtime check:
  - preload API still available from renderer.
  - diagnostics call still succeeds.

## Closeout format
STATUS + files changed + verification result + blockers.
